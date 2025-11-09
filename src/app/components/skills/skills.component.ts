import {
    Component,
    OnInit,
    AfterViewInit,
    signal,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TechnologyResponse } from '../../models/response/technology-response';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { RouterModule } from '@angular/router';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import { ButtonActionComponent } from '../../shared/button-action/button-action.component';
import { TechnologyService } from '../../services/api/technology-service/technology.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../services/token-service/token.service';
import SKillsI18N from './skillsI18N';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';

@Component({
    selector: 'app-skills',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        CommonModule,
        RouterModule,
        ButtonFormComponent,
        ButtonActionComponent,
        ApiLoadingComponent,
        MatSnackBarModule,
    ],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit, AfterViewInit {
    readonly TRANSLATE_JSON: string = 'skills';
    private touchStartX = 0;
    private touchEndX = 0;

    isAdmin = signal<boolean>(false);

    isButtonDeleting = signal<boolean>(false);

    index = signal(0);
    technologies: TechnologyResponse[] = [];

    i18n: SKillsI18N = {
        importanceLevel: '',
        register: '',
        edit: '',
        del: '',
    };

    isLoading = signal<boolean>(true);

    @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;

    constructor(
        private translate: TranslateConfigService,
        private technologyService: TechnologyService,
        private tokenService: TokenService,
        private snackBarService: SnackBarService,
    ) {
        this.isAdmin.set(tokenService.isAdmin());
    }

    ngOnInit(): void {
        this.insertI18N();
        this.searchTechnologies();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
        this.addSwipeListeners();
    }

    next(): void {
        this.index.update((i) => (i + 1) % this.technologies.length);
    }

    prev(): void {
        this.index.update(
            (i) =>
                (i - 1 + this.technologies.length) % this.technologies.length,
        );
    }

    handleDelete(id: number): void {
        const excludedTechnologyName = this.technologies.filter(
            (technology) => id == technology.id,
        )[0].name;

        this.technologyService.delete(id).subscribe({
            next: () => {
                this.openSucessDelete(excludedTechnologyName);
                this.searchTechnologies();
                this.isButtonDeleting.set(true);
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
                this.isButtonDeleting.set(true);
            },
        });

        this.isButtonDeleting.set(false);
    }

    private searchTechnologies(): void {
        this.technologyService.getAll().subscribe({
            next: (technologies) => {
                this.technologies = technologies;
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private openSucessDelete(nameTechnology: string) {
        this.snackBarService.openSnackBarSucess(
            `${nameTechnology} excluído com sucesso!`,
        );
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('importanceLevel'),
            this.recoverValue('register'),
            this.recoverValue('edit'),
            this.recoverValue('del'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([importanceLevel, register, edit, del]) => {
                this.i18n = { importanceLevel, register, edit, del };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }

    private addSwipeListeners(): void {
        const element = this.carouselWrapper.nativeElement;

        element.addEventListener('touchstart', (event: TouchEvent) => {
            this.touchStartX = event.changedTouches[0].screenX;
        });

        element.addEventListener('touchend', (event: TouchEvent) => {
            this.touchEndX = event.changedTouches[0].screenX;
            this.handleSwipeGesture();
        });
    }

    private handleSwipeGesture(): void {
        const swipeDistance = this.touchEndX - this.touchStartX;

        const swipeThreshold = 50;

        if (Math.abs(swipeDistance) < swipeThreshold) return;

        if (swipeDistance < 0) {
            this.next();
        } else {
            this.prev();
        }
    }
}
