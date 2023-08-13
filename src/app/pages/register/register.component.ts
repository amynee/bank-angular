import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegisterRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  errorMessages: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMessages = [];
    this.authService.register({
        body: this.registerRequest
      }
    ).subscribe({
      next: (data) => {
        this.tokenService.saveResponse(data);
        this.router.navigate(['register-success']);
      },
      error: (err) => {
        this.errorMessages = err.error.validationErrors;
      }
    });
  }
}
