import { Routes } from '@angular/router';
import {MeditationListComponent} from './components/meditation-list/meditation-list.component';
import {MultimediaComponent} from './components/multimedia/multimedia.component';
import {AboutComponent} from './components/about/about.component';
import {ShopComponent} from './components/shop/shop.component';
import { LegalComponent } from './components/legal/legal.component';
import {ContactComponent} from './components/contact/contact.component';


export const routes: Routes = [
  // Routes existantes
  { path: 'meditations', component: MeditationListComponent },
  { path: 'multimedia', component: MultimediaComponent },
  { path: 'about', component: AboutComponent },

  // Nouvelles Routes V2
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },

  // Routes pour les pages légales (on utilise le même composant avec des données différentes)
  { path: 'legal/:type', component: LegalComponent },
  // Redirection par défaut
  { path: '', redirectTo: 'meditations', pathMatch: 'full' },
  { path: '**', redirectTo: 'meditations' } // Sécurité : redirige les erreurs vers l'accueil
];
