import { Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', './login.component.responsive.scss'],
})
export class LoginComponent implements DoCheck {
    email: string = '';
    password: string = '';

    disableButton = true;

    ngDoCheck(): void {
        const min = 5;
        this.disableButton = !(
            this.email.length > min && this.password.length > min
        );
    }

    onLogin(): void {
        console.log('Mock');
    }
}
