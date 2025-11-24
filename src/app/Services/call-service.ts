// src/app/services/call.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CallDetail {
  id: string;
  startsAt?: string;
  description?: string;
  url?: string; // للـ recordings
}

@Injectable({
  providedIn: 'root'
})
export class CallService {
  constructor(private http: HttpClient) {}

  getToken(userId: string): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`/api/call/token?userId=${userId}`);
  }

  getEndedCalls(): Observable<CallDetail[]> {
    return this.http.get<CallDetail[]>('/api/call/ended');
  }

  getUpcomingCalls(): Observable<CallDetail[]> {
    return this.http.get<CallDetail[]>('/api/call/upcoming');
  }

  getRecordings(): Observable<CallDetail[]> {
    return this.http.get<CallDetail[]>('/api/call/recordings');
  }

  createCall(description: string, userId: string, date?: Date): Observable<CallDetail> {
    return this.http.post<CallDetail>('/api/call/create', { description, userId, startsAt: date });
  }

  endCall(callId: string) {
    return this.http.post('/api/call/end', { id: callId });
  }


  createMeeting(startsAt: string, description: string): Observable<any> {
    const token = localStorage.getItem('token'); // أو أي مكان بتحفظ فيه التوكن بعد login
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:5163/api/Meetings', 
      {startsAt, description }, { headers });
  }
}
