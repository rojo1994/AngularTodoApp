import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { userPost, userType } from '../interfaces/register.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private baseUrl = 'http://localhost:8000/users';

  http = inject(HttpClient);
  router = inject(Router);

  private _isLoggedIn = signal(this.hasToken());

  readonly isLoggedIn = computed(() => this._isLoggedIn());

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  register(data: userPost) {
    return this.http.post<userType>(this.baseUrl + '/register' , data);
  }

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<{ access_token: string }>(
      `${this.baseUrl}/authenticate`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
    this._isLoggedIn.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }


  logout() {
    localStorage.removeItem('access_token');
    this._isLoggedIn.set(false);
  }

}
