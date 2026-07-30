"use server"

import { cookies } from "next/headers"

export const getNewAccessToken = async()=>{
    const cookieStrore = await cookies();

   const refreshToken = cookieStrore.get("refreshToken")?.value;

    if(!refreshToken){
        return {
            success : false, 
            message : "User Not Logged In."
        }
    }
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`,{
        method : "POST",
        headers : {
            Authorization : `${refreshToken}`,
            Cookie : `refreshToken=${refreshToken}`
        },
        cache : "no-store",
    });

    const result = await res.json();
    return result;
}