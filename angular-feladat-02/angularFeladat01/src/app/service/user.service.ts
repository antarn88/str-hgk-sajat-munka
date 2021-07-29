import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/'
  entity = 'users';

  constructor(
    private http: HttpClient,
  ) { }

  get(id?: string | number): Observable<User | User[]> {
    let url = `${this.apiUrl}/${this.entity}`;
    if (id) {
      url += `=${id}`;
    }

    return this.http.get<User[]>(url);
  }

  query(queryString: string): Observable<User | User[]> {
    const url = `${this.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<User[]>(url);
  }

  update(user: User): Observable<User> {
    const url = `${this.apiUrl}${this.entity}/${user.id}`;
    return this.http.patch<User>(url, user);
  }
}