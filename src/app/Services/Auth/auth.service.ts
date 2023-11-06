import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:5118/api/Account/register',
      userData
    );
  }
}
