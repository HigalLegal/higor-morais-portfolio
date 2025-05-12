import { Component, DoCheck, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import LoginI18N from './loginI18N';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', './login.component.responsive.scss'],
})
export class LoginComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'login';
    private readonly MIN: number = 3;

    email = signal<string>('');
    password = signal<string>('');

    i18n: LoginI18N = {
        email: '',
        password: '',
    };

    constructor(private translate: TranslateConfigService) {}

    disableButton = computed(() => {
        return (
            this.email().length <= this.MIN &&
            this.password().length <= this.MIN
        );
    });

    ngOnInit(): void {
        this.insertI18N();
    }

    onLogin(): void {
        console.log('Mock');
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [this.recoverValue('email'), this.recoverValue('password')];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([email, password]) => {
                this.i18n = { email, password };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }
}
