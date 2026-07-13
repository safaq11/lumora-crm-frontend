import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reminder } from '../models/reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  private apiUrl = 'https://lumora-crm-backend-1.onrender.com/api/reminders';

  constructor(private http: HttpClient) {}

  getTodayReminders(): Observable<Reminder[]> {

    return this.http.get<Reminder[]>(`${this.apiUrl}/today`);

  }

  getOverdueReminders(): Observable<Reminder[]> {

    return this.http.get<Reminder[]>(`${this.apiUrl}/overdue`);

  }

  getUpcomingReminders(): Observable<Reminder[]> {

    return this.http.get<Reminder[]>(`${this.apiUrl}/upcoming`);

  }

}