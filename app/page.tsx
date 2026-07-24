import React from "react";
import Link from "next/link";
import LikeButton from "./ui/likeButton";
import { getBlog } from "./services/getBlog";
import { cacheLife, cacheTag } from "next/cache";

const page = async () => {
  //? console.log("This is the root route!"); this will be shown in the terminal as it is a server side component
  "use cache";
  cacheLife("hours");
  cacheTag("blogs");

  const blogs = await getBlog();

  // console.log(blogs);

  return (
    <div>
      Hellow this is the root page! Blog page
      <Link href={"/blogs/1"}>Blogs</Link>
      <LikeButton></LikeButton>
      <p>Hellow world!</p>
      {blogs.map((blog: any) => {
        return (
          <div key={blog.id}>
            <div>
              <p>{blog.id}</p>
              <p>{blog.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
