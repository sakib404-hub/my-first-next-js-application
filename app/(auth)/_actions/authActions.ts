"use server"

export const loginAction = async(formData : FormData) => {
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

    console.log(result);
}

export const registerAction = async()=>{

}

