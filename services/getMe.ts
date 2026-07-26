"use server"

import { cookies } from "next/headers"

export const getMe = async()=>{
    const cookieStrore = await cookies();

    const accessTokenObj = cookieStrore.get('accessToken');
    const accessToken = accessTokenObj?.value;

    if(!accessToken){
        return {
            success : false, 
            message : "User Not Logged In."
        }
    }
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/me`,{
        method : "GET",
        headers : {
            // Authorization : accessToken as unknown as string,
            Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`,
            Cookie : `accessToken=${accessToken}`
        }
    });

    const result = await res.json();
    return result;
}