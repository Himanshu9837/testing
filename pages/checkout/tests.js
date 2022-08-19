import { useEffect, useState } from "react";
import React from 'react'


const Test = () => {
     

 const array=[];
    const product =async() => {
        if (localStorage) {
        const arrayOfData = localStorage.getItem('user');
         if (arrayOfData) {
            const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
            const iddata = d.tokenData.id;
             
            array.push(iddata)
           
         } else {
            window.location = '/login';
            
         }
        }
      }
      product();
    return (
        <div className="App">
             
            {array}
           
        </div>
    );
};



export default Test;