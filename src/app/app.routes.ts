import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LeadTypeComponent } from './features/lead-type/lead-type.component';
import { CustomerLeadComponent } from './features/customer-lead/customer-lead.component';
import { FollowUpComponent } from './features/follow-up/follow-up.component';
import { ReminderComponent } from './features/reminder/reminder.component';
import { NotesComponent } from './features/notes/notes.component';
import { adminGuard } from './core/guards/admin.guard';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,

    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'lead-type',
        component: LeadTypeComponent
      },

      {
        path: 'customer-lead',
        component: CustomerLeadComponent
      },
      {
         path:'users',
         canActivate:[adminGuard],
         loadComponent:()=>
         import(
          './features/user-management/user-management.component'
          )
        .then(
            m=>m.UserManagementComponent
         )
      },

      {
        path: 'follow-up',
        component: FollowUpComponent
      },

      {
        path: 'reminder',
        component: ReminderComponent
      },

      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path:'profile',
        loadComponent:()=>
          import('./features/profile/profile.component')
        .then(m=>m.ProfileComponent)

      },
      {
        path:'settings',
        loadComponent:()=>
        import(
          './features/settings/settings.component'
         )
          .then(
           m=>m.SettingsComponent
          )
      },
      {  path:'change-password',
        loadComponent:()=>
        import('./features/change-password/change-password.component')
        .then(m=>m.ChangePasswordComponent)
      }

    ]

  },

  {
    path: '**',
    redirectTo: 'login'
  }

];