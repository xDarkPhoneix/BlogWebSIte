import React from 'react';

function  Spinner ({className=""}) {
    return (
        <div className="flex items-center justify-center">
          <div className={`w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin ${className}`}></div>
        </div>
      );
}

export default Spinner;