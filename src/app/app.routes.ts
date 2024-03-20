import { Routes } from '@angular/router';
import { HerosComponent } from './pages/heros/heros.component';
import { HeroComponent } from './pages/hero/hero.component';

export const routes: Routes = [
    { path: 'heros', component: HerosComponent },
    { path: 'hero/:id', component: HeroComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'heros' }
];
