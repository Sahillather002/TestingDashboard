import { parseCookies } from 'nookies';

export function getCookie(name: string): string | undefined {
  const cookies = parseCookies();
  return cookies[name];
}
