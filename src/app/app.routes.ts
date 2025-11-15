import { Routes } from '@angular/router';
import { Instructors } from './components/instructors/instructors';
import { InstructorProfile } from './components/instructor-profile/instructor-profile';
import { Courses } from './components/courses/courses';


export const routes: Routes = [

    {path: '', redirectTo: 'instructors', pathMatch: 'full' },
    {path:"instructors", component: Instructors },
    {path: 'instructors/:id', component: InstructorProfile}
];
