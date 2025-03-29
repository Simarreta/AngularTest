import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private apiUrl = 'http://localhost:3000/songs';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSongById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addSong(song: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, song);
  }
  
  updateSong(id: string, song: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, song);
  }
  
  deleteSong(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
} 