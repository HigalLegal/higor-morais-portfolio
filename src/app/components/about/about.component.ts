import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme.service';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-about-me',
    imports: [MatCardModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
})
export class AboutComponent {
    private readonly COIN_BLACK_1: string =
        '../../../assets/img/moeda-1-para-tema-escuro.png';
    private readonly COIN_BLACK_2: string =
        '../../../assets/img/moeda-2-para-tema-escuro.png';

    private readonly COIN_LIGHT_1: string =
        '../../../assets/img/moeda-1-para-tema-claro.png';
    private readonly COIN_LIGHT_2: string =
        '../../../assets/img/moeda-2-para-tema-claro.png';

    readonly textAboutMe: string = `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Aliquid laudantium sit magnam? Voluptatem doloribus blanditiis, explicabo veritatis molestias
        delectus qui molestiae ipsam placeat? Sint commodi beatae aperiam excepturi
        reprehenderit quisquam.`;

    constructor(private themeService: ThemeService) {}

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
