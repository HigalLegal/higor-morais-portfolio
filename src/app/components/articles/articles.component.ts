import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import ArticleResponse from '../../models/response/articleResponse';
import { CardComponent } from '../card/card.component';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import ArticleI18N from './articlesI18N';

@Component({
    selector: 'app-articles',
    imports: [CardComponent, ApiLoadingComponent, ButtonFormComponent],
    templateUrl: './articles.component.html',
    styleUrls: [
        './articles.component.scss',
        './articles.component.responsive.scss',
    ],
})
export class ArticlesComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'articles';
    i18n: ArticleI18N = {
        technologies: '',
        technology: '',
        register: '',
    };

    articles: ArticleResponse[] = [
        {
            id: 1,
            title: 'Explorando o Poder do Angular no Desenvolvimento Web',
            summary:
                'Uma análise profunda das vantagens do Angular em aplicações empresariais de larga escala.',
            urlArticle: 'https://example.com/artigos/angular-enterprise',
            date: '2024-11-12',
            technologiesCovered: ['Angular', 'TypeScript', 'RxJS'],
        },
        {
            id: 2,
            title: 'Microserviços com Spring Boot: Boas Práticas e Armadilhas',
            summary:
                'Descubra os padrões recomendados e os erros comuns ao projetar sistemas baseados em microsserviços com Spring Boot.',
            urlArticle: 'https://example.com/artigos/spring-boot-microservices',
            date: '2023-08-30',
            technologiesCovered: ['Java', 'Spring Boot', 'Docker'],
        },
        {
            id: 3,
            title: 'React ou Vue? Comparativo Técnico e Estratégico',
            summary:
                'Um comparativo entre os dois frameworks mais populares para frontend, com foco em performance, curva de aprendizado e manutenção.',
            urlArticle: 'https://example.com/artigos/react-vs-vue',
            date: '2025-01-15',
            technologiesCovered: ['React', 'Vue.js', 'JavaScript'],
        },
        {
            id: 4,
            title: 'Deploy Contínuo com GitHub Actions e Vercel',
            summary:
                'Automatize o ciclo de entrega contínua usando ferramentas modernas e gratuitas.',
            urlArticle: 'https://example.com/artigos/github-actions-vercel',
            date: '2024-05-22',
            technologiesCovered: ['CI/CD', 'GitHub Actions', 'Vercel'],
        },
    ];

    textsDescription: string[] = [];

    isLoading = signal<boolean>(true);

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18N();
        this.textsDescription = this.articles.map((article) =>
            this.generateSentence(article.technologiesCovered),
        );
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    handleDelete(): void {
        console.log('Por hora, apenas o clique...');
    }

    private generateSentence(technologies: string[]): string {
        const message =
            technologies.length > 1
                ? this.i18n.technologies
                : this.i18n.technology;
        return generatePhraseTechnologies(message, technologies);
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('technologies'),
            this.recoverValue('technology'),
            this.recoverValue('register'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([technologies, technology, register]) => {
                this.i18n = { technologies, technology, register };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }
}
