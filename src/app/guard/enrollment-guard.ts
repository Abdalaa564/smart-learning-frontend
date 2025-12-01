import { CanActivateFn, Router } from '@angular/router';
import { EnrollmentService } from '../Services/enrollment-service';
import { AuthService } from '../Services/auth-service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const enrollmentGuard: CanActivateFn = (route, state) => {
  const enrollmentService = inject(EnrollmentService);
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get course ID from route parameters
const courseId = Number(route.paramMap.get('id'));
  const studentId = authService.currentUserId;

  // Check if user is logged in
  if (!studentId) {
    alert('⚠️ Please login to access course content.');
    router.navigate(['/login']);
    return false;
  }

  // Check if courseId exists
  if (!courseId) {
    router.navigate(['/Courses']);
    return false;
  }

  // Check enrollment status via API
 return enrollmentService.isStudentEnrolled(studentId, Number(courseId)).pipe(
  map(isEnrolled => {
    if (isEnrolled) return true;

    alert('⚠️ You must enroll in this course to access its content.');
    router.navigate(['/Courses']);
    return false;
  }),
  catchError(err => {
    console.error(err);
    alert('❌ Error checking enrollment status.');
    router.navigate(['/Courses']);
    return of(false);
  })
);

};