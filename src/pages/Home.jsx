import React ,{useEffect,useState,useCallback} from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useDispatch ,useSelector} from 'react-redux';

function  Home () {
    const [posts, setPosts] = useState([])
    const authStatus=useSelector((state)=>state.auth.status)


    useEffect(() => {
        service.getPosts().then((posts)=>{
            console.log("posts",posts);
            if(posts){
               setPosts(posts.documents)
               
           
            }   
    
           })
           console.log("posts",posts);
           
    
    }, [])
    
    
    // if (posts.length === 0) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                     <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to read posts
    //                     </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
    //{authStatus ? () : ()}

    return authStatus ? (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (  
        <div className="w-full py-8 mt-4 text-center">
                 <Container>
                     <div className="flex flex-wrap">
                         <div className="p-2 w-full">
                         <h1 className="text-2xl font-bold hover:text-gray-500">
                                 Login to read posts
                         </h1>
                         </div>
                     </div>
                 </Container>
             </div>
    )
}

export default Home;