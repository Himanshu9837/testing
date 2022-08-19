import React, { useEffect, useState, useContext } from "react";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import Link from "next/link";
import { useRouter } from "next/router";
import Contextapi from "../../../Context/Contextapi.js";

const Dashboard = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { currencys, checkcurrencyslocal, currencyslocal } =
  useContext(Contextapi);
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [sellerverifystatus, setsellerveify] = useState();
  const [sellerstatus, setSellerstatus] = useState();
  const [selleravaliable, setSelleravaliable] = useState();
  const [Sellerdetail, setSellerdetail] = useState("");
  const [Sellerdefaultdetail, setSellerdefaultdetail] = useState("");
  const [alert, setalert] = useState("");
  const [todaydate, setTodaydate] = useState("");
  const [uploaded, setuploaded] = useState(false);
  const [userids, setuserids] = useState("");
  const [checkuserphoto, setcheckuserphoto] = useState("");
  const [loaders, setloaders] = useState(true);
  const [balance, setBalance] = useState("");
  const [totalpurches, setTotalpurches] = useState("");
  const [totalorder, setTotalorder] = useState("");
  const [listedproduct, setListedproduct] = useState("");
  const [balancewallet, setBalancewallet] = useState([]);
  const [totalpurchesuser, settotalpurcheruser] = useState("");

  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");
    if (!arrayOfData) {
      // setloading(true)
      router.push("/login");
    } else {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const iddata = d.tokenData.email;
      const userid = d.tokenData.id;
      balanceavablewallet(userid);
      totalpurchesproduct(userid);
      fetch(`${apiKey}api/checklogin/${iddata}`)
        .then((res) => res.json())
        .then((data) => {
          if (data == true) {
            router.push("/dashboard");
            // setloading(false)
          } else if (data == false) {
            router.push("/login");
            // setloading(true)
          }
        });
      getsellerverfictionsataus();
      getsellerstatus(userid);
      getCurrentDate();
      // selleravalibility(userid);
      // sellerdeafultinfo();
      // setuserids(userid);
    }
  }, []);

  const getsellerverfictionsataus = async () => {
    let userId = await fetch(apiKey + "api/seller/sellerverificationstatus/");

    userId = await userId.json();
    setsellerveify(userId);
  };

  const getsellerstatus = async (userid) => {
    // setloaders(false)
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let sellerId = await fetch(`${apiKey}api/seller/sellerdetails/${userid}`);
    sellerId = await sellerId.json();

    setSellerstatus(sellerId.sellerapprovalstatus);
    setSellerdetail(sellerId);

    setcheckuserphoto(sellerId._id);
    setalert(sellerId.alertbox);
    balanceavable(sellerId._id);
  };
  const balanceavable = (id) => {
    fetch(`${apiKey}api/seller/sellerdashboarddetails/${id}`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setBalance(data.wallettotal);
        setTotalpurches(data.total);
        setTotalorder(data.ordercount);
        setListedproduct(data.totalproduct);
      });
    });
  };

  const balanceavablewallet = (id) => {
    fetch(`${apiKey}api/withdrawal_wallet/wallettotal/${id}`).then((res) => {
      res.json().then((data) => {
        setBalancewallet(data);
      });
    });
  };
  const totalpurchesproduct = (id) => {
    fetch(`${apiKey}api/order/totalpurchase/${id}`).then((res) => {
      res.json().then((data) => {
        settotalpurcheruser(data);
      });
    });
  };

  function getCurrentDate(separator='-'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    setTodaydate(`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`);

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
  return (
    <div>
      <div style={{marginTop:"3.5rem"}}>
        <p className="mydashboard">MY DASHBOARD</p>
      </div>
      {sellerstatus ? (
        ""
      ) : (
        <div className="dashboarddiv2">
          <div className="text_paragraph">
            <p className="sell_coller">Want to sell</p>
            <p className="game_sell_color">Your Game?</p>
            <p className="submit_class">
              Submit your interest
              <Link href="/dashboard/kyc">
                <a>
                  <span className="hear_class">hear</span>
                </a>
              </Link>
            </p>
          </div>
          <div className="imgdiv_dashboard">
            <img src="/images/buy.png" className="dashboarddiv2_img" />
          </div>
        </div>
      )}
      {sellerstatus ? (
        <div className="dashboarddiv2_verified">
          <div className="text_paragraph1">
            <p className="seller_verification">Seller Verfication</p>
            <div>
              <p className="activeservice_style">Active Service</p>
              <div className="imag_flex_style">
                <div className="gameaccount_style_dashboard">
                  <div className="image_style_circle">
                    <img src="/images/comment.png" />
                  </div>
                  <p className="game_text_style">Seller Active</p>
                </div>
                <div className="gameaccount_style_dashboard">
                  <div className="image_style_circle2">
                    <img src="/images/comment.png" />
                  </div>
                  <p className="game_text_style">Game Accounts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="imgdiv_dashboard">
            <img src="/images/buy.png" className="dashboarddiv2_img" />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="overview_div">
        <p className="overview_style">Overview</p>
      </div>
      <div className="dashboard_inner_all_div">
        <div
          className={` ${
            sellerstatus
              ? "dashboard_inner_class"
              : "dashboard_inner_class_active"
          } `}
        >
          <div className="sold_style">
            <div>
              <p className="sold_name_style">Sold</p>
              <p className="order_name_style">Order</p>
            </div>
            <div className="icon_shopping_style">
              <LocalMallRoundedIcon />
            </div>
          </div>
          {sellerstatus ? (
            <div className="bottom_div_class">
              <p className="order_number_style">{totalorder}</p>
              <p className="date_order_style">{todaydate}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="dashboard_inner_class1">
          <div className="sold_style">
            <div>
              <p className="sold_name_style">Total</p>
              <p className="order_name_style">Purchase</p>
            </div>
            <div className="icon_shopping_style">
              <LocalMallRoundedIcon />
            </div>
          </div>
          <div className="bottom_div_class">
            {sellerstatus ? (
              <p className="order_number_style">{totalpurches}</p>
            ) : (
              <p className="order_number_style">{totalpurchesuser}</p>
            )}
          </div>
        </div>
        <div className="dashboard_inner_class2">
          <div className="sold_style">
            <div>
              <p className="sold_name_style">Wallet</p>
              <p className="order_name_style">Balance</p>
            </div>
            <div className="icon_shopping_style">
              <AccountBalanceWalletRoundedIcon />
            </div>
          </div>
          <div className="bottom_div_class">
            {sellerstatus ? (
              <p className="order_number_style">
                {Math.floor(balance).toFixed(2)}
              </p>
            ) : (
              <p className="order_number_style">
                {Math.floor(balancewallet).toFixed(2)}
              </p>
            )}
            <p className="date_order_style">{currencyslocal}</p>
          </div>
        </div>
        <div
          className={`${
            sellerstatus
              ? "dashboard_inner_class3"
              : "dashboard_inner_class3_active"
          } `}
        >
          <div className="sold_style">
            <div>
              <p className="sold_name_style">Listed</p>
              <p className="order_name_style">Product</p>
            </div>
            <div className="icon_shopping_style">
              <LocalMallRoundedIcon />
            </div>
          </div>
          {sellerstatus ? (
            <div className="bottom_div_class">
              <p className="order_number_style">{listedproduct}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
