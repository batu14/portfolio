import React, { useEffect } from 'react'
import Chips from '../../../../../Components/Chips'

const Tecs = ({ setTechnologies, technologies }) => {
  
  return (
    <div className='w-full flex flex-col gap-4 items-start mt-4 justify-start'>
        <Chips setFunction={setTechnologies} technologies={technologies} />
    </div>
  )
}

export default Tecs