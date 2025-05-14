import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-text-error',
    imports: [],
    templateUrl: './text-error.component.html',
    styleUrl: './text-error.component.scss',
})
export class TextErrorComponent {
    @Input() text: string = '';
}
