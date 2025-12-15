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

  getToken(userId: string, callId: string): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(
      `/api/call/token?userId=${userId}&callId=${callId}`
    );
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
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImUzM2NlNDJhLTA2YzgtNDVlZi04OGQ2LTY5OGJjNmFjNGM4NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhYmRhbGFha0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhYmRhbGFha0BnbWFpbC5jb20iLCJTdHVkZW50SWQiOiJlMzNjZTQyYS0wNmM4LTQ1ZWYtODhkNi02OThiYzZhYzRjODciLCJleHAiOjE3NjQxMDM0NzIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE2My8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIn0.ZFK6sxCvG7yhWdJ_b9MyIueEuf935MshxuQ6OgpOGkc';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('http://elearningg.runasp.net/Meetings', 
      {startsAt, description }, { headers });
  }
}
