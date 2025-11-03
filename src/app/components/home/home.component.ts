import {
    AfterViewInit,
    Component,
    HostListener,
    OnInit,
    signal,
} from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme.service';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import { ButtonActionComponent } from '../../shared/button-action/button-action.component';
import { TokenService } from '../../services/token-service/token.service';
import HomeI18N from '../home/homeI18N';

@Component({
    selector: 'app-home',
    imports: [ApiLoadingComponent, ButtonActionComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss', './home.component.responsive.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
    private readonly TRANSLANTE_JSON: string = 'home';

    private readonly SWORD_BLACK_THEME: string =
        '../../../assets/texture/espada-pro-tema-preto.png';
    private readonly SWORD_LIGHT_THEME: string =
        '../../../assets/texture/espada-pro-tema-branco.png';
    MY_PHOTO: string = 'assets/texture/sem-foto.jpg';

    windowWidth: number;

    isAdmin = signal<boolean>(false);

    isLoading = signal<boolean>(true);

    i18n: HomeI18N = {
        desenvolvedor: '',
        fraseLogin: '',
        tecnologiasTrabalhadas: '',
    };

    constructor(
        private themeService: ThemeService,
        private translate: TranslateConfigService,
        private router: Router,
        private tokenService: TokenService,
    ) {
        this.windowWidth = window.innerWidth;
        this.isAdmin.set(tokenService.isAdmin());
    }

    ngOnInit(): void {
        this.insertI18n();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    onLogout(): void {
        this.tokenService.clearToken();
        this.isAdmin.set(false);
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
