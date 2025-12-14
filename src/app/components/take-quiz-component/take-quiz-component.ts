import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { StartQuizDto, QuestionDto, SubmitAnswerDto } from '../../models/exam-question';
import { QuizService } from '../../Services/quiz-service';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/snackbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-quiz-component',
  imports: [CommonModule,MatSnackBarModule],
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
  isTimeUp: boolean = false; // 👈 فلاغ انتهاء الوقت

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: Snackbar
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

      if (error.status === 400 && error.error?.message?.includes("already taken")) {

  //alert('You have already taken this quiz. Redirecting to results.');
  this.snackBar.open('You have already taken this quiz. Redirecting to results.', 'info');

  this.router.navigate(['/quiz/result', quizId]);
} 

      this.loading = false;
    }
  });
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timeRemaining--;

      if (this.timeRemaining <= 0 && !this.isTimeUp) {
        this.isTimeUp = true;
        this.timeRemaining = 0;
        this.submitQuiz(true); // 👈 autoSubmit = true (من غير confirm)
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
    if (this.isTimeUp || this.submitting) return; // 👈 ممنوع بعد انتهاء الوقت أو أثناء الإرسال

    if (this.currentQuestion) {
      this.selectedAnswers.set(this.currentQuestion.question_Id, choiceId);
    }
  }

  isAnswerSelected(choiceId: number): boolean {
    if (!this.currentQuestion) return false;
    return this.selectedAnswers.get(this.currentQuestion.question_Id) === choiceId;
  }

  nextQuestion(): void {
    if (this.isTimeUp) return; // 👈 ممنوع التنقل بعد انتهاء الوقت

    if (this.quiz && this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.isTimeUp) return;

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    if (this.isTimeUp) return;

    this.currentQuestionIndex = index;
  }

  isQuestionAnswered(index: number): boolean {
    const question = this.quiz?.questions[index];
    return question ? this.selectedAnswers.has(question.question_Id) : false;
  }

  // autoSubmit = true لما الوقت يخلص – false لما الطالب يضغط زرار بنفسه
  submitQuiz(autoSubmit: boolean = false): void {
    if (this.submitting) return; // لو أصلاً بيبعت، ما تبعتش تاني

    if (!autoSubmit) {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }

      if (!confirm('Are you sure you want to submit the quiz?')) {
        // لو رجع cancel نرجع نشغّل التايمر لو فيه وقت
        if (this.timeRemaining > 0 && !this.isTimeUp) {
          this.startTimer();
        }
        return;
      }
    } else {
      // لو أوتو من التايمر – وقف التايمر
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    }

    this.submitting = true;

    if (!this.quiz) {
      this.submitting = false;
      return;
    }

    // جهّز كل الإجابات
    const answers: SubmitAnswerDto[] = [];
    this.selectedAnswers.forEach((choiceId, questionId) => {
      answers.push({
        quiz_Id: this.quiz!.quiz_Id,
        question_Id: questionId,
        choice_Id: choiceId
      });
    });

    // لو مفيش ولا إجابة، برضه نروح للنتيجة (هتكون صفر)
    if (answers.length === 0) {
      this.router.navigate(['/quiz/result', this.quiz.quiz_Id]);
      return;
    }

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
