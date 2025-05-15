import { AfterViewInit, Component } from '@angular/core';
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
        '../../../assets/img/moeda-1-para-tema-escuro.png';
    private readonly COIN_BLACK_2: string =
        '../../../assets/img/moeda-2-para-tema-escuro.png';

    private readonly COIN_LIGHT_1: string =
        '../../../assets/img/moeda-1-para-tema-claro.png';
    private readonly COIN_LIGHT_2: string =
        '../../../assets/img/moeda-2-para-tema-claro.png';

    readonly textAboutMe: string = `Olá, tudo bem? Espero que sim!

        Meu nome é  Higor Morais, trabalho como desenvolvedor e estudo no curso superior de Sistema de Informação no IFCE, campus Cedro. Sou apaixonado por tecnologia, programação é algo que faço até nas horas vagas, porque realmente gosto de explorar as tecnologias e desenvolver projetos. Sou alguém que não tem medo de desafios, algo que também posso aplicar no meu hobby: o karate. A prática me ensina disciplina e perseverança, características que levo para todas as áreas da minha vida.

        Nos meus momentos livres, também sou fã de animes e mangás, o que me ajuda a relaxar e explorar novas perspectivas criativas. Sou natural de Icó, no Ceará.`;

    isLoading = true;

    constructor(private themeService: ThemeService) {}

    ngAfterViewInit(): void {
        this.isLoading = false;
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
