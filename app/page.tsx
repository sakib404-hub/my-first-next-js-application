import React from "react";
import Link from "next/link";
import LikeButton from "./ui/likeButton";

const page = async() => {
  //? console.log("This is the root route!"); this will be shown in the terminal as it is a server side component

  const post = await fetch("https://jsonplaceholder.typicode.com/todos");

  const postData = await post.json();

  // console.log(postData);

  return (
    <div>
      Hellow this is the root page! Blog page{" "}
      <Link href={"/blogs/1"}>Blogs</Link>
      <LikeButton></LikeButton>
    </div>
  );
};

export default page;
