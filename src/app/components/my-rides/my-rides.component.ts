import { Component, OnInit } from '@angular/core';
import { NoDataComponent } from "../no-data/no-data.component";
import { RidesServiceService } from '../../services/rides-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rides',
  imports: [NoDataComponent, FormsModule],
  templateUrl: './my-rides.component.html',
  styleUrl: './my-rides.component.css'
})
export class MyRidesComponent implements OnInit{
availableRidesData: any[] = []
minDateTime: string = '';
maxDateTime: string = '';

constructor(private ridesService: RidesServiceService, private router: Router){}

ngOnInit(): void {
  this.ridesService.availableRides$.subscribe((rides:any)=>{
    this.availableRidesData = rides;
  })
  this.setMinDateTime()
}

onHostRide(formData: any) {
    // 1. Generate a unique ID for the new service entry
    const newId = this.availableRidesData.length > 0 
      ? Math.max(...this.availableRidesData.map(r => r.id)) + 1 
      : 1;

    // 2. Create the new ride object
    // The 'time' from datetime-local is already in YYYY-MM-DDTHH:mm format
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

    // 3. Add to the data array
    this.availableRidesData.push(newRide);
    console.log(this.availableRidesData)
    this.ridesService.updateAvailableRides(this.availableRidesData);

    // 4. Provide feedback to the volunteer
    alert(`Successfully hosted a ${newRide.vehicleType} ride to ${newRide.destination}!`);
    
    this.router.navigate(['/layout/available-rides']);
  }

  setMinDateTime() {
  const now = new Date();
  
  // Format: 2026-02-13T09:45
  this.minDateTime = this.formatDateTime(now);

  // Set Max to 23:59 of today to keep it "Today Only"
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
