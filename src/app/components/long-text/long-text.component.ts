import { Component, Input, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';

@Component({
    selector: 'app-long-text',
    imports: [],
    templateUrl: './long-text.component.html',
    styleUrls: [
        './long-text.component.scss',
        './long-text.component.responsive.scss',
    ],
})
export class LongTextComponent implements OnInit {
    readonly TRANSLATE_JSON: string = 'longText';

    @Input() text: string = '';
    @Input() hideTextByDefault: boolean = false;

    hideText: boolean = false;

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.hideText = this.hideTextByDefault;
    }

    splitText(): string[] {
        return this.text.split('\n');
    }

    limitText(): string {
        const limit = 10;
        const expansionMessage = this.recoverValue('verMais');

        const words = this.text.trim().split(/\s+/);
        const limitWords = words.slice(0, limit).join(' ');

        return (
            limitWords + (words.length > limit ? `... ${expansionMessage}` : '')
        );
    }

    recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(`${this.TRANSLATE_JSON}.${key}`);
    }

    hideOrShowText(): void {
        this.hideText = !this.hideText;
    }
}
