import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) {}

    openSnackBarError(messageError: string): void {
        this.openSnackBar(messageError, false);
    }

    openSnackBarSucess(messageSucess: string): void {
        this.openSnackBar(messageSucess, true);
    }

    private openSnackBar(message: string, isSucess: boolean): void {
        this.snackBar.openFromComponent(SnackBarComponent, {
            data: { message, isSucess },
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'snack-bar-clear',
        });
    }
}
