import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TechnologyResponse } from '../../../models/technologyResponse';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-carousel',
    imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
    index = signal(0);
    technologies: TechnologyResponse[] = [
        {
            id: 1,
            name: 'Java',
            urlImage: 'https://i.imgur.com/NJEFNwm.png',
            importanceLevel: 10,
        },
        {
            id: 2,
            name: 'Javascript',
            urlImage: 'https://i.imgur.com/wxq9Zao.png',
            importanceLevel: 8,
        },
        {
            id: 1,
            name: 'Typescript',
            urlImage: 'https://i.imgur.com/EWNPLqS.png',
            importanceLevel: 9,
        },
    ];

    get visibleItems(): TechnologyResponse[] {
        return [...this.technologies];
    }

    next(): void {
        this.index.update((i) => (i + 1) % this.technologies.length);
    }

    prev(): void {
        this.index.update(
            (i) =>
                (i - 1 + this.technologies.length) % this.technologies.length,
        );
    }
}
