import React, { useContext, useEffect, useState } from 'react'
import Contextapi from "../../Context/Contextapi.js";
import { useRouter } from 'next/router';

const checklogin = () => {

    const {setloaderspage,loaderspage}=useContext(Contextapi);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('userInfo');
        if (token) {
            setloaderspage(true)
            setTimeout(() => {
                setloaderspage(false)
            }, 2500);
            setTimeout(() => {
                localStorage.removeItem('userInfo')
            }, 1800000);
        }
        else {
            setloaderspage(true)
            router.push('/E4gadmin/login')
        }
    }, []);
    return (
        <div
        style={{display:'none'}}
        >checklogin</div>
    )
}

export default checklogin