import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
    selector: 'app-skills',
    imports: [CarouselComponent],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
})
export class SkillsComponent {}
