import { useEffect, useState } from "react";
import React from 'react'


const Test2 = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
     

 const array=[];

    const product =async() => {
        const arrayOfData = localStorage.getItem('user');
         if (arrayOfData) {
            const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
            const iddata = d.tokenData.id;
            
            
            fetch(`${apiKey}api/cart/cartinfo/${iddata}`).then(
                (res) => {
                  res.json().then((data3) => {
                    const data1= data3[0];
                    const subtotal = data1.subTotal;
                    const paymentss = 'paypal';
                    const data = { paymethod: paymentss, price: subtotal };
                
                    fetch(apiKey + 'api/withdrawal_wallet/paymentfee', {
                      method: 'POST', 
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                    })
                
                      .then(response => response.json())
                      .then(data2 => {
                          const check=data2.result
                        array.push(check)
                       
                       
                       
                        
                      })
                 });
                }
              );
          
         } else {
             router.push('/login')
         }
      }
      product();
    return (
        <div className="App">
             
            {array}
           
             
        </div>
    );
};



export default Test2;