import { Component } from '@angular/core';
import { Card } from "../../../shared/card/card";
import { Button } from "../../../shared/button/button";
import { CommonModule } from '@angular/common';
import { Instructor } from '../../../models/iinstructor';
import { InstructorService } from '../../../Services/instructor-srevices';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructors-section',
  imports: [CommonModule, Card, Button,RouterLink],
  templateUrl: './instructors-section.html',
  styleUrl: './instructors-section.css',
})
export class InstructorsSection {
 instructors: Instructor[] = [];
 loadingInstructors: boolean = true;
  constructor(
    private instructorService: InstructorService, 
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadInstructors();
  }
  loadInstructors(): void {
  this.instructorService.getAll().subscribe({
    next: (data) => {
      this.instructors = data;
      this.loadingInstructors = false;
    },
    error: (err) => {
      console.error('Error loading instructors:', err);
      this.loadingInstructors = false;
    }
  });
}

  goToProfile(id?: number) {
    if (!id) return;
    this.router.navigate(['/instructor', id]); // لو عامل صفحة بروفايل
  }

}
