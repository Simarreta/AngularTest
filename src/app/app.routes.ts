import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { NewSongComponent } from './components/new-song/new-song.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'songs', component: SongsListComponent },
  { path: 'songs/new', component: NewSongComponent }
];