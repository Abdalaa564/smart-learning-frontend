import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../environment/environment';
import { CourseService } from '../../Services/course.service';
import { CommonModule } from '@angular/common';
import { Snackbar } from '../../shared/snackbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-course',
  imports: [CommonModule, RouterLink,MatSnackBarModule],
  templateUrl: './delete-course.html',
  styleUrl: './delete-course.css',
})
export class DeleteCourse  implements OnInit {

  courseId!: number;
  course!: Course;
  imageBase = environment.imageBase;
  isLoading = true;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
     private snackBar: Snackbar

  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (c) => {
        this.course = c;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open('Failed to load course', 'error');
      }
    });
  }

  getCourseImage(): string {
    if (!this.course.imageUrl) {
      return '/assets/img/education/course-1.jpg';
    }

    if (
      this.course.imageUrl.startsWith('http://') ||
      this.course.imageUrl.startsWith('https://')
    ) {
      return this.course.imageUrl;
    }

    return this.imageBase + this.course.imageUrl;
  }

  confirmDelete(): void {
    if (!confirm(`Are you sure to delete "${this.course.crs_Name}" ?`)) return;

    this.isDeleting = true;

    this.courseService.deleteCourse(this.courseId).subscribe({
      next: () => {
        this.isDeleting = false;
          this.snackBar.open('Course deleted successfully', 'success');
        this.router.navigate(['/Courses']);
      },
      error: (err) => {
        console.error(err);
         this.snackBar.open('Failed to delete course', 'error');
        this.isDeleting = false;
      }
    });
  }
}
