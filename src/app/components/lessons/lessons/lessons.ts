import { Component, OnInit } from '@angular/core';
import { Unit } from '../../../models/Unit ';
import { Lesson } from '../../../models/LessonResource ';
import { environment } from '../../../environment/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LessonService } from '../../../Services/lesson.service';
import { UnitService } from '../../../Services/unit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lessons',
  imports: [CommonModule, RouterLink],
  templateUrl: './lessons.html',
  styleUrl: './lessons.css',
})
export class Lessons implements OnInit {

  courseId!: number;
  unitId!: number;

  unit?: Unit;
  lessons: Lesson[] = [];
  isLoading = false;
  errorMessage = '';

  env = environment;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));

    this.loadUnit();
    this.loadLessons();
  }

  loadUnit(): void {
    this.unitService.getUnit(this.unitId).subscribe({
      next: (u) => {
        this.unit = u;
      },
      error: (err) => {
        console.error('Error loading unit:', err);
      }
    });
  }

  loadLessons(): void {
    this.isLoading = true;

    this.lessonService.getLessonsByUnit(this.unitId).subscribe({
      next: (data) => {
        this.lessons = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading lessons:', err);
        this.errorMessage = 'حدث خطأ أثناء تحميل الدروس.';
        this.isLoading = false;
      }
    });
  }

  getPdfResource(lesson: Lesson) {
    return lesson.resources?.find(r => r.resource_Type === 'pdf');
  }

  getPdfThumbnail(lesson: Lesson): string {
    const pdf = this.getPdfResource(lesson);
    if (pdf && pdf.thumbnailUrl) {
      return pdf.thumbnailUrl;
    }
    return `${environment.imageBase}/images/pdf-icon.png`;
  }

  getPdfDownloadUrl(lesson: Lesson): string | null {
    const pdf = this.getPdfResource(lesson);
    return pdf ? pdf.resource_Url : null;
  }
}