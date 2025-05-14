import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TechnologyResponse } from '../../models/response/technologyResponse';
import { TextErrorComponent } from '../../shared/text-error/text-error.component';
import FormExperienceI18N from './formExperienceI18N';

@Component({
    selector: 'app-form-experience',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        MatSelectModule,
        NgxMaskDirective,
        MatCheckboxModule,
        TextErrorComponent,
    ],
    templateUrl: './form-experience.component.html',
    styleUrls: [
        './form-experience.component.scss',
        './form-experience.component.responsive.scss',
    ],
})
export class FormExperienceComponent implements OnInit {
    private readonly TRANSLATE_JSON: string = 'formExperience';
    private readonly MIN: number = 3;

    companyName = signal<string>('');
    description = signal<string>('');
    beginning = signal<Date | null>(null);
    end = signal<Date | null>(null);
    isCurrent = signal<boolean>(false);
    technologiesWorkedId = signal<number[]>([]);

    technologies: TechnologyResponse[] = [
        { id: 1, name: 'Angular', urlImage: '', importanceLevel: 3 },
        { id: 2, name: 'React', urlImage: '', importanceLevel: 4 },
        { id: 3, name: 'Vue', urlImage: '', importanceLevel: 2 },
    ];

    i18n: FormExperienceI18N = {
        companyName: '',
        description: '',
        beginning: '',
        actually: '',
        end: '',
        technologiesWorked: '',
        labelBeginningAfterEnd: '',
        labelFutureDate: '',
        submit: '',
    };

    constructor(private translate: TranslateConfigService) {}

    isBeginningAfterEnd = computed(() => this.validateBeginningAndEnd());
    isFutureDate = computed(() => this.validateDateFuture());

    disableButton = computed(() => {
        return (
            this.companyName().length <= this.MIN ||
            this.description().length <= this.MIN ||
            !this.beginning() ||
            this.validateEnd() ||
            this.validateBeginningAndEnd() ||
            this.technologiesWorkedId().length < 1
        );
    });

    ngOnInit(): void {
        this.insertI18N();
    }
    onSubmit(): void {
        console.log('Correto');
    }

    validateBeginningAndEnd(): boolean {
        if (!this.beginning() || !this.end()) {
            return false;
        }

        const valueBeginning = this.beginning();
        const valueEnd = this.end();

        const beginning = valueBeginning
            ? new Date(valueBeginning)
            : new Date();
        const end = valueEnd ? new Date(valueEnd) : new Date();

        return beginning.getTime() > end.getTime();
    }

    handleActually(value: boolean): void {
        if (value) {
            this.end.set(null);
        }
        this.isCurrent.set(value);
    }

    handleDate(value: string, onChange: (date: Date | null) => void) {
        if (value.length == 8) {
            const parsedDate = this.stringToDate(value);
            if (!isNaN(parsedDate.getTime())) {
                onChange(parsedDate);
            }
        }
    }

    handleDateBeginning(value: string): void {
        if (value.length === 8) {
            const parsedDate = this.stringToDate(value);
            if (!isNaN(parsedDate.getTime())) {
                this.beginning.set(parsedDate);
            }
        }
    }

    handleDateEnd(value: string): void {
        if (value.length === 8) {
            const parsedDate = this.stringToDate(value);
            if (!isNaN(parsedDate.getTime())) {
                this.end.set(parsedDate);
            }
        }
    }

    private recoverValue(key: string) {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('companyName'),
            this.recoverValue('description'),
            this.recoverValue('beginning'),
            this.recoverValue('actually'),
            this.recoverValue('end'),
            this.recoverValue('technologiesWorked'),
            this.recoverValue('labelBeginningAfterEnd'),
            this.recoverValue('labelFutureDate'),
            this.recoverValue('submit'),
        ];
    }

    private insertI18N(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([
                companyName,
                description,
                beginning,
                actually,
                end,
                technologiesWorked,
                labelBeginningAfterEnd,
                labelFutureDate,
                submit,
            ]) => {
                this.i18n = {
                    companyName,
                    description,
                    beginning,
                    actually,
                    end,
                    technologiesWorked,
                    labelBeginningAfterEnd,
                    labelFutureDate,
                    submit,
                };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }

    private stringToDate(date: string): Date {
        const day = +date.substring(0, 2);
        const month = +date.substring(2, 4) - 1;
        const year = +date.substring(4, 8);

        const parsedDate = new Date(year, month, day);

        return new Date(parsedDate);
    }

    private validateEnd(): boolean {
        return !this.isCurrent() && !this.end();
    }

    private getTomorrowMidnight(): Date {
        const now = new Date();
        const tomorrow = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0,
            0,
            0,
            0,
        );
        return tomorrow;
    }

    private validateDateFuture(): boolean {
        if (!this.beginning && !this.end) {
            return false;
        }

        const tomorrow = this.getTomorrowMidnight();

        const valueBeginning = this.beginning();
        const valueEnd = this.end();

        const beginning = valueBeginning
            ? new Date(valueBeginning)
            : new Date();
        const end = valueEnd ? new Date(valueEnd) : new Date();

        return (
            beginning.getTime() >= tomorrow.getTime() ||
            end.getTime() >= tomorrow.getTime()
        );
    }
}
