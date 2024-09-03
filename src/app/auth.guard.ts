import { CanActivateFn } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { loadUser } from './store/user/user.action';



export const authGuard: CanActivateFn = (route, state) => {
  const token = getCookie('jwt');
  if (token) {
    return true;
  }
  return false;
};

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
