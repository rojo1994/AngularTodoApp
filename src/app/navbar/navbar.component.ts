import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router, RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  authService = inject(Auth);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

 }
