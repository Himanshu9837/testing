import React, { useEffect, useState } from 'react'

import Navbar from '../../../components/molecule/Navbar2/Navbarhome';
import Link from 'next/link';
import { useRouter } from 'next/router'


export default function payment  ()  {
  const [datas,setadats]=useState('');
  const router=useRouter();
  const datass=router.query.payments;

  useEffect(() => {
    if (router.isReady) {
        const data1 = router.query.payment;
         setadats(data1)
      }
  }, [router.isReady])
  return (
    <>

      <div class="conatiner">
        <Navbar />


        <div class="paymentstatus">
          <div class="paymentwrapper" id="success" >
            <div class="paymenticon">

              <img src='/static/images/checked_1.png' />

            </div>
            <div class="payment-detail">
              <h2>Thank you for your purchase</h2>
              <h5>your payment has been <span class="confirmed">confirmed</span></h5>
              <p>order Id {datas}</p>
            </div>
          </div>
          <Link href='/'>
            <button className='homebtns'>
              Go to Home
            </button>
          </Link>



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