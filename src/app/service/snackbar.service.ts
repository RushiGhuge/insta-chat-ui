import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    action: string = 'Close',
    duration: number = 3000,
    customClass: string = ''
  ): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'left', // You can customize the position
      verticalPosition: 'bottom', // You can customize the position
      panelClass: ['custom-snackbar'],
    });
  }
}
