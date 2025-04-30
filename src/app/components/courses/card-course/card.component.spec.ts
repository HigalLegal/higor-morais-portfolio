import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCourseComponent } from './card-course.component';

describe('CardComponent', () => {
    let component: CardCourseComponent;
    let fixture: ComponentFixture<CardCourseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardCourseComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CardCourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
