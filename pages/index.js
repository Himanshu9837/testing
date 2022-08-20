import React, { useEffect, useState, useContext, useRef } from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Image from "next/image";
import Head from "next/head";
import GamerImage from "../public/images/homepagehero_1.png";
import HardwareImage from "../public/images/homepagehwd_1.png";
import AboutUs from "../public/images/aboutmarketplace.png";
import Mobile from "../public/images/mobile-v2.png";
import Appstore from "../public/images/img-app-store.svg";
import GooglePlay from "../public/images/img-google-play.svg";
import Work from "../public/images/how_it_works.png";
import Header from "../components/molecule/Navbar2/Navbarhome";
import Footer from "../components/molecule/Footer/footer";
import Contextapi from "../Context/Contextapi.js";
import useOutsideClick from "../components/molecule/Banner/useOutside.js";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Highlighter from "react-highlight-words";
import CloseIcon from "@mui/icons-material/Close";
import Dropdown from "../components/molecule/dropdownsearch3/index.js";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";

// const Countries = [{ label: "Game Account", value: "Game" }];
import ScrollAnimation from "react-animate-on-scroll";

export default function HomePage(articles1) {
  console.log(articles1);
  const postData = articles1.articles1;
  const links = articles1.metaurls;
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { mobileseacrh, setmobileseacrh } = useContext(Contextapi);

  const router = useRouter();

  const [alladata, setalldata] = useState([]);
  const [serachbars, setserachbars] = useState([]);
  const [selectedOptions, setselectedOptions] = useState({
    label: "Game Account",
    value: "Game",
  });
  const [showsbannersearch, setshowbannerserach] = useState(false);
  const [bannerinput, setbannerinput] = useState("");
  const [bannerdata, setbannerdata] = useState([]);
  const [bannerdata2, setbannerdata2] = useState([]);
  const [bannerdata3, setbannerdata3] = useState([]);
  const [currencys, setcurrencys] = useState([]);
  const [checkcurrencyslocal, setcheckcurrencyslocal] = useState(false);
  const [fruit, setFruit] = useState("Game");
  const [currencyslocal, setcurrencyslocal] = useState("");
  const [show, setSate] = useState(false);
  const [show4, setSate4] = useState(false);
  const [progress, setProgress] = useState(0);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (show) setSate(false);
  });

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeStart", () => {
      setProgress(60);
    });
    router.events.on("routeChangeStart", () => {
      setProgress(90);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    fetch(`${apiKey}api/search/fetchsearch`)
      .then((res) => res.json())
      .then((data) => {
        setserachbars(data);
      });
  }, []);
  useEffect(() => {
    fetch(apiKey + "api/admin/homedatafetch/")
      .then((res) => res.json())
      .then((data) => {
        setalldata(data);
      });
  }, []);

  const getprodusts = () => {
    var curr = localStorage.getItem("currency");
    setcurrencyslocal(curr);

    if (curr) {
      fetch(`${apiKey}api/product/searchproduct/${bannerinput}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setshowbannerserach(false);
          } else {
            setshowbannerserach(true);
            setSate(true);
            setbannerdata(data.fetchpro);
          }
        });
      setcheckcurrencyslocal(true);
      fetch(`${apiKey}api/currency/fetchrateprice/${currencyslocal}`)
        .then((response) => response.json())
        .then((data) => {
          setcurrencys(data);
        });
    } else {
      fetch(`${apiKey}api/product/searchproduct/${bannerinput}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setshowbannerserach(false);
          } else {
            setshowbannerserach(true);
            setSate(true);
            setbannerdata(data.fetchpro);
          }
        });
      setcheckcurrencyslocal(false);
      fetch(`${apiKey}api/currency/fetchrateprice/USD`)
        .then((response) => response.json())
        .then((data) => {
          setcurrencys(data);
        });
    }
    if (bannerinput.length <= 0) {
      setshowbannerserach(false);
    }
  };
  const getaccounts = () => {
    fetch(`${apiKey}api/searchuser/${bannerinput}`)
      .then((response) => response.json())
      .then((data) => {
        setbannerdata2(data);
        // if (data.message) {
        //     setshowbannerserach(false)
        // }
        if (data.message) {
          setshowbannerserach(false);
        } else {
          setshowbannerserach(true);
          setSate(true);
        }
      });
    // if (bannerinput.length > 0) {
    //     setshowbannerserach(true)
    // }
    if (bannerinput.length <= 0) {
      setshowbannerserach(false);
    }
    // else {
    //     setshowbannerserach(false)
    // }
  };
  const getgames = () => {
    fetch(`${apiKey}api/category/searchgame/${bannerinput}`)
      .then((response) => response.json())
      .then((data) => {
        setbannerdata3(data);

        if (bannerdata3 <= 0) {
          setshowbannerserach(false);
        } else {
          setshowbannerserach(true);
          setSate(true);
        }
      });
    if (bannerinput.length <= 0) {
      setshowbannerserach(false);
    }
  };
  const handleChange = (selectedOptions) => {
    setselectedOptions(selectedOptions);

    setFruit(selectedOptions.value);
  };
  const showresultsagain = () => {
    if (bannerinput.length > 0) {
      if (bannerdata > 0) {
        setshowbannerserach(true);
        setSate(true);
      } else if (bannerdata2 > 0) {
        setshowbannerserach(true);
        setSate(true);
      } else if (bannerdata3 > 0) setshowbannerserach(true);
      setSate(true);
    }
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={100}
        loaderSpeed={500}
        height={3}
      />

      <div style={{ background: "#000" }}>
        <Head>
          <meta name="viewport" content={postData.metadescription} />
          <meta name="viewport" content="width=device-width" />
          <meta charSet="utf-8" />
          <meta name="description" content={postData.metadescription}></meta>
          <meta name="keywords" content={postData.metakeyword}></meta>
          <meta name="title" content={postData.metatitle} />
          <meta name="robots" content="index, follow" />
          <title>{postData.metatitle}</title>
        </Head>
        <Header />

        <div className="homeresponsive">
          <div className="home_page_style">
            <div class="lines">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
            <div className={`mobilesseacrhs ${mobileseacrh ? "active" : ""}`}>
              <div
                className="close"
                onClick={() => {
                  setmobileseacrh(false);
                }}
              >
                <CloseIcon />
              </div>
              {serachbars.map((searchss) =>
                searchss.searchbar === true ? (
                  <>
                    <div className="serachbanners">
                      <div className="dropdown_style">
                        <Dropdown
                          setFruit={setFruit}
                          show4={show4}
                          setSate4={setSate4}
                        />
                      </div>
                      <div className="inputbanner" onClick={showresultsagain}>
                        <input
                          type="text"
                          className="inputtypebanner"
                          placeholder="Search your favourite game, seller"
                          width="100px"
                          height="50px"
                          onKeyUp={
                            fruit === "Product"
                              ? getprodusts
                              : fruit === "Account"
                                ? getaccounts
                                : fruit === "Game"
                                  ? getgames
                                  : ""
                          }
                          onChange={(e) => setbannerinput(e.target.value)}
                        />
                      </div>
                      <div className="serachbannergame">
                        <button className="serahsgames">
                          <SearchIcon />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )
              )}

              {show && (
                <div ref={ref}>
                  <div
                    className={`serachbannerresult ${showsbannersearch ? "active" : ""
                      }`}
                  >
                    {fruit === "Product" && bannerdata.length > 0
                      ? bannerdata.map((datas) => (
                        <Link href={`/description/${datas.metaurl}`}>
                          <div className="singleserachbanner1">
                            <div className="searchbannerimg1">
                              <img
                                src={datas.category.categorythumblinimage}
                                alt="k"
                              />
                            </div>
                            <div className="serachbannername1">
                              <span className="gamesname">
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[bannerinput]}
                                  autoEscape={true}
                                  textToHighlight={datas.productname}
                                />
                              </span>
                              <span className="gamesname">
                                ${datas.price}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                      : ""}

                    {fruit === "Account" && bannerdata2.length > 0
                      ? bannerdata2.map((datas) => (
                        <Link href={`/userprofile2/${datas.username}`}>
                          <div className="singleserachbanner">
                            <div className="searchbannerimg">
                              <img src={datas.image} alt="k" />
                            </div>
                            <div className="serachbannername">
                              <span className="gamesname">
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[bannerinput]}
                                  autoEscape={true}
                                  textToHighlight={datas.fullname}
                                />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                      : ""}
                    {fruit === "Game" && bannerdata3.length > 0
                      ? bannerdata3.map((datas) => (
                        <Link href={`/productListing/${datas.metaurl}`}>
                          <div className="singleserachbanner">
                            <div className="searchbannerimg">
                              <img
                                src={datas.categorythumblinimage}
                                alt="k"
                              />
                            </div>
                            <div className="serachbannername">
                              <span className="gamesname">
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[bannerinput]}
                                  autoEscape={true}
                                  textToHighlight={datas.name}
                                />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                      : ""}
                  </div>
                </div>
              )}
            </div>
            <div className="home_page_contaner">
              {serachbars.map((searchss) =>
                searchss.searchbar === true ? (
                  <>
                    <div className="serachbanner">
                      <div className="dropdown_style">
                        <Dropdown
                          setFruit={setFruit}
                          show4={show4}
                          setSate4={setSate4}
                        />
                      </div>
                      <div className="inputbanner" onClick={showresultsagain}>
                        <input
                          type="text"
                          className="inputtypebanner"
                          placeholder="Search your favourite game, seller"
                          width="100px"
                          height="50px"
                          onKeyUp={
                            fruit === "Product"
                              ? getprodusts
                              : fruit === "Account"
                                ? getaccounts
                                : fruit === "Game"
                                  ? getgames
                                  : ""
                          }
                          // onKeyDown={getaccounts}
                          onChange={(e) => setbannerinput(e.target.value)}
                        />
                      </div>
                      <div className="serachbannergame">
                        <button className="serahsgames">
                          <SearchIcon />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )
              )}

              {show && (
                <div ref={ref}>
                  <div
                    className={`serachbannerresults ${showsbannersearch ? "active" : ""
                      }`}
                  >
                    {fruit === "Product" && bannerdata.length > 0
                      ? bannerdata.map((datas, i) => (
                        <Link href={`/description/${datas.metaurl}`}>
                          <div className="singleserachbanner1">
                            <div className="searchbannerimg1">
                              <img
                                src={datas.category.categorythumblinimage}
                                alt="k"
                              />
                            </div>
                            <div className="serachbannername1">
                              <span className="gamesname">
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[bannerinput]}
                                  autoEscape={true}
                                  textToHighlight={datas.productname}
                                />
                              </span>

                              {checkcurrencyslocal ? (
                                <span className="gamesname">
                                  {currencyslocal} {datas.price * currencys}
                                </span>
                              ) : (
                                <span className="gamesname">
                                  USD {datas.price * currencys}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))
                      : ""}

                    {fruit === "Account" && bannerdata2.length > 0
                      ? bannerdata2.map((datas) => (
                        <Link href={`/userprofile2/${datas.username}`}>
                          <div className="singleserachbanner">
                            <div className="searchbannerimg">
                              <img src={datas.image} alt="k" />
                            </div>
                            <div className="serachbannername">
                              <span className="gamesname">
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[bannerinput]}
                                  autoEscape={true}
                                  textToHighlight={datas.fullname}
                                />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                      : ""}

                    {fruit === "Game" && bannerdata3.length > 0
                      ? bannerdata3.map((datas) => (
                        <Link href={`/productListing/${datas.metaurl}`}>
                          <div className="singleserachbanner">
                            <div className="searchbannerimg">
                              <img
                                src={datas.categorythumblinimage}
                                alt="k"
                              />
                            </div>
                            <div className="serachbannername">
                              <span className="gamesname">
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[bannerinput]}
                                  autoEscape={true}
                                  textToHighlight={datas.name}
                                />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))
                      : ""}
                  </div>
                </div>
              )}
            </div>
            <div className="image_div_banner">
              <div className="part2_style">
                {/* <ScrollAnimation
                  animateIn="bounceInRight"
                  animateOut="fadeIn"
                  duration={0.5}
                  delay={0}
                > */}
                <h1 className="texthomepage">
                  <span className="the">THE</span>
                  <span className="text_game_style">GAMERS</span>
                  <span className="text_game_style2">MARKETPLACE</span>
                </h1>
                {/* </ScrollAnimation> */}
                {/* <ScrollAnimation
                  animateIn="bounceInLeft"
                  animateOut="fadeIn"
                  duration={0.5}
                  delay={0}
                >
                  <h1 className="text_game_style2 animationtext">
                    MARKETPLACE
                  </h1>
                </ScrollAnimation> */}
                <div className="byu_style">
                  <button className="sell_now_style" type="button">
                    <Link href="/register" passHref={true}>
                      <a href="" style={{ color: "#000" }}>
                        Trade
                      </a>
                    </Link>
                  </button>
                  <button type="button" className="buy_now_style">
                    <Link href="/game-account" passHref={true}>
                      <a href="" style={{ color: "#000" }}>
                        Sell Now
                      </a>
                    </Link>
                  </button>
                </div>
                <div className="headimg">
                  <img className="headlogo" src="/images/avatars_1.png" alt="" />
                </div>
                <div className="belimg">
                  <span className="smurf">Smurf</span><span className="acc orange">Accounts?</span>
                  <p className="smalltext">We got your back!</p>
                </div>
              </div>
            </div>
            {/* <div className="flexcontainer">
              <div className="part1_style">
                <div className="game_color">
                  <Link href="/game-account" passHref={true}>
                    <a>
                      <h3 className="website_link_style">Game</h3>
                      <h3 className="website_link_style">Account</h3>
                      <Image src={GamerImage} />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="part3_style">
                <div className="game_color3">
                  <Link href="https://hardware.esports4g.com/" passHref={true}>
                    <a href="">
                      <h3 className="website_link_style">Gaming</h3>
                      <h3 className="website_link_style">Hardware</h3>
                      <Image src={HardwareImage} />
                    </a>
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
          <div className="second_div_style1">
            <div className="how_it_work">
              <h2 style={{ color: "#fff" }}>HOW
                <span className="market_style2">
                  IT
                </span>
                <span className="market_style">
                  WORKS
                </span>
              </h2>
            </div>
            <ScrollAnimation
              animateIn="fadeIn"
              animateOut="fadeIn"
              duration={1.5}
              delay={0}
            >
              <div className="first_divided1">
                <img
                  src={alladata.howitsworkimage}
                  style={{ maxWidth: "90%" }}
                />
              </div>
            </ScrollAnimation>
          </div>

          <article className="thired_div_style2">
            <h2 className="h2market_style1">
              ABOUT
              <span className="market_style">MARKETPLACE</span>
            </h2>
            <div className="leftarticle2">
              <ScrollAnimation
                animateIn="bounceInLeft"
                animateOut="fadeIn"
                duration={1.5}
                delay={0}
              >
                <div className="first_divided">
                  <img src={alladata.aboutimage} />
                </div>
              </ScrollAnimation>
            </div>
            <div className="rightarticle2">
              <ScrollAnimation
                animateIn="bounceInRight"
                animateOut="fadeIn"
                duration={1.5}
                delay={0}
              >
                <div className="second_divided">
                  <h2 className="h2market_style">
                    ABOUT
                    <span className="market_style">MARKETPLACE</span>
                  </h2>
                  <div style={{ marginTop: "40px" }}>
                    <p className="game_color3">
                      <div
                        className="para1"
                        dangerouslySetInnerHTML={{
                          __html: alladata.aboutmarketpalce,
                        }}
                      />
                    </p>
                  </div>
                  <div className="btn_about">
                    <button className="button_aboutus">Go to markets</button>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </article>

          <article className="thired_div_style">
            <h2 className="h2market_style1">
              <span className="cashout_style">
                CASHOUT
              </span>
              & DEPOSITS</h2>
            <div className="divided_screen_style">
              <ScrollAnimation
                animateIn="bounceInLeft"
                animateOut="fadeIn"
                duration={1.5}
                delay={0}
              >
                <div className="first_divided">
                  <img src={alladata.bottomimage} />
                </div>
              </ScrollAnimation>
            </div>
            <div className="rightcashoutdiv">
              <ScrollAnimation
                animateIn="bounceInRight"
                animateOut="fadeIn"
                duration={1.5}
                delay={0}
              >
                <div className="second_divided">
                  <h2 className="h2market_style">
                    <span className="cashout_style">
                      CASHOUT
                    </span>
                    & DEPOSITS</h2>
                  <div style={{ marginTop: "40px" }}>
                    <p className="game_color2">
                      {/* {alladata.bottomcontaint} */}
                      <div
                        className="para1"
                        dangerouslySetInnerHTML={{
                          __html: alladata.bottomcontaint,
                        }}
                      />
                    </p>
                    {/* <div className="btn_about1">
                  <div className="googleplay">
                    <Image src={GooglePlay} className="mag_div1" />
                  </div>
                  <div className="appstore">
                    <Image src={Appstore} className="mag_div" />
                  </div>
                </div> */}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </article>

          <div>
            <Footer />
          </div>
        </div>
        {/* {
          links.map((data,i)=>{
            //  console.log(data)
          })
        } */}
      </div>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const metaurls = [];
  const res = await fetch(`${apiKey}api/category/allbasecategory`);

  const articles = await res.json();
  for (let i = 0; i < articles.length; i++) {
    const setmetadesicription = articles[i].metaurl;
    metaurls.push(setmetadesicription);
  }
  const res1 = await fetch(`${apiKey}api/admin/fetchmatapages/Homepage`);

  const articles1 = await res1.json();

  return {
    props: { metaurls: metaurls, articles1: articles1 },
  };
};
export async function getInitialProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {},
  };
}
