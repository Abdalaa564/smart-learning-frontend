import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CourseRatingDto {
  courseId: number;
  userId?: string;
  ratingValue: number;
  feedback: string;
}

export interface InstructorRatingDto {
  instructorId?: number;
  userId?: string;
  ratingValue: number;
  feedback: string;
}
interface HasRatedResponse {
  hasRated: boolean;
  ratingValue?: number;
  feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiUrl = 'https://elearningg.runasp.net/api'; // عدّل حسب API

  constructor(private http: HttpClient) { }

  addCourseRating(dto: CourseRatingDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/CourseRating`, dto);
  }

  addInstructorRating(dto: InstructorRatingDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/InstructorRating`, dto);
  }

  getCourseAverage(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/CourseRating/average/${courseId}`);
  }

  getInstructorAverage(instructorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/InstructorRating/average/${instructorId}`);
  }

  getCourseRatings(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/CourseRating/course/${courseId}`);
  }

  getInstructorRatings(instructorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/InstructorRating/instructor/${instructorId}`);
  }
  hasUserRatedInstructor(instructorId: number): Observable<HasRatedResponse> {
  return this.http.get<HasRatedResponse>(`${this.apiUrl}/InstructorRating/hasRated/${instructorId}`);
}
  hasUserRatedCourse(courseId: number): Observable<HasRatedResponse> {
  return this.http.get<HasRatedResponse>(`${this.apiUrl}/CourseRating/hasRated/${courseId}`);
}
}
