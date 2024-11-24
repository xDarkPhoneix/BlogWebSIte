import { useState ,useEffect} from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import authservice from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom';


function App() {
 
  const [loading,setLoading]=useState(true);

  const dispatch=useDispatch();


  useEffect(()=>{
   
    
    authservice.getCurrentUser()
    .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
    })
    .finally(()=>setLoading(false))


   
   

   

  },[])

  return !loading ? (
  
    <div className='min-h-screen w-full flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
     <Header/>
      <main>
      <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
  
)
 : (
    <div className='min-h-screen w-full  bg-gray-400 '>
      <div className='flex text-4xl items-center justify-center '>Loading...</div>
    </div>
 )

}

export default App
