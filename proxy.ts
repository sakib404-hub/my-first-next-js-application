import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server'
import jwtutils from './services/jwt';
import { cookies } from 'next/headers';

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
    const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    //? another way of getting the access token
    const accessToken = request.cookies.get("accessToken")?.value;

    const decoded = accessToken ? jwtutils.verifyToken(accessToken, process.env.JWT_SECRET!)  : null;

    let userRole = null;

    if(!decoded?.success){
        //? token has expired or it is invalid therefore remove it
        cookieStore.delete("accessToken");
       return NextResponse.redirect(new URL("/login", request.url));
    }

    if(decoded?.success){
        userRole = (decoded.data as JwtPayload).role;
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
        return pathname === route || pathname.startsWith(route + "/") 
    })

    //? the user is wanting to access the protected route
    if(!accessToken && !isPublic){
        return NextResponse.redirect(new URL("/login", request.url));
    }


    //? authorizing the route
    if(pathname.startsWith("/dashboard") && userRole !== "USER"){
        return NextResponse.redirect(new URL("/not-found", request.url));
    }else if(pathname.startsWith("admin-dashboard") && userRole !== "ADMIN"){
          return NextResponse.redirect(new URL("/not-found", request.url));
    }else if(pathname.startsWith("author-dashboard") && userRole !== "AUTHOR"){
          return NextResponse.redirect(new URL("/not-found", request.url));
    }


    return NextResponse.next();
}

//? if matcher is given with regular expression therefore it is known as catcher of all route
export const config = {
    matcher : [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)'
    ]

}
