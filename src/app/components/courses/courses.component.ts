import {
    Component,
    OnInit,
    AfterViewInit,
    signal,
    effect,
} from '@angular/core';
import { CardImageComponent } from '../card-image/card-image.component';
import { CourseResponse } from '../../models/response/courseResponse';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import { TokenService } from '../../services/token-service/token.service';
import { CourseService } from '../../services/api/course-service/course.service';
import CoursesI18N from './coursesI18N';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CardImageComponent,
        MatGridListModule,
        CommonModule,
        ButtonFormComponent,
        ApiLoadingComponent,
    ],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'courses';

    courses = signal<CourseResponse[]>([]);

    descriptionsTechnologies = signal<string[]>([]);

    i18n: CoursesI18N = {
        technologies: '',
        technology: '',
        register: '',
    };

    isAdmin = signal<boolean>(false);

    isLoading = signal<boolean>(true);

    constructor(
        private translate: TranslateConfigService,
        private tokenService: TokenService,
        private courseService: CourseService,
        private snackbarService: SnackBarService,
    ) {
        this.isAdmin.set(tokenService.isAdmin());

        effect(() => {
            const courses = this.courses();
            const i18n = this.i18n;

            if (courses.length > 0 && i18n.technologies.length > 0) {
                const descriptions = courses.map((course) =>
                    this.generateDescription(course.technologies),
                );
                this.descriptionsTechnologies.set(descriptions);
            }
        });
    }

    ngOnInit(): void {
        this.searchCourses();
        this.insertI18n();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    handleDelete(id: number): void {
        this.courseService.delete(id).subscribe({
            next: () => {
                this.openSnackbar();
                this.searchCourses();
            },
            error: (err) => {
                console.error('Erro inesperado', err);
            },
        });
    }

    private searchCourses(): void {
        this.courseService.getAll().subscribe({
            next: (courses) => {
                this.courses.set(courses);
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private openSnackbar(): void {
        this.snackbarService.openSnackBarSucess(`Excluído com exito!`);
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private generateDescription(technologies: string[]): string {
        const message =
            technologies.length > 1
                ? this.i18n.technologies
                : this.i18n.technology;
        return generatePhraseTechnologies(message, technologies);
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('technologies'),
            this.recoverValue('technology'),
            this.recoverValue('register'),
        ];
    }

    private insertI18n(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([technologies, technology, register]) => {
                this.i18n = { technologies, technology, register };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }
}
