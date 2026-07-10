import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {

    this.authService.login(this.loginData).subscribe({

      next: (response) => {
           console.log(response);
        if (response.success) {

          localStorage.setItem('username', response.username);
          localStorage.setItem('fullName', response.fullName);
          localStorage.setItem('role', response.role);

          this.snackBar.open(
            'Login Successful!',
            'Close',
            {
              duration: 3000
            }
          );

          this.router.navigate(['/dashboard']);

        } else {

          this.snackBar.open(
            response.message,
            'Close',
            {
              duration: 3000
            }
          );

        }

      },

      error: () => {

        this.snackBar.open(
          'Unable to connect to server.',
          'Close',
          {
            duration: 3000
          }
        );

      }

    });

  }

}