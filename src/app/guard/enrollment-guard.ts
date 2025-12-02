import { CanActivateFn, Router } from '@angular/router';
import { EnrollmentService } from '../Services/enrollment-service';
import { AuthService } from '../Services/auth-service';
import { inject } from '@angular/core';
import { catchError, map, of, take } from 'rxjs';

export const enrollmentGuard: CanActivateFn = (route, state) => {
  //   const enrollmentService = inject(EnrollmentService);
  //   const authService = inject(AuthService);
  //   const router = inject(Router);

  //   // Get course ID from route parameters
  //    const courseId =
  //     Number(route.paramMap.get('courseId')) ||
  //     Number(route.paramMap.get('id'));
  //   const studentId = authService.UserId;
  //   const unitId = Number(route.paramMap.get('unitId'));
  //   const lessonId = Number(route.paramMap.get('lessonId'));
  //   // Check if user is logged in
  //   if (!studentId) {
  //     alert('⚠️ Please login to access course content.');
  //     router.navigate(['/login']);
  //     return false;
  //   }

  //   const freeUnitId = 1;
  //   const freeLessons = [1, 2, 3];
  //  if (unitId === freeUnitId && isNaN(lessonId)) {
  //     return true;
  //   }

  //   // ❗ allow first 3 lessons in unit 1 for free
  //   if (unitId === freeUnitId && freeLessons.includes(lessonId)) {
  //     return true;
  //   }
  // console.log("DEBUG → courseId:", courseId, "unitId:", unitId, "lessonId:", lessonId);

  //   return enrollmentService.isStudentEnrolled(studentId, courseId).pipe(
  //     take(1),
  //     map(isEnrolled => {
  //       if (isEnrolled) return true;

  //     alert('⚠️ You must enroll in this course to access its content.');
  //     router.navigate(['/Courses']);
  //     return false;
  //   }),
  //   catchError(err => {
  //     console.error(err);
  //     alert('❌ Error checking enrollment status.');
  //     router.navigate(['/Courses']);
  //     return of(false);
  //   })
  // );
  return true;
};
