import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contextapi from "../../../Context/Contextapi.js";

import Slider from "react-slick";
export const config = {
  unstable_runtimeJS: false,
};

const delay = 2500;

const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Gamecard = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderss, setloaderss, setBannerimage } = useContext(Contextapi);

  const [cards, setcards] = useState([]);
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const [lengths, setlength] = useState(0);
  const [gamenumber, setgamenumber] = useState([]);

  useEffect(() => {
    fetch(`${apiKey}api/category/allbasecategory`)
      .then((res) => res.json())
      .then((data) => {
        setlength(data.length);
        setcards(data.catdata);
        setgamenumber(data.output);
        setloaders(false);
      });
    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    var totoal = 6;
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === cards.length - totoal ? 0 : prevIndex + 1
        ),
      delay
    );
    // }
    return () => {
      resetTimeout();
    };
  }, []);

  const [loaders, setloaders] = useState(false);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 800,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      {loaderss ? (
        <div class="loader loader1"></div>
      ) : (
        <>
          <div className={`lodersouter ${loaders ? "active" : ""}`}>
            <div className="innerloaders">
              <div class="loader"></div>
            </div>
          </div>
          <section className="gamecard_section">
            <div className="gamecard">
              <h5 className="sellinggame">Top Selling Games</h5>
            </div>
            <div className="sweerperdiv">
              <div className="innersweep">
                <Slider {...settings}>
                  {cards.map((name, index) => (
                    <>
                      {gamenumber.map((number, index2) => (
                        <>
                          {index === index2 ? (
                            <div className="singlecard_slider">
                              <article>
                                <Link
                                  href={{
                                    pathname: `/productlisting/${name.metaurl}`,
                                  }}
                                  prefetch={true}
                                  passHref
                                >
                                  <a>
                                    <div className="game_card_picker">
                                      <div className="game_image_conatiner">
                                        <img
                                          src={name.categoryimage}
                                          alt="not-found"
                                        />
                                      </div>
                                      <div className="game_card_name">
                                        <div className="game_card_title">
                                          {name.name}
                                        </div>
                                        <div className="game_card_info_conatiner">
                                          <span className="inner_card_info_conatiner">
                                            {number} products
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                              </article>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </>
                  ))}
                </Slider>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Gamecard;
