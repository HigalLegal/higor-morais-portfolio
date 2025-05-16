import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LongTextComponent } from '../long-text/long-text.component';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { ButtonActionComponent } from '../../shared/button-action/button-action.component';
import { Observable, forkJoin } from 'rxjs';

@Component({
    selector: 'app-card-image',
    imports: [
        MatCardModule,
        LongTextComponent,
        ButtonFormComponent,
        ButtonActionComponent,
    ],
    templateUrl: './card-image.component.html',
    styleUrl: './card-image.component.scss',
})
export class CardImageComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'card';

    @Input() title: string = '';
    @Input() imageUrl: string = '';
    @Input() url: string = '';
    @Input() description?: string;
    @Input() technologiesUsed: string = '';

    @Input() urlRouterFormEdit?: string;
    @Input() onAction?: () => void;

    messageEdit: string = '';
    messageDelete: string = '';

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18N();
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [this.recoverValue('edit'), this.recoverValue('del')];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([edit, del]) => {
                this.messageEdit = edit;
                this.messageDelete = del;
            },
            error: (err) => console.log('Erro inesperado! ' + err),
        });
    }
}
