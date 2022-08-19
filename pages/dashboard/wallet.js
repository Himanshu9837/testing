import React, { useContext } from "react";
import Dashboard from "../../components/molecule/newdashboardleft";
import Walletdetail from "../../components/molecule/Walletdetail/walletdetail";
import Navbar from "../../components/molecule/dashboardheader";

import Contextapi from "../../Context/Contextapi.js";

export default function Wallet() {
  const { load } = useContext(Contextapi);
  return (
    <>
      <div className="mainview">
        <div className={`lodersouter ${load ? "active" : ""}`}>
          <div className="innerloaders">
            <div class="loader"></div>
          </div>
        </div>
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="rightpannel">
            <div className="rightpannel_wrapper">
              <Navbar />
              <Walletdetail />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getInitialProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {},
  };
}
