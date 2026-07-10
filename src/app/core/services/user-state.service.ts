import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UserStateService {

  private fullNameSubject = new BehaviorSubject<string>(
    localStorage.getItem('fullName') || 'Administrator'
  );

  fullName$ = this.fullNameSubject.asObservable();

  updateFullName(name:string){

    localStorage.setItem('fullName',name);

    this.fullNameSubject.next(name);

  }

}