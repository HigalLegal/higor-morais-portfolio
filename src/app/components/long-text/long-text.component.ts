import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-long-text',
    imports: [],
    templateUrl: './long-text.component.html',
    styleUrl: './long-text.component.scss',
})
export class LongTextComponent {
    @Input() text: string = '';

    splitText(): string[] {
        return this.text.split('\n');
    }
}
