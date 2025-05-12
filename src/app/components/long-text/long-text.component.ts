import { Component, Input, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import LongTextI18N from './longTextI18N';

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
    limitedText: string = '';

    i18n: LongTextI18N = {
        verMais: '',
        verMenos: '',
    }

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.hideText = this.hideTextByDefault;
        this.insertI18N();
    }

    splitText(): string[] {
        return this.text.split('\n');
    }

    updateLimitedText(): void {
        const limit = 10;
        const words = this.text.trim().split(/\s+/);
        const limitWords = words.slice(0, limit).join(' ');
        const suffix = words.length > limit ? `... ${this.i18n.verMais}` : '';
        this.limitedText = limitWords + suffix;
    }

    hideOrShowText(): void {
        this.hideText = !this.hideText;
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(`${this.TRANSLATE_JSON}.${key}`);
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('verMais'),
            this.recoverValue('verMenos'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([verMais, verMenos]) => {
                this.i18n = { verMais, verMenos };
                this.updateLimitedText();
            },
            error: err => console.error('Erro inesperado! ' + err),
        });
    }
}
