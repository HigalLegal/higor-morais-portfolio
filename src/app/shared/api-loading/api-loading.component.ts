import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-api-loading',
    imports: [MatProgressSpinnerModule],
    standalone: true,
    templateUrl: './api-loading.component.html',
    styleUrl: './api-loading.component.scss',
})
export class ApiLoadingComponent {
    @Input() isLoading: boolean = true;
}
