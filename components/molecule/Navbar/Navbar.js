import React, { useState, useEffect } from "react";
import Logo from "../../../public/images/Logo_1.svg";
import India from "../../../public/images/india.svg";
import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Cart from "../Cart/Cart";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import { useRouter } from 'next/router';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';

// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [toggleicons, settoggleicon] = useState(false);
  const [menus, setmenus] = useState(false);
  // const [afters,setafters]=useState(false);

  const [sellerstatus, setsellerstatus] = useState();
  const [sellerstatus2, setsellerstatus2] = useState();
  const [sellerstatus3, setsellerstatus3] = useState();
  const [fname, setfname] = useState("");
  const [userImage, setuserImage] = useState();
  const [fullnames, setfullname] = useState("");

  useEffect(() => {
    UserDatas();
    const token = localStorage.getItem("user");
    if (token) {
    
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
  fetch(
    `${apiKey}api/edituser/${cart_datas}`
  )
    .then((res) => res.json())
    .then((data) => {
      if(data.result==false){
        Logout();
      }
    })
    }
  }, []);

  const UserDatas = async () => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;

    let userId = await fetch(
      apiKey + "api/edituser/" + cart_data
    );
    userId = await userId.json();
    setuserImage(userId.result.image);
    setfullname(userId.result.fullname);
  };

  function togglesdropdown() {
    settoggleicon(!toggleicons);
    // setafters(true);
  }
  function menutoggle() {
    setmenus(!menus);
  }

  const UserData = async () => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;

    let userId = await fetch(
      apiKey + "api/edituser/" + cart_data
    );
    userId = await userId.json();
    // setPosts(userId.result);
    setfname(userId.result.fullname);
    // setStatus(userId.result.status);
    // setcurrentpasswords(userId.result.currentpassword);
    // document.addEventListener('mousedown', () => {
    //     setDisable(false);
    // });
  };

  // const router = useRouter();

  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");
    if (!arrayOfData) {
      // setloading(true)
      router.push("/login");
    }
    else if(arrayOfData){
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const idadmin = d.tokenData.isadmin;
      if(idadmin==true){
        router.push("/login");
      }
    }
    else {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const iddata = d.tokenData.email;
      const userid = d.tokenData.id;
      fetch(`${apiKey}api/checklogin/${iddata}`)
        .then((res) => res.json())
        .then((data) => {
         
          // setuseremail(data);
          if (data == true) {
         
            // router.push('/dashboard/sellercentral')
            // setloading(false)
          } else if (data == false) {
            router.push("/login");
            // setloading(true)
          }
        });

      getsellerstatus(userid);
    }
    UserData();
  }, []);

  const getsellerstatus = async (userid) => {
    let sellerId = await fetch(
      apiKey + "api/seller/sellerdetails/" + userid
    );
    sellerId = await sellerId.json();
   
    setsellerstatus(sellerId.sellerapprovalstatus);
    setsellerstatus2(sellerId.sellerlistingRestriction);
    setsellerstatus3(sellerId.sellerRestriction);
  };
  const router = useRouter();

  const [carts, setcarts] = useState(false);
  const [data, setData] = useState([]);
  const [Tokens, SetTokens] = useState(false);
  const [toggles, settoggles] = useState(false);
  const [usermenu, setusermenu] = useState(false);

  const addcart = async () => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      SetTokens(cart_data);
      //  setCartData(cart_data);
     
      let res = await fetch(
        apiKey + "api/cart/cartinfo/" + cart_data
      );
      res = await res.json();
      const datatest = res;
      
      setData(datatest);
    }
  };
  useEffect(async () => {
    // addcart();
    const token = localStorage.getItem("user");
    if (token) {
      const d = token !== null ? JSON.parse(token) : [];
      const sevendaylogin = d.tokenData.sevendaylogin;
      const cart_datas = d.tokenData.id;
    
      // setloading(false)
      if (sevendaylogin == false) {
        setTimeout(() => {
          axios({
            method: "POST",
            url: `${apiKey}api/updateonlinestatus/${cart_datas}`,
      
          })
            .then((res) => {
           
              //   setProductData(res.data);
      
            })
            .catch((err) => {
           
            });
          localStorage.removeItem("user");
        }, 1200000);
      } else {
        setTimeout(() => {
    axios({
      method: "POST",
      url: `${apiKey}api/updateonlinestatus/${cart_datas}`,

    })
      .then((res) => {
       

      })
      .catch((err) => {
        
      });
          localStorage.removeItem("user");
        }, 604800000);
      }
    } else {
      // setloading(true)
      router.push("/login");
    }
    addcart();
  }, []);

  const handlecart = () => {
    if (carts === false) {
      
      setcarts(!carts);
      // setcarts(true)
    
    } else if (carts === true) {
      setcarts(false);
    
    }
  };
 
  const Logout = () => {
    const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
    axios({
      method: "POST",
      url: `${apiKey}api/updateonlinestatus/${cart_data}`,

    })
      .then((res) => {
       

      })
      .catch((err) => {
       
      });
    localStorage.removeItem("user");
    router.push("/login");
  };
  function togglemenu() {
    settoggles(true);
  }
  function togglemenus() {
    settoggles(false);
  }

  function toggleusermenu() {
    setusermenu(true);
  }
  function toggleusermenus() {
   
    setusermenu(false);
  }
  return (
    <>
      <div className="navbar">
        <div className="navbar_wrapper">
          <div className="logo loogos">
            <div className="menus" onClick={togglemenu}>
              <MenuIcon />
            </div>
            <div className="logoss">
              <Link href="/">
                <Logo />
              </Link>
            </div>
          </div>
          <div
            className="rightnavbar"
            id={`hidenavbar${usermenu ? "active" : ""}`}
          >
            <div className="userheaders">
              <div className="closeusers" onClick={toggleusermenus}>
                <CloseIcon />
              </div>
              <div className="usermenu">
                <div className="usernames">{fname}</div>
                <div className="userimagess">
                  <img src={userImage} alt="not-found" />
                </div>
              </div>
            </div>
            <div className="rightnavbarwrapper">
              <div className="flag">
                <India />
              </div>
              <div className="sellbutton">
                <button className="buttonss sellnowbtn">Sell Now</button>
              </div>

              <div className="loginbutton">
                {Tokens ? (
                  // <Link href='/login'>
                  <div
                    className="logout"
                    onClick={Logout}
                    style={{ cursor: "pointer" }}
                  >
                    <button className="buttonss loginbtns">Log out</button>
                  </div>
                ) : (
                  // </Link>
                  <Link href="/login">
                    <button className="buttonss loginbtns">Login In</button>
                  </Link>
                )}
              </div>

              {Tokens ? (
                ""
              ) : (
                <div className="loginbutton">
                  <Link href="/register">
                    <button className="buttonss signup">Sign Up</button>
                  </Link>
                </div>
              )}
              {/* <div className="menu" onClick={handlecart}>
                                {
                                    carts ? (
                                        <div className="closemenu">
                                        </div>
                                    ) : (
                                        <div className="shoppingcart">
                                            <AddShoppingCartIcon />
                                            {data.map((num) => (
                                                <div className='one'>
                                                    <p>{num.totalquantity}</p>
                                                </div>
                                            ))}

                                        </div>
                                    )
                                }
                            </div> */}
            </div>
          </div>
          <div className="usermenus" onClick={toggleusermenu}>
            <AccountCircleIcon />
          </div>
        </div>
        {/* <div className="usermenu">
                    <AccountCircleIcon />
                </div> */}

        <div className="toggledashboard ">
          <div className={`leftpannel ${toggles ? "active" : ""}`}>
            <div className="leftpannel_wrapper">
              <div className="close" onClick={togglemenus}>
                <CloseIcon />
              </div>
              <div className="topbox">
                <div className="profile_detail">
                  <div class="head">
                    <div class="head_pic">
                      {/* <Image src={Userprofile} /> */}
                      <img src={userImage} alt="not-found" />
                    </div>
                    <div class="head_detail">
                      <span className="welcome">Hello</span>
                      <h4 className="username">{fullnames}</h4>
                      <div className="badge">
                        <div className="innerbadge">
                          <VerifiedUserIcon />
                        </div>
                        <div className="innerbadge">
                          <VerifiedUserIcon />
                        </div>
                        <div className="innerbadge">
                          <VerifiedUserIcon />
                        </div>
                        <div className="innerbadge">
                          <VerifiedUserIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="earningdetail">
                            <div className="detail">
                                <div className="walleticon">
                                    <AccountBalanceWalletIcon />
                                </div>
                                <p className="name">
                                    Wallet balance
                                </p>
                                <p className="balance">
                                    $12,1560.55
                                </p>
                            </div>
                            <div className="detail">
                                <div className="coin">
                                    <MonetizationOnIcon />
                                </div>
                                <p className="name">
                                    E4G coins
                                </p>
                                <p className="balance">
                                    770
                                </p>
                            </div>
                            <div className="detail">
                                <div className="earningicon">
                                    <AttachMoneyIcon />
                                </div>
                                <p className="name">
                                    Earnings
                                </p>
                                <p className="balance">
                                    $12,1560.55
                                </p>
                            </div>
                        </div> */}
              </div>

              <div className="controlbutton">
                <Link href="/dashboard">
                  <button
                    className="controlbtn controlbtn1"
                    onClick={togglemenus}
                  >
                    <div className="order-manage">
                      <div className="home">
                        <HomeIcon />
                      </div>
                      <h4 className="btnname">Dashboard</h4>
                    </div>
                  </button>
                </Link>
                <Link href="/dashboard/purchaseitem">
                  <button
                    className="controlbtn controlbtn1"
                    onClick={togglemenus}
                  >
                    <div className="order-manage">
                      <div className="home">
                        <ShoppingCartIcon />
                      </div>
                      <h4 className="btnname">Purchase Items</h4>
                    </div>
                  </button>
                </Link>
                <button
                  onClick={togglesdropdown}
                  className=" controlbtn seller-pannel"
                >
                  <div className="order-manage  ">
                    <div className="home">
                      <AccountCircleIcon />
                    </div>
                    <Link href="/dashboard/sellercentral" onClick={togglemenus}>
                      {sellerstatus ? (
                        <h4
                          className={`btnname ${
                            toggleicons ? "btnafter" : "btnnone"
                          }`}
                        >
                          Seller Central
                        </h4>
                      ) : (
                        <h4
                          className={`btnname ${
                            toggleicons ? "btnafter" : "btnnone"
                          }`}
                        >
                          Become a Seller
                        </h4>
                      )}
                    </Link>

                    <div className="dropdown">
                      {toggleicons ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )}
                    </div>
                  </div>
                  {/* { */}
                  {sellerstatus ? (
                    <>
                      {sellerstatus3 ? (
                        ""
                      ) : (
                        <div
                          className={
                            toggleicons ? "dropdownbtn active" : "dropdownbtn"
                          }
                        >
                          <div className="togglediv" onClick={togglemenus}>
                            <Link href="/dashboard/myorder">
                              <h4 className="innerbtnname">My Order</h4>
                            </Link>
                          </div>
                          {sellerstatus2 ? (
                            ""
                          ) : (
                            <div className="togglediv" onClick={togglemenus}>
                              <Link href="/dashboard/sellercentral/createlisting">
                                <h4 className="innerbtnname">Create Listing</h4>
                              </Link>
                            </div>
                          )}

                          <div className="togglediv" onClick={togglemenus}>
                            <Link href="/dashboard/viewlisting">
                              <h4 className="innerbtnname">View Listing</h4>
                            </Link>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </button>

                <Link href="/dashboard/useraccount">
                  <button
                    className="controlbtn controlbtn1"
                    onClick={togglemenus}
                  >
                    <div className="order-manage">
                      <div className="home">
                        <SettingsIcon />
                      </div>
                      <h4 className="btnname">User Account</h4>
                    </div>
                  </button>
                </Link>
                <Link href="/dashboard/wallet">
                  <button className="controlbtn controlbtn1">
                    <div className="order-manage">
                      <div className="home">
                        <AccountBalanceWalletIcon />
                      </div>
                      <h4 className="btnname">E4GPay</h4>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* {
                    carts ? (

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
                    )
                } */}
      </div>
    </>
  );
};

export default Navbar;
