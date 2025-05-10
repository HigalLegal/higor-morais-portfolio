import { Routes } from '@angular/router';
import { TransitionComponent } from './components/transition/transition.component';
import { LoginComponent } from './components/login/login.component';
import { FormTechnologyComponent } from './components/form-technology/form-technology.component';
import { FormCourseComponent } from './components/form-course/form-course.component';

export const routes: Routes = [
    {
        path: '',
        component: TransitionComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'inserir-tecnologia',
        component: FormTechnologyComponent,
    },
    {
        path: 'editar-tecnologia/:id',
        component: FormTechnologyComponent,
    },
    {
        path: 'inserir-curso',
        component: FormCourseComponent,
    },
    {
        path: 'editar-curso/:id',
        component: FormCourseComponent,
    },
];
