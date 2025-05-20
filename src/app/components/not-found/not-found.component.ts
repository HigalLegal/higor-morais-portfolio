import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable, forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeScreenService } from '../../services/home-screen-service/home-screen.service';
import NotFoundI18N from './notFoundI18N';

@Component({
    selector: 'app-not-found',
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
})
export class NotFoundComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'notFound';

    i18n: NotFoundI18N = {
        title: '',
        message: '',
        toHome: '',
    };

    constructor(
        private translate: TranslateConfigService,
        private router: Router,
        private homeScreenService: HomeScreenService,
    ) {}

    ngOnInit(): void {
        this.insertI18N();
    }

    redirectHome(): void {
        this.router.navigate(['/']);
        this.homeScreenService.setHomeScreen('inicio');
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('title'),
            this.recoverValue('message'),
            this.recoverValue('toHome'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([title, message, toHome]) => {
                this.i18n = {
                    title,
                    message,
                    toHome,
                };
            },
        });
    }
}
