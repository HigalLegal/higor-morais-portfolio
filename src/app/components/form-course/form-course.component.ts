import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TechnologyResponse } from '../../models/response/technologyResponse';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import FormCourseI18N from './formCourseI18N';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-form-course',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        MatSelectModule,
    ],
    templateUrl: './form-course.component.html',
    styleUrls: [
        './form-course.component.scss',
        './form-course.component.responsive.scss',
    ],
})
export class FormCourseComponent implements DoCheck, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'formCourse';

    name: string = '';
    urlCertificate: string = '';
    importanceLevel: number | null = null;
    technologiesIds: number[] = [];

    disableButton: boolean = true;

    i18n: FormCourseI18N = {
        nameCourse: '',
        urlCertificate: '',
        importanceLevel: '',
        techonologies: '',
        submit: '',
    };

    technologies: TechnologyResponse[] = [
        { id: 1, name: 'Angular', urlImage: '', importanceLevel: 3 },
        { id: 2, name: 'React', urlImage: '', importanceLevel: 4 },
        { id: 3, name: 'Vue', urlImage: '', importanceLevel: 2 },
    ];

    constructor(private translate: TranslateConfigService, private detector: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.insertI18N();
        this.detector.detectChanges();
    }

    ngDoCheck(): void {
        this.disableButton = !this.validateFields();
    }

    onSubmit(): void {
        console.log('Deu bom.');
    }

    private validateFields(): boolean {
        const min = 3;
        return (
            this.name.length > min &&
            this.urlCertificate.length > min &&
            !!this.importanceLevel &&
            this.technologies.length > 0
        );
    }

    private recoverValue(key: string): string {
        return this.translate.retrieveKeyValue(`${this.TRANSLATE_JSON}.${key}`);
    }

    private insertI18N(): void {
        this.i18n.nameCourse = this.recoverValue('nameCourse');
        this.i18n.urlCertificate = this.recoverValue('urlCertificate');
        this.i18n.importanceLevel = this.recoverValue('importanceLevel');
        this.i18n.techonologies = this.recoverValue('techonologies');
        this.i18n.submit = this.recoverValue('submit');
    }
}
