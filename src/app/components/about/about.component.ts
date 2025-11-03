import { AfterViewInit, Component, signal } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme.service';
import { MatCardModule } from '@angular/material/card';
import { LongTextComponent } from '../long-text/long-text.component';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';

@Component({
    selector: 'app-about-me',
    imports: [MatCardModule, LongTextComponent, ApiLoadingComponent],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss', './about.component.responsive.scss'],
})
export class AboutComponent implements AfterViewInit {
    private readonly COIN_BLACK_1: string =
        'assets/img/moeda-1-para-tema-escuro.png';
    private readonly COIN_BLACK_2: string =
        'assets/img/moeda-2-para-tema-escuro.png';

    private readonly COIN_LIGHT_1: string =
        'assets/img/moeda-1-para-tema-claro.png';
    private readonly COIN_LIGHT_2: string =
        'assets/img/moeda-2-para-tema-claro.png';

    readonly textAboutMe: string = `Olá, tudo bem? Espero que sim!

        Meu nome é Higor Morais, trabalho como desenvolvedor e estudo no curso superior de Sistema de Informação no IFCE, campus Cedro. Sou um grande fã de tecnologia, programação é algo que faço até nas horas vagas, porque realmente gosto de explorar as tecnologias e desenvolver projetos. Quanto aos meus hobbies, gosto bastante de assistir futebol, sou bastante fã de lutas e também prático Karate.

        Moro e sou natural de Icó, no Ceará.`;

    isLoading = signal<boolean>(true);

    constructor(private themeService: ThemeService) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    getCoin1(): string {
        const currentTheme: string = this.themeService.getThemeCurrent();

        if (currentTheme == 'light') {
            return this.COIN_LIGHT_1;
        }

        return this.COIN_BLACK_1;
    }

    getCoin2(): string {
        const currentTheme: string = this.themeService.getThemeCurrent();

        if (currentTheme == 'light') {
            return this.COIN_LIGHT_2;
        }

        return this.COIN_BLACK_2;
    }
}
