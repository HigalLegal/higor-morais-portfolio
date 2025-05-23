import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import ExperienceRequest from '../../../models/request/experienceRequest';
import ExperienceResponse from '../../../models/response/experienceResponse';
import { Observable } from 'rxjs';
import { TokenService } from '../../token-service/token.service';
import { generateAuthorization } from '../../../utils/generateHeader';

@Injectable({
    providedIn: 'root',
})
export class ExperienceService {
    private readonly BASE_URL: string = `${environment.UrlApiBase}experiences`;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
    ) {}

    getAll(): Observable<ExperienceResponse[]> {
        return this.http.get<ExperienceResponse[]>(this.BASE_URL);
    }

    getById(id: number | string): Observable<ExperienceResponse> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.get<ExperienceResponse>(`${this.BASE_URL}/${id}`, {
            headers,
        });
    }

    postCreate(experience: ExperienceRequest): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.post<void>(this.BASE_URL, experience, {
            headers,
        });
    }

    putUpdate(
        id: number | string,
        experience: ExperienceRequest,
    ): Observable<void> {

        console.log(id);

        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.put<void>(`${this.BASE_URL}/${id}`, experience, {
            headers,
        });
    }

    delete(id: number | string): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.delete<void>(`${this.BASE_URL}/${id}`, {
            headers,
        });
    }
}
