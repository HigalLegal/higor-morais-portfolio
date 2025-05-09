import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTechnologyComponent } from './form-technology.component';

describe('FormTechnologyComponent', () => {
    let component: FormTechnologyComponent;
    let fixture: ComponentFixture<FormTechnologyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormTechnologyComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FormTechnologyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
