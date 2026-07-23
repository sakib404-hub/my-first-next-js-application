import React from 'react'

const Slugpage = async({params} : {params: Promise<{ slug: string }>}) => {
  
  const {slug} = await params;
  
  return (
    <div>
      This is the Slug Page : {slug}
    </div>
  )
}

export default Slugpage
