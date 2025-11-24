import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  @Input() title!: string;
  @Input() iconUrl?: string;

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
