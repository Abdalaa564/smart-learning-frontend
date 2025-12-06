import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';
import { AdminHeaderComponent } from '../admin-header-component/admin-header-component';
import { AdminDashboardComponent, Stats,Activity,ProgressItem,RecentActivity,} from '../admin-dashboard/admin-dashboard';
import { AdminStudentsComponent } from '../admin-students/admin-students';
import { AdminInstructorsComponent } from '../admin-instructors/admin-instructors';
import { AdminCoursesComponent } from '../admin-courses/admin-courses';
import { AdminProfileComponent } from '../admin-profile/admin-profile';
import { AdminInstructorRequestsComponent } from '../admin-instructor-requests/admin-instructor-requests';

// models
import { Studentprofile } from '../../../models/studentprofile';
import { Instructor } from '../../../models/iinstructor';
import { Course } from '../../../models/Course';

// services
import { StudentService } from '../../../Services/student';
import { InstructorService } from '../../../Services/instructor-srevices';
import { CourseService } from '../../../Services/course.service';
import { EnrollmentService } from '../../../Services/enrollment-service';
import { AdminService } from '../../../Services/admin';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../../../models/Admin';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
  imports: [
    CommonModule,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    AdminStudentsComponent,
    AdminInstructorsComponent,
    AdminCoursesComponent,
    AdminInstructorRequestsComponent,
    AdminProfileComponent
],
})
export class AdminPanelComponent implements OnInit {
  sidebarOpen = true;
  activePage: MenuItem['id'] = 'dashboard';

  adminName: string = '';

  stats: Stats = {
    students: 0,
    instructors: 0,
    courses: 0,
    activeEnrollments: 0,
    totalRevenue: 45780,
    completedQuizzes: 2341,
    averageGrade: 85.4,
    pendingPayments: 12,
  };

  students: Studentprofile[] = [];
  instructors: Instructor[] = [];
  courses: Course[] = [];
  recentActivities: RecentActivity[] = [];

  courseEnrollCounts: { [courseId: number]: number } = {};
  studentEnrollCounts: { [studentId: number]: number } = {};

  pendingInstructors: Instructor[] = [];
  isLoadingPending = false;

  activityData: Activity[] = [
    { day: 'Mon', students: 45, courses: 12 },
    { day: 'Tue', students: 52, courses: 15 },
    { day: 'Wed', students: 48, courses: 18 },
    { day: 'Thu', students: 61, courses: 20 },
    { day: 'Fri', students: 55, courses: 16 },
    { day: 'Sat', students: 38, courses: 10 },
    { day: 'Sun', students: 42, courses: 14 },
  ];

