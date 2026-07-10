import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [  CommonModule,
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(
  private userService: UserService,
  private snackBar: MatSnackBar
){}
 passwordData = {

  username:
      localStorage.getItem(
          'username'
      ),

  oldPassword:'',

  newPassword:''

};

confirmPassword = '';
changePassword(){

  if(
      this.passwordData.newPassword
      !==
      this.confirmPassword
  ){

      this.snackBar.open(

          'Passwords do not match',

          'Close',

          {
            duration:3000
          }

      );

      return;

  }

  this.userService
      .changePassword(
          this.passwordData
      )
      .subscribe({

  next:(res)=>{

      console.log('SUCCESS', res);

      this.snackBar.open(
          'Password Updated',
          'Close',
          { duration:3000 }
      );

  },

  error:(err)=>{

      console.log('ERROR', err);

      this.snackBar.open(
          'Old Password Incorrect',
          'Close',
          { duration:3000 }
      );

  }

});

        
      

}
}