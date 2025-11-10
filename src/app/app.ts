import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet,RouterLink, Footer, CommonModule, HttpClientModule,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smart-learning-Ang');
}
