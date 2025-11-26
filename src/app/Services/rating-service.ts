import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingDto, LessonAverageRating, CreateOrUpdateRatingDto } from '../models/rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
   private baseUrl = 'http://localhost:5163/api/ratings'; // عدّلها حسب الـ API عندك

  constructor(private http: HttpClient) {}

  getLessonRatings(lessonId: number): Observable<RatingDto[]> {
    return this.http.get<RatingDto[]>(`${this.baseUrl}/lesson/${lessonId}`);
  }

  getLessonAverage(lessonId: number): Observable<LessonAverageRating> {
    return this.http.get<LessonAverageRating>(
      `${this.baseUrl}/lesson/${lessonId}/average`
    );
  }

  getMyRating(lessonId: number): Observable<RatingDto> {
    return this.http.get<RatingDto>(`${this.baseUrl}/lesson/${lessonId}/me`);
  }

  createOrUpdateRating(dto: CreateOrUpdateRatingDto): Observable<RatingDto> {
    return this.http.post<RatingDto>(this.baseUrl, dto);
  }

  deleteMyRating(lessonId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/lesson/${lessonId}`);
  }
}
