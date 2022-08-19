import React, { useRef } from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Dropdown from "../dropdownsearch2/index.js";
import Link from "next/link";
import Highlighter from "react-highlight-words";
import useOutsideClick from "../Banner/useOutside.js";

export default function Headersearch({
  fruit,
  hideinputs,
  showresultsagain,
  getgames,
  showsbannersearch,
  bannerdata3,
  show2,
  setSate2,
  show3,
  setSate3,
  setFruit,
  setbannerinput,
  bannerinput,
  getprodusts,
  getaccounts,
  bannerdata2,
  bannerdata,
  checkcurrencyslocal,
  currencys,
  currencyslocal,
}) {
  const ref = useRef();

  useOutsideClick(ref, () => {
    if (show3) setSate3(false);
  });
  return (
    <div style={{ width: "100%" }}>
      {hideinputs ? (
        <div className="changestyle">
          <div className="searchicon" onClick={showresultsagain}>
            <div className="custom-select1">
              <Dropdown show2={show2} setSate2={setSate2} setFruit={setFruit} />
            </div>
            <input
              type="text"
              className="searchinput"
              onKeyUp={
                fruit === "Product"
                  ? getprodusts
                  : fruit === "Account"
                  ? getaccounts
                  : fruit === "Game"
                  ? getgames
                  : ""
              }
              placeholder="Search your favorite game,seller"
              onChange={(e) => {
                setbannerinput(e.target.value);
              }}
            />

            <div className="searchicon_style">
              <SportsEsportsIcon />
            </div>
          </div>
          {show3 && (
            <div ref={ref}>
              <div
                className={`serachbannerresult1 ${
                  showsbannersearch ? "active" : ""
                }`}
              >
                {fruit === "Product" && bannerdata.length > 0
                  ? bannerdata.map((datas, i) => (
                      <Link href={`/description/${datas.metaurl}`}>
                        <div className="singleserachbanner1">
                          <div className="searchbannerimg1">
                            <img
                              src={datas.category.categorythumblinimage}
                              alt="k"
                            />
                          </div>
                          <div className="serachbannername1">
                            <span className="gamesname">
                              <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={[bannerinput]}
                                autoEscape={true}
                                textToHighlight={datas.productname}
                              />
                            </span>

                            {checkcurrencyslocal ? (
                              <span className="gamesname">
                                {currencyslocal} {datas.price * currencys}
                              </span>
                            ) : (
                              <span className="gamesname">
                                USD {datas.price * currencys}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))
                  : ""}

                {fruit === "Account" && bannerdata2.length > 0
                  ? bannerdata2.map((datas) => (
                      <Link href={`/${datas.metaurl}`}>
                        <div className="singleserachbanner">
                          <div className="searchbannerimg">
                            <img src={datas.image} alt="k" />
                          </div>
                          <div className="serachbannername">
                            <span className="gamesname">
                              {/* {datas.fullname} */}
                              <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={[bannerinput]}
                                autoEscape={true}
                                textToHighlight={datas.fullname}
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  : ""}
                {fruit === "Game" && bannerdata3.length > 0
                  ? bannerdata3.map((datas) => (
                      <>
                        <Link href={`/${datas.metaurl}`}>
                          <div className="singleserachbanner">
                            <div className="searchbannerimg">
                              <img src={datas.categorythumblinimage} alt="k" />
                            </div>
                            <div className="serachbannername">
                              <span className={`gamesname`}>
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[bannerinput]}
                                  autoEscape={true}
                                  textToHighlight={datas.name}
                                />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </>
                    ))
                  : ""}
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
