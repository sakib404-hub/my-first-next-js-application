import DislikeButton from '@/app/ui/dislikeButton';
import React from 'react'

const Slugpage = async({params} : {params: Promise<{ slug: string }>}) => {
  
  const {slug} = await params;
  
  return (
    <div>
     <p> This is the Slug Page : {slug}</p>
      <DislikeButton blogId={slug}></DislikeButton>
    </div>
  )
}

export default Slugpage
