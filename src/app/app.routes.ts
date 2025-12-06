import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { UserProfile } from './components/user-profile/user-profile';
import { MyCourses } from './components/user-profile/my-courses/my-courses';
import { ChatRome } from './components/chat-rome/chat-rome';

import { InstructorsListComponent } from './components/instructors/instructors';
import { InstructorProfile } from './components/instructor-profile/instructor-profile';
import { AddInstructorComponent } from './components/InstructorCrud/add-instructor/add-instructor';
import { EditInstructorComponent } from './components/InstructorCrud/edit-instructor/edit-instructor';
import { ConfirmDeleteInstructorComponent } from './components/InstructorCrud/delete-instructor/delete-instructor';

import { Courses } from './components/courses/courses';
import { AddCourse } from './components/add-course/add-course';
import { EditCourse } from './components/edit-course/edit-course';
import { DeleteCourse } from './components/delete-course/delete-course';

import { Units } from './components/Unit/units/units';
import { AddUnit } from './components/Unit/add-unit/add-unit';
import { UpdateUnit } from './components/Unit/update-unit/update-unit';

import { Lessons } from './components/lessons/lessons/lessons';
import { AddLesson } from './components/lessons/add-lesson/add-lesson';
import { LessonDetails } from './components/lessons/lesson-details/lesson-details';
import { EditLesson } from './components/lessons/updatelesson/updatelesson';
import { DeleteLesson } from './components/lessons/delete-lesson/delete-lesson';

import { CreateQuizComponent } from './components/create-quiz-component/create-quiz-component';
import { QuizListComponent } from './components/quiz-list-component/quiz-list-component';
import { TakeQuizComponent } from './components/take-quiz-component/take-quiz-component';
import { QuizResultComponent } from './components/quiz-result-component/quiz-result-component';


import { JitsiComponent } from './components/jitsi/jitsi.component';
import { MeetingSetupComponent } from './components/meeting-setup/meeting-setup.component';

import { Login } from './components/login/login';
import { Register } from './components/register/register';

import { Exam } from './components/exam/exam';
import { ErrorPage } from './components/error-page/error-page';

import { enrollmentGuard } from './guard/enrollment-guard';
import { RegisterInstructorComponent } from './components/Register-as-instructor/register-instructor/register-instructor';

export const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },

 {
  path: 'admin',
  loadComponent: () =>
    import('./components/ADMIN-Panel/admin-panel/admin-panel')
      .then((m) => m.AdminPanelComponent),
},


  // Main
  { path: 'Home', component: Home, title: 'Home' },

  // Instructors
  { path: 'instructors', component: InstructorsListComponent },
  { path: 'instructor/:id', component: InstructorProfile },
  { path: 'instructors/add', component: AddInstructorComponent },
  { path: 'instructors/edit/:id', component: EditInstructorComponent },
  { path: 'instructors/:id/confirm-delete', component: ConfirmDeleteInstructorComponent },

  // Courses
  { path: 'Courses', component: Courses },
  { path: 'courses/add', component: AddCourse },
  { path: 'courses/edit/:id', component: EditCourse },
  { path: 'Courses/delete/:id', component: DeleteCourse },

  // Units
  { path: 'Courses/:id/units', component: Units},
  { path: 'Courses/:id/units/add', component: AddUnit },
  { path: 'Courses/:id/units/edit/:unitId', component: UpdateUnit },

  // Lessons
  { path: 'Courses/:courseId/units/:unitId/lessons', component: Lessons  },
  { path: 'Courses/:courseId/units/:unitId/lessons/add', component: AddLesson },
  { path: 'Courses/:courseId/units/:unitId/lessons/:lessonId', component: LessonDetails },
  { path: 'Courses/:courseId/units/:unitId/lessons/:lessonId/edit', component: EditLesson },
  { path: 'Courses/:courseId/units/:unitId/lessons/:lessonId/delete', component: DeleteLesson },

  // Quizzes
  { path: 'lesson/:lessonId/quizzes', component: QuizListComponent, title: 'Quiz Result' },
  { path: 'quiz/take/:quizId', component: TakeQuizComponent, title: 'Take Quiz' },
  { path: 'quiz/result/:quizId', component: QuizResultComponent, title: 'Quiz Result' },
  { path: 'lesson/:lessonId/create-quiz', component: CreateQuizComponent, title: 'Create Quiz' },

  // Meetings
  { path: 'meeting', component: JitsiComponent, title: 'Meeting' },
  { path: 'meeting-setup', component: MeetingSetupComponent, title: 'Meeting Setup' },

  // User
  { path: 'userProfile', component: UserProfile, title: 'User Profile' },
  { path: 'student/:id/courses', component: MyCourses },

  // Chat
  { path: 'chatRome', component: ChatRome },

  // Lessons Overview
  { path: 'lessons', component: Lessons },

  // Auth
  { path: 'login', component: Login, title: 'Login' },
  { path: 'register', component: Register, title: 'Register' },

   // Register Instructor
   { path: 'register-instructor', component: RegisterInstructorComponent, title: 'Register Instructor' },

  // Exam
  { path: 'exam', component: Exam, title: 'Exam' },

  // Not found
  { path: '**', component: ErrorPage, title: 'Not Found' },
];
