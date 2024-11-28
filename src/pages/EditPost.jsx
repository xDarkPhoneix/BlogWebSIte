import React ,{useState,useEffect} from 'react';
import { Container,PostForm } from '../components';
import { useNavigate,  useParams } from 'react-router-dom';
import service from '../appwrite/config';

function  EditPost () {
  const [posts,setposts]=useState(null)
   const navigate=useNavigate()
   const {slug}=useParams()


   useEffect(()=>{

    service.getPost(slug).then((post)=>{
        if(post){
          setposts(post)
          
          
        }else{
          navigate("/")
        }
       
    })
    

   },[slug,navigate])

    return posts? (
      <div className='py-8'>
        <Container>
          <PostForm post={posts} />
        </Container>
      </div>
    ) : null
      
    
}

export default EditPost;