import Layout from "../../components/Sections/Layout";
import React, { useEffect, useState, useRef, useContext } from "react";
import Navbarhome from "../../components/molecule/Navbar2/Navbarhome";
import Banner from "../../components/molecule/Banner/Banner";
import Gamecard from "../../components/molecule/Gamecard/Gamecard";
import Newarrival from "../../components/molecule/Newarrival/Newarrival";
import Titles from "../../components/molecule/Titles/Title.js";
import Footer from "../../components/molecule/Footer/footer.js";
import Offer from "../../components/molecule/Offer/offer.js";
import Contextapi from "../../Context/Contextapi.js";
import Head from 'next/head';
// console.log(Footer);
// export default function index(articles1) {
  const index = (articles1) => {
  const postData=articles1.articles1;
  const bannerdata=articles1.articles2;
  const bannerheading=bannerdata.topheading;
  // console.log(bannerheading)
  const { loaderss, setloaderss, setBannerimage } = useContext(Contextapi);
  console.log(loaderss);
  const [bannerimage, setBannerimages] = useState("");
  const [bannerheadings, setBannerheading] = useState("");
  const [bannertopheading, setBannertopheading] = useState("");


  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiKey}api/admin/fetchladingpage`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setBannerheading(data.topheading);
        setBannerimages(data.topimage);
        setBannertopheading(data.seotopheading);
        setloaderss(false)
      });
    });
  }, []);

  return (
    <>  



      <Layout pageTitle="Esports-4G">
        {/* <Head>
          <link rel="alternate" href="https://esports4g.com/game-account" hreflang="en-in" />
          <link rel="alternate" href="https://esports4g.com/game-account" hreflang="en-us" />
        <meta name="viewport" content={postData.metadescription} />
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content={postData.metadescription}></meta>
        <meta name="keywords" content={postData.metakeyword}></meta>
        <meta name="title" content={postData.metatitle} />
        <meta name="robots" content="index, follow" />
        <title>{postData.metatitle}</title>
        </Head> */}
        {/* {loaderss ? (<> */}
          {/* <div class="loader loader1"></div> */}
          {/* <div
          className="titlebanner" 
          dangerouslySetInnerHTML={{ __html: bannerheading }}>
          </div> */}
          {/* </> */}
        {/* ) : ( */}
          <div className="homepage">
            <div className="homepage_wrappers">
              <Navbarhome inputs={false} />
              <Banner bannerheader={bannerdata} />
              <Gamecard />
              <Offer/>
              <Newarrival />
              <Titles />
            </div>
            <Footer />
          </div>
        {/* )} */}
      </Layout>
   
    </>
  );
}
export default index;
export const getServerSideProps = async (context) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const res1 = await fetch(`${apiKey}api/admin/fetchmatapages/Digital Gameaccounts`)
   const articles1 = await res1.json()
   const res2 = await fetch(`${apiKey}api/admin/fetchladingpage`)
   const articles2 = await res2.json()
  return {
    // Approvisionnement des props de notre page
    // Sending articles to page
    props: {articles1:articles1,articles2:articles2}
  }
}
