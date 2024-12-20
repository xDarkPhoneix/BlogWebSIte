import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button,Container } from "../components";
import service from "../appwrite/config";
import Comments from "../components/Comments";

function  Post () {
    const [post,setPost]=useState(null)
    const { slug } = useParams();
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
  

    

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
         console.log("us",userData);
         
        if (slug) {
    
             service.getPost(slug).then((postt) => {
                if (postt) setPost(postt);
               
                
                else navigate("/");
            });
           
            
        } else navigate("/");
       
    }, [slug, navigate]);


  



    const deletePost = () => {
          
          
             service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css border rounded-xl p-4 bg-gray-500  ">
                    {parse(post.content)}
                    </div>
              
                <Comments post={post}/>
              
            </Container>
        </div>
    ) : null;
    
}

export default Post;