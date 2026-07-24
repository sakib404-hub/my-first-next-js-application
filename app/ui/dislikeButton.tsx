"use client"
import React from 'react'

const DislikeButton = ({blogId} : {blogId : string}) => {
  return (
    <button onClick={()=>{
        console.log("Dislike button clicked for blogSlug : ", blogId);
    }}>
        Dislike : {blogId}
    </button>
  )
}

export default DislikeButton
