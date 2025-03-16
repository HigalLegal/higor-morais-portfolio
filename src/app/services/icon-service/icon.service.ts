import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class IconService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    ) {}

    public registerIcons(...namesIcons: string[]): void {
        const prePath = '../../assets/icons/';

        namesIcons.forEach((icon) => {
            this.matIconRegistry.addSvgIcon(
                icon,
                this.domSanitizer.bypassSecurityTrustResourceUrl(
                    prePath + icon + '.svg',
                ),
            );
        });
    }
}
