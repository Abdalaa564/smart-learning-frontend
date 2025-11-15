import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExamQuestion } from '../models/exam-question';

@Injectable({
  providedIn: 'root',
})
export class ExamSevice {
  getQuestions(): Observable<ExamQuestion[]> {
    return of([
      {
        id: 1,
        text: "What does HTML stand for?",
        choices: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hot Mail"
        ],
        correctIndex: 0
      },
      {
        id: 2,
        text: 'Which tag is used to run JavaScript?',
        choices: ['<js>', '<script>', '<javascript>'],
        correctIndex: 1
      }
    ]);
  }
}
