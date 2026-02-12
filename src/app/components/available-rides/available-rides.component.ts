import { Component } from '@angular/core';
import { NoDataComponent } from "../no-data/no-data.component";

@Component({
  selector: 'app-available-rides',
  imports: [NoDataComponent],
  templateUrl: './available-rides.component.html',
  styleUrl: './available-rides.component.css'
})
export class AvailableRidesComponent {
availableRidesData: any[] = [
  {
    id: 1,
    employeeId: 'EMP101',
    vehicleType: 'Car',
    vehicleNo: 'KA01AB1234',
    vacantSeats: 3,
    time: '09:00',
    pickup: 'Electronic City',
    destination: 'Whitefield'
  },
  {
    id: 2,
    employeeId: 'EMP102',
    vehicleType: 'Bike',
    vehicleNo: 'KA02CD5678',
    vacantSeats: 1,
    time: '09:30',
    pickup: 'BTM',
    destination: 'Marathahalli'
  },
  {
    id: 3,
    employeeId: 'EMP103',
    vehicleType: 'Car',
    vehicleNo: 'KA03EF9999',
    vacantSeats: 2,
    time: '10:00',
    pickup: 'Yelahanka',
    destination: 'Manyata Tech Park'
  },
  {
    id: 4,
    employeeId: 'EMP104',
    vehicleType: 'Car',
    vehicleNo: 'KA05GH4567',
    vacantSeats: 4,
    time: '11:00',
    pickup: 'Hebbal',
    destination: 'Indiranagar'
  },
  {
    id: 5,
    employeeId: 'EMP105',
    vehicleType: 'Bike',
    vehicleNo: 'KA09JK2222',
    vacantSeats: 1,
    time: '08:30',
    pickup: 'JP Nagar',
    destination: 'MG Road'
  }
];
}
