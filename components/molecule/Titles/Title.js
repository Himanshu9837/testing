import React, { useEffect, useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
const Title = () => {
  const [bannerheading, setBannerheading] = useState("");
  const [bannerimage, setBannerimage] = useState("");
  const [bannerparagraph, setBannerparagraph] = useState("");
  const [bannerimagefalse, setBannerimagefalse] = useState(false);
  const [bannerheadingfalse, setBannerheadingfalse] = useState(false);
  const [dive, setDive] = useState(false);


  const homepagedata = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
  
    fetch(`${apiKey}api/admin/fetchladingpage`).then((res) => {
      res.json().then((data) => {
     
        setBannerheading(data.bannerheading);
        setBannerimage(data.bannerimage);
        setBannerparagraph(data.bannerparalayout);
        setBannerimagefalse(data.bannerimageenable);
        setBannerheadingfalse(data.bannerheadingenable);
        setDive(data.divenable);
      });
    });
  };

  useEffect(() => {
    homepagedata();
  }, []);
  return (
    <>
    {dive ? (
      <section className="backendtitles">
        <div className="backendtitle">
          <div className="innerbackendtitle">
            <div className="firsttitles">
              {bannerheadingfalse  ? (
                <>
                  <h1
                    dangerouslySetInnerHTML={{ __html: bannerheading }}
                    className="innerstitless"
                  />
                  <p className="fisttitlespara">
                    <p dangerouslySetInnerHTML={{ __html: bannerparagraph }} />
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="secondimg">
              {bannerimagefalse  ? (
                <div className="innersecondimage">
                  <img src={bannerimage} alt="notfound" />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      ) : ("")}
    </>
  );
};

export default Title;
