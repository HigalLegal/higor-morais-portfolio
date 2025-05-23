import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import ProjectRequest from '../../../models/request/projectRequest';
import ProjectResponse from '../../../models/response/projectResponse';
import { Observable } from 'rxjs';
import { TokenService } from '../../token-service/token.service';
import { generateAuthorization } from '../../../utils/generateHeader';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private readonly BASE_URL: string = `${environment.UrlApiBase}projects`;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
    ) {}

    getAll(): Observable<ProjectResponse[]> {
        return this.http.get<ProjectResponse[]>(this.BASE_URL);
    }

    getById(id: number | string): Observable<ProjectResponse> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.get<ProjectResponse>(`${this.BASE_URL}/${id}`, {
            headers,
        });
    }

    postCreate(
        project: ProjectRequest,
        image: File | null | undefined,
    ): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        const form = this.generateFormData(project, image);

        return this.http.post<void>(this.BASE_URL, form, { headers });
    }

    putUpdate(
        id: number | string,
        project: ProjectRequest,
        image: File | null | undefined,
    ): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        const form = this.generateFormData(project, image);

        return this.http.put<void>(`${this.BASE_URL}/${id}`, form, { headers });
    }

    delete(id: number | string): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.delete<void>(`${this.BASE_URL}/${id}`, { headers });
    }

    private generateFormData(
        project: ProjectRequest,
        image: File | null | undefined,
    ): FormData {
        const form = new FormData();

        form.append(
            'projectRequest',
            new Blob([JSON.stringify(project)], {
                type: 'application/json',
            }),
        );

        if (image) {
            form.append('image', image);
        }

        return form;
    }
}
