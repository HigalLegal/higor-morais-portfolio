import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-form-technology',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './form-technology.component.html',
    styleUrls: [
        './form-technology.component.scss',
        './form-technology.component.responsive.scss',
    ],
})
export class FormTechnologyComponent {
    name: string = '';
    importanceLevel: number | null = null;

    onSubmit() {
        if (this.name && this.importanceLevel && this.importanceLevel >= 1) {
            const request = {
                name: this.name,
                importanceLevel: this.importanceLevel,
            };
            console.log('Form enviado:', request);
        } else {
            console.log('Form inválido');
        }
    }
}
