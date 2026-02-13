import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableRidesComponent } from './available-rides.component';
import { RidesServiceService } from '../../services/rides-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('AvailableRidesComponent', () => {
  let component: AvailableRidesComponent;
  let fixture: ComponentFixture<AvailableRidesComponent>;
  let mockRidesService: any;
  let mockRouter: any;
  let availableRidesSubject: BehaviorSubject<any[]>;
  let myBookingsSubject: BehaviorSubject<any[]>;

  beforeEach(async () => {
    availableRidesSubject = new BehaviorSubject<any[]>([]);
    myBookingsSubject = new BehaviorSubject<any[]>([]);

    mockRidesService = {
      availableRides$: availableRidesSubject.asObservable(),
      myBookings$: myBookingsSubject.asObservable(),
      updateAvailableRides: jasmine.createSpy('updateAvailableRides'),
      updateMyBookings: jasmine.createSpy('updateMyBookings')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [AvailableRidesComponent], 
      providers: [
        { provide: RidesServiceService, useValue: mockRidesService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from service', () => {
    const mockRides = [
      { id: 1, time: new Date().toISOString(), vehicleType: 'Car', vacantSeats: 4, employeeId: 'emp1' }
    ];
    const mockBookings = [
      { id: 2, bookedBy: 'me' }
    ];

    availableRidesSubject.next(mockRides);
    myBookingsSubject.next(mockBookings);

    expect(component.availableRidesData).toEqual(mockRides);
    expect(component.bookedRides).toEqual(mockBookings);
    expect(component.filteredData.length).toBe(1);
  });

  describe('filterData', () => {
    it('should filter rides based on time window (within 60 mins)', () => {
      const now = new Date().getTime();
      const validTime = new Date(now + 30 * 60000).toISOString(); 
      const invalidTime = new Date(now + 90 * 60000).toISOString(); 

      const rides = [
        { id: 1, time: validTime, vehicleType: 'Car' },
        { id: 2, time: invalidTime, vehicleType: 'Car' }
      ];

      component.availableRidesData = rides;
      component.selectedFilter = 'all';
      
      component.filterData();

      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].id).toBe(1);
    });

    it('should filter rides based on vehicle type', () => {
      const now = new Date().toISOString();
      const rides = [
        { id: 1, time: now, vehicleType: 'Car' },
        { id: 2, time: now, vehicleType: 'Bike' }
      ];

      component.availableRidesData = rides;
      
      component.selectedFilter = 'Car';
      component.filterData();
      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].vehicleType).toBe('Car');

      component.selectedFilter = 'all';
      component.filterData();
      expect(component.filteredData.length).toBe(2);
    });
  });

  it('should navigate to host ride page on gotohost', () => {
    component.gotohost();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/layout/host-ride']);
  });

  describe('bookRide', () => {
    let promptSpy: jasmine.Spy;
    let alertSpy: jasmine.Spy;

    beforeEach(() => {
      promptSpy = spyOn(window, 'prompt');
      alertSpy = spyOn(window, 'alert');
      
      const now = new Date().toISOString();
      component.availableRidesData = [
        { id: 1, time: now, vehicleType: 'Car', vacantSeats: 3, employeeId: 'owner1' }
      ];
      component.bookedRides = [];
    });

    it('should return if prompt is cancelled (no employee ID entered)', () => {
      promptSpy.and.returnValue(null);
      component.bookRide(1, 'owner1');
      expect(mockRidesService.updateAvailableRides).not.toHaveBeenCalled();
    });

    it('should alert and return if user tries to book their own ride', () => {
      promptSpy.and.returnValue('owner1');
      component.bookRide(1, 'owner1');
      expect(alertSpy).toHaveBeenCalledWith('you are not alowed to book a ride since you are the owner of this ride');
      expect(mockRidesService.updateAvailableRides).not.toHaveBeenCalled();
    });

    it('should alert and return if user already has an active booking', () => {
      component.bookedRides = [{ bookedBy: 'user1' }];
      promptSpy.and.returnValue('user1');
      component.bookRide(1, 'owner1');
      expect(alertSpy).toHaveBeenCalledWith('You have a Active Ride');
      expect(mockRidesService.updateAvailableRides).not.toHaveBeenCalled();
    });

    it('should successfully book a ride if validations pass', () => {
      promptSpy.and.returnValue('user2');
      
      component.bookRide(1, 'owner1');
      
      const updatedRides = mockRidesService.updateAvailableRides.calls.mostRecent().args[0];
      const bookedRide = updatedRides.find((r: any) => r.id === 1);
      expect(bookedRide.vacantSeats).toBe(2);

      const updatedBookings = mockRidesService.updateMyBookings.calls.mostRecent().args[0];
      expect(updatedBookings.length).toBe(1);
      expect(updatedBookings[0].bookedBy).toBe('user2');

      expect(alertSpy).toHaveBeenCalled();
      const alertMsg = alertSpy.calls.mostRecent().args[0];
      expect(alertMsg).toContain('Ride booked successfully');
    });
  });
});
