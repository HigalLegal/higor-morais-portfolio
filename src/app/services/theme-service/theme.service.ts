import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly THEME: string = 'theme';

    constructor() {}

    changeTheme(isDarkTheme: boolean): void {
        localStorage.setItem(this.THEME, isDarkTheme ? 'dark' : 'light');
        this.applyTheme();
    }

    getThemeCurrent(): string {
        return localStorage.getItem(this.THEME) || 'dark';
    }

    private applyTheme() {
        const themeCurrent = localStorage.getItem(this.THEME) || 'dark';

        if (themeCurrent == 'dark') {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }
}
