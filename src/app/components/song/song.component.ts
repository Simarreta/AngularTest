import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Song } from '../../models/song.model';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements OnInit {
  songId: string = '';
  song: any = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songsService: SongsService
  ) {}
  
  ngOnInit() {
    // Obtener el ID de la canción de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.songId = id;
        this.loadSongDetails();
      }
    });
  }
  
  loadSongDetails() {
    this.songsService.getSongById(this.songId).subscribe({
      next: (data) => {
        console.log('Detalles de la canción:', data);
        this.song = data;
      },
      error: (error) => {
        console.error('Error al obtener los detalles de la canción:', error);
      }
    });
  }
  
  // Navegar a la vista de edición
  editSong() {
    // En un caso real, navegaríamos a un formulario de edición
    this.router.navigate(['/songs/edit', this.songId]);
  }
  
  // Eliminar la canción
  deleteSong() {
    if (confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
      this.songsService.deleteSong(this.songId).subscribe({
        next: () => {
          console.log('Canción eliminada correctamente');
          this.navigateBack();
        },
        error: (error) => {
          console.error('Error al eliminar la canción:', error);
        }
      });
    }
  }
  
  // Volver a la página anterior
  navigateBack() {
    this.router.navigate(['/songs']);
  }
}
