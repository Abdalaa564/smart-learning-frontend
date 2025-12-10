// admin-panel.models.ts
import { ChartConfiguration, ChartOptions } from 'chart.js';

export interface Stats {
  students: number;
  instructors: number;
  courses: number;
  activeEnrollments: number;
  totalRevenue: number;
  completedQuizzes: number;
  averageGrade: number;
  pendingPayments: number;
}

export interface Activity {
  day: string;
  students: number;
  courses: number;
}

export interface ProgressItem {
  name: string;
  value: number;
  colorClass: string;
}

export interface RecentActivity {
  id: number;
  type: 'student' | 'instructor' | 'course';
  student?: string;
  instructor?: string;
  course?: string;
  addedBy: string;
  time: string;
}

export interface MenuItem {
  id:
    | 'dashboard'
    | 'students'
    | 'instructors'
    | 'courses'
    | 'quizzes'
    | 'enrollments'
    | 'grades'
    | 'payments'
    | 'instructorRequests'
    | 'admins'
    | 'profile';
  label: string;
  iconClass: string;
}

// قيم ابتدائية جاهزة تستعملها في الكومبوننت
export const DEFAULT_STATS: Stats = {
  students: 0,
  instructors: 0,
  courses: 0,
  activeEnrollments: 0,
  totalRevenue: 45780,
  completedQuizzes: 2341,
  averageGrade: 85.4,
  pendingPayments: 12,
};

export const DEFAULT_ACTIVITY_DATA: Activity[] = [
  { day: 'Mon', students: 45, courses: 12 },
  { day: 'Tue', students: 52, courses: 15 },
  { day: 'Wed', students: 48, courses: 18 },
  { day: 'Thu', students: 61, courses: 20 },
  { day: 'Fri', students: 55, courses: 16 },
  { day: 'Sat', students: 38, courses: 10 },
  { day: 'Sun', students: 42, courses: 14 },
];

export const DEFAULT_PROGRESS_DATA: ProgressItem[] = [
  { name: 'Completed', value: 43, colorClass: 'bg-primary' },
  { name: 'In Progress', value: 32, colorClass: 'bg-danger' },
  { name: 'Not Started', value: 25, colorClass: 'bg-warning' },
];

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', iconClass: 'bi-speedometer2', label: 'Dashboard' },
  { id: 'students', iconClass: 'bi-people', label: 'Students' },
  { id: 'instructors', iconClass: 'bi-mortarboard', label: 'Instructors' },
  { id: 'courses', iconClass: 'bi-journal-bookmark', label: 'Courses' },
  { id: 'quizzes', iconClass: 'bi-file-earmark-text', label: 'Quizzes' },
  { id: 'enrollments', iconClass: 'bi-graph-up', label: 'Enrollments' },
  { id: 'grades', iconClass: 'bi-award', label: 'Grades & Results' },
  { id: 'payments', iconClass: 'bi-cash-coin', label: 'Payments' },
  {
    id: 'instructorRequests',
    iconClass: 'bi-person-check',
    label: 'Instructor Requests',
  },
  { id: 'profile', iconClass: 'bi-gear', label: 'Admin Profile' },
];


// Admin abdalaa
export interface AdminUser {
  id: string;
  userName: string;
  email: string;
}

export interface CreateAdminDto {
  userName: string;
  email: string;
  password?: string;
}

export interface UpdateAdminDto {
  userName?: string;
  email?: string;
}