import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { BasicUser } from '../constants/constant';
import { loadUser } from '../store/user/user.action';
import { getCookie } from '../auth.guard';

@Injectable({
  providedIn: 'root',
})
export class AppService {

}
