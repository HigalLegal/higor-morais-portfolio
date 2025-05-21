import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './services/token-service/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (tokenService.isAdmin()) {
        return true;
    } else {
        router.navigate(['/not-found']);
        return false;
    }
};
