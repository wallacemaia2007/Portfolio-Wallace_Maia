import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { HomeComponent } from './pages/home/home.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'experience',
        component: ExperienceComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'skills',
        component: SkillsComponent,
      },
    ],
  },
];
