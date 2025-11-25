import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { StartQuizDto, QuestionDto, SubmitAnswerDto } from '../../models/exam-question';
import { QuizService } from '../../Services/quiz-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-quiz-component',
  imports: [CommonModule],
  templateUrl: './take-quiz-component.html',
  styleUrl: './take-quiz-component.css',
})
export class TakeQuizComponent implements OnInit, OnDestroy {
 quiz: StartQuizDto | null = null;
  currentQuestionIndex: number = 0;
  selectedAnswers: Map<number, number> = new Map();
  timeRemaining: number = 0;
  timerSubscription?: Subscription;
  loading: boolean = false;
  submitting: boolean = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const quizId = +this.route.snapshot.params['quizId'];
    this.loadQuiz(quizId);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadQuiz(quizId: number): void {
    this.loading = true;
    
    this.quizService.startQuiz(quizId).subscribe({
      next: (data) => {
        this.quiz = data;
        this.timeRemaining = data.duration * 60; // Convert minutes to seconds
        this.startTimer();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading quiz:', error);
        alert('Failed to load quiz');
        this.loading = false;
        this.router.navigate(['/quizzes']);
      }
    });
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timeRemaining--;
      
      if (this.timeRemaining <= 0) {
        this.submitQuiz();
      }
    });
  }

  get currentQuestion(): QuestionDto | undefined {
    return this.quiz?.questions[this.currentQuestionIndex];
  }

  get progressPercentage(): number {
    if (!this.quiz) return 0;
    return ((this.currentQuestionIndex + 1) / this.quiz.questions.length) * 100;
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  selectAnswer(choiceId: number): void {
    if (this.currentQuestion) {
      this.selectedAnswers.set(this.currentQuestion.question_Id, choiceId);
    }
  }

  isAnswerSelected(choiceId: number): boolean {
    if (!this.currentQuestion) return false;
    return this.selectedAnswers.get(this.currentQuestion.question_Id) === choiceId;
  }

  nextQuestion(): void {
    if (this.quiz && this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  isQuestionAnswered(index: number): boolean {
    const question = this.quiz?.questions[index];
    return question ? this.selectedAnswers.has(question.question_Id) : false;
  }

  submitQuiz(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (!confirm('Are you sure you want to submit the quiz?')) {
      return;
    }

    this.submitting = true;

    // Submit all answers
    const answers: SubmitAnswerDto[] = [];
    this.selectedAnswers.forEach((choiceId, questionId) => {
      answers.push({
        quiz_Id: this.quiz!.quiz_Id,
        question_Id: questionId,
        choice_Id: choiceId
      });
    });

    // Submit answers one by one
    let submittedCount = 0;
    answers.forEach(answer => {
      this.quizService.submitAnswer(answer).subscribe({
        next: () => {
          submittedCount++;
          if (submittedCount === answers.length) {
            this.router.navigate(['/quiz/result', this.quiz!.quiz_Id]);
          }
        },
        error: (error) => {
          console.error('Error submitting answer:', error);
          submittedCount++;
          if (submittedCount === answers.length) {
            this.router.navigate(['/quiz/result', this.quiz!.quiz_Id]);
          }
        }
      });
    });
  }
}
