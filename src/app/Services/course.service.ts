import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Course } from '../models/Course';

export interface AddCourseRequest {
  crs_Name: string;
  crs_Description?: string;
  price: number;
  instructorId: number;
  imageFile?: File | null;
  imageUrl?: string | null;
}

export interface UpdateCourseRequest {
  crs_Name: string;
  crs_Description?: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // http://localhost:5163/api/Course
  private baseUrl = `${environment.apiBase}/Course`;

  constructor(private http: HttpClient) { }

  // GET: /api/Course
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  // GET: /api/Course/{id}
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  // POST: /api/Course  (multipart/form-data)
  addCourse(request: AddCourseRequest): Observable<string> {
    const formData = new FormData();
    formData.append('Crs_Name', request.crs_Name);
    formData.append('Crs_Description', request.crs_Description || '');
    formData.append('Price', request.price.toString());
    formData.append('InstructorId', request.instructorId.toString());

    if (request.imageFile) {
      formData.append('ImageFile', request.imageFile);
    }

    if (request.imageUrl) {
      formData.append('ImageUrl', request.imageUrl);
    }

    // Swagger بيرجع "Created Successfully" كنص
    return this.http.post<string>(this.baseUrl, formData, {
      responseType: 'text' as 'json'
    });
  }

  // PUT: /api/Course/{id}  (application/json)
  // body: { crs_Name, crs_Description, price }
  updateCourse(id: number, dto: UpdateCourseRequest): Observable<string> {
    console.log('Updating course with id = ', id, 'dto = ', dto);

    return this.http.put<string>(`${this.baseUrl}/${id}`, dto, {
      responseType: 'text' as 'json'
    });
  }

  // DELETE: /api/Course/{id}
  deleteCourse(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`, {
      responseType: 'text' as 'json'
    });
  }
}