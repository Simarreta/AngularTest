import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsService } from '../../services/songs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {
  songs: any[] = [];

  constructor(
    private songsService: SongsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.songsService.getSongs().subscribe({
      next: (data) => {
        console.log('Canciones recibidas:', data);
        this.songs = data;
      },
      error: (error) => {
        console.error('Error al obtener las canciones:', error);
      }
    });
  }

  onAddSong(): void {
    this.router.navigate(['/songs/new']);
  }
}
