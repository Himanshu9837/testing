import React, { useContext } from 'react';
import Dashboard from '../../components/molecule/Dashboard';
import Dashboard2 from '../../components/molecule/Dashboard2';
import Navbar from '../../components/molecule/Navbar2/Navbarhome';
import Footer from '../../components/molecule/Footer/footer';
import Contextapi from "../../Context/Contextapi.js";

export default function Sellercentral ()  {
    const { load } = useContext(Contextapi);
    return (
        <>
            <div className="mainview">
                <Navbar />
                <div className={`lodersouter ${load ? 'active' : ''}`}>
                    <div className="innerloaders">
                        <div class="loader"></div>
                    </div>
                </div>
                <div className="mainview_wrapper">
                    <Dashboard />
                    <Dashboard2 />
                </div>
                <Footer/>
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