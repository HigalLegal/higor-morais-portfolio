import {
    Component,
    OnInit,
    signal,
    computed,
    AfterViewInit,
} from '@angular/core';
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
import { TechnologyResponse } from '../../models/response/technology-response';
import { TextErrorComponent } from '../../shared/text-error/text-error.component';
import FormExperienceI18N from './formExperienceI18N';
import ExperienceRequest from '../../models/request/experienceRequest';
import ExperienceResponse from '../../models/response/experienceResponse';
import { ExperienceService } from '../../services/api/experience-service/experience.service';
import { TechnologyService } from '../../services/api/technology-service/technology.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';

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
export class FormExperienceComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'formExperience';
    private readonly MIN: number = 3;

    currentRouter: string = '';
    idRouter: string | number | null = null;

    companyName = signal<string>('');
    description = signal<string>('');
    beginning = signal<Date | null>(null);
    end = signal<Date | null>(null);
    isCurrent = signal<boolean>(false);
    technologiesWorkedId = signal<number[]>([]);

    technologies: TechnologyResponse[] = [
        // { id: 1, name: 'Angular', urlImage: '', importanceLevel: 3 },
        // { id: 2, name: 'React', urlImage: '', importanceLevel: 4 },
        // { id: 3, name: 'Vue', urlImage: '', importanceLevel: 2 },
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

    constructor(
        private translate: TranslateConfigService,
        private experienceService: ExperienceService,
        private technologyService: TechnologyService,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private snackbarService: SnackBarService,
    ) {
        this.currentRouter = this.router.url;
    }

    get beginningValue(): string {
        const value = this.beginning();
        if (value) {
            return this.formatDateToBR(value);
        }

        return '';
    }

    set beginningValue(beginningValue: string) {
        this.handleDate(beginningValue, this.beginning.set);
    }

    get endValue(): string {
        const value = this.end();
        if (value) {
            return this.formatDateToBR(value);
        }

        return '';
    }

    set endValue(endValue: string) {
        this.handleDate(endValue, this.end.set);
    }

    get isCurrentValue(): boolean {
        return this.isCurrent();
    }

    set isCurrentValue(isCurrentValue: boolean) {
        this.isCurrent.set(isCurrentValue);
    }

    get technologiesWorkedIdValue(): number[] {
        return this.technologiesWorkedId();
    }

    set technologiesWorkedIdValue(technologiesWorkedIdValue: number[]) {
        this.technologiesWorkedId.set(technologiesWorkedIdValue);
    }

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
        this.searchTechnologies();
        this.insertId();
    }

    ngAfterViewInit(): void {
        this.searchExperienceById();
    }

    onSubmit(): void {
        const experience: ExperienceRequest = {
            companyName: this.companyName(),
            description: this.description(),
            beginning: this.beginningValue,
            end: this.isCurrent() ? null : this.endValue,
            technologiesWorkedId: this.technologiesWorkedId(),
        };

        if (this.currentRouter.includes('inserir-experiencia')) {
            this.postCreate(experience);
        } else {
            this.putUpdate(experience);
        }
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

    private searchExperienceById(): void {
        if (this.idRouter) {
            this.experienceService.getById(this.idRouter).subscribe({
                next: (experience) => {
                    this.insertFields(experience);
                },
                error: (err) => {
                    console.error('Erro inesperado!');
                },
            });
        }
    }

    private postCreate(experience: ExperienceRequest): void {
        this.experienceService.postCreate(experience).subscribe({
            next: () => {
                this.openSnackBar();
                this.clearFields();
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private putUpdate(experience: ExperienceRequest): void {
        if (this.idRouter) {
            this.experienceService
                .putUpdate(this.idRouter, experience)
                .subscribe({
                    next: () => {
                        this.openSnackBar();
                        this.router.navigate(['/']);
                    },
                    error: (err) => {
                        console.error('Erro inesperado! ', err);
                    },
                });
        }
    }

    private insertFields(experience: ExperienceResponse) {
        this.companyName.set(experience.companyName);
        this.description.set(experience.description);
        this.technologiesWorkedId.set(
            this.technologieForName(experience.technologiesWorked).map(
                (technology) => technology.id,
            ),
        );
    }

    private technologieForName(
        technologiesName: string[],
    ): TechnologyResponse[] {
        return this.technologies.filter((technology) =>
            technologiesName.includes(technology.name),
        );
    }

    private searchTechnologies(): void {
        this.technologyService.getAll().subscribe({
            next: (technologies) => {
                this.technologies = technologies;
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private clearFields(): void {
        this.companyName.set('');
        this.description.set('');
        this.beginning.set(null);
        this.end.set(null);
        this.isCurrent.set(false);
        this.technologiesWorkedId.set([]);
    }

    private handleDate(
        value: string,
        onChange: (date: Date | null) => void,
    ): void {
        if (value.length == 8) {
            const parsedDate = this.stringToDate(value);
            if (!isNaN(parsedDate.getTime())) {
                onChange(parsedDate);
            }
        }
    }

    private recoverValue(key: string) {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    private insertId(): void {
        this.activeRouter.paramMap.subscribe((params) => {
            this.idRouter = params.get('id');
        });
    }

    private openSnackBar(): void {
        this.snackbarService.openSnackBarSucess(
            'Experiência profissional salva com êxito!',
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

    private formatDateToBR(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // mês começa em 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
