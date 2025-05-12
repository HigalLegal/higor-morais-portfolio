import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLoadingComponent } from './api-loading.component';

describe('ApiLoadingComponent', () => {
    let component: ApiLoadingComponent;
    let fixture: ComponentFixture<ApiLoadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApiLoadingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ApiLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
