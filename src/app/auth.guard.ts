import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Use inject to get the Router instance
  const token = localStorage.getItem('authToken');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect to the login page if token is missing
    return false;
  }
};
