import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
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

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {
  @Input() stats: Stats = {
    students: 0,
    instructors: 0,
    courses: 0,
    activeEnrollments: 0,
    totalRevenue: 0,
    completedQuizzes: 0,
    averageGrade: 0,
    pendingPayments: 0,
  };

  @Input() activityData: Activity[] = [];
  @Input() progressData: ProgressItem[] = [];
  @Input() recentActivities: RecentActivity[] = [];

  @Input() barChartOptions!: ChartOptions<'bar'>;
  @Input() barChartData!: ChartConfiguration<'bar'>['data'];
}
