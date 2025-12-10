import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Instructor } from '../../models/iinstructor';
import { InstructorService } from '../../Services/instructor-srevices';
import { Router, RouterLink } from '@angular/router';
import { SkeletonCardComponent } from '../../shared/Skeleton/skeleton-card/skeleton-card';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { AuthService } from '../../Services/auth-service';
import { RatingService } from '../../Services/rating-service';

@Component({
  selector: 'app-instructors-list',
  standalone: true,
  imports: [CommonModule,  SkeletonCardComponent, PaginationComponent],
  templateUrl: './instructors.html',
  styleUrls: ['./instructors.css']
})
export class InstructorsListComponent implements OnInit {

  instructors: Instructor[] = [];
  loading = true;

  // ----Pagination----
  currentPage: number = 1;
  itemsPerPage: number = 8;

  get paginatedInstructors(): Instructor[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.instructors.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }
  // ----end Pagination----

  // Role checking
  get isInstructor(): boolean {
    return this.authService.isInstructor();
  }
  
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

    // End Role checking

  constructor(
    private service: InstructorService,
    private router: Router,
    private authService: AuthService,
    private ratingService: RatingService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: res => {
        this.instructors = res;
            this.instructors.forEach(ins => {
        if (ins.id) {
          this.ratingService.getInstructorAverage(ins.id).subscribe({
            next: avgRes => {
              ins.rating = avgRes.average; // تحدث المتوسط لكل مدرس
            },
            error: err => {
              console.error('Error loading rating for instructor ' + ins.id, err);
              ins.rating = 0; // لو فيه مشكلة خليها 0
            }
          });
        }
      });

      this.loading = false;
      }
    });
  }

  getStarsArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  goToProfile(id?: number) {
    if (!id) return;
    this.router.navigate(['/instructor', id]); // لو عامل صفحة بروفايل
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