import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Iinstructor } from '../../models/iinstructor';

@Component({
  selector: 'app-instructor-profile',
   standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './instructor-profile.html',
  styleUrls: ['./instructor-profile.css'],
})
export class InstructorProfile implements OnInit{

 instructor: Iinstructor | null = null;

  private readonly instructors: Iinstructor[] = [
    {
      id: 'alexandra-chen',
      name: 'Prof. Alexandra Chen',
      title: 'Machine Learning & AI Specialist',
      avatarUrl: 'assets/img/education/teacher-7.webp',
      verified: true,
      credentials: ['Ph.D. MIT', '10+ Years', '15,247 Students'],
      rating: 4.9,
      reviewsCount: 3821,
      studentsTotal: 15247,
      coursesActive: 18,
      completionRate: 94,
      yearsTeaching: 10,
      socials: { linkedin: '#', twitter: '#', youtube: '#' },
      bio: [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem...',
        'At vero eos et accusamus et iusto odio dignissimos...'
      ],
      expertise: ['Artificial Intelligence', 'Neural Networks', 'Data Science', 'Python & R', 'Cloud Computing', 'Machine Learning'],
      experience: [
        { year: 2019, role: 'Lead AI Researcher', institution: 'TechForward Institute', description: '...' },
        { year: 2016, role: 'Senior Data Scientist', institution: 'InnovateLabs Corp', description: '...' },
        { year: 2014, role: 'Research Fellow', institution: 'MIT Computer Science Lab', description: '...' }
      ],
      heroImageUrl: 'assets/img/education/showcase-4.webp',
      reviews: [
        { id: 'r1', reviewerName: 'Sarah Williams', reviewerRole: 'Data Scientist at Amazon', reviewerAvatarUrl: 'assets/img/person/person-f-12.webp', rating: 5, comment: 'Hands-on approach and real projects.' },
        { id: 'r2', reviewerName: 'David Martinez', reviewerRole: 'ML Engineer at Tesla', reviewerAvatarUrl: 'assets/img/person/person-m-8.webp', rating: 5, comment: "Professor Chen's expertise is unmatched." }
      ],
      contact: { email: 'alexandra.chen@university.edu', phone: '+1 (555) 789-0123', address: 'Room 304, CS Building', officeHours: 'Tue & Thu 2-4 PM' }
    },
    {
      id: 'kevin-taylor',
      name: 'Kevin Taylor',
      title: 'Cloud Computing',
      avatarUrl: 'assets/img/education/teacher-10.webp',
      credentials: ['MSc Stanford', '7+ Years', '3,800 Students'],
      rating: 4.9,
      reviewsCount: 2145,
      expertise: ['Cloud', 'Kubernetes', 'DevOps'],
      heroImageUrl: 'assets/img/education/showcase-4.webp'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.instructor = this.instructors.find(i => i.id === id) ?? null;
  }
}
