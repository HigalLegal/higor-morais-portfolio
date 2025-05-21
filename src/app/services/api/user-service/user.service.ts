import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import TokenResponse from '../../../models/response/tokenResponse';
import CredentialsRequest from '../../../models/request/credentialsRequest';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly BASE_URL: string = `${environment.UrlApiBase}/users`;

    constructor(private http: HttpClient) {}

    postLogin(login: CredentialsRequest): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.BASE_URL}/login`, login);
    }
}
