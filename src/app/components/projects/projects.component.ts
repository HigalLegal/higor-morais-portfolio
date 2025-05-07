import { Component } from '@angular/core';
import ProjectResponse from '../../models/projectResponse';
import { CardImageComponent } from '../card-image/card-image.component';

@Component({
    selector: 'app-projects',
    imports: [CardImageComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
    projects: ProjectResponse[] = [
        {
            id: 1,
            description:
                'Sistema de gerenciamento de tarefas com autenticação e painel administrativo.',
            urlRepository: 'https://github.com/seu-usuario/todo-app',
            urlImage: 'https://i.imgur.com/ev57OVJ.png',
            importanceLevel: 5,
            technologiesWorked: ['Angular', 'TypeScript', 'Node.js', 'MongoDB'],
        },
        {
            id: 2,
            description:
                'Landing page institucional responsiva para empresa de tecnologia.',
            urlRepository: 'https://github.com/seu-usuario/landing-page-tech',
            urlImage: 'https://i.imgur.com/ev57OVJ.png',
            importanceLevel: 3,
            technologiesWorked: ['HTML', 'SCSS', 'JavaScript', 'Vite'],
        },
        {
            id: 3,
            description:
                'API REST para gerenciamento de estoque com autenticação JWT.',
            urlRepository: 'https://github.com/seu-usuario/inventory-api',
            urlImage: 'https://i.imgur.com/ev57OVJ.png',
            importanceLevel: 4,
            technologiesWorked: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        },
    ];

    generateDescription(technologies: string[]): string {
        const mensagemTecnologiaUsada = technologies.length > 0 ? 'Tecnologias usadas: ' : 'Tecnologia usada: '
        return `${mensagemTecnologiaUsada}${technologies.join(', ')}`;
    }
}
