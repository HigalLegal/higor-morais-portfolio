import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeScreenService {

    private selectedHomeScreen = signal<string>('inicio');

    constructor() { }

    setHomeScreen(homeScreen: string): void {
        this.selectedHomeScreen.set(homeScreen);
    }

    getHomeScreen(): string {
        return this.selectedHomeScreen();
    }
}
