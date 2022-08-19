import React, { useContext, useState } from 'react';
import Dashboard from '../../components/molecule/newdashboardleft';
import Dashboard3 from '../../components/molecule/Dashboard3';
import Navbar from "../../components/molecule/dashboardheader";
import Footer from '../../components/molecule/Footer/footer';

import Contextapi from "../../Context/Contextapi.js";


export default function Purchase() {

  const { load } = useContext(Contextapi);

  return (
    <>
      <div className="mainview">

        <div className={`lodersouter ${load ? 'active' : ''}`}>
          <div className="innerloaders">
            <div class="loader"></div>
          </div>
        </div>

        <div className="mainview_wrapper">
          <Dashboard />
          <div className='rightpannel'>
          <div className='rightpannel_wrapper'>
          <Navbar />
          <Dashboard3 />

          </div>
          </div>
        </div>
      </div>
    </>
  )
};

export async function getInitialProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}