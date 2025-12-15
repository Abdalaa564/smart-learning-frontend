import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizResultDto } from '../../models/exam-question';
import { QuizService } from '../../Services/quiz-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-result-component',
  imports: [CommonModule],
  templateUrl: './quiz-result-component.html',
  styleUrl: './quiz-result-component.css',
})
export class QuizResultComponent implements OnInit  {
result: QuizResultDto | null = null;
aiReport: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const quizId = +this.route.snapshot.params['quizId'];
    this.loadResult(quizId);
  }

  loadResult(quizId: number): void {
    this.loading = true;
    
    this.quizService.getQuizResult(quizId).subscribe({
      next: (data) => {
        this.result = data;
         this.aiReport = data.aiReport || 'No AI report available';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load quiz result';
        this.loading = false;
        console.error('Error loading result:', error);
      }
    });
  }

  get resultClass(): string {
    if (!this.result) return '';
    
    if (this.result.percentage >= 90) return 'success';
    if (this.result.percentage >= 70) return 'info';
    if (this.result.percentage >= 50) return 'warning';
    return 'danger';
  }

  get resultMessage(): string {
    if (!this.result) return '';
    
    if (this.result.percentage >= 90) return 'Excellent! Outstanding performance!';
    if (this.result.percentage >= 70) return 'Good job! Well done!';
    if (this.result.percentage >= 50) return 'You passed! Keep practicing!';
    return 'You need more practice. Don\'t give up!';
  }

  goBack(): void {
    this.router.navigate(['/lesson/1/quizzes']);
  }

  get formattedReport(): string {
  if (!this.aiReport) return '';

  return this.aiReport
    // Divider
    .replace(/^\s*---\s*$/gm, '\n──────────────────────────\n')

    // Head title
    .replace(/^\*\*(Exam Performance Report)\*\*/m, '📊 $1')

    // Section titles
    .replace(/^\*\*(.+?)\*\*$/gm, '\n$1\n')

    // Remove markdown ** but keep text
    .replace(/\*\*(.*?)\*\*/g, '$1');
}

}
