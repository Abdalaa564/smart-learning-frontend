// navbar.component.ts

import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

// Assuming you have these models/services. Adjust paths as necessary.
import { AuthService } from '../../Services/auth-service';
import { Studentprofile } from '../../models/studentprofile';
import { CommonModule } from '@angular/common';
import { Theme } from '../../Services/theme';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  // observable of current user
  currentUser$: Observable<Studentprofile | null>;
  isAuthenticated$: Observable<boolean>;

  // dropdown state
  isProfileDropdownOpen: boolean = false;    // للبروفايل
  isRegisterDropdownOpen: boolean = false;   // لـ "Register as"
  isDarkMode$: Observable<boolean>;

  // Role checking
  get isInstructor(): boolean {
    return this.authService.isInstructor();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isInstructorOrAdmin(): boolean {
    return this.isInstructor || this.isAdmin;
  }
  // End Role checking

  get userRole(): string {
    if (this.isAdmin) return 'Admin';
    if (this.isInstructor) return 'Instructor';
    return 'Student';
  }

  get profileLink(): any[] {
    if (this.isInstructor) {
      return ['/instructor', this.authService.currentUser?.id];
    } else if (this.isAdmin) {
      return ['/admin'];
    } else {
      return ['/userProfile'];
    }
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: Theme
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isDarkMode$ = this.themeService.isdarkMode$; 
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  // toggle profile dropdown
  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  // toggle register dropdown
  toggleRegisterDropdown() {
    this.isRegisterDropdownOpen = !this.isRegisterDropdownOpen;
  }
  // toggle dark mode
  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
  // close all dropdowns (لو حبيت تستخدمها بعدين)
  closeAllDropdowns() {
    this.isProfileDropdownOpen = false;
    this.isRegisterDropdownOpen = false;
  }

  // Method to handle logout
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.currentUserSubject.next(null);
        this.authService.isAuthenticatedSubject.next(false);

        // اقفل القايم
        this.isProfileDropdownOpen = false;
        this.isRegisterDropdownOpen = false;

        // Close dropdowns when clicking outside
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Logout failed", err);

        // fallback
        this.authService.currentUserSubject.next(null);
        this.authService.isAuthenticatedSubject.next(false);
        this.authService.removeToken();
        this.authService.removeUser();

        this.router.navigate(['/login']);
      }
    });
  }


  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideProfile = target.closest('.profile-dropdown-container');
    const clickedInsideRegister = target.closest('.dropdown');

    if (!clickedInsideProfile) {
      this.isProfileDropdownOpen = false;
    }

    if (!clickedInsideRegister) {
      this.isRegisterDropdownOpen = false;
    }
  }

}
