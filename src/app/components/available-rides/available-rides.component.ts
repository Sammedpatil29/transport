import { Component, OnInit } from '@angular/core';
import { NoDataComponent } from "../no-data/no-data.component";
import { Router } from '@angular/router';
import { RidesServiceService } from '../../services/rides-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-available-rides',
  imports: [NoDataComponent, FormsModule, CommonModule],
  templateUrl: './available-rides.component.html',
  styleUrl: './available-rides.component.css'
})
export class AvailableRidesComponent implements OnInit{
  filteredData: any[] = [];
  selectedFilter: string = 'all';


availableRidesData: any[] = [
  {
    id: 1,
    employeeId: 'EMP101',
    vehicleType: 'Car',
    vehicleNo: 'KA01AB1234',
    vacantSeats: 3,
    time: '2026-02-12T21:00',
    pickup: 'Electronic City',
    destination: 'Whitefield'
  },
  {
    id: 2,
    employeeId: 'EMP102',
    vehicleType: 'Bike',
    vehicleNo: 'KA02CD5678',
    vacantSeats: 0,
    time: '2026-02-12T21:30', 
    pickup: 'BTM Layout',
    destination: 'Marathahalli'
  },
  {
    id: 3,
    employeeId: 'EMP103',
    vehicleType: 'Car',
    vehicleNo: 'KA03EF9999',
    vacantSeats: 2,
    time: '2026-02-12T22:45', 
    pickup: 'Yelahanka',
    destination: 'Manyata Tech Park'
  },
  {
    id: 4,
    employeeId: 'EMP104',
    vehicleType: 'Bike',
    vehicleNo: 'KA05GH4567',
    vacantSeats: 1,
    time: '2026-02-12T23:15', 
    pickup: 'Hebbal',
    destination: 'Indiranagar'
  },
  {
    id: 5,
    employeeId: 'EMP105',
    vehicleType: 'Bike',
    vehicleNo: 'KA09JK2222',
    vacantSeats: 1,
    time: '2026-02-12T20:15', 
    pickup: 'JP Nagar',
    destination: 'MG Road'
  },
  {
    id: 6,
    employeeId: 'EMP106',
    vehicleType: 'Car',
    vehicleNo: 'KA01NGO2026',
    vacantSeats: 1,
    time: '2026-02-13T09:00',
    pickup: 'Proddatur',
    destination: 'Kadapa'
  }
];

bookedRides: any[] = [];


constructor(private router: Router, private ridesService: RidesServiceService) {}


ngOnInit(): void {
  this.filteredData = this.availableRidesData;
  this.ridesService.updateAvailableRides(this.availableRidesData);

  this.ridesService.availableRides$.subscribe((rides:any)=>{
    this.availableRidesData = rides;
    this.filteredData = rides;
    this.filterData()
  })
  this.ridesService.myBookings$.subscribe((rides:any)=>{
    this.bookedRides = rides;
  })
}

filterData() {
  const now = new Date().getTime();
  const filterValue = this.selectedFilter.toLowerCase();
  
  this.filteredData = this.availableRidesData.filter(item => {
    const rideTime = new Date(item.time).getTime();
    const diffInMinutes = Math.abs(now - rideTime) / (1000 * 60);
    const matchesVehicle = filterValue === 'all' ||  item.vehicleType.toLowerCase().includes(filterValue);
    const isWithinTimeWindow = diffInMinutes <= 60;
    return matchesVehicle && isWithinTimeWindow;
  });
}

gotohost(){
  this.router.navigate(['/layout/my-rides']);
}

bookRide(id:number, employeeId:string) {
  let empIdInput = prompt('Enter your employee ID');
  if (!empIdInput) {
    return;
  }
  if (empIdInput?.toLocaleLowerCase() == employeeId.toLocaleLowerCase()) {
    alert('you are not alowed to book a ride since you are the owner of this ride')
    return
  }
  
  if(this.bookedRides.find(item => item.bookedBy === empIdInput)){
    alert('You have a Active Ride')
    return
  } 
  
  
    let ride = this.availableRidesData.find(item => item.id === id)
    ride.vacantSeats--;
    this.ridesService.updateAvailableRides(this.availableRidesData);
    this.bookedRides.push({ ...ride, bookedBy: empIdInput });
    this.ridesService.updateMyBookings(this.bookedRides);
    alert(`Ride booked successfully. updated Seats ${ride.vacantSeats}`)
  
}
}
