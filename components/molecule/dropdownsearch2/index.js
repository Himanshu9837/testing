import React, { useState, useRef } from "react";
import useOutsideClick from "../Banner/useOutside.js";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
export default function Dropdownsearch2({ setSate2, show2, setFruit }) {
  const ref = useRef();
  const [showdiv, setShowdiv] = useState(false);
  const [nameshow, setNameshow] = useState("Search Game");

  const [name, setName] = useState('Game')
  const hide = () => {
    setShowdiv(!showdiv);
    setSate2(true);
    
  };
  const showresult = (data,data2) => {
    setNameshow(data);
    setShowdiv(false);
    setSate2(false);
    setName(data2)
    setFruit(data2)
  };
  
  useOutsideClick(ref, () => {
    if (show2) setSate2(false);
  });

  return (
    <div>
      <div className="diveshow" onClick={hide}>
        <p>{nameshow}</p>
        <div>
          <KeyboardArrowDownOutlinedIcon />
        </div>
      </div>
      {show2 && (
        <div ref={ref}>
          <div className="hidedive_style">
            <div
              className={`boxselect_style ${name == "Game" ? "active" : ""}`}
              onClick={() => showresult("Search Game",'Game')}
            >
              <p>Search Game</p>
            </div>
            <div
              className={`boxselect_style ${name == "Account" ? "active" : ""}`}
              onClick={() => showresult("Search Seller",'Account')}
            >
              <p>Search Seller</p>
            </div>
            <div
              className={`boxselect_style ${name == "Product" ? "active" : ""}`}
              onClick={() => showresult("Search Product",'Product')}
            >
              <p>Search Product</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
