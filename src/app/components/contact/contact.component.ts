import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { IconService } from '../../services/icon-service/icon.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';
import Link from './link';
import ContactI18N from './contactI18N';
import { Observable, forkJoin } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';

@Component({
    selector: 'app-contact',
    imports: [
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        ApiLoadingComponent,
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'contact';
    private readonly EMAIL: string = 'moraislimahigor@gmail.com';
    private readonly LINKS: Link[] = [
        { name: 'github', url: 'https://github.com/HigalLegal' },
        {
            name: 'linkedin',
            url: 'https://www.linkedin.com/in/higor-morais-dev/',
        },
    ];

    tooltipMessage: string = '';
    tooltipDisabled: boolean = true;
    i18n: ContactI18N = {
        email: '',
        github: '',
        linkedin: '',
    };

    isLoading = signal<boolean>(true);

    constructor(
        private translate: TranslateConfigService,
        private iconService: IconService,
        private snackBar: MatSnackBar,
        private snackbarService: SnackBarService,
    ) {
        this.iconService.registerIcons('github-icon', 'linkedin');
    }

    ngOnInit(): void {
        this.insertI18n();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    openLink(nameLink: string) {
        const { url } = this.LINKS.filter((link) => link.name == nameLink)[0];
        window.open(url, '_blank');
    }

    copyEmail() {
        navigator.clipboard
            .writeText(this.EMAIL)
            .then(() => {
                this.snackbarService.openSnackBarSucess(
                    `Email copiado com sucesso (${this.EMAIL})!`,
                );
            })
            .catch(() => {
                this.snackbarService.openSnackBarError(
                    'Erro ao copiar o email.',
                );
            });
    }

    private insertI18n(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([email, github, linkedin]) => {
                this.i18n = { email, github, linkedin };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('email'),
            this.recoverValue('github'),
            this.recoverValue('linkedin'),
        ];
    }
}
