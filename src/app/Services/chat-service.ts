import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ChatGPTMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatGPTMessage[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://elearningg.runasp.net/api/chat';

  constructor(private http: HttpClient) {}

  askChatGPT(messages: ChatGPTMessage[]) {
    const body: ChatRequest = { messages };
    return this.http.post(this.apiUrl, body, { responseType: 'text' }).toPromise();
  }
  
  uploadPdf(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post('http://localhost:5163/api/chat/upload-pdf', formData, 
      {
      responseType: 'text'
    }).toPromise();
  }

}
