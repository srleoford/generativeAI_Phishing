// lib/auth.ts

export function createToken(email: string): string {
    const randomValues = crypto.getRandomValues(new Uint8Array(16));
    const uniqueData = email + Array.from(randomValues).map(byte => byte.toString(16).padStart(2, '0')).join('');
    const token = btoa(uniqueData); // base64 encoding 

    return token;
}
