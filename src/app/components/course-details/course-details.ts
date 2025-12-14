import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { environment } from '../../environment/environment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../Services/course.service';
import { SkeletonCardComponent } from '../../shared/Skeleton/skeleton-card/skeleton-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule, RouterLink, SkeletonCardComponent],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class  CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  imageBase = environment.imageBase;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
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
}
