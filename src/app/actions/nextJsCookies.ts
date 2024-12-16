'use server'

import { cookies } from 'next/headers'
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Sets multiple cookies with specified keys and values.
 *
 * This function asynchronously retrieves the cookie store and sets multiple cookies
 * based on the provided key-value pairs.
 *
 * @param {Array<{key: string, value: string}>} cookiesData - An array of objects containing cookie keys and values.
 *
 * @example
 * await setMultipleCookies([
 *   { key: 'userToken', value: 'abc123' },
 *   { key: 'sessionId', value: 'xyz789' }
 * ]);
 */
export async function setMultipleCookies(cookiesData: { key: string; value: string }[]) {
    const cookieStore = await cookies()
    cookiesData.forEach(({ key, value }) => {
        cookieStore.set(key, value)
    })
}

/**
 * Retrieves the value of a specified cookie.
 *
 * This function asynchronously retrieves the cookie store and returns the
 * cookie value associated with the provided key, if it exists.
 *
 * @param {string} key - The name of the cookie to retrieve.
 * @returns {Promise<RequestCookie | undefined>} A promise resolving to the cookie
 * value if found, or undefined if the cookie is not set.
 *
 * @example
 * const userToken = await getNextJsCookies('userToken');
 * if (userToken) {
 *     console.log(`User token: ${userToken.value}`);
 * }
 */
export async function getNextJsCookies(key: string): Promise<RequestCookie | undefined> {
    const cookieStore = await cookies()
    return cookieStore.get(key)
}