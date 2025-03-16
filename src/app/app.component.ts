import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './services/theme-service/theme.service';
import { TransitionComponent } from './components/transition/transition.component';
// import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, TransitionComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'portfolio';
    componentSelected: string = 'inicio';

    constructor(private themeService: ThemeService) {
        this.themeService.changeTheme(true);
    }

    updateComponent(aliasComponent: string) {
        this.componentSelected = aliasComponent;
    }
}
