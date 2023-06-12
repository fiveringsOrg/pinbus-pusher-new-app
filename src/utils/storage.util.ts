export const TOKEN = "user_token";
export const USER = "user";

export function getToken(): string {
  return localStorage.getItem(TOKEN) as string;
}

export function saveToken(token: string): void {
  return localStorage.setItem(TOKEN, token);
}

export function cleanToken() {
  localStorage.removeItem(TOKEN);
}

export function getStorageUser(): string {
  return localStorage.getItem(USER) as string;
}

export function saveUser(token: string): void {
  return localStorage.setItem(USER, token);
}

export function cleanUser() {
  localStorage.removeItem(USER);
}
