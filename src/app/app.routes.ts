import { MeetingSetup } from './components/meeting/shared/meeting-setup/meeting-setup';
import { Layout } from './components/meeting/Home/layout/layout';
import { Lessons } from './components/Units/lessons/lessons';
import { UserProfile } from './components/user-profile/user-profile';
import { ChatRome } from './components/chat-rome/chat-rome';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Instructors } from './components/instructors/instructors';
import { InstructorProfile } from './components/instructor-profile/instructor-profile';
import { Courses } from './components/courses/courses';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Exam } from './components/exam/exam';
import { Meeting } from './components/meeting/meeting';
import { ErrorPage } from './components/error-page/error-page';
import { CreateQuizComponent } from './components/create-quiz-component/create-quiz-component';
import { TakeQuizComponent } from './components/take-quiz-component/take-quiz-component';
import { QuizResultComponent } from './components/quiz-result-component/quiz-result-component';
import { QuizListComponent } from './components/quiz-list-component/quiz-list-component';

export const routes: Routes = [

    {path: '', redirectTo: 'instructors', pathMatch: 'full' },
    {path:"Home", component: Home, title: 'Home' },
    {path:"instructors", component: Instructors, title: 'Instructors' },
    {path: 'instructors/:id', component: InstructorProfile, title: 'Instructor Profile' },
    {path: "Courses", component: Courses, title: 'Courses' },
    {path:'exam', component: Exam, title: 'Exam' },
    {path:'meeting', component: Meeting, title: 'Meeting' },
    {path:'meeting-setup', component: MeetingSetup, title: 'MeetingSetup' },
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
