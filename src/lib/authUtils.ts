interface TokenPayload {
    exp: number;
    [key: string]: any;
}

const decodeBase64Url = (str: string): string | null => {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (error) {
    console.error("[AuthUtils] Error decoding token payload:", error);
    return null;
  }
};

/**
 * Decodes the payload section of a JWT.
 * @param token The complete JWT string (header.payload.signature).
 * @returns The decoded payload object or null if decoding fails.
 */
export const decodeTokenPayload = (token: string): TokenPayload | null => {
  if (!token) {
    return null;
  }
  
  const parts = token.split('.');
  
  if (parts.length !== 3) {
    console.warn("[AuthUtils] Invalid JWT format.");
    return null;
  }
  
  const payloadBase64 = parts[1];
  const decodedPayload = decodeBase64Url(payloadBase64);

  if (decodedPayload) {
    try {
      return JSON.parse(decodedPayload) as TokenPayload;
    } catch (e) {
      console.error("[AuthUtils] Error parsing decoded payload to JSON:", e);
      return null;
    }
  }
  
  return null;
};

/**
 * Checks if a token is expired.
 * @param token The JWT string.
 * @returns True if the token is expired or invalid, false otherwise.
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  const payload = decodeTokenPayload(token);
  
  if (!payload || !payload.exp) {
    console.warn("[AuthUtils] Token payload is missing 'exp' field or is invalid.");
    return true; 
  }

  const expirationTimeInMs = payload.exp * 1000;
  
  const safetyMargin = 60 * 1000; 

  const currentTimeInMs = Date.now();

  return currentTimeInMs >= expirationTimeInMs - safetyMargin;
};