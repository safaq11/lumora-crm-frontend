import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Notes } from '../models/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = 'https://lumora-crm-backend-1.onrender.com/api/notes';

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<Notes[]> {

    return this.http.get<Notes[]>(this.apiUrl);

  }

  getNotesByLead(customerLeadId:number): Observable<Notes[]> {

    return this.http.get<Notes[]>(`${this.apiUrl}/${customerLeadId}`);

  }

  addNote(note:Notes): Observable<Notes> {

    return this.http.post<Notes>(this.apiUrl,note);

  }

  updateNote(id:number,note:Notes): Observable<Notes> {

    return this.http.put<Notes>(`${this.apiUrl}/${id}`,note);

  }

  deleteNote(id:number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${id}`,{
      responseType:'text'
    });

  }

}