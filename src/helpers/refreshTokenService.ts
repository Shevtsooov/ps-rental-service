const key = 'refreshToken';

function get() {
  return localStorage.getItem(key)
}

function save(token: string) {
  return localStorage.setItem(key, token)
}

function remove() {
  return localStorage.removeItem(key)
}

export const refreshTokenService = { get, save, remove };