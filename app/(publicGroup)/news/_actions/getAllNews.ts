export const getAllNews =  async() =>{
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/getall`, {
        method : "GET",
        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 12,
            tags : ["all-news"]
        }
    });

    const result = await res.json();

    return result;
}