  progressData: ProgressItem[] = [
    { name: 'Completed', value: 43, colorClass: 'bg-primary' },
    { name: 'In Progress', value: 32, colorClass: 'bg-danger' },
    { name: 'Not Started', value: 25, colorClass: 'bg-warning' },
  ];

  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', iconClass: 'bi-speedometer2' },
    { id: 'students', label: 'Students', iconClass: 'bi-people' },
    { id: 'instructors', label: 'Instructors', iconClass: 'bi-mortarboard' },
    { id: 'courses', label: 'Courses', iconClass: 'bi-journal-bookmark' },
     { id: 'enrollments',      label: 'Enrollments',       iconClass: 'bi-graph-up' },
    { id: 'quizzes',          label: 'Quizzes',           iconClass: 'bi-file-earmark-text' },
    { id: 'payments',         label: 'Payments',          iconClass: 'bi-cash-coin' },
    { id: 'grades',           label: 'Grades & Results',  iconClass: 'bi-award' },
    {
      id: 'instructorRequests',
      label: 'Instructor Requests',
      iconClass: 'bi-person-check',
    },
    { id: 'profile', label: 'Profile', iconClass: 'bi-gear' },
  ];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Students', 'Courses'],
    datasets: [
      {
        data: [0, 0],
        label: 'Count',
        backgroundColor: ['rgba(13,110,253,0.7)', 'rgba(220,53,69,0.7)'],
      },
    ],
  };

  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadAdminName();
    this.loadCounts();
    this.loadTables();
    this.loadPendingInstructors();
  }

  // ========== load data ==========

  private loadAdminName(): void {
    this.instructorService.getMyProfile().subscribe({
      next: (profile) => {
        this.adminName = profile.fullName || 'Admin';
      },
      error: (err) => {
        console.error('Error getting admin name', err);
        this.adminName = 'Admin';
      },
    });
  }

  private loadCounts(): void {
    this.studentService.getCount().subscribe({
      next: (res) => {
        this.stats.students = res.totalStudents;
        this.updateBarChart();
      },
      error: (err) => console.error('Error getting students count', err),
    });

    this.instructorService.getCount().subscribe({
      next: (res) => {
        this.stats.instructors = res.totalInstructors;
      },
      error: (err) => console.error('Error getting instructors count', err),
    });

    this.courseService.getCount().subscribe({
      next: (res) => {
        this.stats.courses = res.totalCourses;
        this.updateBarChart();
      },
      error: (err) => console.error('Error getting courses count', err),
    });
  }

  private updateBarChart(): void {
    this.barChartData = {
      labels: ['Students', 'Courses'],
      datasets: [
        {
          data: [this.stats.students, this.stats.courses],
          label: 'Count',
          backgroundColor: ['rgba(13,110,253,0.7)', 'rgba(220,53,69,0.7)'],
        },
      ],
    };
  }

  private loadTables(): void {
    this.studentService.getAll().subscribe({
      next: (res) => {
        this.students = res.data;
        this.buildRecentActivities();
        this.loadStudentEnrollmentCounts();
      },
      error: (err) => console.error('Error loading students', err),
    });

    this.instructorService.getAll().subscribe({
      next: (res) => {
        this.instructors = res;
        this.buildRecentActivities();
      },
      error: (err) => console.error('Error loading instructors', err),
    });

    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.buildRecentActivities();
        this.loadCourseEnrollmentCounts();
      },
      error: (err) => console.error('Error loading courses', err),
    });
  }

  private loadStudentEnrollmentCounts(): void {
    if (!this.students || this.students.length === 0) return;

    const requests = this.students.map((stu) =>
      this.enrollmentService.getStudentCourses(stu.id).pipe(
        map((courses) => ({
          studentId: stu.id,
          count: courses.length,
        }))
      )
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.studentEnrollCounts = {};
        results.forEach((r) => {
          this.studentEnrollCounts[r.studentId] = r.count;
        });
      },
      error: (err) =>
        console.error('Error loading student enroll counts', err),
    });
  }

  private loadCourseEnrollmentCounts(): void {
    if (!this.courses || this.courses.length === 0) return;

    const requests = this.courses.map((course) =>
      this.enrollmentService
        .getCourseEnrollmentCount(course.crs_Id)
        .pipe(map((count) => ({ courseId: course.crs_Id, count })))
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.courseEnrollCounts = {};
        let total = 0;

        results.forEach((r) => {
          this.courseEnrollCounts[r.courseId] = r.count;
          total += r.count;
        });

        this.stats.activeEnrollments = total;
      },
      error: (err) =>
        console.error('Error loading enrollments per course', err),
    });
  }

  private loadPendingInstructors(): void {
    this.isLoadingPending = true;
    this.adminService.getPendingInstructors().subscribe({
      next: (res) => {
        this.pendingInstructors = res;
        this.isLoadingPending = false;
      },
      error: (err) => {
        console.error('Error loading pending instructors', err);
        this.isLoadingPending = false;
      },
    });
  }

  private buildRecentActivities(): void {
    const activities: RecentActivity[] = [];
    let idCounter = 1;

    if (this.instructors.length > 0) {
      const inst = this.instructors[this.instructors.length - 1];
      activities.push({
        id: idCounter++,
        type: 'instructor',
        instructor: inst.fullName,
        addedBy: this.adminName || 'Admin',
        time: 'Recently',
      });
    }

    if (this.students.length > 0) {
      const stu = this.students[this.students.length - 1];
      activities.push({
        id: idCounter++,
        type: 'student',
        student: `${stu.firstName} ${stu.lastName}`,
        addedBy: this.adminName || 'Admin',
        time: 'Recently',
      });
    }

    if (this.courses.length > 0) {
      const crs = this.courses[this.courses.length - 1];
      activities.push({
        id: idCounter++,
        type: 'course',
        course: crs.crs_Name,
        addedBy: this.adminName || 'Admin',
        time: 'Recently',
      });
    }

    this.recentActivities = activities;
  }

  // ===== UI =====

  setActivePage(page: MenuItem['id']) {
    this.activePage = page;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // ===== Handlers for children (ممكن بعدين تعمل فيها navigation/Dialogs) =====

  // Students
  onAddStudent() {
    console.log('Add student clicked');
  }

  onViewStudent(stu: Studentprofile) {
    console.log('View student', stu);
  }

  onEditStudent(stu: Studentprofile) {
    console.log('Edit student', stu);
  }

  onDeleteStudent(stu: Studentprofile) {
    console.log('Delete student', stu);
  }

  // Instructors
  onAddInstructor() {
    console.log('Add instructor clicked');
  }

  onViewInstructor(inst: Instructor) {
    console.log('View instructor', inst);
  }

  onEditInstructor(inst: Instructor) {
    console.log('Edit instructor', inst);
  }

  onDeleteInstructor(inst: Instructor) {
    console.log('Delete instructor', inst);
  }

  // Courses
  onAddCourse() {
    console.log('Add course clicked');
  }

  onViewCourse(course: Course) {
    console.log('View course', course);
  }

  onEditCourse(course: Course) {
    console.log('Edit course', course);
  }

  onDeleteCourse(course: Course) {
    console.log('Delete course', course);
  }

  // Instructor requests
  onApproveInstructor(inst: Instructor) {
    this.adminService.approveInstructor(inst.id!).subscribe({
      next: () => {
        this.loadPendingInstructors();
      },
      error: (err) => console.error('Error approving instructor', err),
    });
  }

  onRejectInstructor(inst: Instructor) {
    this.adminService.rejectInstructor(inst.id!).subscribe({
      next: () => {
        this.loadPendingInstructors();
      },
      error: (err) => console.error('Error rejecting instructor', err),
    });
  }
}
