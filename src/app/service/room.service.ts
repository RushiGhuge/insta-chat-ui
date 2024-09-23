import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { BASE_URL } from '../constants/env.constants';
import { Conversation } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private cache = new Map<string, Conversation>();
  constructor(public http: HttpClient) {}

  getConversationCached(id: string): Observable<any> {
    if (this.cache.has(id)) {
      return of(this.cache.get(id)!);
    } else {
      // Fetch from API and cache the result
      return this.http
        .get<Conversation>(`${BASE_URL}/message/${id}`)
        .pipe(tap((data) => this.cache.set(id, data)));
    }
  }

  getConversation(id: string): Observable<any> {
    return this.http
      .get<Conversation>(`${BASE_URL}/message/${id}`)
      .pipe(tap((data) => this.cache.set(id, data)));
  }

  sendMessage(id: string, message: any): Observable<any> {
    return this.http.post(`${BASE_URL}/message/send/${id}`, { message });
  }
}
