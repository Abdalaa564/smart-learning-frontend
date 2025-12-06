import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { StudentService } from './student';
import { InstructorService } from './instructor-srevices';
import { CourseService } from './course.service';
import { EnrollmentService } from './enrollment-service';
import { AdminService } from './admin';
import { Studentprofile } from '../models/studentprofile';
import { Instructor } from '../models/iinstructor';
import { Course } from '../models/Course';



@Injectable({
  providedIn: 'root',
})
export class AdminPanelFacade {
  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private adminService: AdminService
  ) {}

  getAdminName(): Observable<string> {
    return this.instructorService.getMyProfile().pipe(
      map((profile) => profile.fullName || 'Admin')
    );
  }

  loadCounts(): Observable<{
    totalStudents: number;
    totalInstructors: number;
    totalCourses: number;
  }> {
    return forkJoin({
      students: this.studentService.getCount(),
      instructors: this.instructorService.getCount(),
      courses: this.courseService.getCount(),
    }).pipe(
      map(({ students, instructors, courses }) => ({
        totalStudents: students.totalStudents,
        totalInstructors: instructors.totalInstructors,
        totalCourses: courses.totalCourses,
      }))
    );
  }

  loadTables(): Observable<{
    students: Studentprofile[];
    instructors: Instructor[];
    courses: Course[];
  }> {
    return forkJoin({
      studentsRes: this.studentService.getAll(),
      instructors: this.instructorService.getAll(),
      courses: this.courseService.getAllCourses(),
    }).pipe(
      map(({ studentsRes, instructors, courses }) => ({
        students: studentsRes.data,
        instructors,
        courses,
      }))
    );
  }

  getStudentEnrollmentCounts(
    students: Studentprofile[]
  ): Observable<{ [id: number]: number }> {
    if (!students || students.length === 0) {
      return new Observable((obs) => {
        obs.next({});
        obs.complete();
      });
    }

    const requests = students.map((stu) =>
      this.enrollmentService.getStudentCourses(stu.id).pipe(
        map((courses) => ({
          studentId: stu.id,
          count: courses.length,
        }))
      )
    );

    return forkJoin(requests).pipe(
      map((results) => {
        const dict: { [id: number]: number } = {};
        results.forEach((r) => (dict[r.studentId] = r.count));
        return dict;
      })
    );
  }

  getCourseEnrollmentCounts(
    courses: Course[]
  ): Observable<{ courseCounts: { [id: number]: number }; total: number }> {
    if (!courses || courses.length === 0) {
      return new Observable((obs) => {
        obs.next({ courseCounts: {}, total: 0 });
        obs.complete();
      });
    }

    const requests = courses.map((course) =>
      this.enrollmentService
        .getCourseEnrollmentCount(course.crs_Id)
        .pipe(map((count) => ({ courseId: course.crs_Id, count })))
    );

    return forkJoin(requests).pipe(
      map((results) => {
        const dict: { [id: number]: number } = {};
        let total = 0;
        results.forEach((r) => {
          dict[r.courseId] = r.count;
          total += r.count;
        });
        return { courseCounts: dict, total };
      })
    );
  }

  getPendingInstructors(): Observable<Instructor[]> {
    return this.adminService.getPendingInstructors();
  }

  approveInstructor(id: number): Observable<void> {
    return this.adminService.approveInstructor(id).pipe(map(() => void 0));
  }

  rejectInstructor(id: number): Observable<void> {
    return this.adminService.rejectInstructor(id).pipe(map(() => void 0));
  }
}
