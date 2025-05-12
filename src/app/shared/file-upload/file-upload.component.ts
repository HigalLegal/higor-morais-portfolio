import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-file-upload',
    imports: [MatIconModule],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'fileUpload';

    message: string = '';
    fileName: string | null = null;
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
        } else {
            this.image.emit(null);
            this.fileName = null;
        }
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private insertI18N(): void {
        this.recoverValue('escolher').subscribe({
            next: (escolher) => {
                this.message = escolher;
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }
}
