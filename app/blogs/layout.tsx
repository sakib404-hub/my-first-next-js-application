import React from 'react'

const Blogslayout = ({
    children
} : {
    children : React.ReactNode
}) => {
  return (
    <div>
      Blogs layout is special it is specially for the blogs route or nested route inside the blog directory!
      {children}
    </div>
  )
}

export default Blogslayout;
