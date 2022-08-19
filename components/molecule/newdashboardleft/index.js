import React, { useState, useEffect } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Link from "next/link";

export default function Leftdashboard() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [sellerapprovalstatus, setSellerapprovalstatus] = useState(false);
  const [selleravaliable, setSelleravaliable] = useState("");
  const [loader, setloaders] = useState(false);

  const change = () => {
    setopen(!open);
  };
  const change1 = () => {
    setopen1(!open1);
  };
  const change2 = () => {
    setopen2(!open2);
  };
  useEffect(async () => {
    // setloaders(false)
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const userid = d.tokenData.id;
      selleravalibility(userid);
      let sellerId = await fetch(`${apiKey}api/seller/sellerdetails/${userid}`);
      sellerId = await sellerId.json();
      console.log(sellerId.error);
      setSellerapprovalstatus(sellerId.sellerapprovalstatus);
    }
  }, []);

  const selleravalibility = async (userid) => {
    // setloaders(false)
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let selleravailable = await fetch(
      `${apiKey}api/seller/checkavailability/${userid}`
    );
    selleravailable = await selleravailable.json();
    setSelleravaliable(selleravailable);
  };
  return (
    <div className="left_dashboard_style">
      <div className="logo_dashboard_style">
        <Link href="/">
          <img src="/static/images/logo2.svg" width={200} />
        </Link>
      </div>
      <Link href="/dashboard">
        <div className="dashboard_style_left">
          <p className="mydashboard_text">MY DASHBOARD</p>
        </div>
      </Link>
      <div className="purchase_order_div">
        <Link href="/dashboard/purchaseitem">
          <div className="order_style_text">
            <p className="purchase_order_style">PURCHASE ORDERS</p>
          </div>
        </Link>
        {selleravaliable ? (
          sellerapprovalstatus ? (
            <>
              <div className="order_style_text" onClick={change}>
                <p className="purchase_order_style">ORDERS</p>
                <div className="arrow_icon_style">
                  <KeyboardArrowDownRoundedIcon />
                </div>
              </div>
              {open ? (
                <div className="drop_show_div">
                  <Link href="/dashboard/myorder">
                    <div className="order_style_text1">
                      <p className="purchase_order_style1">Order history</p>
                    </div>
                  </Link>
                  <div className="order_style_text1">
                    <p className="purchase_order_style1">Invoices</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {selleravaliable ? (
          sellerapprovalstatus ? (
            <div className="order_style_text2" onClick={change1}>
              SELLER CENTRAL
              <div className="arrow_icon_style">
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>
          ) : (
            <>
              <Link href="/dashboard/kyc">
                <a>
                  <div className="order_style_text2">BECOME A SELLER</div>
                </a>
              </Link>
            </>
          )
        ) : (
          <>
            <Link href="/dashboard/kyc">
              <a>
                <div className="order_style_text2">BECOME A SELLER</div>
              </a>
            </Link>
          </>
        )}

        {open1 ? (
          <div className="drop_show_div">
            <Link href="/dashboard/kyc">
              <div className="order_style_text1">
                <p className="purchase_order_style1">On Boarding</p>
              </div>
            </Link>
            <Link href="/dashboard/sellercentral/createlisting">
              <div className="order_style_text1">
                <p className="purchase_order_style1">Create Listing</p>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <Link href="/dashboard/useraccount">
          <div className="order_style_text">
            <p className="purchase_order_style">MY ACCOUNT</p>
          </div>
        </Link>
        <Link href="/dashboard/wallet">
          <div className="order_style_text">
            <p className="purchase_order_style">E4GWALLET</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
