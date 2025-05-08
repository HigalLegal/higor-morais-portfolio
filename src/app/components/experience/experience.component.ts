import { Component } from '@angular/core';
import ExperienceResponse from '../../models/experienceResponse';
import { DESCRIPTION_1, DESCRIPTION_2 } from './mocksExperiences';
import { CardComponent } from '../card/card.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';

@Component({
    selector: 'app-experience',
    imports: [CardComponent],
    templateUrl: './experience.component.html',
    styleUrls: [
        './experience.component.scss',
        './experience.component.responsive.scss',
    ],
})
export class ExperienceComponent {
    readonly TRANSLATE_JSON: string = 'experience';

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

    constructor(private translate: TranslateConfigService) {}

    recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(`${this.TRANSLATE_JSON}.${key}`);
    }

    generateTitle(experience: ExperienceResponse) {
        return `${experience.companyName} | ${experience.beginning} - ${experience.end ? experience.end : 'Atual'}`;
    }

    generateSentence(technologies: string[]): string {
        const message = this.recoverValue('tecnologiasTrabalhadas');
        return generatePhraseTechnologies(message, technologies);
    }
}
