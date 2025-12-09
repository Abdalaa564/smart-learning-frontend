import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from '../../models/iinstructor';
import { InstructorService } from '../../Services/instructor-srevices';
import { RatingService, InstructorRatingDto } from '../../Services/rating-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor-profile.html',
  styleUrls: ['./instructor-profile.css']
})
export class InstructorProfile implements OnInit {

  instructor!: Instructor;
  activeTab: 'about' | 'certifications' | 'courses' = 'about';

  courses = [
    { title: 'Full-Stack Web Development', level: 'Advanced', students: 320, rating: 4.8, duration: '24h content' },
    { title: 'Angular & ASP.NET Core API', level: 'Intermediate', students: 210, rating: 4.6, duration: '18h content' },
    { title: 'Intro to Programming', level: 'Beginner', students: 500, rating: 4.4, duration: '12h content' }
  ];

 hoveredRating: number = 0;
  ratingValue: number = 0;
  feedback: string = '';
  hasRated: boolean = false; // علم لمنع التقييم التاني

  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.instructorService.getById(id).subscribe({
        next: res => {
          this.instructor = res;
          this.loadRatingAndStudents(id);
          this.checkIfUserRated(id);
        },
        error: err => console.error(err)
      });
    }
  }

  setTab(tab: 'about' | 'certifications' | 'courses') {
    this.activeTab = tab;
  }

  getStarsArray(rating:number): number[] {
    return [1, 2, 3, 4, 5];
  }

  hoverRating(star: number) {
    if (!this.hasRated) this.hoveredRating = star;
  }

  setRating(star: number) {
    if (this.hasRated) return; // لو المستخدم قيم قبل كده يمنع التغيير
    this.ratingValue = star; // بس نخزن القيمة locally
  }

  submitRating() {
    if (!this.instructor || this.hasRated || this.ratingValue === 0) return;

    const dto: InstructorRatingDto = {
      instructorId: this.instructor.id,
      ratingValue: this.ratingValue,
      feedback: this.feedback
    };

    this.ratingService.addInstructorRating(dto).subscribe({
      next: () => {
        this.hasRated = true;
        this.loadRatingAndStudents(this.instructor.id!);
      },
      error: err => {
        console.error('Failed to submit rating', err);
        this.hasRated = true;
      }
    });
  }

  checkIfUserRated(instructorId: number) {
    this.ratingService.hasUserRatedInstructor(instructorId).subscribe({
      next: res => {
        this.hasRated = res.hasRated;
        if (res.hasRated) {
          this.ratingValue = res.ratingValue || 0;
          this.feedback = res.feedback || '';
          this.hoveredRating = 0;
        }
      },
      error: err => console.error(err)
    });
  }

  loadRatingAndStudents(instructorId: number) {
    this.ratingService.getInstructorAverage(instructorId).subscribe({
      next: res => {
        if (this.instructor) this.instructor.rating = res.average;
      },
      error: err => console.error(err)
    });
  }
}
