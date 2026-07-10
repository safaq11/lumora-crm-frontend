import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OnInit } from '@angular/core';

import { ReminderService } from '../../core/services/reminder.service';

import { Reminder } from '../../core/models/reminder';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { Router } from '@angular/router';
import { UserStateService } from '../../core/services/user-state.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
  
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  fullName = '';

  greeting = '';

  today = new Date();
  todayReminderCount=0;

todayReminders:Reminder[]=[];


  constructor(private reminderService: ReminderService,private router: Router,private userState: UserStateService,private themeService:
  ThemeService){

    const hour = new Date().getHours();

    if(hour < 12){

      this.greeting = "Good Morning";

    }else if(hour < 17){

      this.greeting = "Good Afternoon";

    }else{

      this.greeting = "Good Evening";

    }

  }
  ngOnInit():void{

this.loadTodayReminders();

}
loadTodayReminders(){

this.reminderService.getTodayReminders().subscribe({

next:(data)=>{

this.todayReminders=data;

this.todayReminderCount=data.length;

this.userState.fullName$.subscribe(name => {

  this.fullName = name;

});

},

error:(err)=>console.log(err)

});

}

  get initials(){

    return this.fullName
      .split(' ')
      .map(x=>x.charAt(0))
      .join('')
      .toUpperCase();

  }

  goToProfile(){

  this.router.navigate(['/profile']);

}

goToSettings(){

  this.router.navigate(['/settings']);

}

changePassword(){

  this.router.navigate(['/change-password']);

}

toggleDarkMode(){

  this.themeService.toggleTheme();

}

logout(){

  localStorage.clear();

  this.router.navigate(['/login']);

}

}