import { revalidateTag } from "next/cache";
import { cacheLife } from "next/cache";


export const getBlog = async () => {
    const post = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method : "GET",
        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24,
            tags : ["blogs"]
        }
    });

    const postData = await post.json();
    return postData;
}

export const renewBlogCache = ()=> {
    // revalidateTag("blogs", "max");
    revalidateTag("blogs", {
        expire : 60 * 60 * 24 * 7
    });
}
