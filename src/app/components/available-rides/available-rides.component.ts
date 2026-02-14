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


availableRidesData: any[] = []

bookedRides: any[] = [];
vehicleType = ['all', 'Car', 'Bike']


constructor(private router: Router, private ridesService: RidesServiceService) {}


ngOnInit(): void {

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
  this.router.navigate(['/layout/host-ride']);
}

bookRide(id:number, employeeId:string) {
  let empIdInput = prompt('Enter your employee ID');
  if (!empIdInput) {
    return;
  }
  if (empIdInput?.toLocaleLowerCase() == employeeId.toLocaleLowerCase()) {
    alert('You are not allowed to book a ride since you are the owner of this ride')
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
