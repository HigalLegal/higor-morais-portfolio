import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TechnologyResponse } from '../../models/technologyResponse';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-skills',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        CommonModule,
        RouterModule,
    ],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
})
export class SkillsComponent {
    readonly TRANSLATE_JSON: string = 'skills';

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

    constructor(private translate: TranslateConfigService) {}

    get visibleItems(): TechnologyResponse[] {
        return [...this.technologies];
    }

    recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(`${this.TRANSLATE_JSON}.${key}`);
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
