import React, { useEffect, useState } from "react";

const offer = () => {
  const [offerheading, setOfferheading] = useState("");
  const [offerpercent, setOfferpercent] = useState("");
  const [offer, setOffer] = useState(false);
  const [bannertopimage1, setBannertopimage1] = useState("");

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiKey}api/admin/fetchladingpage`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setOffer(data.offerbannerenable);
        setOfferpercent(data.percentagenumber);
        setOfferheading(data.offerheading);
        setBannertopimage1(data.bannerbackgroundimage);
      });
    });
  }, []);
  return (
    <>

      {offer ? (
        <section
          className="offer_section"
          style={{
            backgroundImage: `url(${bannertopimage1})`,
          }}
        >
          <div className="inneroffer">
            <div className="discounts_div">
              <div className="discount_inner">
                <p
                  className="discount_title"
                  dangerouslySetInnerHTML={{
                    __html: offerpercent,
                  }}
                ></p>
                <div>
                  <p className="sup">%</p>
                  <p className="sub1">off</p>
                </div>
              </div>
            </div>
            <div className="offer_right">
              <div className="offer_inner_right">
                <div className="offer_title_conatiner">
                  <div
                    className="offer_title_inner"
                    dangerouslySetInnerHTML={{
                      __html: offerheading,
                    }}
                  ></div>
                </div>
                <div className="offer_button_conatiner">
                  <div className="inner_button">
                    <a href="">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default offer;
