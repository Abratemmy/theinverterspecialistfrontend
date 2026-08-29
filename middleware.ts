import {
    NextRequest,
    NextResponse
} from "next/server";


export function middleware(
    request: NextRequest
) {

    const token =
        request.cookies.get("token")?.value;


    // ========================================================
    // NO TOKEN
    // ========================================================

    if (!token) {

        return NextResponse.redirect(
            new URL(
                "/",
                request.url
            )
        );

    }


    // ========================================================
    // TOKEN EXISTS
    //
    // We don't decode the JWT here.
    // The backend remains responsible for
    // determining the user's actual role.
    // ========================================================

    return NextResponse.next();

}


// ============================================================
// RUN ONLY FOR ADMIN ROUTES
// ============================================================

export const config = {

    matcher: [
        "/admin/:path*"
    ]

};