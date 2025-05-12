import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-file-upload',
    imports: [MatIconModule],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
    private readonly TRANSLATE_JSON: string = 'fileUpload';

    message: string = '';

    constructor(private translate: TranslateConfigService) {}

    private recoverValue(key: string): Observable<string> {
            return this.translate.retrieveKeyValueObservable(
                `${this.TRANSLATE_JSON}.${key}`,
            );
        }

    private insertI18N(): void {
        this.recoverValue('escolher').subscribe({
            next: escolher => { this.message = escolher; },
            error: err => { console.error('Erro inesperado! ', err) }
    });
    }
}
