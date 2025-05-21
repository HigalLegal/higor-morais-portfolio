import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../services/token-service/token.service';
import SKillsI18N from './skillsI18N';

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

    constructor(
        private translate: TranslateConfigService,
        private technologyService: TechnologyService,
        private tokenService: TokenService,
        private snackBar: MatSnackBar,
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
        this.snackBar.open(
            `${nameTechnology} excluído com sucesso!`,
            'Fechar',
            {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                panelClass: 'snackbar-success',
            },
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
}
