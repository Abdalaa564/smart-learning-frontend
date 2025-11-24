import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:5163/api/chat';

  constructor(private http: HttpClient) {}

  askChatGPT(prompt: string) {
    return this.http.post(
    this.apiUrl,
    `"${prompt}"`,
    { 
      responseType: 'text',
      headers: { 'Content-Type': 'application/json' }
    }
  ).toPromise();
  }
  
}
