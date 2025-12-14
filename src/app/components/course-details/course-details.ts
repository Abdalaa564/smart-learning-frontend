import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { environment } from '../../environment/environment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../Services/course.service';
import { RatingService } from '../../Services/rating-service';
import { SkeletonCardComponent } from '../../shared/Skeleton/skeleton-card/skeleton-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SkeletonCardComponent],
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.css'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  imageBase = environment.imageBase;
  isLoading = true;

  // ✅ Rating
  hoveredRating: number = 0;
  ratingValue: number = 0;
  feedback: string = '';
  hasRated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private ratingService: RatingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (!id) {
      this.router.navigate(['/Courses']);
      return;
    }

    this.courseService.getCourseById(id).subscribe({
      next: (res) => {
        this.course = res;
        this.isLoading = false;
        if (this.course?.crs_Id) {
          this.checkIfUserRated(this.course.crs_Id);
          this.loadCourseAverage(this.course.crs_Id);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  getCourseImage(): string {
    if (!this.course?.imageUrl) return '/assets/img/education/course-1.jpg';
    const url = this.course.imageUrl;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return this.imageBase + url;
  }

  goBack(): void {
    this.router.navigate(['/Courses']);
  }

  // ================= Rating Methods =================

  hoverRating(star: number) {
    if (!this.hasRated) this.hoveredRating = star;
  }

  setRating(star: number) {
    if (this.hasRated) return;
    this.ratingValue = star;
  }

  submitRating() {
    if (!this.course || this.hasRated || this.ratingValue === 0) return;

    const dto = {
      courseId: this.course.crs_Id,
      ratingValue: this.ratingValue,
      feedback: this.feedback
    };

    this.ratingService.addCourseRating(dto).subscribe({
      next: () => {
        this.hasRated = true;
        this.loadCourseAverage(this.course!.crs_Id);
      },
      error: err => {
        console.error('Failed to submit rating', err);
        this.hasRated = true;
      }
    });
  }

  checkIfUserRated(courseId: number) {
    this.ratingService.hasUserRatedCourse(courseId).subscribe({
      next: res => {
        console.log(res);
        this.hasRated = res.hasRated;
        if (res.hasRated) {
          this.ratingValue = res.ratingValue || 0;
          this.feedback = res.feedback || '';
          this.hoveredRating = 0;
        }
      },
      error: err => console.error(err)
    });
  }

  loadCourseAverage(courseId: number) {
    this.ratingService.getCourseAverage(courseId).subscribe({
      next: res => {
        if (this.course) this.course.rating = res.average;
      },
      error: err => console.error(err)
    });
  }
}
