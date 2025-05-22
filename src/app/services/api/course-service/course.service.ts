import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import CourseRequest from '../../../models/request/courseRequest';
import { CourseResponse } from '../../../models/response/courseResponse';
import { Observable } from 'rxjs';
import { TokenService } from '../../token-service/token.service';
import { generateAuthorization } from '../../../utils/generateHeader';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private readonly BASE_URL: string = `${environment.UrlApiBase}courses`;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
    ) {}

    getAll(): Observable<CourseResponse[]> {
        return this.http.get<CourseResponse[]>(this.BASE_URL);
    }

    getById(id: number | string) {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.get<CourseResponse>(`${this.BASE_URL}/${id}`, {
            headers,
        });
    }

    postCreate(
        course: Partial<CourseRequest>,
        image: File | null | undefined,
    ): Observable<void> {
        const form = this.generateFormData(course, image);

        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.post<void>(this.BASE_URL, form, { headers });
    }

    putUpdate(
        id: number | string,
        course: Partial<CourseRequest>,
        image: File | null | undefined,
    ): Observable<void> {
        const form = this.generateFormData(course, image);

        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        console.log(course);

        return this.http.put<void>(`${this.BASE_URL}/${id}`, form, {
            headers,
        });
    }

    delete(id: number | string): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.post<void>(`${this.BASE_URL}/${id}`, { headers });
    }

    private generateFormData(
        technology: Partial<CourseRequest>,
        image: File | null | undefined,
    ): FormData {
        const form = new FormData();

        form.append(
            'courseRequest',
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
