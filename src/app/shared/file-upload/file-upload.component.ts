import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { forkJoin, Observable } from 'rxjs';

@Component({
    selector: 'app-file-upload',
    imports: [MatIconModule],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'fileUpload';

    message: string = '';
    messageClear: string = '';
    fileName: string | null = null;

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    @Output() image = new EventEmitter<File | null | undefined>();

    constructor(private translate: TranslateConfigService) {}

    ngOnInit(): void {
        this.insertI18N();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (file) {
            this.image.emit(file);
            this.fileName = file.name;
        }
    }

    onClear(): void {
        const fileInput = document.getElementById(
            'fileInput',
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
        this.fileName = null;
        this.image.emit(null);
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [this.recoverValue('escolher'), this.recoverValue('limpar')];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([escolher, limpar]) => {
                this.message = escolher;
                this.messageClear = limpar;
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }
}
