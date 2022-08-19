import React from 'react'
import Checked from '../../../../public/images/checked_1.png';
import Image from 'next/image'
import Link from 'next/link'

const Success = () => {
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
                                <h2 className='auth'>Payment complete</h2>
                                <p className='paraemail'>Payment will be added to your wallet soon.</p>
                                <Link href='/dashboard/wallet'>
                                    <div className="gobackbtn">
                                        Go Back
                                    </div>
                                </Link>
                            </div>
                        </div>


                    </div>





                </div>
            </div>

        </>
    )
}

export default Success