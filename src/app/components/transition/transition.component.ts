import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { CoursesComponent } from '../courses/courses.component';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeScreenService } from '../../services/home-screen.service';

@Component({
    selector: 'app-transition',
    imports: [
        HomeComponent,
        CommonModule,
        AboutComponent,
        SkillsComponent,
        CoursesComponent,
        ExperienceComponent,
        ProjectsComponent,
        ArticlesComponent,
        ContactComponent,
    ],
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
export class TransitionComponent implements OnInit, DoCheck {
    componentSelected: string = 'inicio';

    constructor(private homeScreenService: HomeScreenService) { }

    ngOnInit(): void {
        this.updateComponentSelected();
    }

    ngDoCheck(): void {
        this.updateComponentSelected();
    }

    updateComponentSelected(): void {
        this.componentSelected = this.homeScreenService.getHomeScreen();
    }
}
