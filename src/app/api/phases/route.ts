import {NextRequest, NextResponse} from "next/server";

let route: string = "phase_1"

export interface RequestRoute {
    newRoute: string
}

export interface ResponseRoute {
    route: string
}

/**
 * Handles POST requests to update the email's current route.
 * @param {NextRequest} request - The incoming POST request.
 */
export async function POST(request: NextRequest) {
    const body: RequestRoute = await request.json()

    route = body.newRoute

    return NextResponse.json({status: 200})
}

/**
 * Handles GET requests to retrieve the current route state.
 */
export async function GET() {
    return NextResponse.json({route: route}, {status: 200})
}

