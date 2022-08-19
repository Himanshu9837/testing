import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import Heading from '../../components/atom/Heading/Heading.js';
import Span from '../../components/atom/Span/Span.js';
import { useRouter } from 'next/router'
import Navbar from '../../components/molecule/Navbar2/Navbarhome';
import Footer from '../../components/molecule/Footer/footer';



toast.configure();
const notify = (message) => toast(message);
export default function resetpassword() {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();
    const [loader, setloader] = useState(false);
    const [datas, setdatas] = useState('');

    const [user, setUser] = useState({
        password: "", cpassword: ""
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    console.log(user);


    const Changepassword = async () => {
        const { password, cpassword } = user;

        if (user.password.length && user.cpassword.length >= 3) {
            const res = await fetch(`${apiKey}api/newpassword/${datas}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                },
                body: JSON.stringify({
                    password, cpassword
                }),
            })
            const data = await res.json();
            if (res.status === 400 || !data) {
                notify('Oops  Password Not Match!')
                // notify(data.error)
                // notify(data.error)
                // setloader(false)
            } else {
                notify('Password Update Successfully')
                router.replace('/login');
                // setTimeout(() => {
                // router.replace('/')
                // }, 100);
                // setloader(false);
                // window.localStorage.setItem('user', JSON.stringify(data))
            }
            // .then((res) => res.json())
            // .then((data) => {
            //     notify('Password Update Succesfully')
            // })
            // .catch((error) => {
            //     console.log(error);
            //     notify('Password Wrong')
            // });
        } else if (user.password.length && user.cpassword.length <= 3) {
            notify('Password Greater than 3 character')
        }
        else {
            notify('Fill Input First')
        }
    }
    useEffect(() => {
        // getsverify()
        if (router.isReady) {
            const data1 = router.query.resetpassword;
            console.log(data1);
            setdatas(data1);
        }
    }, [router.isReady])

    return (
        <>
            <div className="outerconatinersss">
                <Navbar />
                <div className=" containerss">


                    <div className="alerts">
                        <ToastContainer
                            autoClose={600}
                        />
                    </div>

                    {
                        loader ? (
                            <div class="loader"></div>
                        ) : (
                            <>
                                <div className="innerwrapper">
                                    <div className="image1">
                                        <img src="/images/image1.svg" />
                                    </div>
                                    <div className="innerwarpper3">
                                        <div className="title_login">
                                            <Heading prop="Reset Your's Password" />
                                            <Span prop="Login to your account" spanalign="Center" />
                                        </div>
                                        <div className="input-fields">
                                            <form method="post">
                                                <input type="password" placeholder='New Password' name="password" className='input' onChange={handleInputs} required />
                                                <div className="passwordshow">
                                                    <input type="password" placeholder='Confirm Password' name="cpassword" className='input' onChange={handleInputs} required />
                                                    {/* <div className="passwords" onClick={togglepassword}>
                                                        {
                                                            passwords ? <VisibilityOffIcon /> : <VisibilityIcon />
                                                        }
                                                    </div> */}
                                                </div>
                                            </form>

                                        </div>
                                        <div className="btnloginpage">
                                            <button className="button" onClick={Changepassword}>Confirm</button>
                                        </div>
                                    </div>
                                    <div className="image2">
                                        <img src="/images/image1.svg" />
                                    </div>

                                </div>

                            </>
                        )
                    }
                </div>
                <Footer />
            </div>






            {/* <div className=" containerresetpassword">
                <div className="alerts">
                    <ToastContainer
                        autoClose={600}
                    />
                </div>

                {
                    loader ? (
                        <div class="loader"></div>
                    ) : (
                        <>

                            <Navbar />
                            <div className="innerwrapper">
                                <div className="image1">
                                    <img src="/images/image1.svg" />
                                </div>


                                <div className='innerwarpper5'>
                                    <div className="title">
                                        <Heading prop="Reset Your's Password" />
                                        <Span prop="Login to your account" spanalign="Center" />
                                    </div>
                                    <div className="input-fields">
                                        <form method="post">
                                            <input type="password" placeholder='New Password' name="password" className='input' onChange={handleInputs} required />
                                            <input type="password" placeholder='Confirm Password' name="cpassword" className='input' onChange={handleInputs} required />

                                        </form>

                                    </div>

                                    <div className="btn">
                                        <button className='button' onClick={Changepassword}>Confirmsss</button>
                                    </div>

                                </div>

                                <div className="image2">
                                    <img src="/images/Login_design.svg" />
                                </div>
                            </div>

                        </>
                    )

                }



            </div> */}
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