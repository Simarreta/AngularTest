import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from './services/loading.service';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Configuración de TranslocoTestingModule
const translocoConfig: TranslocoTestingOptions = {
  langs: {
    es: {
      'menu.title': 'Menú',
      'menu.items.songs': 'Canciones',
      'menu.items.artists': 'Artistas',
      'menu.items.recordCompanies': 'Compañías discográficas'
    }
  },
  preloadLangs: true
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        TranslocoTestingModule.forRoot(translocoConfig)
      ],
      providers: [
        LoadingService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'MusicApp' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MusicApp');
  });

  it('should have a header element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-header')).toBeTruthy();
  });
});
