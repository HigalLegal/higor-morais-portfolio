import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideNgxMask } from 'ngx-mask';
import {
    HttpClient,
    provideHttpClient,
    withJsonpSupport,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localePt);

const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
};

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideNgxMask(),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(withJsonpSupport()),
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
