import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './services/theme-service/theme.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'portfolio';

    constructor(private themeService: ThemeService) {
        this.themeService.changeTheme(true);
    }
}