import { NextRequest, NextResponse } from 'next/server'

export const proxy = (request : NextRequest) => {
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher : [
        "/dashboard/:path*",
        "/admin-dashboard/:path*"
    ]

}
