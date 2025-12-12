import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar';
import { AdminHeaderComponent } from '../admin-header-component/admin-header-component';
import { AdminDashboardComponent, Stats, Activity, ProgressItem, RecentActivity, } from '../admin-dashboard/admin-dashboard';
import { AdminStudentsComponent } from '../admin-students/admin-students';
import { AdminInstructorsComponent } from '../admin-instructors/admin-instructors';
import { AdminCoursesComponent } from '../admin-courses/admin-courses';
import { AdminProfileComponent } from '../admin-profile/admin-profile';
import { AdminInstructorRequestsComponent, } from '../admin-instructor-requests/admin-instructor-requests';
import { AdminEnrollmentsComponent, AdminEnrollmentRow, } from '../admin-enrollments/admin-enrollments';
import { AdminAdmins } from '../admin-admins/admin-admins';
import { AdminAttendanceComponent } from '../admin-attendance/admin-attendance';

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
import { AdminPaymentRow, AdminPaymentsComponent } from '../admin-payments/admin-payments';
import { EnrollmentPayment } from '../../../models/EnrollmentPayment';
import { AuthService } from '../../../Services/auth-service';

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
    AdminProfileComponent,
    AdminEnrollmentsComponent,
    AdminPaymentsComponent,
    AdminAttendanceComponent,
    AdminAdmins
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
    totalRevenue: 0,
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

  // payment 
  payments: AdminPaymentRow[] = [];
  isLoadingPayments = false;

  // 🆕 enrollments data for enrollments page
  enrollments: AdminEnrollmentRow[] = [];
  isLoadingEnrollments = false;

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

  menuItems: MenuItem[] = [];

  private allMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', iconClass: 'bi-speedometer2' },
    { id: 'admins', label: 'Admins', iconClass: 'bi-shield-lock' },
    { id: 'students', label: 'Students', iconClass: 'bi-people' },
    { id: 'instructors', label: 'Instructors', iconClass: 'bi-mortarboard' },
    { id: 'courses', label: 'Courses', iconClass: 'bi-journal-bookmark' },

    { id: 'enrollments', label: 'Enrollments', iconClass: 'bi-graph-up' },

    { id: 'quizzes', label: 'Quizzes', iconClass: 'bi-file-earmark-text' },
    { id: 'payments', label: 'Payments', iconClass: 'bi-cash-coin' },
    { id: 'grades', label: 'Grades & Results', iconClass: 'bi-award' },
    { id: 'attendance', label: 'Student Attendance', iconClass: 'bi-calendar-check' },

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

  // Role checking
  get isInstructor(): boolean {
    return this.authService.isInstructor();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadAdminName();
    this.filterMenuItems();
    this.loadCounts();
    this.loadTables();
    this.loadPendingInstructors();
  }

 private filterMenuItems(): void {
  if (this.isAdmin) {
    this.menuItems = this.allMenuItems.filter(item => item.id !== 'attendance');
  } else if (this.isInstructor) {
    const allowedIds: MenuItem['id'][] = [
      'courses',
      'students',
      'instructors',
      'quizzes',
      'grades',
      'attendance'
    ];

    this.menuItems = this.allMenuItems.filter(item => allowedIds.includes(item.id));

    if (!allowedIds.includes(this.activePage)) {
      this.activePage = allowedIds[0];
    }
  } else {
    // أي رول تاني (لو موجود) خليها profile بس مثلاً
    this.menuItems = this.allMenuItems.filter(item => item.id === 'profile');
    this.activePage = 'profile';
  }
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

    // 🆕 load total revenue
    this.enrollmentService.getTotalRevenue().subscribe({
      next: (rev) => this.stats.totalRevenue = rev,
      error: (err) => console.error('Error getting total revenue', err),
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
        this.loadAllEnrollments(); // 🆕 هنا بنادي عشان اجيب enrollments
        this.loadPayments(); // load payments table
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
        let totalEnrollments = 0;

        results.forEach((r) => {
          this.courseEnrollCounts[r.courseId] = r.count;
          totalEnrollments += r.count;
        });

        // 🔹 إجمالي الـ enrollments
        this.stats.activeEnrollments = totalEnrollments;

        // 🔹 حساب الـ Total Revenue من السعر × عدد الـ enrollments لكل كورس
        let totalRevenue = 0;
        this.courses.forEach((course) => {
          const count = this.courseEnrollCounts[course.crs_Id] || 0;
          totalRevenue += count * course.price;
        });
        this.stats.totalRevenue = totalRevenue;
      },
      error: (err) =>
        console.error('Error loading enrollments per course', err),
    });
  }


  // 🆕 load all enrollments (student + course info)
  private loadAllEnrollments(): void {
    if (!this.students || this.students.length === 0) {
      this.enrollments = [];
      return;
    }

    this.isLoadingEnrollments = true;

    const requests = this.students.map((stu) =>
      this.enrollmentService.getStudentCourses(stu.id).pipe(
        map((courses) => {
          const studentName = `${stu.firstName} ${stu.lastName}`;
          return courses.map<AdminEnrollmentRow>((course) => ({
            studentName,
            courseName: course.crs_Name,
            coursePrice: course.price,
            instructorName: course.instructorName,
          }));
        })
      )
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        // results: AdminEnrollmentRow[][] -> نفلّطها
        this.enrollments = results.flat();
        this.isLoadingEnrollments = false;
      },
      error: (err) => {
        console.error('Error loading enrollments', err);
        this.isLoadingEnrollments = false;
      },
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

  // to calculate total revenue table of Payments
  private loadPayments(): void {
    if (!this.courses || this.courses.length === 0) {
      this.payments = [];
      return;
    }

    this.isLoadingPayments = true;

    const requests = this.courses.map((course) =>
      this.enrollmentService.getCoursePayments(course.crs_Id).pipe(
        map((enrollments: any) => {
          if (!Array.isArray(enrollments)) {
            return [];
          }
          return enrollments.map<AdminPaymentRow>((e) => ({
            studentName: e.studentName,
            courseName: e.courseName,
            paidAmount: e.paidAmount ?? e.coursePrice,
            paymentDate: e.paymentDate ?? e.enrollDate,
            paymentStatus: e.paymentStatus,
          }));
        })
      )
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        // flatten
        this.payments = results.flat();
        this.isLoadingPayments = false;
      },
      error: (err) => {
        console.error('Error loading payments', err);
        this.isLoadingPayments = false;
      },
    });
  }


  // ===== UI =====

  setActivePage(page: MenuItem['id']) {
    this.activePage = page;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // باقي الـ handlers زي ما عملنا قبل كده (اختياري تسيبهم console.log)

  onAddStudent() { }
  onViewStudent(stu: Studentprofile) { }
  onEditStudent(stu: Studentprofile) { }
  onDeleteStudent(stu: Studentprofile) { }

  onAddInstructor() { }
  onViewInstructor(inst: Instructor) { }
  onEditInstructor(inst: Instructor) { }
  onDeleteInstructor(inst: Instructor) { }

  onAddCourse() { }
  onViewCourse(course: Course) { }
  onEditCourse(course: Course) { }
  onDeleteCourse(course: Course) { }

  onApproveInstructor(inst: Instructor) {
    if (!inst.id) return;
    this.adminService.approveInstructor(inst.id).subscribe({
      next: () => this.loadPendingInstructors(),
      error: (err) => console.error('Error approving instructor', err),
    });
  }

  onRejectInstructor(inst: Instructor) {
    if (!inst.id) return;
    this.adminService.rejectInstructor(inst.id).subscribe({
      next: () => this.loadPendingInstructors(),
      error: (err) => console.error('Error rejecting instructor', err),
    });
  }
}
