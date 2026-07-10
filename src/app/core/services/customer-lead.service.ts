import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomerLead } from '../models/customer-lead';

@Injectable({
  providedIn: 'root'
})
export class CustomerLeadService {

  private apiUrl = "http://localhost:8080/api/customer-leads";

  constructor(private http: HttpClient) {}

  getAllCustomerLeads(): Observable<CustomerLead[]> {

    return this.http.get<CustomerLead[]>(this.apiUrl);

  }

  getCustomerLeadById(id:number): Observable<CustomerLead>{

    return this.http.get<CustomerLead>(`${this.apiUrl}/${id}`);

  }

  createCustomerLead(data:CustomerLead): Observable<CustomerLead>{

    return this.http.post<CustomerLead>(this.apiUrl,data);

  }

  updateCustomerLead(id:number,data:CustomerLead): Observable<CustomerLead>{

    return this.http.put<CustomerLead>(`${this.apiUrl}/${id}`,data);

  }

  deleteCustomerLead(id:number): Observable<void>{

    return this.http.delete<void>(`${this.apiUrl}/${id}`);

  }

}