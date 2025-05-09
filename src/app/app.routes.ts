import { Routes } from '@angular/router';
import { TransitionComponent } from './components/transition/transition.component';
import { FormTechnologyComponent } from './components/form-technology/form-technology.component';

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
];
