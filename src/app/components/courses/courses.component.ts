import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { CardImageComponent } from '../card-image/card-image.component';
import { CourseResponse } from '../../models/response/courseResponse';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import CoursesI18N from './coursesI18N';

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

    courses: CourseResponse[] = [
        {
            id: 1,
            name: 'Introdução ao Angular',
            urlImage:
                'https://i.ibb.co/LSb6f2V/resteasy-reactive8863785267111177153upload.jpg',
            urlCertificate: 'https://example.com/certificado-angular',
            importanceLevel: 9,
            technologies: ['Angular', 'TypeScript', 'RxJS'],
        },
        {
            id: 2,
            name: 'Spring Boot Avançado',
            urlImage:
                'https://i.ibb.co/LSb6f2V/resteasy-reactive8863785267111177153upload.jpg',
            urlCertificate: 'https://example.com/certificado-spring-boot',
            importanceLevel: 10,
            technologies: ['Spring Boot', 'Java', 'Hibernate'],
        },
        {
            id: 3,
            name: 'Aprenda Next.js',
            urlImage:
                'https://i.ibb.co/LSb6f2V/resteasy-reactive8863785267111177153upload.jpg',
            urlCertificate: 'https://example.com/certificado-nextjs',
            importanceLevel: 8,
            technologies: ['Next.js', 'React', 'Node.js'],
        },
        {
            id: 4,
            name: 'Banco de Dados com PostgreSQL',
            urlImage:
                'https://i.ibb.co/LSb6f2V/resteasy-reactive8863785267111177153upload.jpg',
            urlCertificate: 'https://example.com/certificado-postgresql',
            importanceLevel: 7,
            technologies: ['PostgreSQL', 'SQL', 'Banco de Dados'],
        },
    ];

    descriptionsTechnologies: string[] = [];

    i18n: CoursesI18N = {
        technologies: '',
        technology: '',
        register: '',
    };

    isLoading = signal<boolean>(true);

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18n();
        this.descriptionsTechnologies = this.courses.map((course) =>
            this.generateDescription(course.technologies),
        );
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    handleDelete(): void {
        console.log('Por hora, apenas o clique.');
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
