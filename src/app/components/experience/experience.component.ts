import { Component } from '@angular/core';
import ExperienceResponse from '../../models/experienceResponse';
import { DESCRIPTION_1, DESCRIPTION_2 } from './mocksExperiences';
import { CardExperienceComponent } from './card-experience/card-experience.component';

@Component({
    selector: 'app-experience',
    imports: [CardExperienceComponent],
    templateUrl: './experience.component.html',
    styleUrls: [
        './experience.component.scss',
        './experience.component.responsive.scss',
    ],
})
export class ExperienceComponent {
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
}
