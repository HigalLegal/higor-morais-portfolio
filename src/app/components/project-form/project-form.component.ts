import {
    Component,
    OnInit,
    signal,
    computed,
    AfterViewInit,
} from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TechnologyResponse } from '../../models/response/technology-response';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import ProjectFormI18N from './projectFormI18N';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyService } from '../../services/api/technology-service/technology.service';
import ProjectResponse from '../../models/response/projectResponse';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';
import { ProjectService } from '../../services/api/project-service/project.service';
import ProjectRequest from '../../models/request/projectRequest';

@Component({
    selector: 'app-project-form',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        MatSelectModule,
        MatCheckboxModule,
        FileUploadComponent,
    ],
    templateUrl: './project-form.component.html',
    styleUrls: [
        './project-form.component.scss',
        './project-form.component.responsive.scss',
    ],
})
export class ProjectFormComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'formProject';
    private readonly MIN: number = 3;

    description = signal<string>('');
    urlRepository = signal<string>('');
    importanceLevel = signal<number | null>(null);
    technologiesWorkedId = signal<number[]>([]);
    image = signal<File | null | undefined>(null);

    i18n: ProjectFormI18N = {
        description: '',
        urlRepository: '',
        importanceLevel: '',
        technologiesWorked: '',
        submit: '',
    };

    technologies: TechnologyResponse[] = [];

    idRouter: string | number | null = null;

    constructor(
        private translate: TranslateConfigService,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private snackBarService: SnackBarService,
        private projectService: ProjectService,
        private technologyService: TechnologyService,
    ) {}

    get importanceLevelValue(): number | null {
        return this.importanceLevel();
    }

    set importanceLevelValue(value: number | null) {
        this.importanceLevel.set(value);
    }

    get technologiesWorkedIdValue(): number[] {
        return this.technologiesWorkedId();
    }

    set technologiesWorkedIdValue(technologiesWorkedIdValue: number[]) {
        this.technologiesWorkedId.set(technologiesWorkedIdValue);
    }

    disableButton = computed(() => {
        return !(
            this.description().length > this.MIN &&
            this.urlRepository().length > this.MIN &&
            this.importanceLevel() !== null &&
            this.technologiesWorkedId().length > 0 &&
            this.validateImage()
        );
    });

    ngOnInit(): void {
        this.insertI18N();
        this.searchTechnologies();
        this.insertId();
    }

    ngAfterViewInit(): void {
        this.searchProjectById();
    }

    onSubmit(): void {
        const importanceLevel = this.importanceLevel();
        const project: ProjectRequest = {
            description: this.description(),
            urlRepository: this.urlRepository(),
            importanceLevel: importanceLevel ? importanceLevel : 0,
            technologiesWorkedId: this.technologiesWorkedId(),
        };

        if (this.router.url.includes('inserir-projeto')) {
            this.postCreate(project, this.image());
        } else {
            this.putUpdate(project, this.image());
        }
    }

    handleImage(file: File | null | undefined): void {
        this.image.set(file);
    }

    private postCreate(
        project: ProjectRequest,
        image: File | null | undefined,
    ): void {
        this.projectService.postCreate(project, image).subscribe({
            next: () => {
                this.openSnackBar();
                this.clearFields();
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private putUpdate(
        project: ProjectRequest,
        image: File | null | undefined,
    ): void {
        if (this.idRouter) {
            this.projectService
                .putUpdate(this.idRouter, project, image)
                .subscribe({
                    next: () => {
                        this.openSnackBar();
                        this.router.navigate(['/']);
                    },
                    error: (err) => {
                        console.error('Erro inesperado! ', err);
                    },
                });
        }
    }

    private searchProjectById(): void {
        if (this.idRouter) {
            this.projectService.getById(this.idRouter).subscribe({
                next: (project) => {
                    this.insertFields(project);
                },
                error: (err) => {
                    console.error('Erro inesperado! ', err);
                },
            });
        }
    }

    private openSnackBar(): void {
        this.snackBarService.openSnackBarSucess('Projeto salvo com êxito!');
    }

    private searchTechnologies(): void {
        this.technologyService.getAll().subscribe({
            next: (technologies) => {
                this.technologies = technologies;
            },
            error: (err) => {
                console.error('Erro inesperado!', err);
            },
        });
    }

    private insertFields(project: ProjectResponse) {
        this.description.set(project.description);
        this.urlRepository.set(project.urlRepository);
        this.importanceLevel.set(project.importanceLevel);
        this.technologiesWorkedId.set(
            this.technologieForName(project.technologiesWorked).map(
                (technology) => technology.id,
            ),
        );
    }

    private clearFields(): void {
        this.description.set('');
        this.urlRepository.set('');
        this.importanceLevel.set(null);
        this.technologiesWorkedId.set([]);
        this.image.set(null);
    }

    private insertId(): void {
        this.activeRouter.paramMap.subscribe((params) => {
            this.idRouter = params.get('id');
        });
    }

    private technologieForName(
        technologiesName: string[],
    ): TechnologyResponse[] {
        return this.technologies.filter((technology) =>
            technologiesName.includes(technology.name),
        );
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('description'),
            this.recoverValue('urlRepository'),
            this.recoverValue('importanceLevel'),
            this.recoverValue('technologiesWorked'),
            this.recoverValue('submit'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([
                description,
                urlRepository,
                importanceLevel,
                technologiesWorked,
                submit,
            ]) => {
                this.i18n = {
                    description,
                    urlRepository,
                    importanceLevel,
                    technologiesWorked,
                    submit,
                };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }

    private validateImage(): boolean {
        const currentRouter = this.router.url;
        return currentRouter.includes('inserir-projeto')
            ? !!this.image()
            : true;
    }
}
