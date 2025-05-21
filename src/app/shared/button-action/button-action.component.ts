import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // necessário para ngIf, ngFor, ngClass etc

@Component({
    selector: 'app-button-action',
    imports: [MatButtonModule, CommonModule],
    templateUrl: './button-action.component.html',
    styleUrl: './button-action.component.scss',
})
export class ButtonActionComponent {
    @Input() disabled: boolean = false;

    @Input() text: string = 'Padrão';
    @Output() clicked = new EventEmitter<void>();

    onClickButton(): void {
        this.clicked.emit();
    }
}
