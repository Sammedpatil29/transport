import { Component } from '@angular/core';
import { NoDataComponent } from "../no-data/no-data.component";

@Component({
  selector: 'app-my-rides',
  imports: [NoDataComponent],
  templateUrl: './my-rides.component.html',
  styleUrl: './my-rides.component.css'
})
export class MyRidesComponent {
ridesData: any[] = []
}
