import React, { useState } from 'react'

import Image from 'next/image'
// import Logo from "../../public/images/logo_1.svg";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import Logos from '../../components/molecule/Logos/Logos.js'



toast.configure();
const notify = (message) => toast(message);
export default function logins() {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();
    const [passwords, showpassword] = useState(false);
    const [loaders, setloaders] = useState(false);
    const [user, setUser] = useState({
        email: "", password: ""
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {

        setloaders(true)

        e.preventDefault();
        const { email, password } = user;
        const res = await fetch(apiKey + "api/usersignin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {

            notify(data.error)

            setloaders(false)
        } else {
            notify('Successfully Login')
            router.replace('/chat')
            window.localStorage.setItem('user', JSON.stringify(data))
        }
    }
    function togglepassword() {
        showpassword(!passwords);
    }

    return (
        <>
            <div className={`lodersouter ${loaders ? 'active' : ''}`}>
                <div className="innerloaders">
                    <div class="loader"></div>
                </div>
            </div>
            <div className="logincontainer">
                <div className="logininner">
                    <div className="loginlogo">
                        {/* <Link href="/">
                            <Image src={Logo} alt="Not-found" />
                        </Link> */}
                        {/* <Logo /> */}
                    </div>
                    <form method='post'>
                        <div className="logindetail">
                            <div className="loginemail">
                                <input class="emailss" type="email" name="email" placeholder='Enter your email' onChange={handleInputs} required />

                            </div>
                            <div className="loginpassword">
                                <input class="pass" type={passwords ? "text" : "password"} name="password" placeholder='Enter your password' onChange={handleInputs} required />
                                <div className="showpass" onClick={togglepassword}>
                                    {
                                        passwords ? <VisibilityOffIcon /> : <VisibilityIcon />
                                    }
                                </div>
                            </div>
                            <div className="loginbuttonchat">
                                <button className='loginbtnschat' onClick={PostData}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
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