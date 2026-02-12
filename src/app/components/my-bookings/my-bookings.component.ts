import { Component } from '@angular/core';
import { NoDataComponent } from "../no-data/no-data.component";

@Component({
  selector: 'app-my-bookings',
  imports: [NoDataComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
mybookingsData: any[] = []
}
