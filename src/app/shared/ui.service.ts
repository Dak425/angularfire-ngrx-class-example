import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action, duration: number) {
    this.snackBar.open(message, action, { duration });
  }
}
