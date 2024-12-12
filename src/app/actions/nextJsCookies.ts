'use server'

import { cookies } from 'next/headers'
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Sets a cookie with a specified key and value.
 *
 * This function asynchronously retrieves the cookie store and sets a cookie
 * with the given key and value.
 *
 * @param {string} key - The name of the cookie to set.
 * @param {string} value - The value to assign to the cookie.
 *
 * @example
 * await setNextCookie('userToken', 'abc123');
 */
export async function setNextCookie(key: string, value: string) {
    const cookieStore = await cookies()
    cookieStore.set(key, value)
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