import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token'); // Adjust token retrieval as necessary

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

// Apply middleware to all routes under /dashboard
export const config = {
    matcher: ['/dashboard/:path*'], // Matches /dashboard and all its subpaths
};
