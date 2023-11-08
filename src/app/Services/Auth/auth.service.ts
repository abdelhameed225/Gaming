import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    const user = localStorage.getItem('user');
    if (user !== null) {
      this.setUserData(user);
    }
  }

  setUserData(user: any) {
    localStorage.setItem('user', user);
    const jsonUser = JSON.parse(user);
    this.user.next(jsonUser);
  }

  getUserToken() {
    const user = localStorage.getItem('user');
    if (user) {
      const jsonUser = JSON.parse(user);
      return jsonUser.token;
    } else {
      return null;
    }
  }
  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this._Router.navigate(['/login']);
  }
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:5118/api/Account/register',
      userData,
      { responseType: 'text' }
    );
  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:5118/api/Account/login',
      userData,
      { responseType: 'text' }
    );
  }
}
