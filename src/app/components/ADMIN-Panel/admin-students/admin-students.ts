import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Studentprofile } from '../../../models/studentprofile';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css',
})
export class AdminStudentsComponent {
  @Input() students: Studentprofile[] = [];
  @Input() studentEnrollCounts: { [studentId: number]: number } = {};

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';
  
  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<Studentprofile>();
  @Output() edit = new EventEmitter<Studentprofile>();
  @Output() delete = new EventEmitter<Studentprofile>();
  
  // Search icon implementation
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
  }

  highlightText(text: string): string {
    return this.searchBar?.highlightText(text) || text;
  }

  get filteredStudents(): Studentprofile[] {
    if (!this.searchText.trim()) {
      return this.students;
    }

    const searchLower = this.searchText.toLowerCase();
    return this.students.filter(student =>
      student.firstName?.toLowerCase().includes(searchLower) ||
      student.lastName?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.phoneNumber?.toLowerCase().includes(searchLower)
    );
  }

  constructor(private authService: AuthService) { }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  // end Search icon implementation
}
