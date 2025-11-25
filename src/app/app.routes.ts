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
import { Lessons } from './components/lessons/lessons/lessons';
import { AddLesson } from './components/lessons/add-lesson/add-lesson';

export const routes: Routes = [

    {path: '', redirectTo: 'instructors', pathMatch: 'full' },
    {path:"Home", component: Home, title: 'Home' },


    {path:"instructors", component: InstructorsListComponent , title: 'Instructors' },
     { path: 'instructor/:id', component: InstructorProfile },

    {path: "Courses", component: Courses },

    
    { path: 'Courses/:id/units', component: Units },
     { path: 'Courses/:id/units/add', component: AddUnit },
      { path: 'Courses/:id/units/edit/:unitId', component: UpdateUnit },



       { path: 'Courses/:courseId/units/:unitId/lessons', component: Lessons },
        { path: 'Courses/:courseId/units/:unitId/lessons/add', component: AddLesson },



     { path: 'courses/add', component: AddCourse },
  { path: 'courses/edit/:id', component: EditCourse },
    {path:'exam', component: Exam, title: 'Exam' },
    {path:'meeting', component: Meeting, title: 'Meeting' },
    {path:'chatRome', component: ChatRome, title: 'ChatRome' },
     {path: 'login', component: Login, title: 'Login'},
    {path: 'register', component: Register, title: 'Register'},
    
];
