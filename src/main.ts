import './polyfills';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';

// Al iniciar la aplicación
console.log('=== Iniciando la aplicación ===');
console.log('Assets path: assets/i18n/es.json');
console.log('Asegúrate de que este archivo existe y es accesible');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
