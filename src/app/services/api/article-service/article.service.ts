import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import ArticleRequest from '../../../models/request/articleRequest';
import ArticleResponse from '../../../models/response/articleResponse';
import { Observable } from 'rxjs';
import { TokenService } from '../../token-service/token.service';
import { generateAuthorization } from '../../../utils/generateHeader';

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    private readonly BASE_URL: string = `${environment.UrlApiBase}articles`;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
    ) {}

    getAll(): Observable<ArticleResponse[]> {
        return this.http.get<ArticleResponse[]>(this.BASE_URL);
    }

    getById(id: number | string): Observable<ArticleResponse> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.get<ArticleResponse>(`${this.BASE_URL}/${id}`, {
            headers,
        });
    }

    postCreate(article: ArticleRequest): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.post<void>(this.BASE_URL, article, { headers });
    }

    putCreate(id: number | string, article: ArticleRequest): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.put<void>(`${this.BASE_URL}/${id}`, article, {
            headers,
        });
    }

    delete(id: number | string): Observable<void> {
        const jwt = this.tokenService.token;

        const headers = generateAuthorization(jwt);

        return this.http.delete<void>(`${this.BASE_URL}/${id}`, { headers });
    }
}
