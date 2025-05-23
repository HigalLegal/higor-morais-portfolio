import {
    Component,
    OnInit,
    signal,
    computed,
    AfterViewInit,
} from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable, forkJoin } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TechnologyResponse } from '../../models/response/technology-response';
import FormArticleI18N from './formArticleI18N';
import { TechnologyService } from '../../services/api/technology-service/technology.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';
import ArticleResponse from '../../models/response/articleResponse';
import ArticleRequest from '../../models/request/articleRequest';
import { ArticleService } from '../../services/api/article-service/article.service';

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
export class FormArticleComponent implements OnInit, AfterViewInit {
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

    technologies: TechnologyResponse[] = [];

    idRouter: number | string | null = null;

    constructor(
        private translate: TranslateConfigService,
        private articleService: ArticleService,
        private technologyService: TechnologyService,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private snackbarService: SnackBarService,
    ) {}

    get technologiesCoveredIdValue(): number[] {
        return this.technologiesCoveredId();
    }

    set technologiesCoveredIdValue(technologiesCoveredIdValue: number[]) {
        this.technologiesCoveredId.set(technologiesCoveredIdValue);
    }

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
        this.searchTechnologies();
        this.insertId();
    }

    ngAfterViewInit(): void {
        this.searchArticleById();
    }

    onSubmit(): void {
        const article: ArticleRequest = {
            title: this.title(),
            summary: this.summary(),
            urlArticle: this.urlArticle(),
            technologiesCoveredId: this.technologiesCoveredId(),
        };

        if (this.router.url.includes('inserir-artigo')) {
            this.postCreate(article);
        } else {
            this.putUpdate(article);
        }
    }

    private postCreate(article: ArticleRequest): void {
        this.articleService.postCreate(article).subscribe({
            next: () => {
                this.clearFields();
                this.openSnackBar();
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private putUpdate(article: ArticleRequest): void {
        if (this.idRouter) {
            this.articleService.putCreate(this.idRouter, article).subscribe({
                next: () => {
                    this.openSnackBar();
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error('Erro inesperado! ', err);
                },
            });
        }
    }

    private searchArticleById(): void {
        if (this.idRouter) {
            this.articleService.getById(this.idRouter).subscribe({
                next: (article) => {
                    this.insertFields(article);
                },
                error: (err) => {
                    console.error('Erro inesperado! ', err);
                },
            });
        }
    }

    private clearFields(): void {
        this.title.set('');
        this.summary.set('');
        this.urlArticle.set('');
        this.technologiesCoveredId.set([]);
    }

    private insertFields(article: ArticleResponse) {
        this.title.set(article.title);
        this.summary.set(article.summary);
        this.urlArticle.set(article.urlArticle);
        this.technologiesCoveredId.set(
            this.technologieForName(article.technologiesCovered).map(
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

    private openSnackBar(): void {
        this.snackbarService.openSnackBarSucess('Artigo salvo com êxito!');
    }

    private insertId(): void {
        this.activeRouter.paramMap.subscribe((params) => {
            this.idRouter = params.get('id');
        });
    }
}
