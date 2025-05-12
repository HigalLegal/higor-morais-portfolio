import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme.service';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import HomeI18N from '../home/homeI18N';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    private readonly TRANSLANTE_JSON: string = 'home';

    private readonly SWORD_BLACK_THEME: string =
        '../../../assets/texture/espada-pro-tema-preto.png';
    private readonly SWORD_LIGHT_THEME: string =
        '../../../assets/texture/espada-pro-tema-branco.png';
    MY_PHOTO: string = '../../../assets/texture/sem-foto.jpg';

    windowWidth: number;

    i18n: HomeI18N = {
        desenvolvedor: '',
        fraseLogin: '',
        tecnologiasTrabalhadas: '',
    };

    constructor(
        private themeService: ThemeService,
        private translate: TranslateConfigService,
        private router: Router,
    ) {
        this.windowWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.insertI18n();
    }

    getSwordIcon(): string {
        if (this.themeService.getThemeCurrent() == 'dark') {
            return this.SWORD_BLACK_THEME;
        }
        return this.SWORD_LIGHT_THEME;
    }

    recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLANTE_JSON}.${key}`,
        );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.windowWidth = (event.target as Window).innerWidth;
    }

    onLogin(): void {
        this.router.navigate(['/login']);
    }

    private insertI18n(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([desenvolvedor, fraseLogin, tecnologiasTrabalhadas]) => {
                this.i18n = {
                    desenvolvedor,
                    fraseLogin,
                    tecnologiasTrabalhadas,
                };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('desenvolvedor'),
            this.recoverValue('fraseLogin'),
            this.recoverValue('tecnologiasTrabalhadas'),
        ];
    }
}
