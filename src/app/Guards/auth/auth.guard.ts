import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const routerService = inject(Router);
  if (localStorage.getItem('user') !== null) {
    return true;
  } else {
    routerService.navigate(['/login']);
    return false;
  }
};
