import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingDto, LessonAverageRating, CreateOrUpdateRatingDto } from '../../models/rating';
import { RatingService } from '../../Services/rating-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-component',
  imports: [CommonModule,ReactiveFormsModule],
  
  templateUrl: './rating-component.html',
  styleUrl: './rating-component.css',
})
export class RatingComponent implements OnChanges {
 @Input() lessonId!: number;

  ratings: RatingDto[] = [];
  myRating: RatingDto | null = null;
  average: LessonAverageRating | null = null;

  ratingForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  stars = [1, 2, 3, 4, 5];

  constructor(private ratingService: RatingService, private fb: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lessonId'] && this.lessonId) {
      this.loadData();
    }
  }

  private initForm(): void {
    this.ratingForm = this.fb.group({
      ratingValue: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      feedback: ['', [Validators.maxLength(1000)]],
    });
  }

  private loadData(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.loadAverage();
    this.loadLessonRatings();
    this.loadMyRating();
  }

  private loadAverage(): void {
    this.ratingService.getLessonAverage(this.lessonId).subscribe({
      next: (res) => (this.average = res),
      error: () => (this.average = { average: null, count: 0 }),
    });
  }

  private loadLessonRatings(): void {
    this.ratingService.getLessonRatings(this.lessonId).subscribe({
      next: (res) => (this.ratings = res),
      error: () => (this.ratings = []),
    });
  }

  private loadMyRating(): void {
    this.ratingService.getMyRating(this.lessonId).subscribe({
      next: (res) => {
        this.myRating = res;
        this.ratingForm.patchValue({
          ratingValue: res.ratingValue,
          feedback: res.feedback,
        });
      },
      error: () => {
        this.myRating = null;
        this.ratingForm.patchValue({
          ratingValue: 0,
          feedback: '',
        });
      },
    });
  }

  setRating(value: number): void {
    this.ratingForm.get('ratingValue')?.setValue(value);
  }

  onSubmit(): void {
    if (this.ratingForm.invalid || !this.lessonId) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const dto: CreateOrUpdateRatingDto = {
      lesson_Id: this.lessonId,
      ratingValue: this.ratingForm.value.ratingValue,
      feedback: this.ratingForm.value.feedback || '',
    };

    this.ratingService.createOrUpdateRating(dto).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'تم حفظ التقييم بنجاح ✅';
        this.myRating = res;
        this.loadAverage();
        this.loadLessonRatings();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'حدث خطأ أثناء حفظ التقييم';
        console.error(err);
      },
    });
  }

  deleteMyRating(): void {
    if (!this.lessonId) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.ratingService.deleteMyRating(this.lessonId).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'تم حذف تقييمك ✅';
        this.myRating = null;
        this.ratingForm.reset({ ratingValue: 0, feedback: '' });
        this.loadAverage();
        this.loadLessonRatings();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'حدث خطأ أثناء حذف التقييم';
        console.error(err);
      },
    });
  }
}
