import React ,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function  AuthLayout ({children,authentication=true}) {
    const navigate=useNavigate()
    const authStatus=useSelector(state=>state.auth.status)
    const [loader,setloader]=useState(true)


    useEffect(()=>{

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloader(false)
 }, [authStatus, navigate, authentication])


    return loader? <h2>Loading</h2> : <>{children}</>
     
}

export default AuthLayout;