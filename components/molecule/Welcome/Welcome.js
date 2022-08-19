import React, { useContext } from 'react'
import Logo from "../../../public/images/logo_1.svg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Contextapi from "../../../Context/Contextapi.js";
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import Image from 'next/image'
const Welcome = () => {

  const {setchatback}=useContext(Contextapi)

  const Backmsg=()=>{
 
    setchatback(true);
  }
  return (
    <>
      <div className="welcomepage">
      <div className="backmsg" onClick={Backmsg}>
        <MoreVertTwoToneIcon/>
      </div>
        <div className="welcomeimg">
        <Image src={Logo}/>
        {/* <Logo/> */}
        </div>
        <div className="welcometitle">
          <h3 className="titleinnerwelcome">
            Esports4g.com does not promote offsite trading. Do not accept invitations from users who offer trading outside Esports4g.com.
          </h3>
          <p className="welcomepara">
            Trading outside the Esports4g platform will not be tolerable and cannot be entertained at any cost. Our team will only help those users who trade within Esports4g.com in any fraudulent case, product issue, description issue. If found, will ban any user trading outside the Esports4g platform immediately.
          </p>
          <span className="welcomespan">
            Contact us if you found any seller who offers you offsite trading.
          </span>
        </div>
      </div>
    </>
  )
}

export default Welcome