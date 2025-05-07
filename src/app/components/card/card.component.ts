import { Component, Input } from '@angular/core';
import { LongTextComponent } from '../long-text/long-text.component';

@Component({
    selector: 'app-card',
    imports: [LongTextComponent],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss', './card.component.responsive.scss'],
})
export class CardComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() technologiesUsed: string = '';
    @Input() url?: string;
    @Input() hideTextByDefault: boolean = false;
}
