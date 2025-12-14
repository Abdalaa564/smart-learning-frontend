import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta-section',
  imports: [],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.css',
})
export class CtaSection {
constructor(private router: Router) {}
goToRegister() {
    this.router.navigate(['/register']);
  }

  goToInstructor() {
    this.router.navigate(['/register-instructor']);
  }
}
