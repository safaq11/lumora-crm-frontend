import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn:'root'
})
export class ProfileService {

  private apiUrl="https://lumora-crm-backend-1.onrender.com/api/users";

  constructor(private http:HttpClient){}

  getProfile(username:string):Observable<User>{

    return this.http.get<User>(`${this.apiUrl}/profile/${username}`);

  }

  updateProfile(username:string,user:User):Observable<User>{

    return this.http.put<User>(`${this.apiUrl}/profile/${username}`,user);

  }

}