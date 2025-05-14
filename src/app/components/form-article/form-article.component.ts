import { Component, OnInit, signal, computed } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable, forkJoin } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TechnologyResponse } from '../../models/response/technologyResponse';
import FormArticleI18N from './formArticleI18N';

@Component({
    selector: 'app-form-article',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        MatSelectModule,
    ],
    templateUrl: './form-article.component.html',
    styleUrls: [
        './form-article.component.scss',
        './form-article.component.responsive.scss',
    ],
})
export class FormArticleComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'formArticle';
    private readonly MIN: number = 3;

    title = signal<string>('');
    summary = signal<string>('');
    urlArticle = signal<string>('');
    technologiesCoveredId = signal<number[]>([]);

    i18n: FormArticleI18N = {
        title: '',
        summary: '',
        urlArticle: '',
        technologiesCovered: '',
        submit: '',
    };

    technologies: TechnologyResponse[] = [
        { id: 1, name: 'Angular', urlImage: '', importanceLevel: 3 },
        { id: 2, name: 'React', urlImage: '', importanceLevel: 4 },
        { id: 3, name: 'Vue', urlImage: '', importanceLevel: 2 },
    ];

    constructor(private translate: TranslateConfigService) {}

    disableButton = computed(() => {
        return (
            this.title().length <= this.MIN ||
            this.summary().length <= this.MIN ||
            this.urlArticle().length <= this.MIN ||
            this.technologiesCoveredId().length < 1
        );
    });

    ngOnInit(): void {
        this.insertI18N();
    }

    onSubmit(): void {
        console.log('Por hora, só o clique mesmo...');
    }

    private recoverValue(key: string) {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('title'),
            this.recoverValue('summary'),
            this.recoverValue('urlArticle'),
            this.recoverValue('technologiesCovered'),
            this.recoverValue('submit'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([
                title,
                summary,
                urlArticle,
                technologiesCovered,
                submit,
            ]) => {
                this.i18n = {
                    title,
                    summary,
                    urlArticle,
                    technologiesCovered,
                    submit,
                };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }
}
