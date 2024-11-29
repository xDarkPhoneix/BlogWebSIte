import React, { useCallback ,useEffect, useState} from 'react';
import {Button ,Input,Select,RTE} from "../index"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';

 
function  PostForm ({post}) {
    
    const [loading,setLoading]=useState(false)

    const {register,handleSubmit,watch ,setValue,getValues,control}=useForm({
        defaultValues:{
         title: post?.title || "",
         slug:post?.slug || "",
         content : post?.content || "",
         status: post?.status || "active",
         featuredImage:post?.featuredImage || "",

        }
    })
    
    const navigate=useNavigate()
    const userData=useSelector((state)=>state.auth.userData)

    const submit=async(data)=>{
        console.log("post data",post);
       
       
        
        
         
         
        if(post){
            setLoading(true)
            const file=data.image[0] ? await service.fileUpload(data.image[0]): null;

            if(file){
                await service.deleteFile(post.featuredImage)
            }

            const dbPost=await service.updatePost(post.$id,{
                ...data,
                featuredImage : file ? file.$id : undefined
            })

            setLoading(false)
            if(dbPost){
                navigate(`/post/${post.$id}`)
            }
        }
        else {
             
            setLoading(true)
            const file =await service.fileUpload(data.image[0])
            console.log("file" , file);
            
            if(file){
                
                const fileId=file.$id
                 data.featuredImage=fileId
                 
               
                 const dbPost=await service.createPost({
                    ...data,
                    userId:userData.$id
                 });
                 setLoading(false)
                 if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                 }

            }
        }

    }


    const slugTransform=useCallback((value)=>{

        if(value && typeof value==='string')
         return value
         .trim()
         .toLowerCase()
         .replace()
         .replace(/[^a-zA-Z\d\s]+/g, "-")
         .replace(/\s/g, "-");
              
      
         return ""

    },[])


    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==="title"){
                setValue("slug",slugTransform(value.title,
                    {
                        shouldValidate:true
                    }
                ))
            }

            
            
            

        })


      return ( )=>{
        subscription.unsubscribe()
      }
     
    },[watch,slugTransform,setValue])

   
    

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif ,image/webp"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
               {loading ? (<><Spinner className='border-green-950'/></>) : (<> {post ? "Update" : "Submit"}</>)}
            </Button>
        </div>
    </form>
    )
}

export default PostForm;