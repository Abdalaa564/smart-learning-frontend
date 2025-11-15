import { Component } from '@angular/core';
import { Card } from "../../../shared/card/card";
import { Button } from "../../../shared/button/button";
import { Iinstructor } from '../../../models/iinstructor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructors-section',
  imports: [CommonModule, Card, Button],
  templateUrl: './instructors-section.html',
  styleUrl: './instructors-section.css',
})
export class InstructorsSection {
 instructors: Iinstructor[] = [];
  ngOnInit(): void {

  this.instructors = [
      {
        id: 'alexandra-chen',
        name: 'Prof. Alexandra Chen',
        title: 'Machine Learning & AI Specialist',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ebczbJCPjGAIx3eXTU5zphGoJe68qLsGAg&s',
        verified: true,
        credentials: ['Ph.D. MIT', '10+ Years Experience'],
        rating: 4.9,
        reviewsCount: 3821,
        studentsTotal: 15247,
        coursesActive: 18,
        completionRate: 94,
        yearsTeaching: 10,
        socials: { linkedin: 'https://linkedin.com/alexandra', twitter: 'https://twitter.com/alex-ai' },
        expertise: ['AI', 'Neural Networks', 'Python', 'Cloud ML'],
        heroImageUrl: 'assets/img/education/showcase-4.webp'
      },
        {
        id: 'alexandra-chen',
        name: 'Prof. Alexandra Chen',
        title: 'Machine Learning & AI Specialist',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ebczbJCPjGAIx3eXTU5zphGoJe68qLsGAg&s',
        verified: true,
        credentials: ['Ph.D. MIT', '10+ Years Experience'],
        rating: 4.9,
        reviewsCount: 3821,
        studentsTotal: 15247,
        coursesActive: 18,
        completionRate: 94,
        yearsTeaching: 10,
        socials: { linkedin: 'https://linkedin.com/alexandra', twitter: 'https://twitter.com/alex-ai' },
        expertise: ['AI', 'Neural Networks', 'Python', 'Cloud ML'],
        heroImageUrl: 'assets/img/education/showcase-4.webp'
      },
      
      
      {
        id: 'michael-chen',
        name: 'Michael Chen',
        title: 'Data Science',
        avatarUrl: 'assets/img/education/teacher-7.webp',
        verified: true,
        credentials: ['MSc Stanford'],
        rating: 4.9,
        reviewsCount: 2500,
        studentsTotal: 3500,
        coursesActive: 24,
        yearsTeaching: 7,
        socials: { github: 'https://github.com/m-chen', linkedin: 'https://linkedin.com/michael' },
        expertise: ['Data Science', 'Pandas', 'R', 'ML Ops']
      },
      {
        id: 'michael-chen',
        name: 'Michael Chen',
        title: 'Data Science',
        avatarUrl: 'assets/img/education/teacher-7.webp',
        verified: true,
        credentials: ['MSc Stanford'],
        rating: 4.9,
        reviewsCount: 2500,
        studentsTotal: 3500,
        coursesActive: 24,
        yearsTeaching: 7,
        socials: { github: 'https://github.com/m-chen', linkedin: 'https://linkedin.com/michael' },
        expertise: ['Data Science', 'Pandas', 'R', 'ML Ops']
      }
    ];
  }
}
