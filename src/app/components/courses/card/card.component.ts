import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-card',
    imports: [MatCardModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
})
export class CardComponent {
    @Input() title: string = '';
    @Input() imageUrl: string = '';
    @Input() url: string = '';
    @Input() description: string = '';
}
