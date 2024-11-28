import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import comments from '../appwrite/comments';


function  Comments ({post}) {
    const [fetch,setFetch]=useState(false)
    const [xomment,setComments]=useState([])
    const {slug}=useParams()
    const userData=useSelector((state)=>state.auth.userData)
    const {register,handleSubmit}=useForm()
     
    useEffect(()=>{
        

        console.log("hola",post);
        comments.getComment(post.$id).then((qt)=>{
            console.log("qt",qt);
            setComments(qt.documents)
         })
         console.log("x",xomment);
         
    },[slug,fetch])


  

    const comment=async(data)=>{
        console.log(data.comment);
        
      const commentx=  await comments.createComment(
            {
                Comments:data.comment,
                userId:userData.$id,
                postId:post.$id,
                userName:userData.name
            }
        )
     
        console.log("commentss",commentx);
        setFetch(!fetch)


    }


    return (
      <>
        <div className="  text-3xl font-bold mt-2">
         Comment Section
               
            <form
            className='w-full gap-2'
             onSubmit={handleSubmit(comment)}
            >
            <div className='flex w-full p-4 gap-2'>
            <input
                placeholder="Add your comment here"
                className="text-sm w-3/4 rounded-md p-3"
                type="text"
                {...register("comment",{
                    required:true
                 }
                )}
               />
               <button className='bg-slate-800 text-white p-3 rounded-md text-sm w-1/4' type='submit'>Add</button>
               </div>
            </form>
         
        
        </div>
       <>
       <div className='browser-css border rounded-xl p-4 bg-gray-500  mt-5'>
        {xomment.length !== 0 ? (<>
            {xomment?.map((c)=>(
            <div className='m-2 bg-slate-900 text-white p-3 rounded-md' key={c.$id}>
                 <>
                  {c.userName===userData?.name ? (<>
                        <span className='m-1 font-bold italic'>@You</span>
                        
                    </>) : (
                    <>
                     <div className='m-1 font-bold italic'>@{c.userName}</div>
                    </>
                  )}
                
                 </>
                 <div className='mt-1 ml-3' >{c.Comments}</div>
            </div>
         ))}
        </>) : (<>
           <span className='font-bold italic ml-3'>No Comments Yet</span>
         </>)}
        </div>
       </>

       
    </>
    )
}

export default Comments;