// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Needed for *ngIf and async pipe

// Assuming you have these models/services. Adjust paths as necessary.
import { AuthService } from '../../Services/auth-service';
import { Studentprofile } from '../../models/studentprofile'; 

@Component({
  selector: 'app-navbar',
 
  imports: [RouterLink, CommonModule,RouterModule], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar  {

 
  currentUser$: Observable<Studentprofile | null>; 
  
  
  isDropdownOpen: boolean = false; 

  constructor(
    private authService: AuthService, 
    private router: Router 
  ) {
    this.currentUser$ = this.authService.currentUser$;

     

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  // Method to handle logout
  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/login']); 
  }
}