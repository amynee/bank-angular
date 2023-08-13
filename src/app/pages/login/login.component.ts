import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {};
  errorMsg = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  register() {
    this.router.navigate(['register']);
  }

  login() {
    this.errorMsg = '';
    this.authService.login(
      {
        body: this.authRequest
      }
    ).subscribe({
      next: (response) => {
        this.tokenService.saveResponse(response);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.errorMsg = err.error.errorMsg;
      }
    });
  }
}
