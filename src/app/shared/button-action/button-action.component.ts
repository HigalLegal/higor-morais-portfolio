import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-button-action',
    imports: [MatButtonModule],
    templateUrl: './button-action.component.html',
    styleUrl: './button-action.component.scss',
})
export class ButtonActionComponent {
    @Input() text: string = 'Padrão';
    @Output() click = new EventEmitter<void>();

    onClickButton(): void {
        this.click.emit();
    }
}
