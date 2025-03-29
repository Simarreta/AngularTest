import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsListComponent } from './songs-list.component';
import { SongsService } from '../../services/songs.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SongsListComponent', () => {
  let component: SongsListComponent;
  let fixture: ComponentFixture<SongsListComponent>;
  let songsServiceMock: jasmine.SpyObj<SongsService>;
  let routerMock: jasmine.SpyObj<Router>;

  const mockSongs = [
    { 
      id: '1', 
      title: 'Song 1', 
      artist: 'Artist 1',
      genre: ['Rock', 'Pop'],
      year: 2023,
      duration: 180,
      rating: 4.5,
      poster: 'https://example.com/song1.jpg'
    },
    { 
      id: '2', 
      title: 'Song 2', 
      artist: 'Artist 2',
      genre: ['Jazz'],
      year: 2022,
      duration: 240,
      rating: 5,
      poster: 'https://example.com/song2.jpg'
    }
  ];

  beforeEach(async () => {
    // Crear mocks para los servicios
    const songsSpy = jest.fn().mockImplementation(() => ({
      getSongs: jest.fn().mockReturnValue(of(mockSongs))
    }));

    const routerSpy = jest.fn().mockImplementation(() => ({
      navigate: jest.fn()
    }));

    await TestBed.configureTestingModule({
      imports: [SongsListComponent],
      providers: [
        { provide: SongsService, useFactory: songsSpy },
        { provide: Router, useFactory: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsListComponent);
    component = fixture.componentInstance;
    songsServiceMock = TestBed.inject(SongsService) as jasmine.SpyObj<SongsService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load songs on init', () => {
    expect(component.songs).toEqual(mockSongs);
  });

  it('should navigate to new song page when onAddSong is called', () => {
    component.onAddSong();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs/new']);
  });

  it('should navigate to song details page when onViewSong is called', () => {
    component.onViewSong('1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs', '1']);
  });
});
