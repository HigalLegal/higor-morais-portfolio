import { Injectable, signal } from '@angular/core';
import DecodedToken from '../../models/decoden-token';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY: string = 'auth_token';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private tokenSignal = signal<string | null | undefined>(
        localStorage.getItem(TOKEN_KEY),
    );

    constructor() {}

    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
        this.tokenSignal.set(token);
    }

    clearToken(): void {
        localStorage.removeItem(TOKEN_KEY);
        this.tokenSignal.set(null);
    }

    isAdmin(): boolean {
        const tokenValue = this.tokenSignal();

        if (tokenValue) {
            const decodedToken: DecodedToken = jwtDecode(tokenValue);
            return (
                decodedToken.groups.filter(
                    (group) => group.toLowerCase() === 'admin',
                ).length > 0 && this.isValid(decodedToken.exp)
            );
        }

        return false;
    }

    private isValid(epoch: number): boolean {
        const today: Date = new Date();
        const expiration: Date = new Date(epoch * 1000);

        return expiration > today;
    }
}
