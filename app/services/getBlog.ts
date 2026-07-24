import { cacheLife } from "next/cache";


export const getBlog = async () => {
    "use cache";
    cacheLife("hours");
    
    const post = await fetch("https://jsonplaceholder.typicode.com/todos");

    const postData = await post.json();
    return postData;
}
