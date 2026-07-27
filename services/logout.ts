"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"

export const logOut = async()=>{
    const cookieStore = cookies();

    (await cookieStore).delete("accessToken");
    (await cookieStore).delete("refreshToken");

    revalidateTag("my-profile", "max");
}