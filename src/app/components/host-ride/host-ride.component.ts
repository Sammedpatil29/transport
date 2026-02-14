import { Component, OnInit } from '@angular/core';
import { NoDataComponent } from "../no-data/no-data.component";
import { RidesServiceService } from '../../services/rides-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-host-ride',
  imports: [NoDataComponent, FormsModule, CommonModule],
  templateUrl: './host-ride.component.html',
  styleUrl: './host-ride.component.css'
})
export class HostRideComponent implements OnInit{
availableRidesData: any[] = []
minDateTime: string = '';
maxDateTime: string = '';
vehicleType:any = ['Car', 'Bike']


constructor(private ridesService: RidesServiceService, private router: Router){}

ngOnInit(): void {
  this.ridesService.availableRides$.subscribe((rides:any)=>{
    this.availableRidesData = rides;
  })
  this.setMinDateTime()
}

onHostRide(formData: any) {
    if(this.availableRidesData.find(item => item.employeeId.toLowerCase() === formData.employeeId.toLowerCase())){
      alert('You already have an active hosted ride');
      return;
    }

    if (new Date(formData.time).getTime() < new Date().getTime()) {
      alert('Please select a future time');
      return;
    }

    const newId = this.availableRidesData.length > 0 
      ? Math.max(...this.availableRidesData.map(r => r.id)) + 1 
      : 1;

    const newRide = {
      id: newId,
      employeeId: formData.employeeId,
      vehicleType: formData.vehicleType,
      vehicleNo: formData.vehicleNo,
      vacantSeats: formData.vacantSeats,
      time: formData.time, 
      pickup: formData.pickup,
      destination: formData.destination
    };

    this.availableRidesData.push(newRide);
    console.log(this.availableRidesData)
    this.ridesService.updateAvailableRides(this.availableRidesData);

    alert(`Successfully hosted a ${newRide.vehicleType} ride to ${newRide.destination}!`);
    
    this.router.navigate(['/layout/available-rides']);
  }

  setMinDateTime() {
  const now = new Date();
  
  this.minDateTime = this.formatDateTime(now);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 0, 0); 
  this.maxDateTime = this.formatDateTime(endOfToday);
}

formatDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
}
