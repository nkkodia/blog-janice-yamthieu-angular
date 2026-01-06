import { Routes } from '@angular/router';
import {MeditationListComponent} from './components/meditation-list/meditation-list.component';
import {MultimediaComponent} from './components/multimedia/multimedia.component';
import {AboutComponent} from './components/about/about.component';


export const routes: Routes = [
  { path: 'meditations', component: MeditationListComponent },
  { path: 'multimedia', component: MultimediaComponent }, // Nouveau nom
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'meditations', pathMatch: 'full' }
];
