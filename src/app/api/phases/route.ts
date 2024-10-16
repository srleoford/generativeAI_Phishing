import { NextRequest, NextResponse } from "next/server";

let route: string = "phase_1"

export interface RequestRoute { 
    newRoute: string
}

export interface ResponseRoute {
    route: string
}

export async function POST(request: NextRequest) {
    const body: RequestRoute = await request.json()

    route = body.newRoute
    
    return NextResponse.json({status: 200})
}

export async function GET() {
    
    return NextResponse.json({route: route}, {status: 200})
}

