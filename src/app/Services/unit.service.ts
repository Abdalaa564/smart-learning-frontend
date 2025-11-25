import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Unit } from '../models/Unit ';

export interface AddUnitRequest {
  crs_Id: number;
  unit_Name: string;
  unit_Description: string;
  orderIndex: number;
  imageUrl?: string;
}

export interface UpdateUnitRequest {
  unit_Name: string;
  unit_Description: string;
  orderIndex: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private baseUrl = environment.apiBase + '/Unit';  
  // الناتج: http://localhost:5163/api/Unit

  constructor(private http: HttpClient) {}

  // GET /api/Unit/course/{courseId}
  getByCourse(courseId: number): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.baseUrl}/course/${courseId}`);
  }
getById(id: number): Observable<Unit> {
  return this.http.get<Unit>(`${this.baseUrl}/${id}`);
}

  // POST /api/Unit
  addUnit(request: AddUnitRequest): Observable<any> {
    return this.http.post(this.baseUrl, request);
  }

  // PUT /api/Unit/{id}
  updateUnit(id: number, request: UpdateUnitRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, request);
  }

  // DELETE /api/Unit/{id}
  deleteUnit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
    getUnit(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.baseUrl}/${id}`);
    // لو الـ API عندك مختلف (مثلاً /GetById/{id}) عدّل السطر ده:
    // return this.http.get<Unit>(`${this.baseUrl}/GetById/${id}`);
  }
}
