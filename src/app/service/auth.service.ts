import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/env.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/register`, user, {
      withCredentials: true,
    });
  }

  login(email: string, password: string): Observable<any>{
    return this.http.post(
      `${BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }
}
