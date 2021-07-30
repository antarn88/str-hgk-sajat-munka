import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = 'http://localhost:3000/login';
  logoutUrl: string = 'http://localhost:3000/logout';
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  lastToken: string = '';
  storageName: string = 'currentUser';

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) { 
    if (localStorage.currentUser) {
      const user: User = JSON.parse(localStorage.currentUser);
      this.lastToken = user.token || '';
      this.currentUserSubject.next(user);
    }
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(loginData: User): Promise<Observable<{ accessToken: string; }>> {
    let users: User | User[] = [];
    let response: { accessToken: string; } = { accessToken: '' };

    response = await this.http.post<{ accessToken: string }>(
      this.loginUrl,
      { email: loginData.email, password: loginData.password }
    ).toPromise();

    if (response.accessToken) {
      this.lastToken = response.accessToken;
      users = await this.userService.query(`email=${loginData.email}`).toPromise();

      if (users && Array.isArray(users)) {
        users[0].token = this.lastToken;
        localStorage.setItem(this.storageName, JSON.stringify(users[0]));
        this.currentUserSubject.next(users[0]);
      } else {
        localStorage.removeItem(this.storageName);
        this.currentUserSubject.next(new User());
      }

      return of(response);
    }
    return of({ accessToken: '' });
  }

  logout() {
    this.lastToken = '';
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}