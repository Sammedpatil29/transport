import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RidesServiceService { 
  private availableRides = new BehaviorSubject<any[]>([]);
  availableRides$ = this.availableRides.asObservable();
  private myRides = new BehaviorSubject<any[]>([])
  myRides$ = this.myRides.asObservable();
  private myBookings = new BehaviorSubject<any[]>([])
  myBookings$ = this.myBookings.asObservable();

  constructor() { }

  updateAvailableRides(rides: any[]) {
    this.availableRides.next(rides);
  }

  updateMyRides(rides: any[]) {
    this.myRides.next(rides);
  }

  updateMyBookings(rides: any[]) {
    this.myBookings.next(rides);
  }
}
