import { Component, OnInit } from '@angular/core';
import { ExamQuestion } from '../../models/exam-question';
import { ExamSevice } from '../../Services/exam-sevice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam',
  imports: [CommonModule,FormsModule],
  templateUrl: './exam.html',
  styleUrl: './exam.css',
})
export class Exam implements OnInit {
questions: ExamQuestion[] = [];
  currentIndex = 0;
  minutes = 10;
  seconds = 0;
  timer: any;
  isSubmitted = false;
  score = 0;

  constructor(private examService: ExamSevice) {}

  ngOnInit(): void {
    this.examService.getQuestions().subscribe(q => {
      this.questions = q;
      this.startTimer();
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.submitExam();
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  selectChoice(choiceIndex: number) {
    this.questions[this.currentIndex].selectedIndex = choiceIndex;
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  submitExam() {
    clearInterval(this.timer);
    this.isSubmitted = true;

    this.score = this.questions.filter(q => q.selectedIndex === q.correctIndex).length;
  }
}
