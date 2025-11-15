import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [FormsModule,CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
courses = [
    {
      image: 'assets/img/education/courses-3.webp',
      badge: 'Best Seller',
      price: '$89',
      category: 'Programming',
      level: 'Intermediate',
      title: 'Advanced JavaScript Development',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      hours: '15 hours',
      students: '1,245 students',
      rating: '4.8 (89 reviews)',
      instructorImg: 'assets/img/person/person-m-3.webp',
      instructorName: 'Dr. Marcus Thompson',
      btnText: 'Enroll Now'
    },
    {
      image: 'assets/img/education/courses-7.webp',
      badge: 'Free',
      badgeClass: 'badge-free',
      category: 'Design',
      level: 'Beginner',
      title: 'UI/UX Design Fundamentals',
      description: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a...',
      hours: '8 hours',
      students: '2,891 students',
      rating: '4.6 (156 reviews)',
      instructorImg: 'assets/img/person/person-f-7.webp',
      instructorName: 'Sarah Johnson',
      btnText: 'Start Free Course'
    },
    
  ];
}
