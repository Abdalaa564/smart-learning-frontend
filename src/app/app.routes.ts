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

export const routes: Routes = [

    {path: '', redirectTo: 'instructors', pathMatch: 'full' },
    {path:"Home", component: Home, title: 'Home' },
    {path:"instructors", component: Instructors, title: 'Instructors' },
    {path: 'instructors/:id', component: InstructorProfile, title: 'Instructor Profile' },
    {path: "Courses", component: Courses, title: 'Courses' },
    {path:'exam', component: Exam, title: 'Exam' },
    {path:'meeting', component: Meeting, title: 'Meeting' },
    {path:'chatRome', component: ChatRome, title: 'ChatRome' },
    {path:'userProfile', component: UserProfile, title: 'UserProfile' },
    {path:'lessons', component: Lessons, title: 'Lessons' },
     {path: 'login', component: Login, title: 'Login'},
    {path: 'register', component: Register, title: 'Register'},
    {path: '**', component:ErrorPage, title: 'Not Found'}
    
];
