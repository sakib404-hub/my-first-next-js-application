import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'

const AUTH_ROUTE = [
    "/login",
    "/register"
]

const PUBLIC_ROUTES = [
    '/',
    '/news',
    '/login',
    '/register'
]

export const proxy = async(request : NextRequest) => {
    const pathname = request.nextUrl.pathname;
    // console.log(request.nextUrl.pathname);
    // return NextResponse.redirect(new URL('/', request.url))

    //? this is one way of getting t he access token 
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    //? another way of getting the access token
    const accessToken = request.cookies.get("accessToken")?.value;

    const decoded = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

    let userRole = null;

    if(decoded){
        userRole = decoded.role
    }

    //? when the user is logged in and trying to get to the login or the register route we will redirect him to the home route or dashboard
    if(accessToken && AUTH_ROUTE.includes(pathname)){
        if(userRole === "USER"){
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }else if(userRole === "ADMIN"){
             return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }else if(userRole === "AUTHOR"){
             return NextResponse.redirect(new URL("/author-dashboard", request.url));
        }else {
             return NextResponse.redirect(new URL("/", request.url));
        }
    }

    //? checking the public routes
    //? authenticated pages handling
    const isPublic = PUBLIC_ROUTES.some((route)=>{
        pathname === route || pathname.startsWith(route + "/") 
    })

    //? the user is wanting to access the protected route
    if(!accessToken && !isPublic){
        return NextResponse.redirect(new URL("/login", request.url));
    }


    return NextResponse.next();
}

//? if matcher is given with regular expression therefore it is known as catcher of all route
export const config = {
    matcher : [
        // "/dashboard/:path*",
        // "/admin-dashboard/:path*"
        '/((?!api|_next/static|_next/image|.*\\.png$).*)'
    ]

}
