import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../shared/Skeleton/skeleton/skeleton';
import { SkeletonCardComponent } from '../../shared/Skeleton/skeleton-card/skeleton-card';
import { SkeletonListComponent } from '../../shared/Skeleton/skeleton-list/skeleton-list';
import { SkeletonTableComponent } from '../../shared/Skeleton/skeleton-table/skeleton-table';

interface Course {
    id: number;
    title: string;
    instructor: string;
    image: string;
    description: string;
}

@Component({
    selector: 'app-skeleton-demo',
    standalone: true,
    imports: [
        CommonModule,
        SkeletonComponent,
        SkeletonCardComponent,
        SkeletonListComponent,
        SkeletonTableComponent
    ],
    templateUrl: './skeleton-demo.html',
    styleUrls: ['./skeleton-demo.css']
})
export class SkeletonDemoComponent implements OnInit {
    // Loading states
    isLoadingCards = true;
    isLoadingList = true;
    isLoadingTable = true;
    isLoadingCustom = true;

    // Data
    courses: Course[] = [];
    instructors: any[] = [];
    students: any[] = [];

    ngOnInit() {
        this.loadAllData();
    }

    loadAllData() {
        // Simulate loading cards
        setTimeout(() => {
            this.courses = [
                {
                    id: 1,
                    title: 'Angular Development',
                    instructor: 'أحمد محمد',
                    image: 'https://via.placeholder.com/300x200',
                    description: 'تعلم Angular من الصفر'
                },
                {
                    id: 2,
                    title: 'TypeScript Basics',
                    instructor: 'سارة علي',
                    image: 'https://via.placeholder.com/300x200',
                    description: 'أساسيات TypeScript'
                },
                {
                    id: 3,
                    title: 'Web Design',
                    instructor: 'محمد خالد',
                    image: 'https://via.placeholder.com/300x200',
                    description: 'تصميم المواقع الحديثة'
                }
            ];
            this.isLoadingCards = false;
        }, 2000);

        // Simulate loading list
        setTimeout(() => {
            this.instructors = [
                { id: 1, name: 'أحمد محمد', specialization: 'مطور Full Stack' },
                { id: 2, name: 'سارة علي', specialization: 'مصممة UI/UX' },
                { id: 3, name: 'محمد خالد', specialization: 'مطور Frontend' }
            ];
            this.isLoadingList = false;
        }, 2500);

        // Simulate loading table
        setTimeout(() => {
            this.students = [
                { id: 1, name: 'علي أحمد', email: 'ali@example.com', department: 'CS', level: '3', grade: 'A' },
                { id: 2, name: 'فاطمة محمد', email: 'fatima@example.com', department: 'IT', level: '2', grade: 'B+' },
                { id: 3, name: 'عمر خالد', email: 'omar@example.com', department: 'CS', level: '4', grade: 'A-' }
            ];
            this.isLoadingTable = false;
        }, 3000);

        // Simulate loading custom
        setTimeout(() => {
            this.isLoadingCustom = false;
        }, 1500);
    }

    reloadCards() {
        this.isLoadingCards = true;
        this.courses = [];
        setTimeout(() => {
            this.courses = [
                {
                    id: 1,
                    title: 'Angular Development',
                    instructor: 'أحمد محمد',
                    image: 'https://via.placeholder.com/300x200',
                    description: 'تعلم Angular من الصفر'
                }
            ];
            this.isLoadingCards = false;
        }, 2000);
    }

    reloadList() {
        this.isLoadingList = true;
        this.instructors = [];
        setTimeout(() => {
            this.instructors = [
                { id: 1, name: 'أحمد محمد', specialization: 'مطور Full Stack' }
            ];
            this.isLoadingList = false;
        }, 2000);
    }

    reloadTable() {
        this.isLoadingTable = true;
        this.students = [];
        setTimeout(() => {
            this.students = [
                { id: 1, name: 'علي أحمد', email: 'ali@example.com', department: 'CS', level: '3', grade: 'A' }
            ];
            this.isLoadingTable = false;
        }, 2000);
    }
}
