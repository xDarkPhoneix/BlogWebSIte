import React, { useEffect } from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function  PostCard ({$id,title,featuredImage}) {

  

    return (
       
            <Link to={`/post/${$id}`}>
                <div className='w-full bg-gray-100 rounded-xl p-6 md:p-4'>
                <div className='w-full justify-center mb-4'>
                       
                        <img 
                        className='rounded-xl'
                         src={service.getFilePreview(featuredImage)}
                        />
        
                    </div>
                    <h2
                    className='text-xs md:text-xl font-bold flex flex-wrap'
                    >{title}</h2>
                </div>
            </Link>
    )
}

export default PostCard;