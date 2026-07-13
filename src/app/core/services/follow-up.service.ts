import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FollowUp } from '../models/follow-up';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService {

  private apiUrl = 'https://lumora-crm-backend-1.onrender.com/api/follow-ups';

  constructor(private http: HttpClient) {}

  getAllFollowUps(): Observable<FollowUp[]> {

    return this.http.get<FollowUp[]>(this.apiUrl);

  }

  createFollowUp(data: FollowUp): Observable<FollowUp> {

    return this.http.post<FollowUp>(this.apiUrl, data);

  }

  updateFollowUp(id:number,data:FollowUp):Observable<FollowUp>{

    return this.http.put<FollowUp>(`${this.apiUrl}/${id}`,data);

  }

  deleteFollowUp(id:number):Observable<any>{

    return this.http.delete(`${this.apiUrl}/${id}`,{

      responseType:'text'

    });

  }

}