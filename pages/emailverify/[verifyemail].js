import React, { useEffect } from 'react'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import Checked from '../../public/images/checked_1.png';
import { useRouter } from 'next/router'
import axios from 'axios';
import Image from 'next/image'

export default function verifyemail() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();




  const getsverify = () => {


    if (router.isReady) {
      const data1 = router.query.verifyemail;
      console.log(data1);
      axios({
        method: "POST",
        url: `${apiKey}api/emailsuccess/${data1}`,

      })
        .then((res) => {
          console.log("res", res);
         

        })
        .catch((err) => {
          console.log("error in request", err);
        });

    }
  }

  useEffect(() => {
    getsverify()
  }, [router.isReady])

  return (
    <>

      <div class="conatiner">
        
        <div class="paymentstatus">

          <div class="paymentwrapper" id="emailverify" >

            <div className="emailwrapper">
              <div class="paymenticon">
                
                <Image
                  src={Checked}
                  alt='notfound'
                />
              </div>
              <div class="payment-detail">
                <h2 className='auth'>Authenication complete</h2>
                <p className='paraemail'>You may now close this window  and go back to the previous page</p>
              </div>
            </div>


          </div>
         


         
        </div>
      </div>

    </>
  )
}


export async function getInitialProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}