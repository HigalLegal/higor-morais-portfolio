import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme.service';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    private readonly TRANSLANTE_JSON: string = 'home';

    private readonly SWORD_BLACK_THEME: string =
        '../../../assets/texture/espada-pro-tema-preto.png';
    private readonly SWORD_LIGHT_THEME: string =
        '../../../assets/texture/espada-pro-tema-branco.png';
    MY_PHOTO: string = '../../../assets/texture/sem-foto.jpg';

    windowWidth: number;

    constructor(
        private themeService: ThemeService,
        private translate: TranslateConfigService,
        private router: Router,
    ) {
        this.windowWidth = window.innerWidth;
    }

    getSwordIcon(): string {
        if (this.themeService.getThemeCurrent() == 'dark') {
            return this.SWORD_BLACK_THEME;
        }
        return this.SWORD_LIGHT_THEME;
    }

    recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(
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
}
