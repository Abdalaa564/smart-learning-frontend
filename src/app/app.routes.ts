import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Instructors } from './components/instructors/instructors';
import { InstructorProfile } from './components/instructor-profile/instructor-profile';
import { Courses } from './components/courses/courses';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
    {path: '', redirectTo: 'instructors', pathMatch: 'full' },
    {path:"Home", component: Home, title: 'Home' },
    {path:"instructors", component: Instructors, title: 'Instructors' },
    {path: 'instructors/:id', component: InstructorProfile, title: 'Instructor Profile' },
    {path: "Courses", component: Courses, title: 'Courses' },
     {path: 'login', component: Login, title: 'Login'},
    {path: 'register', component: Register, title: 'Register'},
];
