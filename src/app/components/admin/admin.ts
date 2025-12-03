import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Studentprofile } from '../../models/studentprofile';
import { Instructor } from '../../models/iinstructor';
import { Course } from '../../models/Course';
import { StudentService } from '../../Services/student';
import { InstructorService } from '../../Services/instructor-srevices';
import { CourseService } from '../../Services/course.service';
import { StudentprofileService } from '../../Services/studentprofile-service';

// === services & models من الباك إند ===


interface Stats {
  students: number;
  instructors: number;
  courses: number;
  activeEnrollments: number;
  totalRevenue: number;
  completedQuizzes: number;
  averageGrade: number;
  pendingPayments: number;
}

interface Activity {
  day: string;
  students: number;
  courses: number;
}

interface ProgressItem {
  name: string;
  value: number;
  colorClass: string;
}

interface RecentActivity {
  id: number;
  type: 'student' | 'instructor' | 'course';
  student?: string;
  instructor?: string;
  course?: string;
  addedBy: string;
  time: string;
}

interface MenuItem {
  id:
    | 'dashboard'
    | 'students'
    | 'instructors'
    | 'courses'
    | 'quizzes'
    | 'enrollments'
    | 'grades'
    | 'payments'
    | 'profile';
  label: string;
  iconClass: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminPanelComponent implements OnInit {

  activePage: MenuItem['id'] = 'dashboard';
  sidebarOpen = true;
  adminName: string = '';

  // 🔢 إحصائيات (هنحدّث جزء منها من الAPI)
  stats: Stats = {
    students: 0,
    instructors: 0,
    courses: 0,
    activeEnrollments: 856,
    totalRevenue: 45780,
    completedQuizzes: 2341,
    averageGrade: 85.4,
    pendingPayments: 12,
  };

  // 🧊 Arrays جاية من الAPI
  students: Studentprofile[] = [];
  instructors: Instructor[] = [];
  courses: Course[] = [];
  recentActivities: RecentActivity[] = [];

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
    { id: 'dashboard', iconClass: 'bi-speedometer2', label: 'Dashboard' },
    { id: 'students', iconClass: 'bi-people', label: 'Students' },
    { id: 'instructors', iconClass: 'bi-mortarboard', label: 'Instructors' },
    { id: 'courses', iconClass: 'bi-journal-bookmark', label: 'Courses' },
    { id: 'quizzes', iconClass: 'bi-file-earmark-text', label: 'Quizzes' },
    { id: 'enrollments', iconClass: 'bi-graph-up', label: 'Enrollments' },
    { id: 'grades', iconClass: 'bi-award', label: 'Grades & Results' },
    { id: 'payments', iconClass: 'bi-cash-coin', label: 'Payments' },
    { id: 'profile', iconClass: 'bi-gear', label: 'Admin Profile' },
  ];

  // === Learning Activity Bar Chart (ng2-charts) ===
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.activityData.map((a) => a.day),
    datasets: [
      {
        data: this.activityData.map((a) => a.students),
        label: 'Students',
        backgroundColor: 'rgba(13,110,253,0.7)',
      },
      {
        data: this.activityData.map((a) => a.courses),
        label: 'Courses',
        backgroundColor: 'rgba(220,53,69,0.7)',
      },
    ],
  };

  // 🧷 Inject services
  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private courseService: CourseService,
     private studentProfileService: StudentprofileService 
  ) {}

  // ⬇️ أول ما الكومبوننت يفتح نجيب الداتا
  ngOnInit(): void {
     this.loadAdminName();
    this.loadCounts();
    this.loadTables();
  }

  // methods to load data from APIs
  private loadAdminName(): void {
 this.instructorService.getMyProfile().subscribe({
    next: (profile) => {
      // على حسب Studentprofile: firstName + lastName
      this.adminName = profile.fullName;
      // بعد ما الاسم ييجي نقدر نبني الـ activities
      this.buildRecentActivities();
    },
    error: (err) => {
      console.error('Error loading admin profile', err);
      this.adminName = 'Admin'; // fallback لو حصل error
    }
  });
}


  private loadCounts(): void {
    // إجمالي الطلاب
    this.studentService.getCount().subscribe({
      next: (res) => {
        this.stats.students = res.totalStudents;
      },
      error: (err) => console.error('Error getting students count', err),
    });

    // إجمالي الإنستراكتورز
    this.instructorService.getCount().subscribe({
      next: (res) => {
        this.stats.instructors = res.totalInstructors;
      },
      error: (err) => console.error('Error getting instructors count', err),
    });

    // إجمالي الكورسات
    this.courseService.getCount().subscribe({
      next: (res) => {
        this.stats.courses = res.totalCourses;
      },
      error: (err) => console.error('Error getting courses count', err),
    });
  }

  private loadTables(): void {
    // Students table
    this.studentService.getAll().subscribe({
      next: (res) => {
        // res = { totalStudents, data: Studentprofile[] }
        this.students = res.data;
          this.buildRecentActivities();
      },
      error: (err) => console.error('Error loading students', err),
    });

    // Instructors table
    this.instructorService.getAll().subscribe({
      next: (res) => {
        this.instructors = res;
          this.buildRecentActivities();
      },
      error: (err) => console.error('Error loading instructors', err),
    });

    // Courses table
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res;
          this.buildRecentActivities();
      },
      error: (err) => console.error('Error loading courses', err),
    });
  } 


  //new method to build recent activities

  private buildRecentActivities(): void {
     if (!this.adminName) {
    // لسه الاسم مجاش من الباك إند
    return;
  }
  const activities: RecentActivity[] = [];
  let idCounter = 1;

  // New instructor added
  if (this.instructors.length > 0) {
      const inst = this.instructors[this.instructors.length - 1];
    activities.push({
      id: idCounter++,
      type: 'instructor',
      instructor: inst.fullName,
      addedBy: this.adminName,
      time: 'Recently'
    });
  }

  // New student added
  if (this.students.length > 0) {
    const stu = this.students[this.students.length - 1];
    activities.push({
      id: idCounter++,
      type: 'student',
      student: `${stu.firstName} ${stu.lastName}`,
      addedBy: this.adminName,
      time: 'Recently'
    });
  }

  // New course added
  if (this.courses.length > 0) {
   const crs = this.courses[this.courses.length - 1];
    activities.push({
      id: idCounter++,
      type: 'course',
      course: crs.crs_Name,
      addedBy: this.adminName,
      time: 'Recently'
    });
  }

  this.recentActivities = activities;
}


  setActivePage(page: MenuItem['id']): void {
    this.activePage = page;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // CRUD handlers – تقدر تبدلهم بـ API حقيقية بعدين
  onAdd(type: string): void {
    console.log(`Add new ${type}`);
  }

  onEdit(type: string, row: any): void {
    console.log(`Edit ${type}`, row);
  }

  onDelete(type: string, row: any): void {
    console.log(`Delete ${type}`, row);
  }

  onView(type: string, row: any): void {
    console.log(`View ${type}`, row);
  }
}
