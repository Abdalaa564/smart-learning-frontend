import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  isdarkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }
  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    
    this.applyClass(isDark);
    
    this.darkModeSubject.next(isDark);
  }

  toggleDarkMode(): void {
    const currentStatus = this.darkModeSubject.value;
    const newStatus = !currentStatus;
    
    this.applyClass(newStatus);
    
    localStorage.setItem('theme', newStatus ? 'dark' : 'light');
    
    this.darkModeSubject.next(newStatus);
  }

  
  private applyClass(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // دالة للحصول على الحالة الحالية للمساعدة في عرض الأيقونة
  get currentThemeStatus(): boolean {
    return this.darkModeSubject.value;
  }
}
