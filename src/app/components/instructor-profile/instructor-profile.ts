import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Iinstructor } from '../../models/iinstructor';
import { Card } from '../../shared/card/card';
import { Button } from '../../shared/button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [CommonModule, Card, Button, RouterLink],
  templateUrl: './instructor-profile.html',
  styleUrls: ['./instructor-profile.css']
})
export class InstructorProfile implements OnInit {

  instructor?: Iinstructor;

  instructors: Iinstructor[] = [
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
      bio: [
        'Experienced ML & AI specialist with focus on deep learning and neural networks.',
        'Lecturer at MIT and author of multiple AI publications.'
      ],
      contact: {
        email: 'alexandra.chen@university.edu',
        phone: '+1 (555) 789-0123',
        address: 'Room 304, Computer Science Building',
        officeHours: 'Tue & Thu, 2:00 PM - 4:00 PM'
      }
    },
    {
      id: 'michael-chen',
      name: 'Michael Chen',
      title: 'Data Science',
      avatarUrl: 'assets/img/education/teacher-7.webp',
      verified: true,
      credentials: ['MSc Stanford'],
      rating: 4.8,
      reviewsCount: 2500,
      studentsTotal: 3500,
      bio: [
        'Data scientist with expertise in Python, R, and ML Ops.',
        'Experience in large-scale data projects and ML pipelines.'
      ],
      contact: {
        email: 'michael.chen@university.edu',
        phone: '+1 (555) 123-4567',
        address: 'Room 210, Data Science Building',
        officeHours: 'Mon & Wed, 1:00 PM - 3:00 PM'
      }
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.instructor = this.instructors.find(i => i.id === id);
  }
}
