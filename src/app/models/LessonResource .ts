export interface LessonResource {
  resource_Id: number;
  lesson_Id: number;
  resource_Name: string;
  resource_Description: string;
  resource_Url: string;
  resource_Type: string; // 'pdf' | 'video' | ...
  thumbnailUrl: string;
}

export interface Lesson {
  lesson_Id: number;
  unit_Id: number;
  lesson_Name: string;
  lessonDescription: string;
  resources: LessonResource[];
}
