import React from 'react'

function Pokemon({id,name,img,type}) {
   const style = type + " thumb-container";
  return (
    <div className={`${style} hover:scale-105 transform transition-transform duration-300`}>
        <div className='text-sm'>
              #0{id}
        </div>
         <img src={img} alt={name} className='h-52 w-52  '/> 
        
        <div>
            <h3>{name}</h3>
            <div className='text-sm'>Type={type}</div>
        </div>
    </div>
  )
}

export default Pokemon