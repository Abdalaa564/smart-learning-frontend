import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [RouterOutlet, RouterLink, Footer, CommonModule, HttpClientModule, Navbar],

  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public  showFooter = true;
  protected readonly title = signal('smart-learning-Ang');

   constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {

        // لو URL فيه كلمة admin → اخفي الفوتر
        this.showFooter = !event.url.includes('/admin');

      });
    }
}
