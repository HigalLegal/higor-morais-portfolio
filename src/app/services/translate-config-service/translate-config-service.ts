import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TranslateConfigService {
    constructor(private translate: TranslateService) {
        this.translate.addLangs(['pt']);
        this.translate.setDefaultLang('pt');
    }

    public retrieveKeyValueObservable(key: string): Observable<string> {
        return this.translate.get(key);
    }

    // public retrieveKeyValue(key: string): string {
    //     let valueMessage = '';

    //     this.translate.get(key).subscribe((value) => {
    //         valueMessage = value;
    //     });

    //     return valueMessage;
    // }
}
