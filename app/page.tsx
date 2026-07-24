import Link from 'next/link'
import React from 'react'
import LikeButton from './ui/likeButton'

const page = () => {
  
  //? console.log("This is the root route!"); this will be shown in the terminal as it is a server side component

  return (
    <div>
      Hellow this is the root page!
      Blog page <Link href={"/blogs/1"}>Blogs</Link>
      <LikeButton></LikeButton>
    </div>
  )
}

export default page
