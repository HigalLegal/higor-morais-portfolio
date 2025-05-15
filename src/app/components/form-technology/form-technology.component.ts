import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import FormTechnologyI18N from './formTechnologyI18N';
import { Router } from '@angular/router';

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
export class FormTechnologyComponent implements OnInit {
    private readonly TRANSLATE_JSON = 'formTechnology';

    name = signal<string>('');
    importanceLevel = signal<number | null>(null);
    image = signal<File | null | undefined>(null);

    i18n: FormTechnologyI18N = {
        nameTechnology: '',
        importanceLevel: '',
        submit: '',
    };

    constructor(
        private translate: TranslateConfigService,
        private router: Router,
    ) {}

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
    }

    onSubmit() {
        console.log('Por hora, só o clique...');
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('nameTechnology'),
            this.recoverValue('importanceLevel'),
            this.recoverValue('submit'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([nameTechnology, importanceLevel, submit]) => {
                this.i18n = { nameTechnology, importanceLevel, submit };
            },
            error: (err) => console.error('Erro inesperado! ' + err),
        });
    }

    private validateImage(): boolean {
        const currentRouter = this.router.url;

        return currentRouter.includes('inserir-curso') ? !this.image() : false;
    }
}
