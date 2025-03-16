import { Component, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-transition',
    imports: [HomeComponent, CommonModule, AboutComponent],
    templateUrl: './transition.component.html',
    styleUrl: './transition.component.scss',
    animations: [
        trigger('fadeAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('200ms ease-out', style({ opacity: 0 })),
            ]),
        ]),
    ],
})
export class TransitionComponent {
    @Input() componentSelected: string = 'inicio';
}
