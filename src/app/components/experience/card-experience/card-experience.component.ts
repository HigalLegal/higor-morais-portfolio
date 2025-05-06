import { Component, Input } from '@angular/core';
import { TranslateConfigService } from '../../../services/translate-config-service/translate-config-service';
import { LongTextComponent } from '../../long-text/long-text.component';

@Component({
    selector: 'app-card-experience',
    imports: [LongTextComponent],
    templateUrl: './card-experience.component.html',
    styleUrls: [
        './card-experience.component.scss',
        './card-experience.component.responsive.scss',
    ],
})
export class CardExperienceComponent {
    readonly TRANSLATE_JSON: string = 'experience';

    @Input() companyName: string = '';
    @Input() description: string = '';
    @Input() beginning: string = '';
    @Input() end: string | null = '';
    @Input() technologiesWorked: string[] = [];

    constructor(private translate: TranslateConfigService) {}

    recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(`${this.TRANSLATE_JSON}.${key}`);
    }

    generateSentence(): string {
        return `${this.recoverValue('tecnologiasTrabalhadas')}${this.technologiesWorked.join(' | ')}`;
    }
}
