export interface RatingDto {
  lesson_Id: number;
  user_Id: string;
  ratingValue: number;
  feedback: string;
}

export interface CreateOrUpdateRatingDto {
  lesson_Id: number;
  ratingValue: number;
  feedback: string;
}

export interface LessonAverageRating {
  average: number | null;
  count: number;
}