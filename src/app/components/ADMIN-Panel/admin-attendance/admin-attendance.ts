import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../Services/course.service';
import { LessonService } from '../../../Services/lesson.service';
import { UnitService } from '../../../Services/unit.service';
import { AttendanceService, StudentAttendance } from '../../../Services/attendance.service';
import { AuthService } from '../../../Services/auth-service';
import { Course } from '../../../models/Course';
import { Lesson } from '../../../models/LessonResource ';
import { Unit } from '../../../models/Unit ';

@Component({
    selector: 'app-admin-attendance',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-attendance.html',
    styleUrls: ['./admin-attendance.css']
})
export class AdminAttendanceComponent implements OnInit {
    courses: Course[] = [];
    units: Unit[] = [];
    lessons: Lesson[] = [];
    attendanceList: StudentAttendance[] = [];

    selectedCourseId: number | null = null;
    selectedUnitId: number | null = null;
    selectedLessonId: number | null = null;

    isLoadingCourses = false;
    isLoadingUnits = false;
    isLoadingLessons = false;
    isLoadingAttendance = false;

    constructor(
        private courseService: CourseService,
        private unitService: UnitService,
        private lessonService: LessonService,
        private attendanceService: AttendanceService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadCourses();
    }

    loadCourses(): void {
        this.isLoadingCourses = true;
        this.courseService.getAllCourses().subscribe({
            next: (data) => {
                console.log('All Courses:', data);
                console.log('Is Instructor:', this.authService.isInstructor());
                console.log('My ID:', this.authService.UserId);

                if (this.authService.isInstructor()) {
                    // Filter courses where the instructor is the current user
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
                        // Fallback if ID is missing
                        this.courses = [];
                        console.warn('Instructor ID missing, showing no courses.');
                    }
                } else {
                    // Admin sees all courses
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

    onCourseChange(): void {
        this.units = [];
        this.lessons = [];
        this.attendanceList = [];
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

    onUnitChange(): void {
        this.lessons = [];
        this.attendanceList = [];
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

    onLessonChange(): void {
        this.attendanceList = [];

        if (!this.selectedLessonId) return;

        this.isLoadingAttendance = true;
        this.attendanceService.getAttendanceByLesson(Number(this.selectedLessonId)).subscribe({
            next: (data) => {
                this.attendanceList = data;
                this.isLoadingAttendance = false;
            },
            error: (err) => {
                console.error('Error loading attendance', err);
                this.isLoadingAttendance = false;
            }
        });
    }
}
