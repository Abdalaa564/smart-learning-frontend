import { Component, Input, ViewChild } from '@angular/core';
import { Instructor } from '../../../models/iinstructor';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { AuthService } from '../../../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-instructors',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './admin-instructors.html',
  styleUrl: './admin-instructors.css',
})
export class AdminInstructorsComponent {
  @Input() instructors: Instructor[] = [];

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';

  // Search icon implementation
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  highlightText(text: string): string {
    return this.searchBar?.highlightText(text) || text;
  }

  get filteredInstructors(): Instructor[] {
    if (!this.searchText.trim()) {
      return this.instructors;
    }

    const searchLower = this.searchText.toLowerCase();
    return this.instructors.filter(instructor =>
      instructor.fullName?.toLowerCase().includes(searchLower) ||
      instructor.jobTitle?.toLowerCase().includes(searchLower)
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Actions matching InstructorsListComponent
  goToProfile(id?: number) {
    if (!id) return;
    this.router.navigate(['/instructor', id]);
  }

  goToAdd() {
    this.router.navigate(['/instructors/add']);
  }

  goToEdit(id?: number) {
    if (!id) return;
    this.router.navigate(['/instructors/edit', id]);
  }

  goToDeleteConfirm(id?: number) {
    if (!id) return;
    this.router.navigate(['/instructors', id, 'confirm-delete']);
  }
}
