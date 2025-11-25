import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from '../../models/iinstructor';
import { InstructorService } from '../../Services/instructor-srevices';

@Component({
  selector: 'app-instructor-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructor-profile.html',
  styleUrls: ['./instructor-profile.css']
})
export class InstructorProfile implements OnInit {

  instructor?: Instructor;

  // التاب الحالي
  activeTab: 'about' | 'certifications' | 'courses' = 'about';

  // كورسات مؤقتة
  courses = [
    {
      title: 'Full-Stack Web Development',
      level: 'Advanced',
      students: 320,
      rating: 4.8,
      duration: '24h content'
    },
    {
      title: 'Angular & ASP.NET Core API',
      level: 'Intermediate',
      students: 210,
      rating: 4.6,
      duration: '18h content'
    },
    {
      title: 'Intro to Programming',
      level: 'Beginner',
      students: 500,
      rating: 4.4,
      duration: '12h content'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.instructorService.getById(id).subscribe({
      next: res => this.instructor = res,
      error: err => console.error(err)
    });
  }

  setTab(tab: 'about' | 'certifications' | 'courses') {
    this.activeTab = tab;
  }

  getStarsArray(rating: number | undefined): number[] {
    return [1, 2, 3, 4, 5];
  }

  getCertificateImage(url: string | undefined): string {
    if (!url) return '';

    // دعم لينك Google Drive
    if (url.includes('drive.google.com')) {
      const id = url.match(/\/d\/(.*?)\//)?.[1];
      if (id) {
        return `https://drive.google.com/uc?export=view&id=${id}`;
      }
    }

    // لو لينك مباشر لصورة
    return url;
  }
}
