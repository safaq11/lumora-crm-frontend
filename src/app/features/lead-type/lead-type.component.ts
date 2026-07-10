import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { LeadType } from '../../core/models/lead-type';
import { LeadTypeService } from '../../core/services/lead-type.service';

@Component({
  selector: 'app-lead-type',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './lead-type.component.html',
  styleUrls: ['./lead-type.component.css']
})
export class LeadTypeComponent implements OnInit {

  leadTypes: LeadType[] = [];

  displayedColumns = ['id', 'name', 'description', 'actions'];

  leadType: LeadType = {
    name: '',
    description: ''
  };
  isEditMode = false;

  selectedId!: number;
  constructor(
    private service: LeadTypeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLeadTypes();
  }

  loadLeadTypes() {
    this.service.getAllLeadTypes().subscribe(data=>{

      this.leadTypes = [...data];

    });
  }
  saveLeadType() {

  if(this.isEditMode){

    this.service.updateLeadType(this.selectedId,this.leadType).subscribe(()=>{

      this.snackBar.open(
        "Lead Type Updated Successfully",
        "Close",
        {duration:3000}
      );

      this.resetForm();

      this.loadLeadTypes();

    });

  }else{

    this.service.createLeadType(this.leadType).subscribe(()=>{

      this.snackBar.open(
        "Lead Type Added Successfully",
        "Close",
        {duration:3000}
      );

      this.resetForm();

      this.loadLeadTypes();

    });

  }

}
  editLeadType(row: LeadType){

  this.isEditMode = true;

  this.selectedId = row.id!;

  this.leadType = {

    name: row.name,

    description: row.description

  };

}

resetForm(){

  this.isEditMode = false;

  this.selectedId = 0;

  this.leadType = {

    name:'',
    description:''

  };

}


  deleteLeadType(id: number) {

  if (confirm("Are you sure?")) {

    this.service.deleteLeadType(id).subscribe({

      next: () => {

        console.log("Deleted successfully");

        this.loadLeadTypes();

        this.snackBar.open(
          "Lead Type Deleted Successfully",
          "Close",
          { duration: 3000 }
        );

      },

      error: (err) => {

        console.error("Delete Error:", err);

      }

    });

  }

}

}

