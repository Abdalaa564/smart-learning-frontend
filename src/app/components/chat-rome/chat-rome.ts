import { Component, OnInit } from '@angular/core';
import { ChatGPTMessage, ChatService } from '../../Services/chat-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SkeletonListComponent } from '../../shared/Skeleton/skeleton-list/skeleton-list';

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
  imports: [CommonModule, FormsModule, HttpClientModule, SkeletonListComponent],
  templateUrl: './chat-rome.html',
  styleUrls: ['./chat-rome.css'],
})
export class ChatRome implements OnInit {
  private readonly STORAGE_KEY = 'chat-sessions';
  
  messageText: string = '';
  messages: ChatMessage[] = [];
  sessions: ChatSession[] = [];
  isLoadingSessions = false; // For future API integration
  
  isSearchOpen = false;
  searchText = '';

  selectedSession: ChatSession | null = null;
  nextSessionId = 1;

  chatHistory: ChatGPTMessage[] = [];

    constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadSessions();
  }

  private saveSessions() {
    try {
      const data = {
        sessions: this.sessions,
        nextSessionId: this.nextSessionId,
        selectedSessionId: this.selectedSession?.id || null
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving sessions to localStorage:', error);
    }
  }

  private loadSessions() {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);
        this.sessions = data.sessions || [];
        this.nextSessionId = data.nextSessionId || 1;
        
        // Restore selected session
        if (data.selectedSessionId) {
          this.selectedSession = this.sessions.find(s => s.id === data.selectedSessionId) || null;
        } else if (this.sessions.length > 0) {
          this.selectedSession = this.sessions[0];
        }
      }
    } catch (error) {
      console.error('Error loading sessions from localStorage:', error);
    }
  }

  clearAllChats() {
    if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      this.sessions = [];
      this.selectedSession = null;
      this.nextSessionId = 1;
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

    createNewSession(name: string) {
      const newSession: ChatSession = {
        id: this.nextSessionId++,
        name,
        messages: [],
        chatHistory: [],
      };
      this.sessions.push(newSession);
      this.selectedSession = newSession;
      this.saveSessions();
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

    this.saveSessions();
  }

  selectSession(session: ChatSession) {
    this.selectedSession = session;
    this.saveSessions();
  }

  async onPdfSelected(event: any) {
    if (!this.selectedSession) return;

    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedSession.messages.push({ text: `📄 Uploaded PDF: ${file.name}`, sender: 'user' });

    const summary = await this.chatService.uploadPdf(file)?? 'No summary available';

    this.selectedSession.messages.push({ text: summary, sender: 'bot' });

    this.selectedSession.chatHistory.push({ role: 'assistant', content: summary });

    this.saveSessions();
  }


  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchText = '';
    }
  }

  highlightText(text: string): string {
    if (!this.searchText.trim()) return text;

    const regex = new RegExp(`(${this.searchText})`, 'gi');
    return text.replace(regex, '<mark class="highlight">$1</mark>');
  }
}
