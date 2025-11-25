import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Add token to headers if it exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`[INTERCEPTOR] Adding Bearer Token to request for: ${req.url}`);
  } else {
    console.log(`[INTERCEPTOR] No token found for request to: ${req.url}`);
  }

  // Handle the request and catch potential 401 errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // --- Error Handling Logic ---
      if (error.status === 401) {
        console.error('[INTERCEPTOR] 401 Unauthorized detected. Redirecting to login.');
        // 1. Clear session
       // authService.logout(); 
        // 2. Redirect
        router.navigate(['/login']);
      }
      // Re-throw the error so component can also handle it
      return throwError(() => error);
    })
  );
};
