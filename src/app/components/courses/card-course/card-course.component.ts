import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-card-course',
    imports: [MatCardModule],
    templateUrl: './card-course.component.html',
    styleUrl: './card-course.component.scss',
})
export class CardCourseComponent {
    @Input() title: string = '';
    @Input() imageUrl: string = '';
    @Input() url: string = '';
    @Input() description: string = '';
}
