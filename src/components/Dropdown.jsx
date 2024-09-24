import React from 'react';

const Dropdown = ({handleProfileData : handleProfileData , setShowDropdown , dropdownList , name}) => {
  return (
    <div className={`flex w-screen h-screen z-10 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 justify-center bg-slate-900 bg-opacity-50 items-center`}
    onClick = {() => {
        setShowDropdown(null)
      }}
    >
    <div className='flex flex-col bg-slate-800 p-2 py-1 rounded-lg top-0 left-0' onClick={(e) => { e.stopPropagation() }}>
      {dropdownList.map((item , index) => (
        <div className='text-white flex gap-2 items-center p-1 border-b-2 last-of-type:border-b-0 border-gray-700' key={index}>
            <input type="radio" name={name} value={item} id={item} className='inline-block' 
            onChange={ (e) => { 
                handleProfileData(e) ;
                setShowDropdown(null);
            }}/> 
            <label htmlFor={item} className='pb-1'>{item}</label>
        </div>
      ))}
      </div>
    </div>
    )
};

export default Dropdown;
