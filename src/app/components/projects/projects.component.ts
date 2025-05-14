import { Component, OnInit } from '@angular/core';
import ProjectResponse from '../../models/response/projectResponse';
import { CardImageComponent } from '../card-image/card-image.component';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import ProjectsI18N from './projectsI18N';
import { forkJoin, Observable } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';

@Component({
    selector: 'app-projects',
    imports: [CardImageComponent, ApiLoadingComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'projects';
    i18n: ProjectsI18N = {
        technologies: '',
        technology: '',
        register: '',
        edit: '',
    };

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

    textsDescription: string[] = [];

    isLoading: boolean = true;

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18N();
        this.textsDescription = this.projects.map((project) =>
            this.generateDescription(project.technologiesWorked),
        );
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
    }

    private generateDescription(technologies: string[]): string {
        const message =
            technologies.length > 1
                ? this.i18n.technologies
                : this.i18n.technology;
        return generatePhraseTechnologies(message, technologies);
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('technologies'),
            this.recoverValue('technology'),
            this.recoverValue('register'),
            this.recoverValue('edit'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([technologies, technology, register, edit]) => {
                this.i18n = { technologies, technology, register, edit };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }
}
