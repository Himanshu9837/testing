import React, { useState, useEffect, useRef, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Cart from "../Cart/Cart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { io } from "socket.io-client";
import axios from "axios";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import ReactFlagsSelect from "react-flags-select";
import ReactCountryFlag from "react-country-flag";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonIcon from "@mui/icons-material/Person";
import useOutsideClick from "../Banner/useOutside.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Highlighter from "react-highlight-words";
import Contextapi from "../../../Context/Contextapi.js";
import Search from "../headersearch/index.js";
import Image from "next/image";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Dropdown from "../dropdownsearch2/index.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
const Countries = [
  { label: "Search Game", value: "Game" },
  { label: "Search Seller", value: "Account" },
  { label: "Search Product", value: "Product" },
];

const Navbarhome = (props) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const {
    cartnumber,
    notify,
    setnotify,
    checkfalse,
    setsocket,
    setmobileseacrh,
    mobileseacrh,
    setcurrencys,
    setcheckcurrencyslocal,
    setcurrencyslocal,
    checkcurrencyslocal,
    currencyslocal,
    currencys,
  } = useContext(Contextapi);

  const socket = useRef();
  const [selected, setSelected] = useState("");

  const [show, setSate] = useState(false);
  const [show2, setSate2] = useState(false);
  const [show3, setSate3] = useState(false);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (show) setSate(false);
  });
  // useOutsideClicktwo(ref, () => {
  //   if (show2) setSate2(false);
  //
  // });

  const router = useRouter();

  const [carts, setcarts] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [Tokens, SetTokens] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [showboxes, setshowboxes] = useState(false);
  const [showsbannersearch, setshowbannerserach] = useState(false);

  const [loaders, setloaders] = useState(false);
  const [toggleicons, settoggleicon] = useState(false);
  const [toggleicons2, settoggleicon2] = useState(false);

  const [bannerinput, setbannerinput] = useState("");
  const [countrycode, setcountrycode] = useState("");
  const [sellerstatus, setsellerstatus] = useState();
  const [sellerstatus2, setsellerstatus2] = useState();
  const [sellerstatus3, setsellerstatus3] = useState();
  const [hideinputs, sethideinputs] = useState("");
  const [fruit, setFruit] = useState("Game");
  const [bannerdata, setbannerdata] = useState([]);
  const [bannerdata2, setbannerdata2] = useState([]);
  const [bannerdata3, setbannerdata3] = useState([]);

  const [tokenId, setTokenId] = useState("");
  const [showsettings, setshowsettings] = useState(false);

  const [language, setlanguage] = useState([]);
  const [currencysave, setcurrencysave] = useState("");
  const [toggles, setstoggles] = useState(false);
  const [toggless, settoggles] = useState(false);

  const [showbackground, setshowbackground] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [saveloader, setsaveloader] = useState(false);

  const [fullname, setFullname] = useState("");
  const [checkData, setCheckData] = useState("");
  const [verifydata, setVerifydata] = useState("");
  const [,] = useState("");
  const [src_u, setSelectedImage_u] = useState("");
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState([]);

  const [serachbars, setserachbars] = useState([]);

  const divRef = useRef(null);

  const [selectedOptions, setselectedOptions] = useState({
    label: "Game",
    value: "Game",
  });

  const balancevalue = () => {
    let num = balance;
    let n = num.toFixed(2);
    return n;
  };
  const changeicon = () => {
    setOpen(!open);
  };

  const handlecart = () => {
    if (carts === false) {
      setcarts(!carts);
      // setcarts(true)
    } else if (carts === true) {
      setcarts(false);
    }
  };

  const handlecarts = (event) => {
    setSate(false);
    // setSate2(false)
    let navbar2 = document.getElementsByClassName("navbar2");
    if (showboxes === false || event.target.parentnode != navbar2) {
      setshowboxes(!showboxes);
    } else if (showboxes === true) {
      setshowboxes(false);
    }
  };

  const outClick = (event) => {
    setSate2(false);
    let navbar2 = document.getElementsByClassName("navbar2");
    if (showboxes === false || event.target.parentnode != navbar2) {
      setshowboxes(!showboxes);
    } else if (showboxes === true) {
      setshowboxes(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (!token) {
      // setloadings(true)
      // }, 2000);
      // router.push("/chat/login");
    } else {
      fetch(`https://geolocation-db.com/json/`)
        .then((res) => res.json())
        .then((data) => {
          setcountrycode(data.country_code);
        });
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;

      if (cart_datas) {
        socket.current = io(apiKey);
        socket.current.emit("add-user", cart_datas);

        setsocket(socket);

        setInterval(() => {
          fetch(`${apiKey}api/chat/chatnotification/${cart_datas}`)
            .then((res) => res.json())
            .then((data) => {
              setnotify(data);
            });
        }, 20000);
      }
    }
  }, []);
  const addcart = async () => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;

      //  setCartData(cart_data);

      let res = await fetch(`${apiKey}api/cart/cartinfo/${cart_data}`);
      res = await res.json();
      const datatest = res;

      setData(datatest);
    }
  };

  function togglesdropdown() {
    settoggleicon(!toggleicons);
    // setafters(true);
  }
  function togglesdropdown2() {
    settoggleicon2(!toggleicons2);
    // setafters(true);
  }

  const Logout = () => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    axios({
      method: "POST",
      url: `${apiKey}api/updateonlinestatus/${cart_data}`,
    })
      .then((res) => {
        //   setProductData(res.data);
      })
      .catch((err) => {});
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
      fetch(`${apiKey}api/edituser/${cart_datas}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedImage_u(data.result.image);
          setFullname(data.result.fullname);
          if (data.result == false) {
            Logout();
          }
        });
    }
  }, []);
  useEffect(async () => {
    const token = localStorage.getItem("user");
    if (token) {
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
      const isuser = d.tokenData.isadmin;
      setTokenId(cart_datas);
      badge(cart_datas);
      balanceavable(cart_datas);
      if (isuser == false) {
        addcart();
        SetTokens(true);
        getsellerstatus(cart_datas);
        const sevendaylogin = d.tokenData.sevendaylogin;
        setloading(false);
        if (sevendaylogin == false) {
          setTimeout(() => {
            axios({
              method: "POST",
              url: `${apiKey}api/updateonlinestatus/${cart_datas}`,
            })
              .then((res) => {})
              .catch((err) => {});
            localStorage.removeItem("user");
          }, 1200000);
        } else {
          setTimeout(() => {
            axios({
              method: "POST",
              url: `${apiKey}api/updateonlinestatus/${cart_datas}`,
            })
              .then((res) => {})
              .catch((err) => {});
            localStorage.removeItem("user");
          }, 604800000);
        }
      }
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("user");
  //   const d = token !== null ? JSON.parse(token) : [];
  //   const cart_datas = d.tokenData.id;

  // }, [])

  const showboxs = () => {
    // setstoggles(true)
    setshowboxes(!showboxes);
    setSate(true);
  };

  const closedmenu = () => {
    setmobile(false);
  };
  const openmenu = () => {
    setmobile(true);
  };

  // const bodygets = () => {
  //   setshowboxes(false);
  // };
  const singnupstart = () => {
    setloaders(true);
  };

  // useEffect(()=>{
  useEffect(() => {
    fetch(`${apiKey}api/search/fetchsearch`)
      .then((res) => res.json())
      .then((data) => {
        setserachbars(data);
      });
  }, []);
  const getsellerstatus = async (userid) => {
    let sellerId = await fetch(`${apiKey}api/seller/sellerdetails/${userid}`);
    sellerId = await sellerId.json();

    setsellerstatus(sellerId.sellerapprovalstatus);
    setsellerstatus2(sellerId.sellerlistingRestriction);
    setsellerstatus3(sellerId.sellerRestriction);
  };

  // },[])
  // const handleSelect = (e) => {
  //
  //   setFruit(e.target.value);
  //   if (fruit === "Product") {
  //     getprodusts();
  //   } else if (fruit === "Account") {
  //     getaccounts();
  //   } else if (fruit === "Game") {
  //     getgames();
  //   }
  // };
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
            setSate3(true);
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
            setSate3(true);
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
          setSate3(true);
        }
      });

    if (bannerinput.length <= 0) {
      setshowbannerserach(false);
    }
    // else {
    //     setshowbannerserach(false)
    // }
  };
  const balanceavable = (id) => {
    fetch(`${apiKey}api/withdrawal_wallet/wallettotal/${id}`).then((res) => {
      res.json().then((data) => {
        setBalance(data);
      });
    });
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
          setSate3(true);
        }
      });
    if (bannerinput.length <= 0) {
      setshowbannerserach(false);
    }
  };

  useEffect(() => {
    showlanguage();
    sethideinputs(props.inputs);
  }, []);

  const showlanguage = () => {
    fetch(apiKey + "api/currency/fetchcurrency/")
      .then((res) => res.json())
      .then((data) => {
        setlanguage(data);
      });
  };
  const badge = (id) => {
    fetch(apiKey + "api/badges/applybadges/" + id)
      .then((res) => res.json())
      .then((data) => {
        // setlanguage(data);
        setCheckData(data.checkdata.slice(-1));
        setVerifydata(data.verified);
      });
  };

  const showsetting = () => {
    setshowsettings(true);
  };
  const closesetting = () => {
    setshowsettings(false);
  };

  const handleChange = (selectedOptions) => {
    setselectedOptions(selectedOptions);

    setFruit(selectedOptions.value);
  };

  const showresultsagain = () => {
    if (bannerinput.length > 0) {
      if (bannerdata > 0) {
        setshowbannerserach(true);
        setSate3(true);
      } else if (bannerdata2 > 0) {
        setshowbannerserach(true);
        setSate3(true);
      } else if (bannerdata3 > 0) setshowbannerserach(true);
      setSate3(true);
    }
  };

  useEffect(() => {
    var x = localStorage.getItem("currency");
    setcurrencysave(x);
  }, []);

  const curruencyfun = (e) => {
    setcurrencysave(e.target.value);
  };
  const savecurrency = () => {
    setsaveloader(true);
    setTimeout(() => {
      setsaveloader(false);
      setshowsettings(false);
    }, 1700);
    localStorage.setItem("currency", currencysave);

    var curr = localStorage.getItem("currency");
    setcurrencyslocal(curr);
    if (curr) {
      setcheckcurrencyslocal(true);
      fetch(`${apiKey}api/currency/fetchrateprice/${curr}`)
        .then((response) => response.json())
        .then((data) => {
          setcurrencys(data);
        });
    } else {
      setcheckcurrencyslocal(false);
      fetch(`${apiKey}api/currency/fetchrateprice/USD`)
        .then((response) => response.json())
        .then((data) => {
          setcurrencys(data);
        });
    }
  };
  const HandlefileChange = (e) => {
    setSelectedImage_u(URL.createObjectURL(e.target.files[0]));
    let img = e.target.files[0];
    setUserImage(img);
    updateUser(img);
  };
  function togglemenus() {
    settoggles(false);
  }
  const showleftpannel = () => {
    setSate2(true);
    setstoggles(true);
  };
  const showleftpanneltwo = () => {
    setstoggles(false);
  };
  // const handleonclick = (event) => {
  //
  //   let navbar2 = document.getElementsByClassName('navbar2');
  //   if(event.target != navbar2 || event.target.parentNode != navbar2){
  //       setshowboxes(!showboxes);
  //   }
  // }

  async function updateUser(img) {
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      const token = d.accesstoken;

      const formData = new FormData();
      formData.append("image", img);
      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
          "content-type": "application/json",
          Token: `${token}`,
        },
      };
      const url = `${apiKey}api/updateprofileimage/${cart_data}`;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          // toast.success(response.data.message);
          // JSON.stringify(response)
          // toast('Profile Updated Successfully');
          // toast.success("Profile Update Sucessfully.");
        })
        .catch((e) => {
          // toast.error("Image size to large");
          // toast.error(e.response.data.error);
        });
    }
  }

  return (
    <>
      <div className={`lodersouter ${loaders ? "active" : ""}`}>
        <div className="innerloaders">
          <div class="loader"></div>
        </div>
      </div>
      {/* onClick={handleonclick} */}
      <div className="navbar2">
        <div className={`updatesetting ${showsettings ? "active" : ""}`}>
          {saveloader ? (
            <div className="svaeload">
              <div className="saveinnerload">
                <div class="loaderupdate"></div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="closeconverter" onClick={closesetting}>
            <CloseIcon />
          </div>
          <div className="updatesettingtitle">
            <h3 className="titleupdate">Language & Currency</h3>
          </div>
          <div className="updateselectbox">
            <label htmlFor="" className="region">
              Region
            </label>
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
            />
          </div>
          <div className="updateselectbox">
            <label htmlFor="" className="region">
              Language
            </label>
            <select name="" id="" className="languageselect">
              <option value="" className="langoption" selected hidden>
                English
              </option>
            </select>
          </div>

          <div className="updateselectbox">
            <label htmlFor="" className="region">
              Currency
            </label>
            <select
              name=""
              id=""
              className="languageselect"
              onChange={(e) => {
                curruencyfun(e);
              }}
            >
              <option value="" className="langoption" selected hidden>
                {currencysave ? currencysave : "UNITED STATE(USA)"}
              </option>
              {language.map((lan) => (
                <option value={lan.currencyname} className="langoption">
                  {lan.countryname}
                </option>
              ))}
            </select>
          </div>

          <div className="updatesallbtn">
            <div className="cancelupdatebtn">
              {/* <button className="cancelsbtn cancelbtns" onClick={closesetting}>
                Cancel
              </button> */}
              <button className="cancelsbtn savesbtns" onClick={savecurrency}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="navbar_wrapper1 ">
          <div className="allmenus">
            <div className="menu" onClick={openmenu}>
              {Tokens ? <MenuIcon /> : <MenuIcon />}
            </div>
            <div className="logo">
              <Link href="/">
                <a>
                  {/* <img src="" alt="" /> */}
                  <img
                    src="/static/images/logo2.svg"
                    width={150}
                    // height={150}
                  />
                </a>
              </Link>
            </div>
          </div>
          <Search
            hideinputs={hideinputs}
            fruit={fruit}
            showresultsagain={showresultsagain}
            getgames={getgames}
            showsbannersearch={showsbannersearch}
            bannerdata3={bannerdata3}
            show2={show2}
            setSate2={setSate2}
            show3={show3}
            setSate3={setSate3}
            setFruit={setFruit}
            setbannerinput={setbannerinput}
            bannerinput={bannerinput}
            getprodusts={getprodusts}
            getaccounts={getaccounts}
            bannerdata2={bannerdata2}
            bannerdata={bannerdata}
            currencys={currencys}
            checkcurrencyslocal={checkcurrencyslocal}
            currencyslocal={currencyslocal}
          />
          <div
            className="searchicon_style2"
            onClick={() => {
              setmobileseacrh(true);
            }}
          >
            <SearchIcon />
          </div>

          <div className="rightsidenavbar">
            <div className={`rightnavbar ${mobile ? "active" : ""}`}>
              <div className="mobileheader">
                <div className="logo">
                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={countrycode}
                    style={{
                      fontSize: "2em",
                      lineHeight: "2em",
                    }}
                    aria-label="United States"
                  />
                </div>
                <div className="closeicon" onClick={closedmenu}>
                  <CloseIcon />
                </div>
              </div>
              <div
                className={`rightnavbarwrapperhome ${Tokens ? "active" : ""}`}
              >
                <div className="allsellbtn">
                  {props.flag ? (
                    ""
                  ) : (
                    // <div className="flag" onClick={showsetting}>
                    //   <img src="/images/india.svg" width={30} height={30} />
                    //   <span className="indiatext">INR|ENG</span>
                    // </div>
                    <div className="navitem navtext" onClick={showsetting}>
                      <img
                        className="curlogo"
                        src="/images/india.svg"
                        width="30"
                        height="30"
                      />{" "}
                      <p className="inr_style_check">INR</p>
                    </div>
                  )}
                </div>
                {tokenId ? 
                <div className="sellbutton">
                  {Tokens ? (
                    <>
                      {sellerstatus ? (
                        <>
                          {sellerstatus2 ? (
                            <Link href="/dashboard/sellercentral">
                              <a>
                                <button
                                  className=" sellnowhomebtn"
                                  onClick={singnupstart}
                                >
                                  Start Selling
                                </button>
                              </a>
                            </Link>
                          ) : (
                            <Link href="/dashboard/sellercentral/createlisting">
                              <a>
                                <button
                                  className=" sellnowhomebtn"
                                  onClick={singnupstart}
                                >
                                  Start Selling
                                </button>
                              </a>
                            </Link>
                          )}
                        </>
                      ) : (
                        <Link href="/dashboard/sellercentral/">
                          <a>
                            <button
                              className=" sellnowhomebtn"
                              onClick={singnupstart}
                            >
                              Start Selling
                            </button>
                          </a>
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link href="/login">
                      <a>
                        <button
                          className=" sellnowhomebtn"
                          onClick={singnupstart}
                        >
                          Start Selling
                        </button>
                      </a>
                    </Link>
                  )}
                </div>
                :("")
                  }
                {tokenId ? (
                  ""
                ) : (
                  <>
                    <div className="navitem">
                      <Link href="/login">
                        <a href="">
                          <button className="navbtns">Login</button>
                        </a>
                      </Link>
                    </div>
                    <div className="navitem">
                      <Link href="/register">
                        <a href="">
                          <button className="navbtns1">Sell Account</button>
                        </a>
                      </Link>
                    </div>
                  </>
                )}
                {Tokens && (
                  <Link href="/chat">
                    <div className="msgicon">
                      <div className="shoppingcart">
                        <MessageIcon />
                        {notify > 0 ? (
                          <div className="one onemsg">
                            <p>{notify}</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Link>
                )}
                {tokenId ? (
                  <div className="cartsicon" onClick={handlecart}>
                    <div className="shoppingcart">
                      <ShoppingCartOutlinedIcon />
                      {cartnumber > 0 ? (
                        <div className="one">
                          <p className="notification">{cartnumber}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="hideuser">
                  {tokenId ? (
                    <div onClick={showboxs}>
                      <img
                        src={src_u}
                        className="user_icon_profile"
                        alt="logo"
                      />
                    </div>
                  ) : (
                    // <PersonIcon onClick={showboxs} />
                    ""
                  )}
                </div>

                <div className="loginbutton">
                  <div className="loginsbtn">
                    <div className="logout" style={{ cursor: "pointer" }}>
                      {/* {tokenId ? (
                        <div onClick={showboxs}>
                          <img src={userImage} className="user_icon_profile" />
                        </div>
                      ) : (
                        <PersonIcon onClick={showboxs} />
                      )} */}

                      {show && (
                        <div ref={ref}>
                          <div
                            // className={`showboxss showbox ${showboxes ? "active" : ""}`} onClick={outClick}
                            className="showboxss showbox"
                          >
                            <div className="close_icon_style">
                              <div className="sub_margin_style">
                                <div
                                  className="close_crose"
                                  onClick={handlecarts}
                                >
                                  <CloseIcon />
                                </div>
                              </div>
                              <div
                                className="logout_navbar_style"
                                onClick={Logout}
                              >
                                <p className="logout_para_style_nav">
                                  Sing Out
                                </p>
                                <img
                                  src="/images/logout.png"
                                  width="20px"
                                  height="20px"
                                />
                              </div>
                            </div>
                            {tokenId ? (
                              <div className="showlist">
                                <div className="usernavbar_style">
                                  <div className="userprofile_text">
                                    <p className="colorprofile_text1">
                                      Hello,{" "}
                                      <span className="colorprofile_text">
                                        {fullname}
                                      </span>
                                    </p>{" "}
                                    <div className="uploadbtn1_nav_image">
                                      <label class="custom-file-upload_nav">
                                        <EditOutlinedIcon />
                                        <input
                                          type="file"
                                          onChange={HandlefileChange}
                                        />
                                      </label>
                                    </div>
                                    {src_u ? (
                                      <img
                                        src={src_u}
                                        className="user_icon_profile_nav"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="wallet_nab">
                                  <p
                                    style={{
                                      color: "#efefef",
                                      fontSize: "12px",
                                      color: "#585858",
                                    }}
                                  >
                                    Wallet Balance
                                  </p>
                                  <p
                                    // style={{ color: "#fff", fontSize: "16px" }}
                                    className="wallet_balance_style_nav"
                                  >
                                    {balancevalue()}
                                  </p>
                                  <p className="local_currency_amount">
                                    {currencyslocal}
                                  </p>
                                </div>
                                <Link href="/dashboard/wallet">
                                  <a className="a_style">
                                    <div className="center_div_nav">
                                      <div className="top_upballence_style">
                                        <img
                                          src="/images/topup.png"
                                          height={25}
                                          width={25}
                                          className="margin_left"
                                        />
                                        <p className="text_nav_style">
                                          Top Up Balance
                                        </p>
                                        <img
                                          src="/images/right-arrow.png"
                                          height={25}
                                          width={25}
                                          className="margin_right"
                                        />
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                                <Link href="/dashboard">
                                  <a className="a_style">
                                    <div className="center_div_nav">
                                      <div className="top_upballence_style2">
                                        <img
                                          src="/images/dahsboard.png"
                                          height={25}
                                          width={25}
                                          className="margin_left"
                                        />
                                        <p className="text_nav_style">
                                          Dashoard
                                        </p>
                                        <img
                                          src="/images/right-arrow.png"
                                          height={25}
                                          width={25}
                                          className="margin_right"
                                        />
                                      </div>
                                    </div>
                                  </a>
                                </Link>

                                <div
                                  className="center_div_nav"
                                  onClick={changeicon}
                                >
                                  <div className="top_upballence_style3">
                                    <img
                                      src="/images/orders.png"
                                      height={25}
                                      width={25}
                                      className="margin_left"
                                    />
                                    <p className="text_nav_style">Order</p>
                                    {open ? (
                                      <div className="margin_right">
                                        <KeyboardArrowDownOutlinedIcon />
                                      </div>
                                    ) : (
                                      <div className="margin_right">
                                        <KeyboardArrowUpOutlinedIcon />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {open ? (
                                  <div className="order_nav_style_show">
                                    <Link href="/dashboard/purchaseitem">
                                      <a className="a_style">
                                        <div className="order_open_div_style">
                                          <p className="text_nav_style">
                                            Purchase Orders
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/dashboard/myorder">
                                      <a className="a_style">
                                        <div className="order_open_div_style1">
                                          <p className="text_nav_style">
                                            Sold Orders
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/dashboard/sellercentral/createlisting">
                                      <a className="a_style">
                                        <div className="order_open_div_style2">
                                          <p className="text_nav_style">
                                            Create Listing
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              // <div style={{ marginTop: "7rem" }}>
                              //   <Link href="/login" as={`/login`}>
                              //     <a>
                              //       <div
                              //         className="innerlistss signlistss"
                              //         onClick={singnupstart}
                              //       >
                              //         Sign In
                              //       </div>
                              //     </a>
                              //   </Link>

                              //   <Link href="/register">
                              //     <a>
                              //       <div
                              //         className="innerlistss signuplistss"
                              //         onClick={singnupstart}
                              //       >
                              //         Create an Account
                              //       </div>
                              //     </a>
                              //   </Link>
                              // </div>
                              ""
                            )}
                            {/* <div className="social_icon_style">
                              <p className="font_style_rightbar">
                                Connect on social :
                              </p>
                              <div className="social-icon">
                                <div className="socialwrapper" id="facebook">
                                  <Link
                                    href="https://www.facebook.com/Esports4G/"
                                    passHref={true}
                                  >
                                    <a href="" target="_blank">
                                      <img
                                        src="/images/facebookxl.png"
                                        height={20}
                                        width={20}
                                      />
                                    </a>
                                  </Link>
                                </div>

                                <div className="socialwrapper" id="twitter">
                                  <Link
                                    href="https://twitter.com/Esports4gdotcom/"
                                    passHref={true}
                                  >
                                    <a href="" target="_blank">
                                      <TwitterIcon />
                                    </a>
                                  </Link>
                                </div>

                                <div className="socialwrapper" id="instagram">
                                  <Link
                                    href="https://www.instagram.com/esports4g_com/"
                                    passHref={true}
                                  >
                                    <a href="" target="_blank">
                                      <InstagramIcon />
                                    </a>
                                  </Link>
                                </div>

                                <div className="socialwrapper" id="linkedin">
                                  <Link
                                    href="https://www.linkedin.com/company/esports4g-com/mycompany/"
                                    passHref={true}
                                  >
                                    <a href="" target="_blank">
                                      <LinkedInIcon />
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <></>
                </div>
              </div>
            </div>
          </div>

          <div className="mobilcarts">
            <div className="cartsmobileicon " onClick={handlecart}>
              <div className="shoppingcart">
                <ShoppingCartOutlinedIcon />

                {cartnumber > 0 ? (
                  <div className="one">
                    <p>{cartnumber}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="showdashboradmenu" onClick={showleftpannel}>
              {tokenId ? (
                <div>
                  {userImage ? (
                    <img src={userImage} className="user_icon_profile" />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <PersonIcon />
              )}
            </div>
          </div>
        </div>
        {/* {show2 && (
          <div ref={ref}> */}
        <div className={`leftpannelhome ${toggles ? "active" : ""}`}>
          <div className="leftpannel_wrapperhome">
            <div className="closedashboard" onClick={showleftpanneltwo}>
              <CloseIcon />
            </div>

            {tokenId ? (
              <div>
                <div className="usernavbar_style">
                  {userImage ? (
                    <img src={userImage} className="user_icon_profile" />
                  ) : (
                    ""
                  )}
                  <div className="userprofile_text">
                    <p className="colorprofile_text1">Hello</p>
                    <p className="colorprofile_text">{fullname}</p>
                    {checkData.length > 0 ? (
                      <img src={checkData} className="badge_style_nab" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="navbar_verify">
                    {verifydata.length > 0 ? (
                      <img src={verifydata} className="badge_style_nab" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="wallet_nab">
                  <p style={{ color: "#efefef", fontSize: "16px" }}>Wallet</p>
                  <p style={{ color: "#fff", fontSize: "16px" }}>{balance}</p>
                </div>
                {/* <div className="controlbutton"> */}
                <div className="innerlistssS" onClick={singnupstart}>
                  <div className="logout" onClick={Logout}>
                    Sign out
                  </div>
                </div>
                <div
                  className="innerlistssD"
                  onClick={() => {
                    singnupstart(), togglesdropdown();
                  }}
                >
                  <div className="dashboard_style">
                    <Link href="/dashboard">Dashoard</Link>
                    <div className="dropdownIcoc">
                      {toggleicons ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      toggleicons
                        ? "show_div_style_r active"
                        : "show_div_style_r"
                    }
                  >
                    <div className="innerlistss" onClick={singnupstart}>
                      <Link href="/dashboard/purchaseitem">Purchase Item</Link>
                    </div>
                    <div
                      className="innerlistssSE"
                      onClick={() => {
                        singnupstart(), togglesdropdown2();
                      }}
                    >
                      <div className="dashboard_style">
                        <Link href="/dashboard/sellercentral">
                          {sellerstatus ? (
                            <p className="font_style_rightbar">
                              Seller Central
                            </p>
                          ) : (
                            <p className="font_style_rightbar">
                              Become a Seller
                            </p>
                          )}
                        </Link>
                        <div>
                          <div className="dropdownIcoc">
                            {toggleicons2 ? (
                              <ArrowDropDownIcon />
                            ) : (
                              <ArrowDropUpIcon />
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          toggleicons2 ? "dropdownbtns active" : "dropdownbtns"
                        }
                      >
                        <div className="innerlistss" onClick={togglemenus}>
                          <Link href="/dashboard/myorder">My Order</Link>
                        </div>

                        <div className="innerlistss" onClick={togglemenus}>
                          <Link href="/dashboard/sellercentral/createlisting">
                            Create Listing
                          </Link>
                        </div>

                        <div className="innerlistss" onClick={togglemenus}>
                          <Link href="/dashboard/viewlisting">
                            View Listing
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="innerlistss" onClick={singnupstart}>
                      <Link href="/dashboard/useraccount">User Account</Link>
                    </div>
                    <div className="innerlistss" onClick={singnupstart}>
                      <Link href="/dashboard/wallet">E4G Pay</Link>
                    </div>
                  </div>
                </div>
                <div className="innerlistss" onClick={singnupstart}>
                  <Link href="/userprofile">My Profile</Link>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <div
                    className="innerlistss signlistss"
                    onClick={singnupstart}
                  >
                    <a>Sign In</a>
                  </div>
                </Link>
                <Link href="/register">
                  <div
                    className="innerlistss signuplistss"
                    onClick={singnupstart}
                  >
                    Create an Account
                  </div>
                </Link>
              </>
            )}

            <div className="social_icon_style">
              <p className="font_style_rightbar">Connect on social : </p>
              <div className="social-icon">
                <div className="socialwrapper" id="facebook">
                  <Link
                    href="https://www.facebook.com/Esports4G/"
                    passHref={true}
                  >
                    <a href="" target="_blank">
                      <img
                        src="/images/facebookxl.png"
                        height={20}
                        width={20}
                      />
                    </a>
                  </Link>
                </div>

                <div className="socialwrapper" id="twitter">
                  <Link
                    href="https://twitter.com/Esports4gdotcom/"
                    passHref={true}
                  >
                    <a href="" target="_blank">
                      <TwitterIcon />
                    </a>
                  </Link>
                </div>

                <div className="socialwrapper" id="instagram">
                  <Link
                    href="https://www.instagram.com/esports4g_com/"
                    passHref={true}
                  >
                    <a href="" target="_blank">
                      <InstagramIcon />
                    </a>
                  </Link>
                </div>

                <div className="socialwrapper" id="linkedin">
                  <Link
                    href="https://www.linkedin.com/company/esports4g-com/mycompany/"
                    passHref={true}
                  >
                    <a href="" target="_blank">
                      <LinkedInIcon />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* )
        } */}
      </div>

      <div className="cartbuttons">
        {carts ? (
          <div className="carts active">
            <div className="closemenu" onClick={handlecart}>
              <CloseIcon />
            </div>
            <Cart />
          </div>
        ) : (
          <div className="carts">
            <Cart />
          </div>
        )}
        {/* <AddShoppingCartIcon /> */}
      </div>

      <div className="outermobileserachdiv">
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
                      show2={show2}
                      setSate2={setSate2}
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
              </>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </>
  );
};
export default Navbarhome;
