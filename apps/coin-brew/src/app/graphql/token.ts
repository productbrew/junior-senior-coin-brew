const AUTH_TOKEN = 'access_token';

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN);
}
export function setToken(token: string) {
  return localStorage.setItem(AUTH_TOKEN, token);
}

export function deleteToken() {
  localStorage.removeItem(AUTH_TOKEN);
}
