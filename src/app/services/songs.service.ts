import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private apiUrl = 'http://localhost:3001/songs';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addSong(song: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, song);
  }
} 