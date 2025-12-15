import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
   constructor(private snackBar: MatSnackBar) {}

  open(message: string, type: 'success' | 'error'| 'info') {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success'
        ? 'snackbar-success'
        : 'snackbar-error'
    });
  }
}
