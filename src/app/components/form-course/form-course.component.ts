import {
    AfterViewInit,
    Component,
    signal,
    computed,
    OnInit,
    DoCheck,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TechnologyResponse } from '../../models/response/technology-response';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import { TechnologyService } from '../../services/api/technology-service/technology.service';
import FormCourseI18N from './formCourseI18N';
import { Router, ActivatedRoute } from '@angular/router';
import CourseRequest from '../../models/request/courseRequest';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';
import { CourseService } from '../../services/api/course-service/course.service';
import { CourseResponse } from '../../models/response/courseResponse';

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
export class FormCourseComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'formCourse';
    private readonly MIN: number = 3;

    name = signal<string>('');
    urlCertificate = signal<string>('');
    importanceLevel = signal<number | null>(null);
    technologiesIds = signal<number[]>([]);
    image = signal<File | null | undefined>(null);

    disableButton = computed(() => {
        const isNameValid = this.name().trim().length > this.MIN;
        const isUrlCertificateValid =
            this.urlCertificate().trim().length > this.MIN;
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

    idRouter: string | number | null = null;

    currentRouter: string = '';

    technologies: TechnologyResponse[] = [];

    constructor(
        private translate: TranslateConfigService,
        private detector: ChangeDetectorRef,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private technologyService: TechnologyService,
        private courseService: CourseService,
        private snackBarService: SnackBarService,
    ) {
        this.currentRouter = this.router.url;
    }

    get importanceLevelValue(): number | null {
        return this.importanceLevel();
    }

    set importanceLevelValue(value: number | null) {
        this.importanceLevel.set(value);
    }

    get technologiesIdsValue(): number[] {
        return this.technologiesIds();
    }

    set technologiesIdsValue(value: number[]) {
        this.technologiesIds.set(value);
    }

    ngOnInit(): void {
        this.searchTechnologies();
        this.insertId();
    }

    ngAfterViewInit(): void {
        this.insertI18N();
        this.detector.detectChanges();
        this.searchCourseById();
    }

    onSubmit(): void {
        const rawImportance = this.importanceLevel();
        const importance = rawImportance !== null ? rawImportance : 0;

        const course = {
            name: this.name(),
            urlCertificate: this.urlCertificate(),
            importanceLevel: importance,
            technologiesIds: this.technologiesIds(),
        };

        if (this.currentRouter.includes('inserir-curso')) {
            this.postCreate(course, this.image());
        } else {
            this.putUpdate(course, this.image());
        }
    }

    handleImage(file: File | null | undefined): void {
        this.image.set(file);
    }

    private postCreate(
        course: CourseRequest,
        image: File | null | undefined,
    ): void {
        this.courseService.postCreate(course, image).subscribe({
            next: () => {
                this.openSnackBar(course.name);
                this.clearFields();
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private putUpdate(
        course: CourseRequest,
        image: File | null | undefined,
    ): void {
        if (this.idRouter) {
            this.courseService
                .putUpdate(this.idRouter, course, image)
                .subscribe({
                    next: () => {
                        this.openSnackBar(course.name);
                        this.router.navigate(['/']);
                    },
                    error: (err) => {
                        console.error('Erro inesperado! ', err);
                    },
                });
        }
    }

    private searchCourseById(): void {
        if (this.idRouter) {
            this.courseService.getById(this.idRouter).subscribe({
                next: (course) => {
                    this.insertFields(course);
                },
                error: (err) => {
                    console.error('Erro inesperado! ', err);
                },
            });
        }
    }

    private searchTechnologies(): void {
        this.technologyService.getAll().subscribe({
            next: (technologies) => {
                this.technologies = technologies;
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private insertFields(course: CourseResponse): void {
        this.name.set(course.name);
        this.urlCertificate.set(course.urlCertificate);
        this.importanceLevel.set(course.importanceLevel);
        this.technologiesIds.set(
            this.technologieForName(course.technologies).map(
                (technology) => technology.id,
            ),
        );
    }

    private technologieForName(
        technologiesName: string[],
    ): TechnologyResponse[] {
        return this.technologies.filter((technology) =>
            technologiesName.includes(technology.name),
        );
    }

    private insertId(): void {
        this.activeRouter.paramMap.subscribe((params) => {
            this.idRouter = params.get('id');
        });
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private openSnackBar(nameCourse: string): void {
        this.snackBarService.openSnackBarSucess(
            `${nameCourse} salvo com êxito!`,
        );
    }

    private clearFields(): void {
        this.name.set('');
        this.urlCertificate.set('');
        this.importanceLevel.set(null);
        this.technologiesIds.set([]);
        this.image.set(null);
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
        return this.currentRouter.includes('inserir-curso')
            ? !!this.image()
            : true;
    }
}
