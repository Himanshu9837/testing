import React, { useEffect, useState } from 'react'
import Header from "../../components/molecule/Navbar2/Navbarhome";
import Footer from "../../components/molecule/Footer/footer";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AndroidIcon from '@mui/icons-material/Android';
import Link from 'next/link'
const Aboutus = () => {
    const [count, setcount] = useState('0')
    const [data, setdata] = useState([])
    const [middlehead, setmiddlehead] = useState([])
    const [middlepara, setmiddlepara] = useState([])
    const [lasttitle, setlasttitle] = useState([])
    const [lasticon, setlasticon] = useState([])

    useEffect(() => {
        counter(0, 500)
        fetch('http://206.189.136.28:5000/api/pages/editaboutus/')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setdata(data)
                setmiddlehead(data.middleheading)
                setmiddlepara(data.middlepara)
                setlasttitle(data.lastheading)
                setlasticon(data.lasticon)

            })
    }, [])
    const counter = (min, max) => {
        for (let count = min; count <= max; count++) {
            setTimeout(() => {
                setcount(data.record1)
            }, 1000);
        }
    }
    return (
        <>
            <div className="aboutus">
                <Header />
                <div className="aboutus-containers">
                    <section className="firstsection">
                        <div className="innerfirstsection">
                            <h1 className="aboutusheading">
                                ABOUT US
                            </h1>
                           <p className='tagline_style'>tagline</p>
                           <p className='tagline_style2'>tagline 2</p>

                        </div>
                    </section>
                    <section className="secondsection">
                        <div className="innersecondsection">
                            <div className="leftsecond">
                                <h3 className="leftheading">
                                    {data.topheading}
                                </h3>
                                <p className="leftparasection">
                                    {data.toppara}
                                </p>

                            </div>
                            <div className="rightsecond">
                                <div className="innerleftseond">
                                    <div className="leftsecondimg">
                                        <img src={data.topimage} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="thirdsection">
                        <div className="thirdinner">
                            <div className="thirdinnerflex">
                                <div>
                                <div className="singlecircle">
                                    <p className="countnumber">
                                        {data.record1}
                                    </p>
                                </div>
                                <p className='circle_text_style'>register</p>
                                </div>
                                <div>
                                <div className="singlecircle">
                                    <p className="countnumber">
                                        {data.record2}
                                    </p>
                                </div>
                                <p className='circle_text_style'>register</p>

                                </div>
                               <div>
                                <div className="singlecircle">
                                    <p className="countnumber">
                                        {data.record3}
                                    </p>
                                </div>
                                <p className='circle_text_style'>register</p>

                                </div>
                                <div>
                                <div className="singlecircle">
                                    <p className="countnumber">
                                        {data.record4}
                                    </p>
                                </div>
                                <p className='circle_text_style'>register</p>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="foursection">
                        <div className="innerfour">
                            <div className="leftfour">
                                <div className="leftfourvideo">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/0QCThjNp1Vc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                            <div className="rightfour">
                                <div className="innerrightfour">
                                    <h1 className="innerrightfourhead">
                                        Why Choose Us
                                    </h1>
                                    <div className="allsection">

                                        <div className="singlesection">
                                            <div className="sectionicon">
                                                <FavoriteBorderIcon />
                                            </div>
                                            <div className="sectioncontent">
                                                <h4 className="contenthead">
                                                    {middlehead[0]}
                                                </h4>
                                                <p className="contentpara">
                                                    {
                                                        middlepara[0]
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="singlesection">
                                            <div className="sectionicon">
                                                <FavoriteBorderIcon />
                                            </div>
                                            <div className="sectioncontent">
                                                <h4 className="contenthead">
                                                    {middlehead[1]}
                                                </h4>
                                                <p className="contentpara">
                                                    {
                                                        middlepara[1]
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="singlesection">
                                            <div className="sectionicon">
                                                <FavoriteBorderIcon />
                                            </div>
                                            <div className="sectioncontent">
                                                <h4 className="contenthead">
                                                    {middlehead[2]}
                                                </h4>
                                                <p className="contentpara">
                                                    {
                                                        middlepara[2]
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="fivesection">
                        <div className="fivesectiondiv">
                            <h1 className="fivehead">
                                {data.bottoumheading}
                            </h1>
                        </div>
                    </section>
                    <section className="sixsection">
                        <div className="innericons">

                            {
                                lasttitle.map((title, index1) => (
                                    <>
                                        {
                                            lasticon.map((icon, index2) => (
                                                <>
                                                    {
                                                        index1 === index2 ? (
                                                            <div className="singleiconbox">
                                                                <div className="aboutus_icons">
                                                                    <img src={icon} alt="not-found" style={{ width: '50px', height: '50px' }} />
                                                                </div>
                                                                <div className="aboutus_icontext">
                                                                    <h3 className="innericontext">
                                                                        {title}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        ) : ('')
                                                    }
                                                </>
                                            ))
                                        }
                                    </>

                                ))
                            }

                        </div>
                    </section>

                    <section className="svensection">
                        <div className="seveninner">
                            <span className="needhelp">
                                Need any help?
                                <Link href="/contactus">
                                    <a className='contactuspara'>
                                        Contact-Us
                                    </a>
                                </Link>
                            </span>
                        </div>

                    </section>
                    <Footer />
                </div>


            </div>
        </>
    )
}

export default Aboutus