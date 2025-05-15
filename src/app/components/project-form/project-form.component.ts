import { Component, OnInit, signal, computed } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TechnologyResponse } from '../../models/response/technologyResponse';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import ProjectFormI18N from './projectFormI18N';
import { Router } from '@angular/router';

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
export class ProjectFormComponent implements OnInit {
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

    technologies: TechnologyResponse[] = [
        { id: 1, name: 'Angular', urlImage: '', importanceLevel: 3 },
        { id: 2, name: 'React', urlImage: '', importanceLevel: 4 },
        { id: 3, name: 'Vue', urlImage: '', importanceLevel: 2 },
    ];

    constructor(
        private translate: TranslateConfigService,
        private router: Router,
    ) {}

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
    }

    onSubmit(): void {
        console.log('Por hora, só o clique...');
    }

    handleImage(file: File | null | undefined): void {
        this.image.set(file);
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
