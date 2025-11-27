import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/Course';
import { environment } from '../../environment/environment';
import { AddCourseRequest, CourseService, UpdateCourseRequest } from '../../Services/course.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Instructor } from '../../models/iinstructor';
import { InstructorService } from '../../Services/instructor-srevices';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {

  courses: Course[] = [];
  instructors: Instructor[] = [];
  imageBase = environment.imageBase;

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;

        this.instructorService.getAll().subscribe({
          next: (instructors) => this.instructors = instructors,
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error(err)
    });
  }

  // ------------- صور -------------
  getCourseImage(course: Course): string {
    const url = course.imageUrl;

    if (!url) {
      return '/assets/img/education/course-1.jpg';
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return this.imageBase + url;
  }

  getInstructorImage(course: Course): string {
    const instructor = this.instructors.find(i => i.id === course.instructorId);

    if (!instructor || !instructor.photoUrl) {
      return '/assets/img/person/person-1.jpg';
    }

    return instructor.photoUrl;
  }

  getInstructorName(course: Course): string {
    const instructor = this.instructors.find(i => i.id === course.instructorId);
    return instructor?.fullName ?? course.instructorName ?? 'Unknown';
  }

 
}