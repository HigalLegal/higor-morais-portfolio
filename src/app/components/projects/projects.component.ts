import {
    Component,
    OnInit,
    AfterViewInit,
    signal,
    effect,
} from '@angular/core';
import ProjectResponse from '../../models/response/projectResponse';
import { CardImageComponent } from '../card-image/card-image.component';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import ProjectsI18N from './projectsI18N';
import { forkJoin, Observable } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { ProjectService } from '../../services/api/project-service/project.service';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';
import { TokenService } from '../../services/token-service/token.service';

@Component({
    selector: 'app-projects',
    imports: [CardImageComponent, ApiLoadingComponent, ButtonFormComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'projects';
    i18n: ProjectsI18N = {
        technologies: '',
        technology: '',
        register: '',
        edit: '',
    };

    projects = signal<ProjectResponse[]>([]);

    textsDescription = signal<string[]>([]);

    isLoading = signal<boolean>(true);

    isAdmin = signal<boolean>(false);

    constructor(
        private translate: TranslateConfigService,
        private tokenService: TokenService,
        private projectService: ProjectService,
        private snackbarService: SnackBarService,
    ) {
        this.isAdmin.set(tokenService.isAdmin());
        effect(() => this.insertTextsDescription());
    }

    ngOnInit(): void {
        this.insertI18N();
        this.searchProjects();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    handleDelete(id: number | string): void {
        this.projectService.delete(id).subscribe({
            next: () => {
                this.openSnackbar();
                this.searchProjects();
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private searchProjects(): void {
        this.projectService.getAll().subscribe({
            next: (projects) => {
                this.projects.set(projects);
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private insertTextsDescription(): void {
        if (this.i18n.technologies.length > 0 && this.projects().length > 0) {
            this.textsDescription.set(
                this.projects().map((project) =>
                    this.generateDescription(project.technologiesWorked),
                ),
            );
        }
    }

    private generateDescription(technologies: string[]): string {
        const message =
            technologies.length > 1
                ? this.i18n.technologies
                : this.i18n.technology;
        return generatePhraseTechnologies(message, technologies);
    }

    private openSnackbar(): void {
        this.snackbarService.openSnackBarSucess(`Projeto excluído com exito!`);
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
