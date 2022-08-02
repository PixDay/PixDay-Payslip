import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timer: number = 0;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.timer = 1;
    }, 500);

    setTimeout(() => {
      this.timer = 2;
    }, 800);

    setTimeout(() => {
      this.timer = 3;
    }, 1100);
  }

}
