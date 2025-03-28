import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Country {
  cca2: string;  // código de país
  translations: {
    spa: {
      common: string;  // nombre del país en español
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<{code: string, name: string}[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map(countries => 
        countries
          .map(country => ({
            code: country.cca2,
            name: country.translations.spa?.common || country.cca2
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }
} 