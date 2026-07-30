"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginState {
    success : boolean;
    statusCode : number;
    message : string;
    data  : {
        accessToken : string;
        refreshToken : string;
    };
}

interface RegisterState {
    success : boolean;
    statusCode : number;
    message : string;
    data : {
        name : string;
        email : string;
        password : string
    }
}

export const loginAction = async(previousState : LoginState, formData : FormData) => {

    const email = formData.get("email");
    const password = formData.get("password");

    const payLoad = {
        email,
        password
    }
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(payLoad)
    })

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies();
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly : true,
            sameSite : 'lax',
            maxAge : 60 * 60 * 24
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly : true,
            sameSite : 'lax',
            maxAge : 60 * 60 * 24 * 7
        })

        redirect('/dashboard');
    }

    return result;
}

export const registerAction = async(previousState : RegisterState ,formData : FormData)=>{
    const payLoad = {
        name : formData.get('name'),
        email : formData.get('email'),
        password : formData.get('password')
    }

    const confirmPassword = formData.get('confirmPassword');

    if(payLoad.password !== confirmPassword){
        return {
            success : false,
            message : "Passwords Do not match!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/register`,{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payLoad)
    })

    const result = await res.json();


    // if(result.success){
    //     redirect('/login');
    // }

    return result;
}

