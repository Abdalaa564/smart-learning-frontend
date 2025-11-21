import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../Services/chat-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
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

    constructor(private chatService: ChatService) {}

    async sendMessage() {
    if (!this.messageText.trim()) return;

    // أضف رسالة المستخدم فوراً للشاشة
    this.messages.push({ text: this.messageText, sender: 'user' });

    const prompt = this.messageText;
    this.messageText = '';

    // نرسلها للباك
    const response = await this.chatService.askChatGPT(prompt)?? 'No response';
    this.messages.push({ text: response, sender: 'bot' });
  }

}
