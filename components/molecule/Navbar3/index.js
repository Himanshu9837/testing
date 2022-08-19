import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MessageIcon from "@mui/icons-material/Message";
import Link from "next/link";

const Navbar3 = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [tokenId, setTokenId] = useState("");

  useEffect(async () => {
    const token = localStorage.getItem("user");
    if (token) {
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
      const isuser = d.tokenData.isadmin;
      setTokenId(cart_datas);
      // badge(cart_datas);
      // balanceavable(cart_datas);
      if (isuser == false) {
        addcart();
        //   SetTokens(true);
        //   getsellerstatus(cart_datas);
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
  return (
    <div>
      <nav className="navigation">
        <div className="navlogo">
          <Link href="/">
            <img src="/static/images/logo2.svg" alt="" />
          </Link>
        </div>
        <div className="navitems">
          <div className="navitem navtext">
            <img
              className="curlogo"
              src="/images/india.svg"
              width="30"
              height="30"
            />{" "}
            INR
          </div>
          {tokenId ? (
            <>
              <div className="navitem white">
                <ShoppingCartOutlinedIcon />
              </div>
              <div className="navitem white">
                <MessageIcon />
              </div>
              <div className="navitem usercircle">
                <span></span>
              </div>
            </>
          ) : (
            <>
              <div className="navitem">
                <Link href="/login">
                  <a href="">
                    <button className="navbtns">login</button>
                  </a>
                </Link>
              </div>
              <div className="navitem">
                <Link href="/register">
                  <a href="">
                    <button className="navbtns1">Set Account</button>
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar3;
