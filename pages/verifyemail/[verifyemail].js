import React, { useEffect } from 'react'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import WarningIcon from '@mui/icons-material/Warning';
// import CancelIcon from '@mui/icons-material/Cancel';
// import Logo from '../../public/images/Logo_1.svg';
// import Navbar from '../components/molecule/Navbar2/Navbarhome';
// import Link from 'next/link';
import { useRouter } from 'next/router'
import axios from 'axios';

const payment = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();




    const getsverify = () => {


        if (router.isReady) {
            const data1 = router.query.verifyemail;
            axios({
                method: "POST",
                url: `${apiKey}api/emailsuccess/${data1}`,

            })
                .then((res) => {
                    console.log("res", res);
                    //   setProductData(res.data);

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
                {/* <Navbar /> */}





                <div class="paymentstatus">
                    <div class="paymentwrapper" id="success" >
                        <div class="paymenticon">
                            <CheckCircleOutlinedIcon className="done" />
                        </div>
                        <div class="payment-detail">
                            <h2>Thank you for your purchase</h2>
                            <h5>your payment has been <span class="confirmed">confirmed</span></h5>
                            <p>order Id 15000000855</p>
                        </div>
                    </div>
                    {/* <Link href='/'>
            <button className='homebtns'>
              Go to Home
            </button>
          </Link> */}


                    {/* <div class="paymentwrapper" id="pending">
            <div class="paymenticon">
              <WarningIcon className="warning" />
            </div>
            <div class="payment-detail">
              <h2>Oops!</h2>
              <h5>your payment is on <span class="hold">Hold</span></h5>
              <p>order Id 433566801520</p>
            </div>
          </div> */}
                    {/* <div class="paymentwrapper" id="failed">
            <div class="paymenticon">
              <CancelIcon className='cancel' />
            </div>
            <div class="payment-detail">
              <h5>your payment has <span class="failed">Declined</span></h5>
              <p class="declined">Try again or use another payment method.</p>
            </div>
          </div> */}
                </div>
            </div>

        </>
    )
}

export default payment