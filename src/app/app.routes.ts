import { Routes } from '@angular/router';
import { TransitionComponent } from './components/transition/transition.component';
import { FormTechnologyComponent } from './components/form-technology/form-technology.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: TransitionComponent,
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
        path: 'login',
        component: LoginComponent,
    },
];
