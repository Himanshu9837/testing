import React, { useState, useRef } from "react";
import useOutsideClick from "../Banner/useOutside.js";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
export default function Dropdownsearch3({ setSate4, show4, setFruit }) {
  const ref = useRef();
  const [showdiv, setShowdiv] = useState(false);
  const [nameshow, setNameshow] = useState("Game Account");

  const [name, setName] = useState('Game')
  const hide = () => {
    setShowdiv(!showdiv);
    setSate4(true);
    
  };
  const showresult = (data,data2) => {
    setNameshow(data);
    setShowdiv(false);
    setSate4(false);
    setName(data2)
    setFruit(data2)
  };
  
  useOutsideClick(ref, () => {
    if (show4) setSate4(false);
  });

  return (
    <div>
      <div className="diveshow2" onClick={hide}>
        <p>{nameshow}</p>
        <div>
          <KeyboardArrowDownOutlinedIcon />
        </div>
      </div>
      {show4 && (
        <div ref={ref}>
          <div className="hidedive_style3">
            <div
              className={`boxselect_style ${name == "Game" ? "active" : ""}`}
              onClick={() => showresult("Game Account",'Game')}
            >
              <p>Game Account</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
