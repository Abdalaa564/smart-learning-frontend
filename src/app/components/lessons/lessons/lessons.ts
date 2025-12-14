import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../../Services/lesson.service';
import { UnitService } from '../../../Services/unit.service';
import { CommonModule } from '@angular/common';
import { Unit } from '../../../models/Unit ';
import { Lesson } from '../../../models/LessonResource ';
import { EnrollmentService } from '../../../Services/enrollment-service';
import { AuthService } from '../../../Services/auth-service';

import { QuizDetailsDto, QuizResultDto } from '../../../models/exam-question';
import { QuizService } from '../../../Services/quiz-service';

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
  isEnrolled = false;
  freeLessonsLimit = 3;
  freeUnitId = 1;
  env = environment;
  units: Unit[] = [];

  // Quiz state
  quizzesByLesson: { [lessonId: number]: QuizDetailsDto[] } = {};
  quizResults: { [quizId: number]: QuizResultDto } = {};
  quizLoading: { [quizId: number]: boolean } = {};
  quizError: string | null = null;

  // Role checking
  get isInstructor(): boolean {
    return this.authService.isInstructor();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  // End Role checking

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private unitService: UnitService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));

    const studentId = this.authService.UserId;
    if (studentId) {
      this.enrollmentService.isStudentEnrolled(studentId, this.courseId)
        .subscribe(res => this.isEnrolled = res);
    }

    this.unitService.getByCourse(this.courseId).subscribe(units => {
      this.units = units.sort((a, b) => a.orderIndex - b.orderIndex); // ترتيب الوحدات
      this.loadUnit();
      this.loadLessons();
    });
  }

  loadUnit(): void {
    this.unitService.getUnit(this.unitId).subscribe({
      next: (u) => this.unit = u,
      error: (err) => console.error('Error loading unit:', err)
    });
  }

  loadLessons(): void {
    this.isLoading = true;

    this.lessonService.getLessonsByUnit(this.unitId).subscribe({
      next: (data) => {
        this.lessons = data;
        this.isLoading = false;

        // بعد تحميل الدروس نجيب الكويزات لكل درس متاح للطالب
        this.lessons.forEach((lesson, index) => {
          if (this.canAccessLesson(index)) {
            this.loadQuizzesForLesson(lesson.lesson_Id);
          }
        });
      },
      error: (err) => {
        console.error('Error loading lessons:', err);
        this.errorMessage = 'حدث خطأ أثناء تحميل الدروس.';
        this.isLoading = false;
      }
    });
  }

  canAccessLesson(index: number): boolean {
    // If Admin or Instructor -> Allow full access
    if (this.authService.isAdmin() || this.authService.isInstructor()) {
      return true;
    }

    // If enrolled, grant full access
    if (this.isEnrolled) return true;

    // Only first unit's first 3 lessons are free
    const firstUnit = this.units[0];
    if (this.unit && firstUnit && this.unit.unit_Id === firstUnit.unit_Id && index < this.freeLessonsLimit) {
      return true;
    }

    return false;
  }

  // === Quiz helpers ===

 loadQuizzesForLesson(lessonId: number): void {
  this.quizService.getQuizzesByLessonId(lessonId).subscribe({
    next: (quizzes) => {
      this.quizzesByLesson[lessonId] = quizzes;

      // ✅ لو الطالب مش Admin ولا Instructor
      if (!this.isAdmin && !this.isInstructor) {
        quizzes.forEach(q => {
          this.quizService.getQuizResult(q.quiz_Id).subscribe({
            next: (res) => {
              // لو فيه نتيجة أصلاً → خزنها
              this.quizResults[q.quiz_Id] = res;
            },
            error: (err) => {
              // 404 معناها مفيش نتيجة = لسه ممتحنش → تجاهل
              if (err.status !== 404) {
                console.error('Error checking quiz result for quiz', q.quiz_Id, err);
              }
            }
          });
        });
      }
    },
    error: (err) => {
      console.error('Error loading quizzes for lesson', lessonId, err);
    }
  });
}

  startQuiz(quiz: QuizDetailsDto): void {
    this.quizLoading[quiz.quiz_Id] = true;
    this.quizError = null;

    this.quizService.startQuiz(quiz.quiz_Id).subscribe({
      next: (data) => {
        this.quizLoading[quiz.quiz_Id] = false;
        console.log('Quiz started:', data);

        // روح لصفحة الكويز (اعمل route لها عندك)
        this.router.navigate(['/quiz/take', quiz.quiz_Id]);

      },
      error: (err) => {
        this.quizLoading[quiz.quiz_Id] = false;
        console.error('Error starting quiz:', err);
        this.quizError = 'Try again later. OR you may have already taken this quiz.';
      }
    });
  }


  goToResult(quizId: number): void {
  this.router.navigate(['/quiz/result', quizId]);
}

  // === PDF helpers ===

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

  // ✅ حذف الدرس
  onDeleteLesson(lesson: Lesson) {
    if (!confirm(`are you sure to delete this lesson"${lesson.lesson_Name}" ؟`)) {
      return;
    }

    this.lessonService.deleteLesson(lesson.lesson_Id).subscribe({
      next: () => {
        this.lessons = this.lessons.filter(l => l.lesson_Id !== lesson.lesson_Id);
      },
      error: (err) => {
        console.error('Error deleting lesson:', err);
        alert('Fail To Delete Try Agian');
      }
    });
  }
}
