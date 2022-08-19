import React, { useEffect, useState, useRef, useContext } from "react";
import Hero from "../../../public/images/Homehero.png";
import Users from "../../../public/images/COC.jpg";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Highlighter from "react-highlight-words";
import useOutsideClick from "./useOutside.js";
import CloseIcon from "@mui/icons-material/Close";
import Contextapi from "../../../Context/Contextapi.js";
import { left } from "@popperjs/core";
import Dropdown from "../dropdownsearch/index.js";
import ScrollAnimation from "react-animate-on-scroll";

const Countries = [
  { label: "Search Game", value: "Game" },
  { label: "Search Seller", value: "Account" },
  { label: "Search Product", value: "Product" },
];
const Banner = (bannerheader) => {
  const bannerheadingdata=bannerheader.bannerheader.topheading;
  const Bannerimage1=bannerheader.bannerheader.topimage;
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { mobileseacrh, setmobileseacrh, setloaderss, Bannerimage } =
    useContext(Contextapi);
  const [showsbannersearch, setshowbannerserach] = useState(false);
  const [bannerinput, setbannerinput] = useState("");
  const [bannerdata, setbannerdata] = useState([]);
  const [bannerdata2, setbannerdata2] = useState([]);
  const [bannerdata3, setbannerdata3] = useState([]);

  const [currencys, setcurrencys] = useState([]);
  const [currencyslocal, setcurrencyslocal] = useState("");
  const [checkcurrencyslocal, setcheckcurrencyslocal] = useState(false);
  const [bannerimage, setBannerimage] = useState("");
  const [bannerheading, setBannerheading] = useState("");
  const [bannertopheading, setBannertopheading] = useState("");

  Banner.handleClickOutside = () => setshowbannerserach(false);
  const [selectedOptions, setselectedOptions] = useState({
    label: "Game",
    value: "Game",
  });
  // const [Searchss, setSearchss] = useState('')
  const [fruit, setFruit] = useState("Game");

  const [show, setSate] = useState(false);
  const [show1, setSate1] = useState(false);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (show) setSate(false);
  });

  const [serachbars, setserachbars] = useState([]);

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

        if (data.message) {
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
      // alert('jj')
      setshowbannerserach(false);
    }
  };
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiKey}api/admin/fetchladingpage`).then((res) => {
      res.json().then((data) => {
        setBannerheading(data.topheading);
        setBannerimage(data.topimage);
        setBannertopheading(data.seotopheading);
        // setloaderss(true)
      });
    });
  }, [bannerimage]);

  useEffect(() => {
    fetch(`${apiKey}api/search/fetchsearch`)
      .then((res) => res.json())
      .then((data) => {
        setserachbars(data);
      });
  }, []);

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
      <div className="banners">
        {serachbars.map((searchss) =>
          searchss.searchbar === true ? (
            <>
              <div className="serachbanner">
              <div className="dropdown_style">
                  <Dropdown
                    show1={show1}
                    setSate1={setSate1}
                    setFruit={setFruit}
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
              className={`serachbannerresult ${
                showsbannersearch ? "active" : ""
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
                    <Link href={`/${datas.metaurl}`}>
                      <div className="singleserachbanner">
                        <div className="searchbannerimg">
                          <img src={datas.categorythumblinimage} alt="k" />
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
        <div className="bannerinner">
          <div className="gameaccountbtn">
            <button className="gameaccountsbutton">Game Accounts</button>
          </div>
          <div className="bannerwrapper">
            <div className="banner_title">
              <ScrollAnimation
                animateIn="bounceInRight"
                animateOut="fadeIn"
                duration={1.5}
                delay={0}
              >
                <div
                  className="titlebanner"
                  dangerouslySetInnerHTML={{ __html: bannerheadingdata }}>
                  </div>
              </ScrollAnimation>
              <div className="bannerbtns">
                <a href="#newarrivals">
                  <button className="bannersbutton ">
                    <span>Buy Now</span>
                  </button>
                </a>
              </div>
            </div>
            <div className="banner_image">
            <ScrollAnimation
                animateIn="bounceInLeft"
                animateOut="fadeIn"
                duration={1.5}
                delay={0}
              >
                <div className="banner_image_wrapper">
                  <img
                    src={Bannerimage1}
                    style={{
                      width: "100%",
                      height: "100%",

                    }}
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
