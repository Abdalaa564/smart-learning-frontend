import { Component } from '@angular/core';
import { Card } from "../../../shared/card/card";
import { Button } from "../../../shared/button/button";
import { CommonModule } from '@angular/common';
import { Instructor } from '../../../models/iinstructor';
import { InstructorService } from '../../../Services/instructor-srevices';
import { Router, RouterLink } from '@angular/router';
import { RatingService } from '../../../Services/rating-service';
import { forkJoin } from 'rxjs';

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
    private ratingService: RatingService, 
    private router: Router
    
  ) {}
 ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.instructorService.getAll().subscribe({
      next: (data) => {
        this.instructors = data;

        // 🔥 بعد ما نجيب المدرسين، نجيب التقييمات
        this.loadInstructorRatings();
      },
      error: (err) => {
        console.error(err);
        this.loadingInstructors = false;
      }
    });
  }

  loadInstructorRatings() {
    const ratingRequests = this.instructors.map(ins =>
      this.ratingService.getInstructorAverage(ins.id!)
    );

    forkJoin(ratingRequests).subscribe({
      next: (ratings) => {
        ratings.forEach((res, index) => {
          this.instructors[index].rating = res.average || 0;
        });

        this.loadingInstructors = false;
      },
      error: () => {
        this.loadingInstructors = false;
      }
    });
  }

  goToProfile(id?: number) {
    if (!id) return;
    this.router.navigate(['/instructor', id]);
  }

}
