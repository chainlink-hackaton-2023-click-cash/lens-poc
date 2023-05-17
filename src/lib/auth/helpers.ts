const STORAGE_KEY = 'LH_STORAGE_KEY';

export function isTokenExpired(expiration: number) {
  if (!expiration) return true;

  if (Date.now() >= expiration * 1000) {
    return true;
  }
  return false;
}

export function readAccessToken() {
  if (typeof window === undefined) return null;

  const ls = localStorage || window.localStorage;

  if (!ls) throw new Error('Local Storage is not available');

  const data = ls.getItem(STORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data) as {
    accessToken: string;
    refreshToken: string;
    exp: number;
  };
}

export function setAccessToken(accessToken: string, refreshToken: string) {
  const { exp } = parseJwt(accessToken);

  const ls = localStorage || window.localStorage;

  if (!ls) throw new Error('Local Storage is not available');

  ls.setItem(
    STORAGE_KEY,
    JSON.stringify({
      accessToken,
      refreshToken,
      exp,
    })
  );
}

export function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
