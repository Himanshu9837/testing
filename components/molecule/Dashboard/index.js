import { React, useState, useEffect, useContext } from "react";
import Userprofile from "../../../public/images/userprofile.jpg";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import Link from "next/link";
import Image from "next/image";

import Contextapi from "../../../Context/Contextapi.js";

const Dashboard = () => {

  const { setload } = useContext(Contextapi);
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [toggleicons, settoggleicon] = useState(false);
  const [menus, setmenus] = useState(false);
  // const [afters,setafters]=useState(false);

  const [sellerstatus, setsellerstatus] = useState();
  const [sellerstatus2, setsellerstatus2] = useState();
  const [sellerstatus3, setsellerstatus3] = useState();
  const [userImages, setuserImages] = useState();
  const [fullname, setFullName] = useState("");
  const [check, setchecck] = useState("");
  const [checks, setcheccks] = useState("");
  const [trues, setTrues] = useState("");
  // const [loaders,setloaders]=useState(false);

  function togglesdropdown() {
    settoggleicon(!toggleicons);
    // setafters(true);
  }
  function menutoggle() {
    setmenus(!menus);
  }

  const router = useRouter();

  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");
    if (!arrayOfData) {
      // setloading(true)
      router.push("/login");
    } else {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const iddata = d.tokenData.email;
      const userid = d.tokenData.id;
      getsellerstatus(userid);
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

      UserDatas();
      badgeconditiontrue();
    }
  }, []);

  const getsellerstatus = async (userid) => {
    let sellerId = await fetch(
      `${apiKey}api/seller/sellerdetails/${userid}`
    );
    sellerId = await sellerId.json();
  
    setsellerstatus(sellerId.sellerapprovalstatus);
    setsellerstatus2(sellerId.sellerlistingRestriction);
    setsellerstatus3(sellerId.sellerRestriction);
  };

  const UserDatas = async () => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    badgecondition(cart_data);
    let userId = await fetch(
      `${apiKey}api/edituser/${cart_data}`
    );
    userId = await userId.json();
    setuserImages(userId.result.image);
    setFullName(userId.result.fullname);
  };
  const badgecondition = async (cart_data) => {
    let sellerId = await fetch(
      `${apiKey}api/badges/applybadges/${cart_data}`
    );
    sellerId = await sellerId.json();
  
    setchecck(sellerId.checkdata.slice(-1));
    setcheccks(sellerId.verified);
  };
  const badgeconditiontrue = async () => {
    let sellerId = await fetch(
      `${apiKey}api/badges/fetchbadgesconfig`
    );
    sellerId = await sellerId.json();
    
    setTrues(sellerId.badgesenablesetting);
  };

  const loadingstart = () => {
    setload(true)
    setTimeout(() => {
      setload(false)
    }, 6000);
    // setloaders(true)
  }

  return (
    <>

      <div className="leftpannel" id="pannel1">
        <div
          className={menus ? "leftpannel_wrapper active" : "leftpannel_wrapper"}
        >
          {/* <div className="topbox">
            <div className="profile_detail">
              <div class="head">
                <div class="head_pic">
                  <img src={userImages} alt="Not-Found" />
                </div>
                <div class="head_detail">
                  <div className="usersnamess">
                    <span className="welcome">Hello</span>
                    <h4 className="username">{fullname}</h4>
                  </div>
                  {trues ? (
                    <>
                      <div className="badges">
                        {check.length > 0 ? (
                          <div className="innerbadge">
                            <img src={check} />
                          </div>
                        ) : ("")}
                      </div>
                    </>

                  ) : (
                    <div className="badges active">
                      {check.length > 0 ? (
                        <div className="innerbadge">
                          <img src={check} />
                        </div>
                      ) : ("")}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div> */}

          <div className="controlbutton">
            <Link href="/dashboard">
              <button className="controlbtn controlbtn1"
                onClick={loadingstart}
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
              <button className="controlbtn controlbtn1" 
              // onClick={loadingstart}
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
                <Link href="/dashboard/sellercentral">
                  {sellerstatus ? (
                    <h4
                    // onClick={loadingstart}
                      className={`btnname ${toggleicons ? "btnafter" : "btnnone"
                        }`}
                    >
                      Seller Central
                    </h4>
                  ) : (
                    <h4
                      className={`btnname ${toggleicons ? "btnafter" : "btnnone"
                        }`}
                    >
                      Become a Seller
                    </h4>
                  )}
                </Link>

                <div className="dropdown">
                  {toggleicons ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
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
                      <div className="togglediv"
                      onClick={loadingstart}
                      >
                        <Link href="/dashboard/myorder">
                          <h4 className="innerbtnname">My Order</h4>
                        </Link>
                      </div>
                      {sellerstatus2 ? (
                        ""
                      ) : (
                        <div className="togglediv"
                        onClick={loadingstart}
                        >
                          <Link href="/dashboard/sellercentral/createlisting">
                            <h4 className="innerbtnname">Create Listing</h4>
                          </Link>
                        </div>
                      )}

                      <div className="togglediv"
                      onClick={loadingstart}
                      >
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
              <button className="controlbtn controlbtn1"
              // onClick={loadingstart}
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
              <button className="controlbtn controlbtn1"
              //  onClick={loadingstart}
              >
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
    </>
  );
};

export default Dashboard;
