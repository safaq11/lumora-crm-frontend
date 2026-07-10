import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const adminGuard: CanActivateFn = () => {

  console.log('Admin Guard Running...');

  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  const role =localStorage.getItem('role')?.toUpperCase();

  console.log('Role = ', role);

  if(role === 'ADMIN'){
    return true;
  }

  snackBar.open(
    'Only administrators have permission.',
    'Close',
    { duration: 3000 }
  );

  router.navigate(['/dashboard']);

  return false;
};