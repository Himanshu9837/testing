import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import CookieConsent from "react-cookie-consent";
import Head from "next/head";
import SimpleReactLightbox from "simple-react-lightbox";
// import { useRouter } from "next/router";
// import "rsuite/dist/styles/rsuite-default.css";

import "./register/register.scss";
import "./index.scss";
import "./invoice.scss";
import "./register/responsive_register.scss";
import "./description/description.scss";
import "animate.css/animate.min.css";
import { Html, Main, NextScript } from "next/document";
import "../components/theme/templates.scss";
import "../components/theme/login.scss";
import "../components/theme/addadmin.scss";
import "../components/theme/addproduct.scss";
import "../components/theme/responsive_payment_method.scss";
import "../components/theme/backendhomepage.scss";
import "../components/theme/badge.scss";
import "../components/theme/config.scss";
import "../components/theme/configuration.scss";
import "../components/theme/createcustomer.scss";
import "../components/theme/currency.scss";
import "../components/theme/dropdown.scss";
import "../components/theme/editcustomer.scss";
import "../components/theme/editmanageseller_style.scss";
import "../components/theme/editpage.scss";
import "../components/theme/manageseller.scss";
import "../components/theme/aboutus.scss";
import "../components/theme/order.scss";
import "../components/theme/contact_us.scss";
import "../components/theme/sellerconfig_style.scss";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { theme } from "../theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./description/descriptionmobile.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "./productlisting/productlist.scss";
import "./productlisting/productlistingresponsive.scss";
import "./game-account/homepage.scss";
import "./game-account/homepageresponsive.scss";
import "./game-account/animation.scss";
import "./aboutus/aboutus.scss";
import "./aboutus/aboutusresponsive.scss";
import "./contactus/contactus.scss";
import "./contactus/contactusresponsive.scss";
import "./userprofile/userprofile.scss";
import "./userprofile/responsiveuserprofile.scss";
import "../public/sass/Global.scss";
import "./login/Login.scss";
import "../components/atom/Heading/Heading.scss";
import "../components/atom/Span/Span.scss";
import "../components/molecule/Dashboard/Dashboard.scss";
import "../components/molecule/Dashboard/Dashboardmobile.scss";
import "../components/molecule/newdashboard/newdashboard.scss";
import "../components/molecule/dashboardheader/dashboardheader.scss";
import "../components/molecule/Navbar3/navbar3.scss";
import "../components/molecule/Offer/offer.scss";
import "../components/molecule/Offer/offerresponsive.scss";
import "../components/molecule/Leftchat/Leftchat.scss";
import "../components/404/Errorpage.scss";

import "../components/molecule/Welcome/Welcome.scss";
import "../components/molecule/Capcha/Capcha.scss";
import "../components/molecule/Leftchat/Leftchatmobile.scss";
import "../components/molecule/Rightchat/Rightchatmobile.scss";
import "../components/molecule/Rightchat/Rightchat.scss";
import "../components/molecule/Centerchat/Centerchat.scss";
import "../components/molecule/Centerchat/Centerchatmobile.scss";
import "../components/molecule/Navbar/Navbar.scss";
import "../components/molecule/Navbar2/Navbarhome.scss";
import "../components/molecule/Navbar2/Navbarhomemobile.scss";
import "../components/molecule/Banner/Banner.scss";
import "../components/molecule/Banner/Bannermobile.scss";
import "../components/molecule/Newarrival/Newarrival.scss";
import "../components/molecule/Titles/Title.scss";
import "../components/molecule/Newarrival/Newarrivalmobile.scss";
import "../components/molecule/Gamecard/Gamecard.scss";
import "../components/molecule/Gamecard/Gamecardmobile.scss";
import "../components/molecule/Cart/Cart.scss";
import "../components/molecule/Footer/footer.scss";
import "../components/molecule/Footer/footermobile.scss";
import "../components/molecule/Dashboard3/Dashboard3.scss";
import "../components/molecule/Dashboard3/Dashboard3mobile.scss";
import "../components/molecule/Attention/Attention.scss";
import "../components/molecule/Table/Table.scss";
import "../components/molecule/Userdetail/Userdetail.scss";
import "../components/molecule/Userdetail/Userdetailmobile.scss";
import "../components/molecule/Walletdetail/walletdetail.scss";
import "../components/molecule/Popup/Popup.scss";
import "../components/molecule/Walletdetail/responsivewallet.scss";
import "../components/atom/Topbar/Topbar.scss";
import "../components/molecule/newdashboardleft/leftdashboard.scss";

