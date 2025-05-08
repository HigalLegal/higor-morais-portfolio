import { Component } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { IconService } from '../../services/icon-service/icon.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Link from './link';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact',
    imports: [MatIconModule, MatButtonModule, MatSnackBarModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent {
    readonly TRANSLATE_JSON: string = 'contact';
    readonly EMAIL: string = 'moraislimahigor@gmail.com';
    readonly LINKS: Link[] = [
        { name: 'github', url: 'https://github.com/HigalLegal' },
        {
            name: 'linkedin',
            url: 'https://www.linkedin.com/in/higor-morais-dev/',
        },
    ];

    tooltipMessage: string = '';
    tooltipDisabled: boolean = true;

    constructor(
        private translate: TranslateConfigService,
        private iconService: IconService,
        private snackBar: MatSnackBar,
    ) {
        this.iconService.registerIcons('github-icon', 'linkedin');
    }

    recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(`${this.TRANSLATE_JSON}.${key}`);
    }

    openLink(nameLink: string) {
        const { url } = this.LINKS.filter((link) => link.name == nameLink)[0];
        window.open(url, '_blank');
    }

    copyEmail() {
        navigator.clipboard
            .writeText(this.EMAIL)
            .then(() => {
                this.snackBar.open(
                    `Email copiado com sucesso (${this.EMAIL})!`,
                    'Fechar',
                    {
                        duration: 3000, // milissegundos (3s)
                        verticalPosition: 'bottom',
                        horizontalPosition: 'center',
                        panelClass: 'snackbar-success', // opcional: estilo
                    },
                );
            })
            .catch(() => {
                this.snackBar.open('Erro ao copiar o email.', 'Fechar', {
                    duration: 3000,
                    panelClass: 'snackbar-error',
                });
            });
    }
}
