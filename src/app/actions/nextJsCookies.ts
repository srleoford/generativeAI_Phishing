'use server'

import { cookies } from 'next/headers'
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";

export async function setNextCookie(key: string, value: string) {
    const cookieStore = await cookies()
    cookieStore.set(key, value)
}

export async function getNextJsCookies(key: string): Promise<RequestCookie | undefined> {
    const cookieStore = await cookies()
    return cookieStore.get(key)
}