import "../pages/checkout/checkout.scss";
import "../pages/checkout/payment.scss";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard/myorder/details.scss";
import "./dashboard/kyc/kyc.scss";

import "./dashboard/sellercentral/createlisting.scss";
import "./dashboard/purchasedetails/purchasedetails.scss";

import "./dashboard/sellercentral/responsivecreatlist.scss";
import "./chat/chat.scss";
import "./chat/login.scss";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Contextapi from "../Context/Contextapi.js";
import Layout from "../components/molecule/Layout/layout.js";

export default function MyApp({ Component, pageProps }) {

  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);
  // const canonical = `https://esports4g.com` + router.asPath;
  const site = "http://206.189.136.28:3010";
  const canonicalURL = site + useRouter().pathname;
  const countslash = canonicalURL.replace(/[^\/]/g, "").length;
  <Html>
    <Head>
      {/* <link rel="icon" type="image/x-icon" href="/images/fav_icon.png"/> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Charis+SIL&family=Inter:wght@300&family=Montserrat&display=swap"
        rel="stylesheet"
      ></link> */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
      {/* <link href="https://fonts.googleapis.com/css2?family=Charis+SIL&family=Inter:wght@300&family=Montserrat&family=Poppins:ital,wght@0,300;1,200&display=swap" rel="stylesheet"></link> */}
      <link rel="canonical" href={canonicalURL} />
    </Head>
    <body>
      <Main />
    </body>
    <NextScript />
  </Html>;
  const [cartnumber, setcartnmber] = useState(0);
  const [notify, setnotify] = useState();
  const [sockets, setsocket] = useState();
  const [checkfalse, setcheckfalse] = useState(false);
  const [mobileseacrh, setmobileseacrh] = useState(false);
  const [chatback, setchatback] = useState(false);
  const [rightchatback, setrightchatback] = useState(false);
  const [capchaverify, setcapchaverify] = useState(false);

  const [currencyslocal, setcurrencyslocal] = useState("");
  const [currencys, setcurrencys] = useState([]);
  const [checkcurrencyslocal, setcheckcurrencyslocal] = useState(false);
  const [loaderss, setloaderss] = useState(true);
  const [Bannerimage, setBannerimage] = useState("");

  const [load, setload] = useState(false);

  const [stockss, setstocks] = useState();

  const [loaderspage, setloaderspage] = useState(true);
  const [Tokens, setTokens] = useState("");


  const [loading, setLoading] = useState(false);

  // Loading
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });


  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      fetch(`${apiKey}api/cart/cartinfo/${cart_data}`)
        .then((res) => res.json())
        .then((data) => {

          var d = data.map((i) => {
            i.items.map((inner) => {
              setstocks(inner.productId.stock);
            });
          });

        });
    }
  }, []);

  useEffect(() => {
    const arrayOfData = localStorage.getItem("userInfo");
    // const d=arrayOfData
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      setTokens(cart_data);
    }
  }, [Tokens, loaderspage]);

  useEffect(() => {
    notifications();
  }, [notify]);
  const notifications = () => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      fetch(`${apiKey}api/chat/chatnotification/${cart_data}`)
        .then((res) => res.json())
        .then((data) => {

          setnotify(data);
        });
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <>{countslash <= 3 && (

      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="canonical" href={canonicalURL} />

      </Head>
    )}
      <Contextapi.Provider
        value={{
          cartnumber,
          setcartnmber,
          notify,
          setnotify,
          checkfalse,
          setcheckfalse,
          sockets,
          setsocket,
          mobileseacrh,
          setmobileseacrh,
          chatback,
          setchatback,
          rightchatback,
          setrightchatback,
          currencys,
          setcurrencys,
          checkcurrencyslocal,
          setcheckcurrencyslocal,
          currencyslocal,
          setcurrencyslocal,
          capchaverify,
          setcapchaverify,
          loaderss,
          setloaderss,
          setBannerimage,
          Bannerimage,
          load,
          setload,
          stockss,
          setstocks,
          loaderspage,
          setloaderspage,
          Tokens,
          setTokens,
        }}
      >
        <SimpleReactLightbox>
          <ThemeProvider theme={theme}>
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </SimpleReactLightbox>
      </Contextapi.Provider>
      <CookieConsent>This site uses cookies.</CookieConsent>
    </>
  );
}
