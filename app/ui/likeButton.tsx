"use client"
import React from 'react'

const LikeButton = () => {
  return (
    <div>
      <button onClick={()=>{
        console.log("Button is Clicked!")
      }} className='cursor-pointer'>Click me</button>
    </div>
  )
}

export default LikeButton;
