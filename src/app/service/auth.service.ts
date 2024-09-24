import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/env.constants';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public http: HttpClient,
    public router: Router,
    public socketService: SocketIoService
  ) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    localStorage.clear();
    this.socketService.disconnect(); // disconnect the socket io connection
    return this.http.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
  }

  logout() {
    localStorage.clear();
    this.socketService.disconnect(); // disconnect the socket io connection
    this.router.navigate(['/login']);
  }
}
