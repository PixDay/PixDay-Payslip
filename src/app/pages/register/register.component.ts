import { Component, OnInit } from '@angular/core';
import { User, initUser } from 'src/app/models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordVisibility: string = 'password';
  warningMessage: string = '';
  user: User = {} as User;

  constructor() { }

  ngOnInit(): void {
    initUser(this.user);
  }

  togglePasswordVisibility() {
    this.passwordVisibility = this.passwordVisibility === 'password' ? 'text' : 'password';
  }

  checkIfInputsAreValid(): boolean {
    if (this.user.firstName === '') {
      this.warningMessage = 'Entrez votre prénom *';
      return false;
    }
    if (this.user.lastName === '') {
      this.warningMessage = 'Entrez votre nom *';
      return false;
    }
    if (this.user.email === '') {
      this.warningMessage = 'Entrez une adresse email valide *';
      return false;
    }
    if (this.user.password === '') {
      this.warningMessage = 'Entrez un mot de passe *';
      return false;
    }
    this.warningMessage = '';
    return (true);
  }

  connectUser() {
    let isInputValid: boolean = false;

    isInputValid = this.checkIfInputsAreValid();
    if (isInputValid) {
      console.log('Connecting user...');
    }
  }
}
