import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/env.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${BASE_URL}/users`, {
      withCredentials: true,
    });
  }
}
