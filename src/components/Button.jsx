import React from 'react';

function  Button ({
    children,
    className="",
    type="button",
    bgColor="bg-blue-600",
    textColor="text-white",
    ...props

}) {
    return (
      <button className={`px-4 py-2 w-full mt-2 rounded-lg ${type} ${bgColor} ${textColor} ` }  {...props }>
       
        {children}

      </button>
    )
}

export default Button;