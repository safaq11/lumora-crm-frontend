import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { FollowUp } from '../../core/models/follow-up';
import { CustomerLead } from '../../core/models/customer-lead';

import { FollowUpService } from '../../core/services/follow-up.service';
import { CustomerLeadService } from '../../core/services/customer-lead.service';

@Component({
  selector: 'app-follow-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  followUps: FollowUp[] = [];

  customerLeads: CustomerLead[] = [];

  dataSource = new MatTableDataSource<FollowUp>();

  displayedColumns = [
    'id',
    'customerName',
    'discussion',
    'nextFollowUpDate',
    'remarks',
    'actions'
  ];

  searchKeyword = '';

  showForm = false;

  isEditMode = false;

  selectedId!: number;

  followUp: FollowUp = {

    customerLeadId: 0,

    discussion: '',

    nextFollowUpDate: '',

    remarks: ''

  };

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(

    private followUpService: FollowUpService,

    private customerLeadService: CustomerLeadService,

    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {

    this.loadFollowUps();

    this.loadCustomerLeads();

  }
  loadFollowUps(): void {

  this.followUpService.getAllFollowUps().subscribe({

    next: (data) => {

      this.followUps = [...data];

      this.dataSource.data = data;

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    },

    error: (err) => console.error(err)

  });

}

loadCustomerLeads(): void {

  this.customerLeadService.getAllCustomerLeads().subscribe({

    next: (data) => {

      this.customerLeads = data;

    },

    error: (err) => console.error(err)

  });

}
saveFollowUp(): void {

  if (this.isEditMode) {

    this.followUpService.updateFollowUp(

      this.selectedId,

      this.followUp

    ).subscribe({

      next: () => {

        this.snackBar.open(

          'Follow Up Updated Successfully',

          'Close',

          { duration: 3000 }

        );

        this.resetForm();

        this.loadFollowUps();

      },

      error: (err) => console.error(err)

    });

  } else {

    this.followUpService.createFollowUp(

      this.followUp

    ).subscribe({

      next: () => {

        this.snackBar.open(

          'Follow Up Added Successfully',

          'Close',

          { duration: 3000 }

        );

        this.resetForm();

        this.loadFollowUps();

      },

      error: (err) => console.error(err)

    });

  }

}
editFollowUp(row: FollowUp): void {

  this.showForm = true;

  this.isEditMode = true;

  this.selectedId = row.id!;

  this.followUp = {

    ...row

  };

  setTimeout(() => {

    document.getElementById('followUpForm')?.scrollIntoView({

      behavior: 'smooth'

    });

  }, 100);

}
deleteFollowUp(id: number): void {

  if (confirm('Are you sure you want to delete this Follow Up?')) {

    this.followUpService.deleteFollowUp(id).subscribe({

      next: () => {

        this.snackBar.open(

          'Follow Up Deleted Successfully',

          'Close',

          { duration: 3000 }

        );

        this.loadFollowUps();

      },

      error: (err) => console.error(err)

    });

  }

}
resetForm(): void {

  this.showForm = false;

  this.isEditMode = false;

  this.selectedId = 0;

  this.followUp = {

    customerLeadId: 0,

    discussion: '',

    nextFollowUpDate: '',

    remarks: ''

  };

}
applySearch(): void {

  this.dataSource.filter = this.searchKeyword

    .trim()

    .toLowerCase();

}
ngAfterViewInit(): void {

  this.dataSource.paginator = this.paginator;

  this.dataSource.sort = this.sort;

  this.dataSource.filterPredicate = (data, filter) =>

    data.customerName!.toLowerCase().includes(filter);

}
}
