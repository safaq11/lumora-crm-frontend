import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { User } from '../../core/models/user';
import { ProfileService } from '../../core/services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserStateService } from '../../core/services/user-state.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule
    ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;

  username = localStorage.getItem('username')!;

  editMode = false;

  loading = true;

 constructor(private profileService: ProfileService,private snackBar: MatSnackBar,
    private userState: UserStateService){}

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile(): void {

    this.profileService.getProfile(this.username).subscribe({

      next: (data) => {

        this.user = data;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  enableEdit() {

    this.editMode = true;

  }

  cancelEdit() {

    this.editMode = false;

    this.loadProfile();

  }

  saveProfile() {

    this.profileService
      .updateProfile(this.username, this.user)
      .subscribe({

        next: (data) => {

          this.user = data;

          this.editMode = false;

          this.userState.updateFullName(data.fullName);

          this.snackBar.open('Profile Updated Successfully!','Close',
             {
               duration:3000,
                horizontalPosition:'right',
                 verticalPosition:'top'
                 });
                
  },

        error: () => {

          this.snackBar.open('Unable to update profile.','Close',
            {
               duration:3000,
               horizontalPosition:'right',
               verticalPosition:'top'
            });
        }

      });

  }

}