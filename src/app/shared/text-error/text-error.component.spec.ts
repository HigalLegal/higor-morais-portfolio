import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextErrorComponent } from './text-error.component';

describe('TextErrorComponent', () => {
    let component: TextErrorComponent;
    let fixture: ComponentFixture<TextErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TextErrorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TextErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
