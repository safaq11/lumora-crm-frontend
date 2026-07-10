import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { User } from '../../core/models/user';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({

selector:'app-user-dialog',

standalone:true,

imports:[

CommonModule,

FormsModule,

MatDialogModule,

MatButtonModule,

MatInputModule,

MatFormFieldModule,

MatSelectModule,

MatSlideToggleModule

],

templateUrl:'./user-dialog.component.html',

styleUrls:['./user-dialog.component.css']

})

export class UserDialogComponent{

user:User={
username:'',

password:'',

fullName:'',

email:'',

mobile:'',

role:'SALES',

active:true

};

constructor(
  private dialogRef: MatDialogRef<UserDialogComponent>,
  private userService: UserService,
  @Inject(MAT_DIALOG_DATA)public data: User
){}

saveUser(){

  if(this.user.id){

      this.userService
          .updateUser(
              this.user.id,
              this.user
          )
          .subscribe({

              next:()=>{

                  this.dialogRef.close(true);

              }

          });

  }
  else{

      this.userService
          .createUser(this.user)
          .subscribe({

              next:()=>{

                  this.dialogRef.close(true);

              }

          });

  }

}
closeDialog(){

  this.dialogRef.close();

}

}