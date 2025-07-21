import React from 'react'

const Container = ({children,isPadding=true,pageName = "",isModal=false}) => {
  return (
    <div className={`w-full relative h-full flex flex-col items-start justify-start min-h-screen ${isPadding ? 'p-5' : ''} ${isModal ? 'bg-white' : ''}`}>
        <div className='w-full flex items-center justify-start gap-2 p-4'>
            <h1 className='text-2xl font-bold'>{pageName}</h1>
        </div>
        {children}
    </div>
  )
}

export default Container