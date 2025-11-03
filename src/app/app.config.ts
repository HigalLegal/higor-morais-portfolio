import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideNgxMask } from 'ngx-mask';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { importProvidersFrom } from '@angular/core';
import { GlobalErrorInterceptor } from './interceptors/global-error.interceptor';
import {
    HttpClient,
    provideHttpClient,
    withJsonpSupport,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localePt);

const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
};

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideNgxMask(),
        provideRouter(routes),
        provideAnimationsAsync(),

        importProvidersFrom(MatSnackBarModule),
        provideHttpClient(withJsonpSupport(), withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalErrorInterceptor,
            multi: true,
        },

        provideNativeDateAdapter(),

        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
};
