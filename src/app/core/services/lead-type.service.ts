import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeadType } from '../models/lead-type';

@Injectable({
  providedIn: 'root'
})
export class LeadTypeService {

  private apiUrl = 'https://lumora-crm-backend-1.onrender.com/api/lead-types';

  constructor(private http: HttpClient) {}

  getAllLeadTypes(): Observable<LeadType[]> {
    return this.http.get<LeadType[]>(this.apiUrl);
  }

  createLeadType(data: LeadType): Observable<LeadType> {
    return this.http.post<LeadType>(this.apiUrl, data);
  }

  updateLeadType(id: number, data: LeadType): Observable<LeadType> {
    return this.http.put<LeadType>(`${this.apiUrl}/${id}`, data);
  }

  deleteLeadType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getLeadTypeById(id:number): Observable<LeadType>{

  return this.http.get<LeadType>(`${this.apiUrl}/${id}`);

}
}