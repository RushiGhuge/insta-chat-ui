import { CanActivateFn } from '@angular/router';


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
