import React, { useContext } from "react";
import Dashboard from "../../components/molecule/newdashboardleft";
import Userdetail from "../../components/molecule/Userdetail/Userdetail";
import Navbar from "../../components/molecule/dashboardheader";
import Footer from "../../components/molecule/Footer/footer";
import Contextapi from "../../Context/Contextapi.js";

export default function User() {
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
              <Userdetail />
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
