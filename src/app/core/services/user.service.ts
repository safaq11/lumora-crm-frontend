import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://lumora-crm-backend-1.onrender.com/api/users";

  constructor(private http: HttpClient) {}


  // Get All Users
  
  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl);

  }

  
  // Get User By Id


  getUserById(id:number): Observable<User>{

    return this.http.get<User>(`${this.apiUrl}/${id}`);

  }

  
  // Create User


  createUser(user:User): Observable<User>{

    return this.http.post<User>(this.apiUrl,user);

  }

  
  // Update User
 

  updateUser(id:number,user:User): Observable<User>{

    return this.http.put<User>(`${this.apiUrl}/${id}`,user);

  }

  
  // Delete User

  deleteUser(id:number): Observable<any>{

    return this.http.delete(`${this.apiUrl}/${id}`);

  }
  
 // toggle Status
 toggleStatus(id:number){

  return this.http.patch(

    `${this.apiUrl}/${id}/status`,
    {}

  );

}
//Change pssword
changePassword(data:any){

  return this.http.put(

      `${this.apiUrl}/change-password`,

      data,

      {
        responseType:'text'
      }

  );

}

}