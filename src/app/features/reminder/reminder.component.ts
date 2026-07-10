import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { Reminder } from '../../core/models/reminder';
import { ReminderService } from '../../core/services/reminder.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [
    CommonModule,

    MatCardModule,

    MatTableModule],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent implements OnInit {

  todayReminders: Reminder[] = [];

  overdueReminders: Reminder[] = [];

  upcomingReminders: Reminder[] = [];

  displayedColumns = [
    'id',
    'customerName',
    'discussion',
    'nextFollowUpDate',
    'remarks'
  ];

  constructor(
    private reminderService: ReminderService
  ) {}

  ngOnInit(): void {

    this.loadToday();

    this.loadOverdue();

    this.loadUpcoming();

  }
loadToday(){

this.reminderService.getTodayReminders()

.subscribe(data=>{

this.todayReminders=data;

});

}

loadOverdue(){

this.reminderService.getOverdueReminders()

.subscribe(data=>{

this.overdueReminders=data;

});

}

loadUpcoming(){

this.reminderService.getUpcomingReminders()

.subscribe(data=>{

this.upcomingReminders=data;

});

}

}
