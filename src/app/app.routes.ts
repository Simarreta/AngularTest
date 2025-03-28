import { Routes } from '@angular/router';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'canciones', component: SongsListComponent }
];
