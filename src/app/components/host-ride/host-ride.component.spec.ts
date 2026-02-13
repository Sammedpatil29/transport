import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostRideComponent } from './host-ride.component';
import { RidesServiceService } from '../../services/rides-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HostRideComponent', () => {
  let component: HostRideComponent;
  let fixture: ComponentFixture<HostRideComponent>;
  let mockRidesService: any;
  let mockRouter: any;
  let availableRidesSubject: BehaviorSubject<any[]>;

  beforeEach(async () => {
    availableRidesSubject = new BehaviorSubject<any[]>([]);

    mockRidesService = {
      availableRides$: availableRidesSubject.asObservable(),
      updateAvailableRides: jasmine.createSpy('updateAvailableRides')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [HostRideComponent, FormsModule],
      providers: [
        { provide: RidesServiceService, useValue: mockRidesService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize availableRidesData from service', () => {
    const mockRides = [{ id: 1, destination: 'Place A' }];
    availableRidesSubject.next(mockRides);
    expect(component.availableRidesData).toEqual(mockRides);
  });

  it('should set min and max date time on init', () => {
    expect(component.minDateTime).toBeTruthy();
    expect(component.maxDateTime).toBeTruthy();
    expect(component.minDateTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  describe('onHostRide', () => {
    let alertSpy: jasmine.Spy;

    beforeEach(() => {
      alertSpy = spyOn(window, 'alert');
    });

    it('should create a new ride with ID 1 if list is empty', () => {
      component.availableRidesData = [];
      const formData = {
        employeeId: 'emp1', vehicleType: 'Car', vehicleNo: 'KA01',
        vacantSeats: 3, time: '2023-10-10T10:00', pickup: 'Home', destination: 'Office'
      };

      component.onHostRide(formData);

      expect(component.availableRidesData.length).toBe(1);
      expect(component.availableRidesData[0].id).toBe(1);
      expect(mockRidesService.updateAvailableRides).toHaveBeenCalledWith(component.availableRidesData);
      expect(alertSpy).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/layout/available-rides']);
    });

    it('should create a new ride with incremented ID if list exists', () => {
      component.availableRidesData = [{ id: 5, destination: 'Old' }];
      const formData = { employeeId: 'emp2', vehicleType: 'Bike', destination: 'Home' };

      component.onHostRide(formData);

      expect(component.availableRidesData.length).toBe(2);
      const newRide = component.availableRidesData.find(r => r.employeeId === 'emp2');
      expect(newRide.id).toBe(6);
    });
  });
});
