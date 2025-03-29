import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewSongComponent } from './new-song.component';
import { SongsService } from '../../services/songs.service';
import { CountriesService } from '../../services/countries.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('NewSongComponent', () => {
  let component: NewSongComponent;
  let songsServiceMock: any;
  let countriesServiceMock: any;
  let routerMock: any;
  let formBuilder: FormBuilder;

  const mockCountries = [
    { code: 'ES', name: 'Spain' },
    { code: 'US', name: 'United States' }
  ];

  beforeEach(() => {
    // Configurar los mocks para los servicios
    songsServiceMock = {
      addSong: jest.fn().mockReturnValue(of({}))
    };

    countriesServiceMock = {
      getCountries: jest.fn().mockReturnValue(of(mockCountries))
    };

    routerMock = {
      navigate: jest.fn()
    };

    formBuilder = new FormBuilder();

    // Crear una instancia del componente con los mocks
    component = new NewSongComponent(
      formBuilder,
      songsServiceMock,
      countriesServiceMock,
      routerMock
    );

    // Inicializar el componente manualmente
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.songForm).toBeDefined();
    expect(component.songForm.get('title')?.value).toBe('');
    expect(component.songForm.get('artist')?.value).toBe('');
  });

  it('should load countries on init', () => {
    expect(countriesServiceMock.getCountries).toHaveBeenCalled();
    expect(component.countries).toEqual(mockCountries);
    expect(component.isLoadingCountries).toBeFalsy();
  });

  it('should navigate to songs list when onCancel is called', () => {
    component.onCancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs']);
  });

  it('should add a genre to the genres array', () => {
    component.songForm.get('genre')?.setValue('Rock');
    component.addGenre();
    expect(component.genres).toContain('Rock');
    expect(component.songForm.get('genre')?.value).toBe('');
  });

  it('should add a company to the companies array', () => {
    component.songForm.get('company')?.setValue('Test Records');
    component.addCompany();
    expect(component.companies).toContain('Test Records');
    expect(component.songForm.get('company')?.value).toBe('');
  });

  it('should remove a genre from the genres array', () => {
    component.genres = ['Rock', 'Pop'];
    component.removeGenre('Rock');
    expect(component.genres).not.toContain('Rock');
    expect(component.genres).toContain('Pop');
  });

  it('should remove a company from the companies array', () => {
    component.companies = ['Test Records', 'Another Label'];
    component.removeCompany('Test Records');
    expect(component.companies).not.toContain('Test Records');
    expect(component.companies).toContain('Another Label');
  });
});
