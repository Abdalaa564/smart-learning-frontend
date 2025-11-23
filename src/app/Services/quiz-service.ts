import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizDetailsDto, StartQuizDto, CreateQuizDto, UpdateQuizDto, CreateQuestionDto, SubmitAnswerDto, QuizResultDto } from '../models/exam-question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:5163/api/Quiz'; // غير الـ URL حسب الـ API الخاص بك

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Get Quiz by ID
  getQuizById(id: number): Observable<QuizDetailsDto> {
    return this.http.get<QuizDetailsDto>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Get Quizzes by Lesson ID
  getQuizzesByLessonId(lessonId: number): Observable<QuizDetailsDto[]> {
    return this.http.get<QuizDetailsDto[]>(`${this.apiUrl}/lesson/${lessonId}`, {
      headers: this.getHeaders()
    });
  }

  // Start Quiz
  startQuiz(quizId: number): Observable<StartQuizDto> {
    return this.http.post<StartQuizDto>(`${this.apiUrl}/start/${quizId}`, {}, {
      headers: this.getHeaders()
    });
  }

  // Create Quiz (Instructor only)
  createQuiz(quiz: CreateQuizDto): Observable<QuizDetailsDto> {
    return this.http.post<QuizDetailsDto>(this.apiUrl, quiz, {
      headers: this.getHeaders()
    });
  }

  // Update Quiz (Instructor only)
  updateQuiz(quiz: UpdateQuizDto): Observable<any> {
    return this.http.put(this.apiUrl, quiz, {
      headers: this.getHeaders()
    });
  }

  // Delete Quiz (Instructor only)
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Add Question (Instructor only)
  addQuestion(question: CreateQuestionDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/question`, question, {
      headers: this.getHeaders()
    });
  }

  // Delete Question (Instructor only)
  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/question/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Submit Answer (Student only)
  submitAnswer(answer: SubmitAnswerDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-answer`, answer, {
      headers: this.getHeaders()
    });
  }

  // Get Quiz Result (Student only)
  getQuizResult(quizId: number): Observable<QuizResultDto> {
    return this.http.get<QuizResultDto>(`${this.apiUrl}/result/${quizId}`, {
      headers: this.getHeaders()
    });
  }
}
