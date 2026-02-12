import { Component, OnInit } from '@angular/core';
import { NoDataComponent } from "../no-data/no-data.component";

@Component({
  selector: 'app-home',
  imports: [NoDataComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  message: any;

  constructor(){}

  ngOnInit(): void {
    this.greetings()
  }

  greetings(){
    let time = new Date().getHours();

if (time < 12) {
  this.message = `🌄 Good Morning, Sammed`;
} else if (time < 17) {
  this.message = `☀️ Good Afternoon, Sammed`;
} else {
  this.message = `🌙 Good Evening, Sammed`;
}
  }

}
