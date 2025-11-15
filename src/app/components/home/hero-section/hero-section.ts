import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
 @Input() heroImage: string = 'assets/img/education/hero2-removebg-preview.png';

 @Input() title: string = 'Find your Perfect Course';
  @Input() subtitle: string = 'No 1 Platform for Learning';
  @Input() description: string = 'Education in began prehistory, as adult trained the young in the knowledge and skills deemed necessary in their society.';
}
