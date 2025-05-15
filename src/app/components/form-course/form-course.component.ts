import { AfterViewInit, Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TechnologyResponse } from '../../models/response/technologyResponse';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import FormCourseI18N from './formCourseI18N';
import { Router } from '@angular/router';

@Component({
    selector: 'app-form-course',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        MatSelectModule,
        FileUploadComponent,
    ],
    templateUrl: './form-course.component.html',
    styleUrls: [
        './form-course.component.scss',
        './form-course.component.responsive.scss',
    ],
})
export class FormCourseComponent implements AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'formCourse';
    private readonly MIN: number = 3;

    name = signal<string>('');
    urlCertificate = signal<string>('');
    importanceLevel = signal<number | null>(null);
    technologiesIds = signal<number[]>([]);
    image = signal<File | null | undefined>(null);

    disableButton = computed(() => {
        const route = this.router.url;

        const isNameValid = this.name().trim().length > 3;
        const isUrlCertificateValid = this.urlCertificate().trim().length > 3;
        const isImportanceValid = this.importanceLevel() !== null;
        const hasTechnologies = this.technologiesIds().length > 0;
        const isImageValid = this.validateImage();

        return !(
            isNameValid &&
            isUrlCertificateValid &&
            isImportanceValid &&
            hasTechnologies &&
            isImageValid
        );
    });

    i18n: FormCourseI18N = {
        nameCourse: '',
        urlCertificate: '',
        importanceLevel: '',
        technologies: '',
        submit: '',
    };

    technologies: TechnologyResponse[] = [
        { id: 1, name: 'Angular', urlImage: '', importanceLevel: 3 },
        { id: 2, name: 'React', urlImage: '', importanceLevel: 4 },
        { id: 3, name: 'Vue', urlImage: '', importanceLevel: 2 },
    ];

    constructor(
        private translate: TranslateConfigService,
        private detector: ChangeDetectorRef,
        private router: Router,
    ) {}

    ngAfterViewInit(): void {
        this.insertI18N();
        this.detector.detectChanges();
    }

    onSubmit(): void {
        console.log('Deu bom.');
    }

    handleImage(file: File | null | undefined): void {
        this.image.set(file);
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([
                nameCourse,
                urlCertificate,
                importanceLevel,
                techonologies,
                submit,
            ]) => {
                this.i18n = {
                    nameCourse: nameCourse,
                    urlCertificate: urlCertificate,
                    importanceLevel: importanceLevel,
                    technologies: techonologies,
                    submit: submit,
                };
            },
        });
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('nameCourse'),
            this.recoverValue('urlCertificate'),
            this.recoverValue('importanceLevel'),
            this.recoverValue('techonologies'),
            this.recoverValue('submit'),
        ];
    }

    private validateImage(): boolean {
        const currentRouter = this.router.url;
        return currentRouter.includes('inserir-curso') ? !!this.image() : true;
    }
}
