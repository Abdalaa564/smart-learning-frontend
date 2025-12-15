import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TestimonialsSection } from './testimonials-section/testimonials-section';
import { HeroSection } from './hero-section/hero-section';
import { CategoriesSection } from './categories-section/categories-section';
import { InstructorsSection } from './instructors-section/instructors-section';
import { BlogPostsSection } from './blog-posts-section/blog-posts-section';
import { CtaSection } from './cta-section/cta-section';
import { WhyUs } from './why-us/why-us';
import { Course } from '../../models/Course';
import { InstructorService } from '../../Services/instructor-srevices';
import { CourseService } from '../../Services/course.service';
import { forkJoin } from 'rxjs';
import { Instructor } from '../../models/iinstructor';
import { MeatingSection } from './meating-section/meating-section';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    TestimonialsSection,
    HeroSection,
    CategoriesSection,
    InstructorsSection,
    BlogPostsSection,
    CtaSection,
    WhyUs,
    MeatingSection,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  courses: Course[] = [];
  instructors: Instructor[] = [];
    imageBase = environment.imageBase;
  
  featuredCourses: Course[] = [];
  isLoading: boolean = true;
  constructor(
    private instructorService: InstructorService,
    private courseService: CourseService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.isLoading = true;
    forkJoin({
      courses: this.courseService.getAllCourses(),
      instructors: this.instructorService.getAll(),
    }).subscribe({
      next: (data) => {
        this.courses = data.courses;
        this.instructors = data.instructors;

        this.featuredCourses = this.courses.slice(0, 3);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      },
    });
  }

  // getCourseImage(course: Course): string {
  //   return course.imageUrl || '/assets/img/education/course-1.jpg';
  // }
  getCourseImage(course: Course): string {
    const url = course.imageUrl;
    if (!url) return '/assets/img/education/course-1.jpg';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return this.imageBase + url;
  }
  getInstructorName(course: Course): string {
    const instructor = this.instructors.find((i) => i.id === course.instructorId);
    return instructor?.fullName || 'Unknown';
  }
  getInstructorImage(course: Course): string {
    const instructor = this.instructors.find((i) => i.id === course.instructorId);
    if (!instructor || !instructor.photoUrl) {
      return '/assets/img/person/person-1.jpg';
    }
    return instructor.photoUrl;
  }

  viewDetails(course: Course): void {
    if (!course.crs_Id) return;
    this.router.navigate(['/courses', course.crs_Id, 'details']);
  }
}
