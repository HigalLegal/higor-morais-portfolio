import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import ErrorJSON from '../models/errors/errorJSON';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const customError = error.error as ErrorJSON;

                const message = customError?.message || 'Erro inesperado';
                const title = customError?.title || `Erro ${error.status}`;

                this.snackBar.open(`${title}: ${message}`, 'Fechar', {
                    duration: 5000,
                    panelClass: ['snackbar-error'],
                });

                return throwError(() => error);
            }),
        );
    }
}
