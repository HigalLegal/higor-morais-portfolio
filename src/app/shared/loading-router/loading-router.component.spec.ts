import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingRouterComponent } from './loading-router.component';

describe('LoadingRouterComponent', () => {
    let component: LoadingRouterComponent;
    let fixture: ComponentFixture<LoadingRouterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoadingRouterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LoadingRouterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
