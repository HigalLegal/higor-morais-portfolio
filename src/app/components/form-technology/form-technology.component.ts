import {
    Component,
    OnInit,
    signal,
    computed,
    AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import FormTechnologyI18N from './formTechnologyI18N';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyService } from '../../services/api/technology-service/technology.service';
import TechnologyRequest from '../../models/request/technology-request';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';

@Component({
    selector: 'app-form-technology',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        FileUploadComponent,
    ],
    templateUrl: './form-technology.component.html',
    styleUrls: [
        './form-technology.component.scss',
        './form-technology.component.responsive.scss',
    ],
})
export class FormTechnologyComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON = 'formTechnology';

    idRouter: string | number | null = null;

    name = signal<string>('');
    importanceLevel = signal<number | null>(null);
    image = signal<File | null | undefined>(null);

    currentRouter: string = '';

    i18n: FormTechnologyI18N = {
        nameTechnology: '',
        importanceLevel: '',
        submit: '',
        submitSucess: '',
    };

    constructor(
        private translate: TranslateConfigService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private technologyService: TechnologyService,
        private snackbarService: SnackBarService,
    ) {
        this.currentRouter = this.router.url;
    }

    disableButton = computed(() => {
        const currentRoute = this.router.url;

        const isNameValid = this.name().trim().length > 3;
        const isImportanceValid = this.importanceLevel() !== null;
        const isImageValid =
            !currentRoute.includes('inserir-tecnologia') || !!this.image();

        return !(isNameValid && isImportanceValid && isImageValid);
    });

    ngOnInit(): void {
        this.insertI18N();
        this.insertId();
    }

    ngAfterViewInit(): void {
        this.insertFields();
    }

    onSubmit() {
        const technology: TechnologyRequest = {
            name: this.name(),
            importanceLevel: this.importanceLevel(),
        };

        if (this.currentRouter.includes('inserir-tecnologia')) {
            this.postCreate(technology, this.image());
        } else {
            this.putUpdate(technology, this.image());
        }
    }

    private insertFields(): void {
        if (this.idRouter) {
            this.technologyService.getById(this.idRouter).subscribe({
                next: (technology) => {
                    this.name.set(technology.name);
                    this.importanceLevel.set(technology.importanceLevel);
                },
            });
        }
    }

    private insertId(): void {
        this.activeRoute.paramMap.subscribe((params) => {
            this.idRouter = params.get('id');
        });
    }

    private postCreate(
        technology: Partial<TechnologyRequest>,
        image: File | null | undefined,
    ) {
        this.technologyService.postCreate(technology, this.image()).subscribe({
            next: () => {
                this.openSnackBar();
                this.clearFields();
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private putUpdate(
        technology: Partial<TechnologyRequest>,
        image: File | null | undefined,
    ): void {
        if (this.idRouter) {
            this.technologyService
                .putUpdate(this.idRouter, technology, image)
                .subscribe({
                    next: () => {
                        this.openSnackBar();
                        this.router.navigate(['/']);
                    },
                    error: (err) => {
                        console.error('Erro inesperado! ', err);
                    },
                });
        }
    }

    private openSnackBar(): void {
        this.snackbarService.openSnackBarSucess(this.i18n.submitSucess);
    }

    private clearFields(): void {
        this.name.set('');
        this.importanceLevel.set(null);
        this.image.set(null);
        this.clearImage();
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private clearImage(): void {
        const fileInput = document.getElementById(
            'fileInput',
        ) as HTMLInputElement;
        fileInput.value = '';
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('nameTechnology'),
            this.recoverValue('importanceLevel'),
            this.recoverValue('submit'),
            this.recoverValue('submitSucess'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([nameTechnology, importanceLevel, submit, submitSucess]) => {
                this.i18n = {
                    nameTechnology,
                    importanceLevel,
                    submit,
                    submitSucess,
                };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }
}
