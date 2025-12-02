import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/Course';
import { Instructor } from '../../models/iinstructor';
import { Studentprofile } from '../../models/studentprofile';
import { CourseService } from '../../Services/course.service';
import { InstructorService } from '../../Services/instructor-srevices';
import { StudentService } from '../../Services/student';
import { RouterLink } from '@angular/router';
type AdminView =
  | 'dashboard'
  | 'createCourse'
  | 'deleteCourse'
  | 'viewCourses'
  | 'createInstructor'
  | 'deleteInstructor'
  | 'viewInstructors'
  | 'createStudent'
  | 'deleteStudent'
  | 'viewStudents'
  | 'viewQuizzes';



@Component({
  selector: 'app-admin',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminPanelComponent  implements OnInit {
 sidebarOpen = true;
  activeView: AdminView = 'dashboard';

  totalStudents = 0;
  totalInstructors = 0;
  totalCourses = 0;

  enrolledStudents = 0;
  nonEnrolledStudents = 0;

  courses: Course[] = [];
  instructors: Instructor[] = [];
  students: Studentprofile[] = [];

  formData: any = {
    name: '',
    email: '',
    instructor: '',
    enrolled: ''
  };

  quizzes = [
    { id: 1, title: 'HTML & CSS Basics', course: 'Web Development', questions: 20 },
    { id: 2, title: 'Python Fundamentals', course: 'Data Science', questions: 15 },
    { id: 3, title: 'UI/UX Principles', course: 'Mobile App Design', questions: 25 }
  ];

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadCounts();
    this.loadLists();
  }

  // ───────── الإحصائيات ─────────
  loadCounts(): void {
    this.instructorService.getCount().subscribe({
      next: res => {
        this.totalInstructors = res.totalInstructors;
      },
      error: err => console.error('Error loading instructors count', err)
    });

    this.courseService.getCount().subscribe({
      next: res => {
        this.totalCourses = res.totalCourses;
      },
      error: err => console.error('Error loading courses count', err)
    });

    this.studentService.getCount().subscribe({
      next: res => {
        this.totalStudents = res.totalStudents;
        this.enrolledStudents = res.totalStudents;
        this.nonEnrolledStudents = 0;
      },
      error: err => console.error('Error loading students count', err)
    });
  }

  // ───────── تحميل القوائم ─────────
  loadLists(): void {
    this.courseService.getAllCourses().subscribe({
      next: data => {
        this.courses = data;
      },
      error: err => console.error('Error loading courses', err)
    });

    this.instructorService.getAll().subscribe({
      next: data => {
        this.instructors = data;
      },
      error: err => console.error('Error loading instructors', err)
    });

    this.studentService.getAll().subscribe({
      next: data => {
        this.students = data;
      },
      error: err => console.error('Error loading students', err)
    });
  }

  // ───────── UI Actions ─────────
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setActiveView(view: AdminView): void {
    this.activeView = view;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      instructor: '',
      enrolled: ''
    };
  }

  // ───────── حذف العناصر ─────────
  handleDelete(id: number, type: 'course' | 'instructor' | 'student'): void {
    if (type === 'course') {
      // حذف من الداتا بيز + تحديث الليست
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.crs_Id !== id);
        },
        error: err => console.error('Error deleting course', err)
      });
    }

    if (type === 'instructor') {
      this.instructors = this.instructors.filter(i => i.id !== id);
    }

    if (type === 'student') {
      this.students = this.students.filter(s => s.id !== id);
    }
  }

  handleCreate(type: 'course' | 'instructor' | 'student'): void {
    console.log('Create clicked for type:', type, 'data:', this.formData);
  }

  getStudentFullName(s: Studentprofile): string {
    return `${s.firstName} ${s.lastName}`;
  }
}