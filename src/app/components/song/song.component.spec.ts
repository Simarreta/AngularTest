import { TestBed } from '@angular/core/testing';
import { SongComponent } from './song.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { SongsService } from '../../services/songs.service';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SongComponent', () => {
  let component: SongComponent;
  let activatedRouteMock: any;
  let routerMock: any;
  let songsServiceMock: any;
  let translocoServiceMock: any;

  const mockSong = {
    id: '1',
    title: 'Test Song',
    artist: 'Test Artist',
    year: 2022,
    duration: 180,
    genre: ['Rock', 'Pop'],
    company: ['Test Records'],
    poster: 'https://example.com/image.jpg',
    rating: 4.5,
    country: 'ES'
  };

  beforeEach(() => {
    // Configurar los mocks para los servicios
    activatedRouteMock = {
      paramMap: of(convertToParamMap({ id: '1' }))
    };

    routerMock = {
      navigate: jest.fn()
    };

    songsServiceMock = {
      getSongById: jest.fn().mockReturnValue(of(mockSong)),
      deleteSong: jest.fn().mockReturnValue(of({}))
    };

    translocoServiceMock = {
      translate: jest.fn().mockReturnValue('¿Estás seguro de que quieres eliminar esta canción?'),
      getActiveLang: jest.fn().mockReturnValue('es')
    };

    // Crear una instancia del componente con los mocks
    component = new SongComponent(
      activatedRouteMock as any,
      routerMock as any,
      songsServiceMock as any,
      translocoServiceMock as any
    );

    // Inicializar el componente manualmente
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load song details on init', () => {
    expect(component.song).toEqual(mockSong);
    expect(component.songId).toBe('1');
    expect(songsServiceMock.getSongById).toHaveBeenCalledWith('1');
  });

  it('should navigate back to songs list', () => {
    component.navigateBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs']);
  });

  it('should navigate to edit song page', () => {
    component.editSong();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs/edit', '1']);
  });

  it('should delete song and navigate back when confirmed', () => {
    // Mockear el confirm global para que devuelva true
    const originalConfirm = global.confirm;
    global.confirm = jest.fn().mockReturnValue(true);
    
    component.deleteSong();
    expect(songsServiceMock.deleteSong).toHaveBeenCalledWith('1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs']);
    
    // Restaurar el confirm original
    global.confirm = originalConfirm;
  });
});
