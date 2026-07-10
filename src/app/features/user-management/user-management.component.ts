import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  searchText = '';
  filteredUsers: User[] = [];
  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;
  totalRoles = 0;

  displayedColumns = [
    'id',
    'fullName',
    'username',
    'email',
    'role',
    'status',
    'actions'
  ];

  constructor(private userService: UserService , private dialog: MatDialog ){}

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers(): void {

  this.userService.getAllUsers().subscribe({

    next: (data) => {

      this.users = data;

      this.filteredUsers = data;

      this.calculateStatistics();

    }

  });

}
calculateStatistics(): void {

  this.totalUsers = this.users.length;

  this.activeUsers = this.users.filter(
    user => user.active
  ).length;

  this.inactiveUsers = this.users.filter(
    user => !user.active
  ).length;

  this.totalRoles = new Set(
    this.users.map(user => user.role)
  ).size;

}
searchUsers(): void {

  const value = this.searchText.toLowerCase();

  this.filteredUsers = this.users.filter(user =>

    user.fullName.toLowerCase().includes(value) ||

    user.username.toLowerCase().includes(value)

  );

}
openAddDialog(): void{

  const dialogRef =
      this.dialog.open(
          UserDialogComponent,
          {
            width:'550px'
          });

  dialogRef.afterClosed()
      .subscribe(result=>{

          if(result){

              this.loadUsers();

          }

      });

}
openEditDialog(user: User): void {

  const dialogRef =
      this.dialog.open(
          UserDialogComponent,
          {
            width:'600px',
            data:user
          });

  dialogRef.afterClosed()
      .subscribe(result=>{

        if(result){

          this.loadUsers();

        }

      });

}
 deleteUser(id:number){

  console.log(id);

  this.userService
      .deleteUser(id)
      .subscribe({
        next:()=>{

          console.log("Deleted");

          this.loadUsers();

        }
      });

}
//toggle method
toggleStatus(user:User): void{

  this.userService
      .toggleStatus(user.id!)
      .subscribe({

        next:()=>{

          user.active =
              !user.active;

          this.calculateStatistics();

        }

      });

}

}