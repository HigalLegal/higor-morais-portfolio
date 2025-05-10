import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-button-form',
    imports: [MatButtonModule, RouterModule],
    templateUrl: './button-form.component.html',
    styleUrl: './button-form.component.scss',
})
export class ButtonFormComponent {
    @Input() text: string = '';
    @Input() urlRouter: string = '/';
}
