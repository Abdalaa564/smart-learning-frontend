import { Home } from './components/home/home';
import { Routes } from '@angular/router';
import { Instructors } from './components/instructors/instructors';
import { InstructorProfile } from './components/instructor-profile/instructor-profile';

export const routes: Routes = [
    {path: '', redirectTo: 'instructors', pathMatch: 'full' },
    {path:"Home", component: Home },
    {path:"instructors", component: Instructors },
    {path: 'instructors/:id', component: InstructorProfile}
];
