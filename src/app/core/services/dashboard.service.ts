import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl="https://lumora-crm-backend-1.onrender.com/api/dashboard";

  constructor(private http:HttpClient){}

  getDashboard():Observable<Dashboard>{

      return this.http.get<Dashboard>(this.apiUrl);

  }

}