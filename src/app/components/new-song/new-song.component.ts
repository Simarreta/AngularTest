import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SongsService } from '../../services/songs.service';
import { CountriesService } from '../../services/countries.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    TranslocoModule
  ],
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
  songForm: FormGroup;
  genres: string[] = [];
  companies: string[] = [];
  newGenre: string = '';
  newCompany: string = '';
  maxDate: string;
  countries: { code: string, name: string }[] = [];
  isLoadingCountries = true;

  constructor(
    private fb: FormBuilder,
    private songsService: SongsService,
    private countriesService: CountriesService,
    private router: Router
  ) {
    // Configurar la fecha máxima como el año actual
    const currentYear = new Date().getFullYear();
    this.maxDate = `${currentYear}-12-31`;

    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      genre: [''],
      company: [''],
      year: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      poster: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Cargar la lista de países
    this.countriesService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.isLoadingCountries = false;
      },
      error: (error) => {
        console.error('Error al cargar los países:', error);
        this.isLoadingCountries = false;
      }
    });
  }

  addGenre(event?: Event): void {
    if (event && event instanceof KeyboardEvent) {
      if (event.key !== 'Enter') return;
      event.preventDefault();
    }
    
    const genre = this.songForm.get('genre')?.value?.trim();
    if (genre && !this.genres.includes(genre)) {
      this.genres.push(genre);
      this.songForm.get('genre')?.setValue('');
    }
  }

  removeGenre(genre: string): void {
    this.genres = this.genres.filter(g => g !== genre);
  }

  addCompany(event?: Event): void {
    if (event && event instanceof KeyboardEvent) {
      if (event.key !== 'Enter') return;
      event.preventDefault();
    }
    
    const company = this.songForm.get('company')?.value?.trim();
    if (company && !this.companies.includes(company)) {
      this.companies.push(company);
      this.songForm.get('company')?.setValue('');
    }
  }

  removeCompany(company: string): void {
    this.companies = this.companies.filter(c => c !== company);
  }

  onSubmit(): void {
    if (this.songForm.valid) {
      const formValue = this.songForm.value;
      // Extraer solo el año de la fecha seleccionada
      if (formValue.year) {
        formValue.year = new Date(formValue.year).getFullYear();
      }
      formValue.genre = this.genres;
      formValue.company = this.companies;
      
      this.songsService.addSong(formValue).subscribe({
        next: () => {
          this.router.navigate(['/songs']);
        },
        error: (error) => {
          console.error('Error al agregar la canción:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/songs']);
  }

  isFormValid(): boolean {
    return this.songForm.valid && this.genres.length > 0 && this.companies.length > 0;
  }
}
