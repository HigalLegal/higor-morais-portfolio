import { Component } from '@angular/core';
import ArticleResponse from '../../models/response/articleResponse';
import { CardComponent } from '../card/card.component';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';

@Component({
    selector: 'app-articles',
    imports: [CardComponent],
    templateUrl: './articles.component.html',
    styleUrls: [
        './articles.component.scss',
        './articles.component.responsive.scss',
    ],
})
export class ArticlesComponent {
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

    generateSentence(technologies: string[]): string {
        const message =
            technologies.length > 1
                ? 'Tecnologias abordadas: '
                : 'Tecnologia aborda: ';
        return generatePhraseTechnologies(message, technologies);
    }
}
