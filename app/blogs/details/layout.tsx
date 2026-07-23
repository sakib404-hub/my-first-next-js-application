import React from 'react'

const layout = ({children} : { children : React.ReactNode}) => {
  return (
    <div>
      This is the Details layout page!
      {children}
    </div>
  )
}

export default layout
