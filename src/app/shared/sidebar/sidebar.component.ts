import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { PermissionService } from '../../core/services/permission.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatIconModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  collapsed = false;
  constructor(
  private router: Router,
  private permissionService: PermissionService
) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
 openUsers(): void {

  if (
      this.permissionService.isAdmin()
     ) {

      this.router.navigate(['/users']);

  }
  else {

      this.permissionService
          .showNoPermission();

  }

}
}