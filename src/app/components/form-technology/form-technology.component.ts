import { Component, DoCheck, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';
import FormTechnologyI18N from './formTechnologyI18N';

@Component({
    selector: 'app-form-technology',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
    ],
    templateUrl: './form-technology.component.html',
    styleUrls: [
        './form-technology.component.scss',
        './form-technology.component.responsive.scss',
    ],
})
export class FormTechnologyComponent implements OnInit {
    private readonly TRANSLATE_JSON = 'formTechnology';

    name = signal<string>('');
    importanceLevel = signal<number | null>(null);

    i18n: FormTechnologyI18N = {
        nameTechnology: '',
        importanceLevel: '',
        submit: '',
    };

    constructor(private translate: TranslateConfigService) {}

    disableButton = computed(() => {
        return !(this.name().length > 2 && !!this.importanceLevel());
    });

    ngOnInit(): void {
        this.insertI18N();
    }

    onSubmit() {
        if (this.name && this.importanceLevel) {
            const request = {
                name: this.name,
                importanceLevel: this.importanceLevel,
            };
            console.log('Form enviado:', request);
        } else {
            console.log('Form inválido');
        }
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('nameTechnology'),
            this.recoverValue('importanceLevel'),
            this.recoverValue('submit'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([nameTechnology, importanceLevel, submit]) => {
                this.i18n = { nameTechnology, importanceLevel, submit };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }
}
