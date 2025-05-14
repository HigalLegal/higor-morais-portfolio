import { Routes } from '@angular/router';
import { TransitionComponent } from './components/transition/transition.component';
import { LoginComponent } from './components/login/login.component';
import { FormTechnologyComponent } from './components/form-technology/form-technology.component';
import { FormCourseComponent } from './components/form-course/form-course.component';
import { FormExperienceComponent } from './components/form-experience/form-experience.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { FormArticleComponent } from './components/form-article/form-article.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    {
        path: 'inserir-experiencia',
        component: FormExperienceComponent,
    },
    {
        path: 'editar-experiencia/:id',
        component: FormExperienceComponent,
    },
    {
        path: 'inserir-projeto',
        component: ProjectFormComponent,
    },
    {
        path: 'editar-projeto/:id',
        component: ProjectFormComponent,
    },
    {
        path: 'inserir-artigo',
        component: FormArticleComponent,
    },
    {
        path: 'editar-artigo/:id',
        component: FormArticleComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
