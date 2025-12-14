import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType, CreateQuizDto, CreateQuestionDto } from '../../models/exam-question';
import { QuizService } from '../../Services/quiz-service';
import { CommonModule } from '@angular/common';
import { Snackbar } from '../../shared/snackbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-quiz-component',
  imports: [CommonModule , ReactiveFormsModule,MatSnackBarModule],
  // standalone: true,
  templateUrl: './create-quiz-component.html',
  styleUrl: './create-quiz-component.css',
})
export class CreateQuizComponent implements OnInit {
  quizForm!: FormGroup;
  lessonId: number = 0;
  submitting: boolean = false;
  currentStep: number = 1;
  createdQuizId: number = 0;
  QuestionType = QuestionType;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: Snackbar

  ) {}

  ngOnInit(): void {
    this.lessonId = +this.route.snapshot.params['lessonId'];
    this.initForm();
  }

  initForm(): void {
    this.quizForm = this.fb.group({
      quiz_Name: ['', [Validators.required, Validators.maxLength(100)]],
      duration: [30, [Validators.required, Validators.min(1)]],
      totalMarks: [100, [Validators.required, Validators.min(1)]],
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  createQuestionGroup(): FormGroup {
    return this.fb.group({
      question_Text: ['', [Validators.required, Validators.maxLength(500)]],
      question_Type: [QuestionType.MultipleChoice, Validators.required],
      grade_Point: [10, [Validators.required, Validators.min(1)]],
      correctAnswer: ['', Validators.required],
      choices: this.fb.array([
        this.createChoiceGroup(),
        this.createChoiceGroup()
      ])
    });
  }

  createChoiceGroup(): FormGroup {
    return this.fb.group({
      choiceText: ['', [Validators.required, Validators.maxLength(500)]],
      isCorrect: [false]
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getChoices(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('choices') as FormArray;
  }

  addChoice(questionIndex: number): void {
    this.getChoices(questionIndex).push(this.createChoiceGroup());
  }

  removeChoice(questionIndex: number, choiceIndex: number): void {
    this.getChoices(questionIndex).removeAt(choiceIndex);
  }

  setCorrectChoice(questionIndex: number, choiceIndex: number): void {
    const choices = this.getChoices(questionIndex);
    
    // Uncheck all choices
    for (let i = 0; i < choices.length; i++) {
      choices.at(i).get('isCorrect')?.setValue(false);
    }
    
    // Check selected choice
    choices.at(choiceIndex).get('isCorrect')?.setValue(true);
    
    // Update correctAnswer
    const choiceText = choices.at(choiceIndex).get('choiceText')?.value;
    this.questions.at(questionIndex).get('correctAnswer')?.setValue(choiceText);
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      // Create Quiz
      if (this.quizForm.get('quiz_Name')?.invalid || 
          this.quizForm.get('duration')?.invalid || 
          this.quizForm.get('totalMarks')?.invalid) {
      this.snackBar.open('Please fill in all quiz details', 'error'); 
             return;
      }

      this.submitting = true;
      const quizData: CreateQuizDto = {
        quiz_Name: this.quizForm.get('quiz_Name')?.value,
        lesson_Id: this.lessonId,
        totalMarks: this.quizForm.get('totalMarks')?.value,
        duration: this.quizForm.get('duration')?.value
      };

      this.quizService.createQuiz(quizData).subscribe({
        next: (response) => {
          this.createdQuizId = response.quiz_Id;
          this.currentStep = 2;
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error creating quiz:', error);
          this.snackBar.open('Failed to create quiz', 'error');
          this.submitting = false;
        }
      });
    }
  }

  submitQuestions(): void {
    if (this.questions.length === 0) {
      this.snackBar.open('Please add at least one question', 'error');
      return;
    }

    if (this.quizForm.get('questions')?.invalid) {
        this.snackBar.open('Please fill in all question details', 'error');
      return;
    }

    this.submitting = true;
    let completedRequests = 0;
    const totalQuestions = this.questions.length;

    this.questions.controls.forEach((questionControl) => {
      const questionData: CreateQuestionDto = {
        quiz_Id: this.createdQuizId,
        question_Text: questionControl.get('question_Text')?.value,
        question_Type: questionControl.get('question_Type')?.value,
        grade_Point: questionControl.get('grade_Point')?.value,
        correctAnswer: questionControl.get('correctAnswer')?.value,
        choices: questionControl.get('choices')?.value
      };

      this.quizService.addQuestion(questionData).subscribe({
        next: () => {
          completedRequests++;
          if (completedRequests === totalQuestions) {
            this.submitting = false;
          this.snackBar.open('Quiz created successfully!', 'success');
            this.router.navigate(['/lesson', this.lessonId, 'quizzes']);
          }
        },
        error: (error) => {
          console.error('Error adding question:', error);
          completedRequests++;
          if (completedRequests === totalQuestions) {
            this.submitting = false;
            this.snackBar.open('Some questions failed to save', 'error');
          }
        }
      });
    });
  }

  cancel(): void {
    if (confirm('Are you sure you want to cancel? All progress will be lost.')) {
      this.router.navigate(['/lesson', this.lessonId, 'quizzes']);
    }
  }
}
