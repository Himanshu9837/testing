import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Dashboard from '../../components/molecule/newdashboardleft';
import { useRouter } from 'next/router';


import Navbar2 from '../../components/molecule/dashboardheader';
import Dashboard2 from "../../components/molecule/newdashboard";
import Cart from '../../components/molecule/Cart/Cart';

import Contextapi from "../../Context/Contextapi.js";



export default function Dashboardpage() {

  const { load} = useContext(Contextapi);
  const [loading, setloading] = useState(false);
  const [sellerverifystatus, setsellerveify] = useState();
  const [sellerstatus, setSellerstatus] = useState();
  const router = useRouter();
  useEffect(() => {


  }, [])

  const getsellerverfictionsataus = async () => {
    let userId = await fetch(
      'http://178.62.228.242:5000/api/seller/sellerverificationstatus/');

    userId = await userId.json();
    setsellerveify(userId);
  }
  const getsellerstatus = async (userid) => {
    let sellerId = await fetch(
      'http://178.62.228.242:5000/api/seller/sellerdetails/' + userid);
    sellerId = await sellerId.json();
    setSellerstatus(sellerId.sellerapprovalstatus)
  }

  return (
    <div>
    {
      loading ? (<img src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif' className='loaders' style={{ width: '300px', height: '300px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />) : (
        <div className="mainview" >
          <div className={`lodersouter ${load ? 'active' : ''}`}>
            <div className="innerloaders">
              <div class="loader"></div>
            </div>
          </div>
          <div className="mainview_wrapper">
            <Dashboard />
            <div className="rightpannel">
              <div className="rightpannel_wrapper">
              <Navbar2 />

                {/* {sellerverifystatus ? (
                  <>{sellerstatus ? ("seller verified") : ("seller not verified")}</>) : ("seller verification not required")} */}
                  < Dashboard2 />
              </div>
            </div>
          </div>
        </div>
      )
    }
    </div>
  )
};

// export default Dashboardpage;
export async function getInitialProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}