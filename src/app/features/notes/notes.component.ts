import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Notes } from '../../core/models/notes';
import { CustomerLead } from '../../core/models/customer-lead';

import { NotesService } from '../../core/services/notes.service';
import { CustomerLeadService } from '../../core/services/customer-lead.service';
@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [

    CommonModule,
    FormsModule,

    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule

  ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Notes[] = [];

  customerLeads: CustomerLead[] = [];

  displayedColumns = [

    'id',

    'customerName',

    'note',

    'createdDate',

    'actions'

  ];

  note: Notes = {

    customerLeadId: 0,

    note: ''

  };

  isEditMode = false;

  selectedId!: number;
  constructor(

  private notesService: NotesService,

  private customerLeadService: CustomerLeadService,

  private snackBar: MatSnackBar

){}
ngOnInit(): void {

  this.loadNotes();

  this.loadCustomerLeads();

}
loadNotes(): void {

  this.notesService.getAllNotes().subscribe({

    next: (data) => {

      this.notes = [...data];

    },

    error: (err) => {

      console.error(err);

    }

  });

}
loadCustomerLeads(): void {

  this.customerLeadService.getAllCustomerLeads().subscribe({

    next: (data) => {

      this.customerLeads = data;

    },

    error: (err) => {

      console.error(err);

    }

  });

}
saveNote(): void {

  if (this.isEditMode) {

    this.notesService.updateNote(this.selectedId, this.note).subscribe({

      next: () => {

        this.snackBar.open(
          'Note Updated Successfully',
          'Close',
          { duration: 3000 }
        );

        this.resetForm();

        this.loadNotes();

      },

      error: (err) => {

        console.error(err);

      }

    });

  } else {

    this.notesService.addNote(this.note).subscribe({

      next: () => {

        this.snackBar.open(
          'Note Added Successfully',
          'Close',
          { duration: 3000 }
        );

        this.resetForm();

        this.loadNotes();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}
editNote(row: Notes): void {

  this.isEditMode = true;

  this.selectedId = row.id!;

  this.note = {

    customerLeadId: row.customerLeadId,

    note: row.note

  };

}
deleteNote(id: number): void {

  if (confirm('Are you sure you want to delete this note?')) {

    this.notesService.deleteNote(id).subscribe({

      next: () => {

        this.snackBar.open(
          'Note Deleted Successfully',
          'Close',
          { duration: 3000 }
        );

        this.loadNotes();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}
resetForm(): void {

  this.isEditMode = false;

  this.selectedId = 0;

  this.note = {

    customerLeadId: 0,

    note: ''

  };

}
}
