import { MeetingSetup } from './components/meeting/shared/meeting-setup/meeting-setup';
import { Layout } from './components/meeting/Home/layout/layout';
import { UserProfile } from './components/user-profile/user-profile';
import { ChatRome } from './components/chat-rome/chat-rome';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { InstructorsListComponent  } from './components/instructors/instructors';
import { InstructorProfile } from './components/instructor-profile/instructor-profile';
import { Courses } from './components/courses/courses';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Exam } from './components/exam/exam';
import { Meeting } from './components/meeting/meeting';
import { AddCourse } from './components/add-course/add-course';
import { EditCourse } from './components/edit-course/edit-course';
import { Units } from './components/Unit/units/units';
import { AddUnit } from './components/Unit/add-unit/add-unit';
import { UpdateUnit } from './components/Unit/update-unit/update-unit';
import { AddLesson } from './components/lessons/add-lesson/add-lesson';
import { ErrorPage } from './components/error-page/error-page';
import { CreateQuizComponent } from './components/create-quiz-component/create-quiz-component';
import { TakeQuizComponent } from './components/take-quiz-component/take-quiz-component';
import { QuizResultComponent } from './components/quiz-result-component/quiz-result-component';
import { QuizListComponent } from './components/quiz-list-component/quiz-list-component';
import { Lessons } from './components/lessons/lessons/lessons';
import { AddInstructorComponent } from './components/InstructorCrud/add-instructor/add-instructor';
import { EditInstructorComponent } from './components/InstructorCrud/edit-instructor/edit-instructor';
import { ConfirmDeleteInstructorComponent } from './components/InstructorCrud/delete-instructor/delete-instructor';
import { DeleteCourse } from './components/delete-course/delete-course';

export const routes: Routes = [


    {path: '', redirectTo: 'Home', pathMatch: 'full' },

    {path:"Home", component: Home, title: 'Home' },
    {path:"instructors", component: InstructorsListComponent  },
    { path: 'instructor/:id', component: InstructorProfile },
    { path: 'instructors/add', component: AddInstructorComponent },
  { path: 'instructors/edit/:id', component: EditInstructorComponent },
  { path: 'instructors/:id/confirm-delete', component: ConfirmDeleteInstructorComponent },
    {path: "Courses", component: Courses },
    { path: 'Courses/:id/units', component: Units },
    { path: 'Courses/:id/units/add', component: AddUnit },
    { path: 'Courses/:id/units/edit/:unitId', component: UpdateUnit },
    { path: 'Courses/:courseId/units/:unitId/lessons', component: Lessons },
    { path: 'Courses/:courseId/units/:unitId/lessons/add', component: AddLesson },
    { path: 'courses/add', component: AddCourse },
    { path: 'courses/edit/:id', component: EditCourse },
     { path: 'Courses/delete/:id', component: DeleteCourse },
    {path:'exam', component: Exam, title: 'Exam' },
    {path:'meeting', component: Meeting, title: 'Meeting' },
    {path:'meeting-setup/:id', component: MeetingSetup, title: 'MeetingSetup' },
    // {path:'meeting-setup', component: MeetingSetup, title: 'MeetingSetup' },
    {path:'Layout', component: Layout, title: 'Layout' },
    {path:'chatRome', component: ChatRome, title: 'ChatRome' },
    {path:'lesson/:lessonId/quizzes', component: QuizListComponent, title: 'Quiz Result' },
    {path:'quiz/take/:quizId', component: TakeQuizComponent, title: 'Take Quiz' },
    {path:'quiz/result/:quizId', component: QuizResultComponent, title: 'Quiz Result' },
    {path:'lesson/:lessonId/create-quiz', component: CreateQuizComponent, title: 'CreateQuiz' },
    {path:'userProfile', component: UserProfile, title: 'UserProfile' },
    {path:'lessons', component: Lessons, title: 'Lessons' },
    {path: 'login', component: Login, title: 'Login'},
    {path: 'register', component: Register, title: 'Register'},
    {path: '**', component:ErrorPage, title: 'Not Found'}
];
