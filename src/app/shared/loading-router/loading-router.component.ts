import { Component, OnDestroy } from '@angular/core';
import {
    Router,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-loading-router',
    imports: [CommonModule, MatProgressBarModule],
    templateUrl: './loading-router.component.html',
    styleUrl: './loading-router.component.scss',
})
export class LoadingRouterComponent implements OnDestroy {
    loading = false;
    private routerSub: Subscription;

    constructor(private router: Router) {
        this.routerSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.loading = true;
            }

            if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                setTimeout(() => {
                    this.loading = false;
                }, 250);
            }
        });
    }

    ngOnDestroy(): void {
        this.routerSub.unsubscribe();
    }
}
