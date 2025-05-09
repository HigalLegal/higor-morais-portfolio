import { Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-form-technology',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
    templateUrl: './form-technology.component.html',
    styleUrls: [
        './form-technology.component.scss',
        './form-technology.component.responsive.scss',
    ],
})
export class FormTechnologyComponent implements DoCheck {
    name: string = '';
    importanceLevel: number | null = null;

    disableButton: boolean = true;

    ngDoCheck(): void {
        this.disableButton = !(this.name.length > 2 && !!this.importanceLevel);
    }

    onSubmit() {
        if (this.name && this.importanceLevel) {
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
