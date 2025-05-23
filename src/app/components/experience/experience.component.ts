import {
    Component,
    OnInit,
    AfterViewInit,
    signal,
    effect,
} from '@angular/core';
import ExperienceResponse from '../../models/response/experienceResponse';
import { DESCRIPTION_1, DESCRIPTION_2 } from './mocksExperiences';
import { CardComponent } from '../card/card.component';
import { TranslateConfigService } from '../../services/translate-config-service/translate-config-service';
import { generatePhraseTechnologies } from '../utils/functionTechnologies';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { ApiLoadingComponent } from '../../shared/api-loading/api-loading.component';
import { ButtonFormComponent } from '../../shared/button-form/button-form.component';
import ExperienceI18N from './experienceI18N';
import { TokenService } from '../../services/token-service/token.service';
import { ExperienceService } from '../../services/api/experience-service/experience.service';
import { SnackBarService } from '../../services/snack-bar-service/snack-bar.service';

@Component({
    selector: 'app-experience',
    imports: [CardComponent, ApiLoadingComponent, ButtonFormComponent],
    templateUrl: './experience.component.html',
    styleUrls: [
        './experience.component.scss',
        './experience.component.responsive.scss',
    ],
})
export class ExperienceComponent implements OnInit, AfterViewInit {
    private readonly TRANSLATE_JSON: string = 'experience';

    experiences = signal<ExperienceResponse[]>([
        // {
        //     id: 1,
        //     companyName: 'Grupo GFT',
        //     description: DESCRIPTION_1,
        //     beginning: 'Maio de 2022',
        //     end: 'Setembro de 2022',
        //     technologiesWorked: [
        //         'Java',
        //         'Javascript',
        //         'Typescript',
        //         'Spring Boot',
        //         'Angular',
        //     ],
        // },
        // {
        //     id: 2,
        //     companyName: 'Touch Health',
        //     description: DESCRIPTION_2,
        //     beginning: 'Maio de 2023',
        //     end: 'Maio de 2025',
        //     technologiesWorked: [
        //         'Java',
        //         'Javascript',
        //         'Typescript',
        //         'Spring',
        //         'JSP',
        //         'React',
        //         'Next.js',
        //         'Docker',
        //     ],
        // },
    ]);

    messagesTitle: string[] = [];
    messagesTechnologies: string[] = [];

    i18n: ExperienceI18N = {
        atual: '',
        tecnologiasTrabalhadas: '',
        register: '',
    };

    isLoading = signal<boolean>(true);
    isAdmin = signal<boolean>(false);

    constructor(
        private translate: TranslateConfigService,
        private tokenService: TokenService,
        private experienceService: ExperienceService,
        private snackbarService: SnackBarService,
    ) {
        this.isAdmin.set(tokenService.isAdmin());
        effect(() => this.insertMessages());
    }

    ngOnInit(): void {
        this.insertI18n();
        this.insertExperiences();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 200);
    }

    recoverValue(key: string): Observable<string> {
        return this.translate.retrieveKeyValueObservable(
            `${this.TRANSLATE_JSON}.${key}`,
        );
    }

    generateTitle(experience: ExperienceResponse): string {
        const { atual: actually } = this.i18n;
        return `${experience.companyName} | ${experience.beginning} - ${experience.end ? experience.end : actually}`;
    }

    generateSentence(technologies: string[]): string {
        const { tecnologiasTrabalhadas: message } = this.i18n;
        return generatePhraseTechnologies(message, technologies);
    }

    handleDelete(id: number | string): void {
        this.experienceService.delete(id).subscribe({
            next: () => {
                this.openSnackbar();
                this.insertExperiences();
            },
            error: (err) => {
                console.error('Erro inesperado! ');
            },
        });
    }

    private insertExperiences(): void {
        this.experienceService.getAll().subscribe({
            next: (experiences) => {
                this.experiences.set(experiences);
            },
            error: (err) => {
                console.error('Erro inesperado! ', err);
            },
        });
    }

    private insertMessages(): void {
        if (
            this.i18n.tecnologiasTrabalhadas.length > 0 &&
            this.experiences().length > 0
        ) {
            this.messagesTitle = this.experiences().map((experience) =>
                this.generateTitle(experience),
            );
            this.messagesTechnologies = this.experiences().map((experience) =>
                this.generateSentence(experience.technologiesWorked),
            );
        }
    }

    private openSnackbar(): void {
        this.snackbarService.openSnackBarSucess('Excluído com êxito!');
    }

    private insertI18n(): void {
        forkJoin(this.observableRequests()).subscribe({
            next: ([atual, tecnologiasTrabalhadas, register, edit]) => {
                this.i18n = { atual, tecnologiasTrabalhadas, register };
            },
            error: (err) => {
                console.error('Erro inesperado! ' + err);
            },
        });
    }

    private observableRequests(): Observable<string>[] {
        return [
            this.recoverValue('atual'),
            this.recoverValue('tecnologiasTrabalhadas'),
            this.recoverValue('register'),
        ];
    }
}
