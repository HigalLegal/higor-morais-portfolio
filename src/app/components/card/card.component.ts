import { TokenService } from './../../services/token-service/token.service';
import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    signal,
} from '@angular/core';
import { LongTextComponent } from '../long-text/long-text.component';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { ButtonActionComponent } from '../../shared/button-action/button-action.component';
import { Observable, forkJoin } from 'rxjs';

@Component({
    selector: 'app-card',
    imports: [LongTextComponent, ButtonFormComponent, ButtonActionComponent],
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
    @Output() onAction = new EventEmitter<void>();

    messageEdit: string = '';
    messageDelete: string = '';

    isAdmin = signal<boolean>(false);

    constructor(
        private translate: TranslateConfigService,
        private tokenService: TokenService,
    ) {
        this.isAdmin.set(tokenService.isAdmin());
    }

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
