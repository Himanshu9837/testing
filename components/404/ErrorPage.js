import React from 'react';
import Link from 'next/link';
// import Image from 'next/image'
// import errorimage from '../../public/images/error404.gif'


const ErrorPage = (props) => {
    return (
       <>
       <div className="maincontainer">
            <div className="errorboxcontainer">
                    <div className='textboxcontainer'>
                        Error 404 !
                        <div className='textboxcontainer1'>
                        The page you were looking for does not exist
                        </div>
                        <div>
                         <a href='/'>  <button className='backbutton'>Go Back</button> </a> 
                        </div>
                    </div>
                    <div>
                        <img src={'/images/error404.gif'} height={450} width={450} alt={'This is error image'}></img>
                    </div>

            </div>
            </div>
       
       </>
    );
}

export default ErrorPage;
    // import React from 'react'
    // // import Errorpage from ''
    
    // const ErrorPage = () => {
    //   return (
    //     <>
    // 	        <div>
                     
    //           </div>
    //     </>
    //   )
    // }
    
    // export default ErrorPage
    