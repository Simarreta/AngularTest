import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@ngneat/transloco';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { routes } from './app.routes';
import { translations } from './translations';

@Injectable({ providedIn: 'root' })
export class CustomLoader implements TranslocoLoader {
  constructor() {
    console.log('CustomLoader inicializado');
  }
  
  getTranslation(lang: string): Observable<Translation> {
    console.log(`Cargando traducciones para: ${lang} desde archivos TypeScript`);
    return of(translations[lang as keyof typeof translations] || {});
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['es'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      },
      loader: CustomLoader
    })
  ]
};
