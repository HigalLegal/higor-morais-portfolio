import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/transition/transition.component').then(
                (m) => m.TransitionComponent,
            ),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login.component').then(
                (m) => m.LoginComponent,
            ),
    },
    {
        path: 'inserir-tecnologia',
        loadComponent: () =>
            import(
                './components/form-technology/form-technology.component'
            ).then((m) => m.FormTechnologyComponent),
    },
    {
        path: 'editar-tecnologia/:id',
        loadComponent: () =>
            import(
                './components/form-technology/form-technology.component'
            ).then((m) => m.FormTechnologyComponent),
    },
    {
        path: 'inserir-curso',
        loadComponent: () =>
            import('./components/form-course/form-course.component').then(
                (m) => m.FormCourseComponent,
            ),
    },
    {
        path: 'editar-curso/:id',
        loadComponent: () =>
            import('./components/form-course/form-course.component').then(
                (m) => m.FormCourseComponent,
            ),
    },
    {
        path: 'inserir-experiencia',
        loadComponent: () =>
            import(
                './components/form-experience/form-experience.component'
            ).then((m) => m.FormExperienceComponent),
    },
    {
        path: 'editar-experiencia/:id',
        loadComponent: () =>
            import(
                './components/form-experience/form-experience.component'
            ).then((m) => m.FormExperienceComponent),
    },
    {
        path: 'inserir-projeto',
        loadComponent: () =>
            import('./components/project-form/project-form.component').then(
                (m) => m.ProjectFormComponent,
            ),
    },
    {
        path: 'editar-projeto/:id',
        loadComponent: () =>
            import('./components/project-form/project-form.component').then(
                (m) => m.ProjectFormComponent,
            ),
    },
    {
        path: 'inserir-artigo',
        loadComponent: () =>
            import('./components/form-article/form-article.component').then(
                (m) => m.FormArticleComponent,
            ),
    },
    {
        path: 'editar-artigo/:id',
        loadComponent: () =>
            import('./components/form-article/form-article.component').then(
                (m) => m.FormArticleComponent,
            ),
    },
    {
        path: '**',
        loadComponent: () =>
            import('./components/not-found/not-found.component').then(
                (m) => m.NotFoundComponent,
            ),
    },
];
