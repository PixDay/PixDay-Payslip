import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisibility: string = 'password';

  constructor() { }

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.passwordVisibility = this.passwordVisibility === 'password' ? 'text' : 'password';
  }

}
