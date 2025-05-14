import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './services/theme-service/theme.service';
import { RouterOutlet } from '@angular/router';
import { LoadingRouterComponent } from './shared/loading-router/loading-router.component';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, RouterOutlet, LoadingRouterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'portfolio';

    constructor(private themeService: ThemeService) {
        this.themeService.changeTheme(true);
    }
}
