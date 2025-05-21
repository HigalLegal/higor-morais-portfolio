import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-snack-bar-error',
    imports: [MatIconModule, CommonModule],
    templateUrl: './snack-bar.component.html',
    styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'snackbar';

    message: string = '';
    isSucess: boolean = true;

    constructor(
        @Inject(MAT_SNACK_BAR_DATA)
        public data: { message: string; isSucess: boolean },
        private snackBarRef: MatSnackBarRef<SnackBarComponent>,
        private translate: TranslateConfigService,
    ) {
        this.isSucess = this.data.isSucess;
    }

    ngOnInit(): void {
        this.insertI18N();
    }

    close(): void {
        this.snackBarRef.dismiss();
    }

    private recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    insertI18N(): void {
        this.recoverValue('close').subscribe({
            next: (close) => {
                this.message = close;
            },
            error: (err) => {
                console.error('Erro inesperado!');
            },
        });
    }
}
