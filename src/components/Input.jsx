import React from 'react'

const Input = ({icon:Icon, ...props}) => {
  return (
    <div className='relative flex items-center w-full'>
    <div className='absolute p-3'>
        { Icon && <Icon className='size-7'/> }
    </div>
    <input {...props} required className='w-full bg-slate-800 text-xl rounded-md p-2 pb-3 ps-12 text-white' />
</div>
  )
}

export default Input