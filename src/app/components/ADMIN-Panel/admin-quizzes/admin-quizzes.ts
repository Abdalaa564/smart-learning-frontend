// src/app/components/ADMIN-Panel/admin-quizzes/admin-quizzes.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../../Services/course.service';
import { UnitService } from '../../../Services/unit.service';
import { LessonService } from '../../../Services/lesson.service';
import { QuizService } from '../../../Services/quiz-service';
import { AuthService } from '../../../Services/auth-service';

import { Course } from '../../../models/Course';
import { Unit } from '../../../models/Unit ';
import { Lesson } from '../../../models/LessonResource ';
import { QuizDetailsDto } from '../../../models/exam-question';

@Component({
  selector: 'app-admin-quizzes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-quizzes.html',
  styleUrl: './admin-quizzes.css'
})
export class AdminQuizzesComponent implements OnInit {

  // Filters data
  courses: Course[] = [];
  units: Unit[] = [];
  lessons: Lesson[] = [];
  quizzes: QuizDetailsDto[] = [];

  // Selected IDs
  selectedCourseId: number | null = null;
  selectedUnitId: number | null = null;
  selectedLessonId: number | null = null;

  // Loading flags
  isLoadingCourses = false;
  isLoadingUnits = false;
  isLoadingLessons = false;
  isLoadingQuizzes = false;

  constructor(
    private courseService: CourseService,
    private unitService: UnitService,
    private lessonService: LessonService,
    private quizService: QuizService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  // ========= Load Courses =========
  loadCourses(): void {
    this.isLoadingCourses = true;

    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        console.log('All Courses:', data);
        console.log('Is Instructor:', this.authService.isInstructor());
        console.log('My ID:', this.authService.UserId);

        if (this.authService.isInstructor()) {
          // Instructor يشوف بس الكورسات بتاعته
          const myId = this.authService.UserId;
          console.log('Filtering courses for Instructor ID:', myId);

          if (myId) {
            this.courses = data.filter((c: any) => {
              const cInstId = c.instructorId || c.InstructorId;
              console.log(`Course ${c.crs_Name} (${c.crs_Id}) Instructor:`, cInstId);
              return Number(cInstId) === Number(myId);
            });
            console.log('Filtered Courses:', this.courses);
          } else {
            this.courses = [];
            console.warn('Instructor ID missing, showing no courses.');
          }
        } else {
          // Admin يشوف كل الكورسات
          this.courses = data;
        }

        this.isLoadingCourses = false;
      },
      error: (err) => {
        console.error('Error loading courses', err);
        this.isLoadingCourses = false;
      }
    });
  }

  // ========= When Course changes =========
  onCourseChange(): void {
    this.units = [];
    this.lessons = [];
    this.quizzes = [];

    this.selectedUnitId = null;
    this.selectedLessonId = null;

    if (!this.selectedCourseId) return;

    this.isLoadingUnits = true;

    this.unitService.getByCourse(Number(this.selectedCourseId)).subscribe({
      next: (data) => {
        this.units = data;
        this.isLoadingUnits = false;
      },
      error: (err) => {
        console.error('Error loading units', err);
        this.isLoadingUnits = false;
      }
    });
  }

  // ========= When Unit changes =========
  onUnitChange(): void {
    this.lessons = [];
    this.quizzes = [];
    this.selectedLessonId = null;

    if (!this.selectedUnitId) return;

    this.isLoadingLessons = true;

    this.lessonService.getLessonsByUnit(Number(this.selectedUnitId)).subscribe({
      next: (data) => {
        this.lessons = data;
        this.isLoadingLessons = false;
      },
      error: (err) => {
        console.error('Error loading lessons', err);
        this.isLoadingLessons = false;
      }
    });
  }

  // ========= When Lesson changes =========
  onLessonChange(): void {
    this.quizzes = [];

    if (!this.selectedLessonId) return;

    this.isLoadingQuizzes = true;

    this.quizService.getQuizzesByLessonId(Number(this.selectedLessonId)).subscribe({
      next: (data) => {
        this.quizzes = data;
        this.isLoadingQuizzes = false;
      },
      error: (err) => {
        console.error('Error loading quizzes', err);
        this.isLoadingQuizzes = false;
      }
    });
  }
}
