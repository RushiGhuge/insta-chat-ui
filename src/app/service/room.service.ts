import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/env.constants';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(public http: HttpClient) {}

  getConversation(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}/message/${id}`, {
      withCredentials: true,
    });
  }

  sendMessage(id: string, message: any): Observable<any> {
    return this.http.post(
      `${BASE_URL}/message/send/${id}`,
      { message },
      {
        withCredentials: true,
      }
    );
  }
}
