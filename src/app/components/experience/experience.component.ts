import { Component, OnInit } from '@angular/core';
import ExperienceResponse from '../../models/response/experienceResponse';
import { DESCRIPTION_1, DESCRIPTION_2 } from './mocksExperiences';
import { CardComponent } from '../card/card.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import ExperienceI18N from './experienceI18N';

@Component({
    selector: 'app-experience',
    imports: [CardComponent],
    templateUrl: './experience.component.html',
    styleUrls: [
        './experience.component.scss',
        './experience.component.responsive.scss',
    ],
})
export class ExperienceComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'experience';

    experiences: ExperienceResponse[] = [
        {
            id: 1,
            companyName: 'Grupo GFT',
            description: DESCRIPTION_1,
            beginning: 'Maio de 2022',
            end: 'Setembro de 2022',
            technologiesWorked: [
                'Java',
                'Javascript',
                'Typescript',
                'Spring Boot',
                'Angular',
            ],
        },
        {
            id: 2,
            companyName: 'Touch Health',
            description: DESCRIPTION_2,
            beginning: 'Maio de 2023',
            end: 'Maio de 2025',
            technologiesWorked: [
                'Java',
                'Javascript',
                'Typescript',
                'Spring',
                'JSP',
                'React',
                'Next.js',
                'Docker',
            ],
        },
    ];

    private i18n: ExperienceI18N = {
        atual: '',
        tecnologiasTrabalhadas: '',
    };

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18n();
    }

    recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    generateTitle(experience: ExperienceResponse) {
        const { atual: actually } = this.i18n;
        return `${experience.companyName} | ${experience.beginning} - ${experience.end ? experience.end : actually}`;
    }

    generateSentence(technologies: string[]): string {
        const { tecnologiasTrabalhadas: message } = this.i18n;
        return generatePhraseTechnologies(message, technologies);
    }

    private insertI18n(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([atual, tecnologiasTrabalhadas]) => {
                this.i18n = { atual, tecnologiasTrabalhadas };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('atual'),
            this.recoverValue('tecnologiasTrabalhadas'),
        ];
    }
}
