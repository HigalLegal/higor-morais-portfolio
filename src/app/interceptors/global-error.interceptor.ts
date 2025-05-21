import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import ErrorJSON from '../models/errors/errorJSON';
import { SnackBarService } from '../services/snack-bar-service/snack-bar.service';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
    constructor(private snackbarService: SnackBarService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const customError = error.error as ErrorJSON;

                const message = customError?.message || 'Erro inesperado';
                const title = customError?.title || `Erro ${error.status}`;

                this.snackbarService.openSnackBarError(`${title}: ${message}`);

                return throwError(() => error);
            }),
        );
    }
}
