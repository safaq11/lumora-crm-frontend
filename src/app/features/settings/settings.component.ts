import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThemeService } from '../../core/services/theme.service';
import { MatSnackBar }from '@angular/material/snack-bar';
@Component({
  selector: 'app-settings',
  standalone: true,

  imports: [

    CommonModule,
    FormsModule,

    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule

  ],

  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  darkMode = false;

  companyName =
      localStorage.getItem(
          'companyName'
      ) || 'Customer CRM';

  notificationsEnabled =
      localStorage.getItem(
          'notifications'
      ) === 'true';

  constructor(
      private themeService:
      ThemeService,   private snackBar:MatSnackBar ){

      this.darkMode =
          this.themeService
              .isDarkMode();
              

  }

  toggleTheme(){

      this.themeService
          .toggleTheme();

      this.darkMode =
          this.themeService
              .isDarkMode();
              this.snackBar.open(

      'Notification Settings Saved',

      'Close',

      {
        duration:3000
      }

  );

  }

  saveCompanyName(){

      localStorage.setItem(

          'companyName',

          this.companyName

      );

  this.snackBar.open(
      'Company Name Saved',
      'Close',
      {
        duration:3000
      }
  );

  }

  toggleNotifications(){

      localStorage.setItem(

          'notifications',

          String(
              this.notificationsEnabled
          )

      );
      this.snackBar.open(

      'Notification Settings Saved',

      'Close',

      {
        duration:3000
      }

  );

  }
 

}