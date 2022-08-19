import React from 'react'
import { DashboardLayout } from '../../components/dashboard-layout';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image'
import Link from 'next/link'

const Template = () => {
    return (
        <>

            {/* welcome template */}
            <div className="templates"
                style={{
                    width: '80%',
                    margin: "1rem auto",
                    padding: "1rem 2rem",
                    borderRadius: '8px',
                    boxShadow: '1px 1px 10px',
                    background: "#bdc3c7"
                }}
            >
                <div className="divimage">
                    <img src="/images/logo_1.svg" height={150} width={150} />
                </div>
                <h2 className="tenplatetitle">
                    WELCOME TO ESPORTS4G - A ONE-STOP SOLUTION FOR ALL.
                </h2>
                <h4 className="tenplatedesc one_template">
                    To sign to our site, use these credential during checkout or the
                    Dear User,
                    <span className='account_backend_note'>
                        Thank you
                    </span>
                    for registering an account. On
                    <span className='account_backend_note'>
                        ESPORTS4G.
                    </span>
                    You'll now get the most recent updates, free in-game goods,
                    and fantastic discounts on new games on our platform.
                </h4>

                <h4 className="tenplatedesc">
                    We are a leading digital gaming marketplace worldwide, allowing gamers to trade
                    <span className='account_backend_note'>
                        gaming accounts.
                    </span>
                </h4>

                <span className="light">
                    Proceed through checkout faster
                </span>
                <span className="light">
                    Check the status of order
                </span>
                <span className="light">
                    View past Order
                </span>

                <div className="footerdivs">
                    <h3 className='footer_templete'>
                        THANK YOU, TEAM ESPORTS4G
                    </h3>
                    <h3 className='footer_templete'>
                        Esports4g.com. All Right Reserved.
                    </h3>
                    <div className="socialicons">
                        <div className="icons">
                            <Link href="https://www.facebook.com/Esports4G/" passHref={true}>
                                <a target="_blank" >
                                    <FacebookIcon />
                                </a>
                            </Link>
                        </div>
                        <div className="icons">
                            <Link href="https://www.instagram.com/esports4g_com/" passHref={true}>
                                <a target="_blank" >
                                    <InstagramIcon />
                                </a>
                            </Link>
                        </div>
                        <div className="icons">
                            <Link href="https://twitter.com/Esports4gdotcom/" passHref={true}>
                                <a target="_blank" >
                                    <TwitterIcon />
                                </a>
                            </Link>

                        </div>
                        <div className="icons">
                            <Link href="https://www.linkedin.com/company/esports4g-com/mycompany/" passHref={true}>
                                <a target="_blank" >
                                    <LinkedInIcon />
                                </a>
                            </Link>

                        </div>
                    </div>
                </div>



            </div>

            {/* reset password */}

            <div className="templates"
                style={{
                    width: '80%',
                    margin: "1rem auto",
                    padding: "1rem 2rem",
                    borderRadius: '8px',
                    boxShadow: '1px 1px 10px',
                    background: "#bdc3c7"
                }}
            >
                <div className="divimage">
                    <img src="/images/logo_1.svg" height={150} width={150} />
                </div>
                <h2 className="tenplatetitle">
                    You Requested For Password Reset
                </h2>

                <h4 className="tenplatedesc one_template">
                    Someone ( Hopefully YOU!) has requested to change your ESPORTs4G password.
                </h4>
                <span className="passowrdlink">
                    Please click the link below to change your password Change my password
                    <span>
                        <a href="http://178.62.228.242:3010/emailverify/$%7Btoken%7D%22%3Elink">
                            Link
                        </a>
                    </span>
                </span>
                <h5 className="note">
                    Please    <span className='account_backend_note'>
                        note
                    </span> the link will expire in 10 minutes. You must submit a new password request after 10 minutes.
                    Please ignore the email if you did not submit the request.
                    <span className='account_backend_note'>
                        Thank you ESPORTS4G
                    </span>
                </h5>
                <div className="footerdivs">
                    <h3 className='footer_templete'>
                        THANK YOU, TEAM ESPORTS4G
                    </h3>
                    <h3 className='footer_templete'>
                        Esports4g.com. All Right Reserved.
                    </h3>
                    <div className="socialicons">
                        <div className="icons">
                            <Link href="https://www.facebook.com/Esports4G/" passHref={true}>
                                <a target="_blank" >
                                    <FacebookIcon />
                                </a>
                            </Link>
                        </div>
                        <div className="icons">
                            <Link href="https://www.instagram.com/esports4g_com/" passHref={true}>
                                <a target="_blank" >
                                    <InstagramIcon />
                                </a>
                            </Link>
                        </div>
                        <div className="icons">
                            <Link href="https://twitter.com/Esports4gdotcom/" passHref={true}>
                                <a target="_blank" >
                                    <TwitterIcon />
                                </a>
                            </Link>

                        </div>
                        <div className="icons">
                            <Link href="https://www.linkedin.com/company/esports4g-com/mycompany/" passHref={true}>
                                <a target="_blank" >
                                    <LinkedInIcon />
                                </a>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            {/* status template */}

            <div className="templates"
                style={{
                    width: '80%',
                    margin: "1rem auto",
                    padding: "1rem 2rem",
                    borderRadius: '8px',
                    boxShadow: '1px 1px 10px',
                    background: "#bdc3c7"
                }}
            >
                <div className="divimage"
                    style={{
                        textAlign: "center"
                    }}
                >
                    <img src="/images/logo_1.svg" height={150} width={150} />
                </div>
                <h2 className="tenplatetitle"
                    style={{
                        fontSize: '1.4rem',
                        fontWeight: "700",
                        marginBottom: "2.5rem"
                    }}
                >
                    You Status Was Changed.
                </h2>
                <span className="passowrdlink"

                >
                    Your Profile on esporst4g.com is set to
                    <span className='account_backend_note'
                        style={{
                            color: "#f39c11",
                            padding: "0 0.3rem"
                        }}
                    >
                        Active
                    </span>
                </span>
                <div className="footerdivs"
                    style={{
                        textAlign: "center",
                        padding: "2rem 0"
                    }}
                >
                    <h3 className='footer_templete'
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: "700"
                        }}
                    >
                        THANK YOU, TEAM ESPORTS4G
                    </h3>
                    <h3 className='footer_templete'
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: "700"
                        }}
                    >
                        Esports4g.com. All Right Reserved.
                    </h3>


                </div>

            </div>

        </>


    )
}


Template.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
)

export default Template