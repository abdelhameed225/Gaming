import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const routerService = inject(Router);
  const userString = localStorage.getItem('user');
  console.log('userString', userString);
  if (userString !== null) {
    const userJson = JSON.parse(userString);
    console.log('isadmin', userJson);
    const isAdmin = userJson.roles.includes('Admin');
    console.log('isadmin', isAdmin);
    if (isAdmin) {
      return true;
    } else {
      // TODO: navigate to page you must be an admin
      routerService.navigate(['/login']);

      return false;
    }
  } else {
    routerService.navigate(['/login']);
    return false;
  }
};
