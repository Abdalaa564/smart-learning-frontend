import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatGPTMessage, ChatService } from '../../Services/chat-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatSession {
  id: number;
  name: string;
  messages: ChatMessage[];
  chatHistory: ChatGPTMessage[];
}

@Component({
  selector: 'app-chat-rome',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat-rome.html',
  styleUrls: ['./chat-rome.css'],
})
export class ChatRome {
  messageText: string = '';
  messages: ChatMessage[] = [];
  sessions: ChatSession[] = [];

  selectedSession: ChatSession | null = null;
  nextSessionId = 1;

  chatHistory: ChatGPTMessage[] = [];

    constructor(private chatService: ChatService) {}

    createNewSession(name: string) {
      const newSession: ChatSession = {
        id: this.nextSessionId++,
        name,
        messages: [],
        chatHistory: [],
      };
      this.sessions.push(newSession);
      this.selectedSession = newSession;
    }

    async sendMessage() {
    if (!this.messageText.trim()|| !this.selectedSession) return;

    this.selectedSession.messages.push({ text: this.messageText, sender: 'user' });

    this.selectedSession.chatHistory.push({ role: 'user', content: this.messageText });

    const prompt = this.messageText;
    this.messageText = '';

    const response = await this.chatService.askChatGPT(this.selectedSession.chatHistory)?? 'No response';
    this.selectedSession.messages.push({ text: response, sender: 'bot' });

    this.selectedSession.chatHistory.push({ role: 'assistant', content: response });
  }

  selectSession(session: ChatSession) {
    this.selectedSession = session;
  }

  async onPdfSelected(event: any) {
    if (!this.selectedSession) return;

    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedSession.messages.push({ text: `📄 Uploaded PDF: ${file.name}`, sender: 'user' });

    const summary = await this.chatService.uploadPdf(file)?? 'No summary available';

    this.selectedSession.messages.push({ text: summary, sender: 'bot' });

    this.selectedSession.chatHistory.push({ role: 'assistant', content: summary });
  }


}
