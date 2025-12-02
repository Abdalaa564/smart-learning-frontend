import { Component, OnInit } from '@angular/core';
import { QuizDetailsDto } from '../../models/exam-question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../Services/quiz-service';
import { CommonModule } from '@angular/common';
import { SkeletonCardComponent } from '../../shared/Skeleton/skeleton-card/skeleton-card';

@Component({
  selector: 'app-quiz-list-component',
  imports: [CommonModule, SkeletonCardComponent],
  templateUrl: './quiz-list-component.html',
  styleUrl: './quiz-list-component.css',
})
export class QuizListComponent implements OnInit {
 quizzes: QuizDetailsDto[] = [];
  lessonId: number = 0;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lessonId = +params['lessonId'];
      if (this.lessonId) {
        this.loadQuizzes();
      }
    });
  }

  loadQuizzes(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.quizService.getQuizzesByLessonId(this.lessonId).subscribe({
      next: (data) => {
        this.quizzes = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load quizzes';
        this.loading = false;
        console.error('Error loading quizzes:', error);
      }
    });
  }

  startQuiz(quizId: number): void {
    this.router.navigate(['/quiz/take', quizId]);
  }

  viewResult(quizId: number): void {
    this.router.navigate(['/quiz/result', quizId]);
  }

  deleteQuiz(quizId: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(quizId).subscribe({
        next: () => {
          this.loadQuizzes();
        },
        error: (error) => {
          console.error('Error deleting quiz:', error);
          alert('Failed to delete quiz');
        }
      });
    }
  }
}
