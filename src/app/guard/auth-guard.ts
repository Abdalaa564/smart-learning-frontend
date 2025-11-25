import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.hasToken()) {
      return true;
    }

    router.navigate(['/login']);
    return false;
  
};
