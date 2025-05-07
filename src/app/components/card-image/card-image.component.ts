import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LongTextComponent } from '../long-text/long-text.component';

@Component({
    selector: 'app-card-image',
    imports: [MatCardModule, LongTextComponent],
    templateUrl: './card-image.component.html',
    styleUrl: './card-image.component.scss',
})
export class CardImageComponent {
    @Input() title: string = '';
    @Input() imageUrl: string = '';
    @Input() url: string = '';
    @Input() description?: string;
    @Input() technologiesUsed: string = '';
}
