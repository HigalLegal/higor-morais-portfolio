import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import TechnologyRequest from '../../../models/request/technology-request';
import { TechnologyResponse } from '../../../models/response/technology-response';
import { Observable } from 'rxjs';
import { TokenService } from '../../token-service/token.service';
import { generateAuthorization } from '../../../utils/generateHeader';

@Injectable({
    providedIn: 'root',
})
export class TechnologyService {
    private readonly BASE_URL: string = `${environment.UrlApiBase}technologies`;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
    ) {}

    getAll(): Observable<TechnologyResponse[]> {
        return this.http.get<TechnologyResponse[]>(this.BASE_URL);
    }

    getById(id: number | string): Observable<TechnologyResponse> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.get<TechnologyResponse>(`${this.BASE_URL}/${id}`, {
            headers,
        });
    }

    postCreate(
        technology: Partial<TechnologyRequest>,
        image: File | null | undefined,
    ): Observable<void> {
        const form = this.generateFormData(technology, image);

        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.post<void>(this.BASE_URL, form, { headers });
    }

    putUpdate(
        id: number | string,
        technology: Partial<TechnologyRequest>,
        image: File | null | undefined,
    ): Observable<void> {
        const form = this.generateFormData(technology, image);

        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.put<void>(`${this.BASE_URL}/${id}`, form, { headers });
    }

    delete(id: number): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.delete<void>(`${this.BASE_URL}/${id}`, { headers });
    }

    private generateFormData(
        technology: Partial<TechnologyRequest>,
        image: File | null | undefined,
    ): FormData {
        const form = new FormData();

        form.append(
            'technologyRequest',
            new Blob([JSON.stringify(technology)], {
                type: 'application/json',
            }),
        );

        if (image) {
            form.append('image', image);
        }

        return form;
    }
}
