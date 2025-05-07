import { Component, HostListener, OnInit } from '@angular/core';
import { CardImageComponent } from '../card-image/card-image.component';
import { CourseResponse } from '../../models/courseResponse';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [CardImageComponent, MatGridListModule, CommonModule],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
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

    cols: number = 2; // Número inicial de colunas

    ngOnInit(): void {
        this.onResize(); // Ajusta o número de colunas ao carregar a página
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        // Ajusta o número de colunas com base na largura da tela
        if (window.innerWidth <= 600) {
            this.cols = 1; // 1 coluna para telas pequenas
        } else if (window.innerWidth <= 900) {
            this.cols = 2; // 2 colunas para telas médias
        } else {
            this.cols = 3; // 3 colunas para telas grandes
        }

        console.log(this.cols);
    }

    generateDescription(technologies: string[]): string {
        return `Tecnologias abordadas: ${technologies.join(', ')}`;
    }
}
