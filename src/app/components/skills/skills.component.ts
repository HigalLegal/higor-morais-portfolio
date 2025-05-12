import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TechnologyResponse } from '../../models/response/technologyResponse';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { RouterModule } from '@angular/router';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import SKillsI18N from './skillsI18N';

@Component({
    selector: 'app-skills',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        CommonModule,
        RouterModule,
        ButtonFormComponent,
        ApiLoadingComponent,
    ],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
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

    i18n: SKillsI18N = {
        register: '',
        edit: '',
    };

    isLoading: boolean = true;

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18N();
        setTimeout(() => {
            this.isLoading = false;
        }, 500); // simula uma chamada pra API
    }

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

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [this.recoverValue('register'), this.recoverValue('edit')];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([register, edit]) => {
                this.i18n = { register, edit };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }
}
