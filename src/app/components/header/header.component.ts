import { Component, HostListener, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { IconService } from '../../services/icon-service/icon.service';
import { MatListModule } from '@angular/material/list';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { ThemeService } from '../../services/theme-service/theme.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeScreenService } from '../../services/home-screen.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import HeaderI18n from './headerI18N';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
    ],
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss',
        './header.component.responsive.scss',
    ],
    animations: [
        trigger('rotateIcon', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(90deg)' })),
            transition('default <=> rotated', animate('2000ms ease-in-out')),
        ]),
        trigger('slideDown', [
            state(
                'hidden',
                style({
                    transform: 'translateY(-100%)',
                    opacity: 0,
                }),
            ),
            state(
                'visible',
                style({
                    transform: 'translateY(0)',
                    opacity: 1,
                }),
            ),
            transition('hidden => visible', animate('2000ms ease-in')),
            transition('visible => hidden', animate('2000ms ease-out')),
        ]),
    ],
})
export class HeaderComponent implements OnInit {
    private readonly TRANSLANTE_JSON = 'header';

    i18n: HeaderI18n = {
        inicio: '',
        sobreMim: '',
        habilidades: '',
        cursos: '',
        experiencias: '',
        projetos: '',
        artigos: '',
        contateMe: '',
        mudarTemaEscuro: '',
        mudarTemaClaro: '',
    };
    name: string = 'Higor Morais';
    isOpenMenu: boolean = false;
    navItems: string[] = [
        'inicio',
        'sobreMim',
        'habilidades',
        'cursos',
        'experiencias',
        'projetos',
        'artigos',
        'contateMe',
    ];
    windowWidth: number;
    tooltipClass: string = 'mat-tooltip';
    themeColor: 'dark' | 'light' = 'dark';

    constructor(
        private translate: TranslateConfigService,
        private iconService: IconService,
        private themeService: ThemeService,
        private homeScreenService: HomeScreenService,
        private router: Router,
    ) {
        this.iconService.registerIcons('medieval-celta');
        this.windowWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.insertI18n();
    }

    recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLANTE_JSON}.${key}`,
        );
    }

    onChangeTheme(): void {
        const currentTheme = this.themeService.getThemeCurrent();

        if (currentTheme == 'dark') {
            this.themeService.changeTheme(false);
        } else {
            this.themeService.changeTheme(true);
        }
        this.themeColor =
            this.themeService.getThemeCurrent() == 'dark' ? 'dark' : 'light';
    }

    getUnusedTheme(): string {
        const currentTheme = this.themeService.getThemeCurrent();

        if (currentTheme && currentTheme == 'dark') {
            return 'light';
        }
        return 'dark';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        const newWindowWidth: number = (event.target as Window).innerWidth;
        if (newWindowWidth >= 1090) {
            this.isOpenMenu = false;
        }
        this.windowWidth = (event.target as Window).innerWidth;
    }

    openOrCloseMenu() {
        this.isOpenMenu = !this.isOpenMenu;
    }

    private insertI18n(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([
                inicio,
                sobreMim,
                habilidades,
                cursos,
                experiencias,
                projetos,
                artigos,
                contateMe,
                mudarTemaEscuro,
                mudarTemaClaro,
            ]) => {
                this.i18n = {
                    inicio,
                    sobreMim,
                    habilidades,
                    cursos,
                    experiencias,
                    projetos,
                    artigos,
                    contateMe,
                    mudarTemaEscuro,
                    mudarTemaClaro,
                };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('inicio'),
            this.recoverValue('sobreMim'),
            this.recoverValue('habilidades'),
            this.recoverValue('cursos'),
            this.recoverValue('experiencias'),
            this.recoverValue('projetos'),
            this.recoverValue('artigos'),
            this.recoverValue('contateMe'),
            this.recoverValue('mudarTemaEscuro'),
            this.recoverValue('mudarTemaClaro'),
        ];
    }

    openComponent(aliasComponent: string): void {
        const currentRoute: string = this.router.url;

        if (currentRoute != '/') {
            this.router.navigate(['/']);
        }

        this.homeScreenService.setHomeScreen(aliasComponent);
    }
}
