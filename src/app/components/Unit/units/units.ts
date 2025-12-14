import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Unit } from '../../../models/Unit ';
import { UnitService } from '../../../Services/unit.service';
import { CourseService } from '../../../Services/course.service';
import { AuthService } from '../../../Services/auth-service';
import { Snackbar } from '../../../shared/snackbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-units',
  imports: [CommonModule, RouterLink,MatSnackBarModule],
  templateUrl: './units.html',
  styleUrl: './units.css',
})
export class Units implements OnInit {

  courseId!: number;
 courseName: string = '';

  units: Unit[] = [];
  isLoading = false;

  // Role checking
  get isInstructor(): boolean {
    return this.authService.isInstructor();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // End Role checking

  constructor(
    private route: ActivatedRoute,
    private unitService: UnitService,
    private courseService: CourseService,
    private authService: AuthService,
    private snackbar: Snackbar
  ) { }

  ngOnInit(): void {
    // من الروت: Courses/:id/units
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(this.courseId).subscribe({
    next: (course) => {
      this.courseName = course.crs_Name;
    }
  });

  this.loadUnits();
}
  

  loadUnits(): void {
    this.isLoading = true;

    this.unitService.getByCourse(this.courseId).subscribe({
      next: (response) => {
        this.units = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading units:', err);
        this.isLoading = false;
      }
    });
  }

  deleteUnit(u: Unit): void {
    if (!confirm(`Are you sure to delete unit "${u.unit_Name}" ?`)) return;

    this.unitService.deleteUnit(u.unit_Id).subscribe({
      next: () => {
        // إعادة تحميل الليست بعد الحذف
        this.loadUnits();
        this.snackbar.open('Unit deleted successfully.', 'info');
      },
      error: (err) => {
        console.error('Error deleting unit:', err);
        this.snackbar.open('Failed to delete unit.', 'error');
      }
    });
  }
}