import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, initUser } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisibility: string = 'password';
  warningMessage: string = '';
  user: User = {} as User;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    initUser(this.user);
  }

  togglePasswordVisibility() {
    this.passwordVisibility = this.passwordVisibility === 'password' ? 'text' : 'password';
  }

  checkIfInputsAreValid(): boolean {
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

  async connectUser() {
    let isInputValid: boolean = false;

    isInputValid = this.checkIfInputsAreValid();
    if (isInputValid) {
      await this.authService.signIn(this.user);
      if (localStorage.getItem('stringifiedUser') !== null) {
        this.router.navigate(['/dashboard']);
      }
      else {
        // Indicate that the user could not connect
      }
    }
  }

  async signInWithGoogle() {
    await this.authService.signInWithGoogle();
  }
}
