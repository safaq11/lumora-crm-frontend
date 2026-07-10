import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private snackBar: MatSnackBar
  ) {}

  isAdmin(): boolean {
   
    return (  localStorage.getItem('role')?.toUpperCase()=== 'ADMIN');

  }

  showNoPermission(): void {

    this.snackBar.open(

      'Only administrators have permission.',

      'Close',

      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }

    );

  }

}