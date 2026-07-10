import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatCardModule } from '@angular/material/card';

import { CustomerLead } from '../../core/models/customer-lead';
import { LeadType } from '../../core/models/lead-type';

import { CustomerLeadService } from '../../core/services/customer-lead.service';
import { LeadTypeService } from '../../core/services/lead-type.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-customer-lead',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatButtonModule,
    MatIconModule,

    MatInputModule,
    MatFormFieldModule,

    MatSelectModule,

    MatSnackBarModule,

    MatDatepickerModule,
    MatNativeDateModule,

    MatCardModule
  ],
  templateUrl: './customer-lead.component.html',
  styleUrls: ['./customer-lead.component.css']
})

export class CustomerLeadComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource<CustomerLead>();

  customerLeads: CustomerLead[] = [];

  leadTypes: LeadType[] = [];

  displayedColumns = [

    'id',

    'customerName',

    'mobile',

    'leadTypeName',

    'city',

    'status',

    'priority',

    'actions'

  ];

  searchKeyword = '';

  selectedStatus = '';

  selectedPriority = '';

  selectedLeadType = '';

  isEditMode = false;

  showForm = false;

  selectedId = 0;

  customerLead: CustomerLead = {

    customerName: '',

    mobile: '',

    alternateNumber: '',

    email: '',

    leadTypeId: 0,

    city: '',

    address: '',

    requirement: '',

    leadSource: '',

    assignedExecutive: '',

    discussionDetails: '',

    visitDate: '',

    nextFollowUpDate: '',

    status: '',

    priority: ''

  };
  constructor(

  private customerLeadService: CustomerLeadService,

  private leadTypeService: LeadTypeService,

  private snackBar: MatSnackBar

) {}

ngOnInit(): void {

  this.loadLeadTypes();

  this.loadCustomerLeads();

}

ngAfterViewInit(): void {

  this.dataSource.paginator = this.paginator;

  this.dataSource.sort = this.sort;

}

loadCustomerLeads(): void {

  this.customerLeadService.getAllCustomerLeads().subscribe({

    next: (data) => {

      this.customerLeads = data;

      this.dataSource.data = data;

      this.applyFilters();

    },

    error: (err) => {

      console.error(err);

      this.snackBar.open(

        'Unable to load Customer Leads',

        'Close',

        { duration: 3000 }

      );

    }

  });

}

loadLeadTypes(): void {

  this.leadTypeService.getAllLeadTypes().subscribe({

    next: (data) => {

      this.leadTypes = data;

    },

    error: (err) => {

      console.error(err);

    }

  });

}
saveCustomerLead(): void {

  console.log(this.customerLead);

  if (this.isEditMode) {

    this.customerLeadService

      .updateCustomerLead(

        this.selectedId,

        this.customerLead

      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Customer Lead Updated Successfully',

            'Close',

            {

              duration: 3000

            }

          );

          this.resetForm();

          this.resetForm();

          this.loadCustomerLeads();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  else {

    this.customerLeadService

      .createCustomerLead(

        this.customerLead

      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Customer Lead Added Successfully',

            'Close',

            {

              duration: 3000

            }

          );

          this.resetForm();

          this.loadCustomerLeads();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}
editCustomerLead(row: CustomerLead): void {

  this.showForm = true;

  this.isEditMode = true;

  this.selectedId = row.id!;

  this.customerLead = {

    ...row

  };
  setTimeout(() => {
    document.getElementById('leadForm')?.scrollIntoView({
      behavior:'smooth'
    });
    },100);
}

deleteCustomerLead(id: number): void {

  if (confirm('Are you sure you want to delete this Customer Lead?')) {

    this.customerLeadService.deleteCustomerLead(id).subscribe({

      next: () => {

        this.snackBar.open(

          'Customer Lead Deleted Successfully',

          'Close',

          { duration: 3000 }

        );

        this.loadCustomerLeads();

      },

      error: (err) => {

        console.error(err);

        this.snackBar.open(

          'Unable to delete Customer Lead',

          'Close',

          { duration: 3000 }

        );

      }

    });

  }

}

resetForm(): void {


  this.isEditMode = false;

  this.selectedId = 0;

  this.customerLead = {

    customerName: '',

    mobile: '',

    alternateNumber: '',

    email: '',

    leadTypeId: 0,

    city: '',

    address: '',

    requirement: '',

    leadSource: '',

    assignedExecutive: '',

    discussionDetails: '',

    visitDate: '',

    nextFollowUpDate: '',

    status: '',

    priority: ''
    
  };
  this.showForm=false;

}

/* ===========================
   FILTERS
=========================== */

applyFilters(): void {

  this.dataSource.filterPredicate = (data: CustomerLead, filter: string) => {

    const obj = JSON.parse(filter);

    return (

      data.customerName.toLowerCase().includes(obj.search)

      &&

      (!obj.status || data.status === obj.status)

      &&

      (!obj.priority || data.priority === obj.priority)

      &&

      (!obj.leadTypeId || data.leadTypeId == obj.leadTypeId)

    );

  };

  this.dataSource.filter = JSON.stringify({

    search: this.searchKeyword.toLowerCase(),

    status: this.selectedStatus,

    priority: this.selectedPriority,

    leadTypeId: this.selectedLeadType

  });

  if (this.dataSource.paginator) {

    this.dataSource.paginator.firstPage();

  }

}

clearFilters(): void {

  this.searchKeyword = '';

  this.selectedStatus = '';

  this.selectedPriority = '';

  this.selectedLeadType = '';

  this.applyFilters();

}

/* ===========================
   STATUS CSS
=========================== */

getStatusClass(status: string): string {

  switch (status) {

    case 'NEW':
      return 'status-new';

    case 'CONTACTED':
      return 'status-contacted';

    case 'INTERESTED':
      return 'status-interested';

    case 'FOLLOW_UP':
      return 'status-followup';

    case 'VISIT_SCHEDULED':
      return 'status-visit';

    case 'NEGOTIATION':
      return 'status-negotiation';

    case 'CLOSED_WON':
      return 'status-won';

    case 'CLOSED_LOST':
      return 'status-lost';

    case 'NOT_INTERESTED':
      return 'status-not-interested';

    default:
      return '';

  }

}

/* ===========================
   PRIORITY CSS
=========================== */

getPriorityClass(priority: string): string {

  switch (priority) {

    case 'HOT':
      return 'priority-hot';

    case 'WARM':
      return 'priority-warm';

    case 'COLD':
      return 'priority-cold';

    case 'NOT_A_CUSTOMER':
      return 'priority-not';

    default:
      return '';

  }

}

/* ===========================
   AVATAR INITIALS
=========================== */

getInitials(name: string): string {

  if (!name) {

    return '';

  }

  return name

    .split(' ')

    .map(word => word.charAt(0))

    .join('')

    .substring(0, 2)

    .toUpperCase();

}
exportToExcel(): void {

  const exportData = this.customerLeads.map(lead => ({

      Name: lead.customerName,

      Email: lead.email,

      Mobile: lead.mobile,

      LeadType: lead.leadTypeName,

      Status: lead.status,

      Address: lead.address

  }));


  const worksheet =
      XLSX.utils.json_to_sheet(exportData);

  const workbook =
      XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      'Customer Leads'

  );

  const excelBuffer = XLSX.write(

      workbook,

      {
        bookType:'xlsx',
        type:'array'
      }

  );

  const data = new Blob(

      [excelBuffer],

      {
        type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }

  );

  FileSaver.saveAs(

      data,

      'Customer_Leads.xlsx'

  );

}

}
