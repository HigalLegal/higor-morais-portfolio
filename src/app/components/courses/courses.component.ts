import { Component, HostListener, OnInit } from '@angular/core';
import { CardImageComponent } from '../card-image/card-image.component';
import { CourseResponse } from '../../models/response/courseResponse';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CardImageComponent,
        MatGridListModule,
        CommonModule,
        ButtonFormComponent,
    ],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
})
export class CoursesComponent {
    readonly TRANSLATE_JSON: string = 'courses';

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

    constructor(private translate: TranslateConfigService) {}

    recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(`${this.TRANSLATE_JSON}.${key}`);
    }

    generateDescription(technologies: string[]): string {
        const message =
            technologies.length > 1
                ? 'Tecnologias abordadas: '
                : 'Tecnologia abordada: ';
        return generatePhraseTechnologies(message, technologies);
    }
}
