import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../Services/admin';
import { AdminUser } from '../../../models/Admin';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-admin-admins',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchBarComponent],
  templateUrl: './admin-admins.html',
  styleUrl: './admin-admins.css',
})
export class AdminAdmins implements OnInit {
  admins: AdminUser[] = [];
  isLoading = false;
  error: string | null = null;

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  searchText = '';

  // Modal
  showModal = false;
  isEditMode = false;
  selectedAdminId: string | null = null;
  adminForm: FormGroup;
  submitted = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.adminForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins() {
    this.isLoading = true;
    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading admins', err);
        this.error = 'Failed to load admins.';
        this.isLoading = false;
      }
    });
  }

  // Search
  onSearchTextChange(text: string) {
    this.searchText = text;
  }

  get filteredAdmins(): AdminUser[] {
    if (!this.searchText.trim()) return this.admins;
    const lower = this.searchText.toLowerCase();
    return this.admins.filter(a =>
      a.userName.toLowerCase().includes(lower) ||
      a.email.toLowerCase().includes(lower)
    );
  }

  highlightText(text: string): string {
    return this.searchBar?.highlightText(text) || text;
  }

  // Actions
  openAddModal() {
    this.isEditMode = false;
    this.selectedAdminId = null;
    this.submitted = false;
    this.adminForm.reset();

    // Password required for Add
    this.adminForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.adminForm.get('password')?.updateValueAndValidity();

    this.showModal = true;
  }

  openEditModal(admin: AdminUser) {
    this.isEditMode = true;
    this.selectedAdminId = admin.id;
    this.submitted = false;

    this.adminForm.patchValue({
      userName: admin.userName,
      email: admin.email,
      password: ''
    });

    // Password optional for Edit
    this.adminForm.get('password')?.clearValidators();
    this.adminForm.get('password')?.updateValueAndValidity();

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.adminForm.invalid) return;

    this.isLoading = true;
    const formValue = this.adminForm.value;

    if (this.isEditMode && this.selectedAdminId) {
      const updateDto = {
        userName: formValue.userName,
        email: formValue.email
      };

      this.adminService.updateAdmin(this.selectedAdminId, updateDto).subscribe({
        next: () => {
          this.loadAdmins();
          this.closeModal();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          alert('Failed to update admin');
        }
      });
    } else {
      const createDto = {
        userName: formValue.userName,
        email: formValue.email,
        password: formValue.password
      };

      this.adminService.createAdmin(createDto).subscribe({
        next: () => {
          this.loadAdmins();
          this.closeModal();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          alert(err.error?.message || 'Failed to create admin');
        }
      });
    }
  }

  deleteAdmin(admin: AdminUser) {
    if (!confirm(`Are you sure you want to delete admin ${admin.userName}?`)) return;

    this.isLoading = true;
    this.adminService.deleteAdmin(admin.id).subscribe({
      next: () => {
        this.loadAdmins();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert(err.error?.message || 'Failed to delete admin');
      }
    });
  }
}
