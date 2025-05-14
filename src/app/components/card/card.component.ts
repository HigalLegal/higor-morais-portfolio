import { Component, Input, OnInit } from '@angular/core';
import { LongTextComponent } from '../long-text/long-text.component';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-card',
    imports: [LongTextComponent, ButtonFormComponent],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss', './card.component.responsive.scss'],
})
export class CardComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'card';

    @Input() title: string = '';
    @Input() description: string = '';
    @Input() technologiesUsed: string = '';
    @Input() url?: string;
    @Input() hideTextByDefault: boolean = false;

    @Input() urlRouterFormEdit?: string;

    messageEdit: string = '';

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18N();
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private insertI18N(): void {
        this.recoverValue('edit').subscribe({
            next: (edit) => {
                this.messageEdit = edit;
            },
            error: (err) => console.log('Erro inesperado! ' + err),
        });
    }
}
