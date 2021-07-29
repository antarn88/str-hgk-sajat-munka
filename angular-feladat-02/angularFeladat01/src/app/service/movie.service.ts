import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl = 'http://localhost:3000/'
  entity = 'movies';

  constructor(
    private http: HttpClient,
  ) { }

  get(id?: string | number): Observable<Movie | Movie[]> {
    let url = `${this.apiUrl}${this.entity}`;
    if (id) {
      url += `/${id}`;
    }

    return this.http.get<Movie[]>(url);
  }
  
}