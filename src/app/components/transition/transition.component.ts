import { Component, Type, effect, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenService } from '../../services/home-screen-service/home-screen.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-transition',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transition.component.html',
    styleUrl: './transition.component.scss',
    animations: [
        trigger('fadeAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('200ms ease-out', style({ opacity: 0 })),
            ]),
        ]),
    ],
})
export class TransitionComponent {
    lazyComponent: Type<unknown> | null = null;

    private homeScreenService = inject(HomeScreenService);

    constructor() {
        effect(async () => {
            const name = this.homeScreenService.getHomeScreen();
            this.lazyComponent = await this.loadComponentByName(name);
        });
    }

    async loadComponentByName(name: string): Promise<Type<unknown> | null> {
        switch (name) {
            case 'inicio':
                return (await import('../home/home.component')).HomeComponent;
            case 'sobreMim':
                return (await import('../about/about.component'))
                    .AboutComponent;
            case 'habilidades':
                return (await import('../skills/skills.component'))
                    .SkillsComponent;
            case 'cursos':
                return (await import('../courses/courses.component'))
                    .CoursesComponent;
            case 'experiencias':
                return (await import('../experience/experience.component'))
                    .ExperienceComponent;
            case 'projetos':
                return (await import('../projects/projects.component'))
                    .ProjectsComponent;
            case 'artigos':
                return (await import('../articles/articles.component'))
                    .ArticlesComponent;
            case 'contateMe':
                return (await import('../contact/contact.component'))
                    .ContactComponent;
            default:
                return null;
        }
    }
}
