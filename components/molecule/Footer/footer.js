import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import Image from "next/image";
import Topbar from "../../atom/Topbar/Topbar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const footer = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");

    setToken(arrayOfData);
  }, []);

  return (
    <>
      <footer>
        <div className="footer">
          <div className="footer-top">
            <div className="footertopinner">
              <div className="payment-icon">
                <div className="information_wrapper">
                  <img src="/images/logoesports.png" height={140} width={250} />
                </div>
              </div>
              <div className="information">
                <h4 className="informhead">Information</h4>
                <div className="information_wrapper">
                  <ul className="innersection">
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link
                        href="/aboutus"
                        passHref={true}
                      >
                        <a href="">About Us</a>
                      </Link>
                    </li>
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link
                        href="https://esports4g.com/careers/"
                        passHref={true}
                      >
                        <a href="">Carrers</a>
                      </Link>
                    </li>
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link
                        href="https://esports4g.com/terms-of-service-agreement"
                        passHref={true}
                      >
                        <a href="">Terms & Condition</a>
                      </Link>
                    </li>
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link
                        href="https://esports4g.com/privacy-policy-cookie-restriction-mode"
                        passHref={true}
                      >
                        <a href="">Privacy Policy</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="support">
                <h4 className="informhead">Support</h4>
                <div className="information_wrapper">
                  <ul className="innersection">
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link
                        href="https://supporthub.esports4g.com/gamingmarketplace/"
                        passHref={true}
                      >
                        <a href="">Support Hub</a>
                      </Link>
                    </li>
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link href="/">
                        <a href="/">Report Spam</a>
                      </Link>
                    </li>
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link
                        href="https://esports4g.com/shipping-policy"
                        passHref={true}
                      >
                        <a href="">Shipping Policy</a>
                      </Link>
                    </li>
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link
                        href="https://supporthub.esports4g.com/gamingmarketplace/2021/05/19/refund-policy/"
                        passHref={true}
                      >
                        <a href="">Payments & Refunds</a>
                      </Link>
                    </li>
                    <li className="innerlist">
                      <ChevronRightTwoToneIcon />
                      <Link href="/contactus" passHref={true}>
                        <a href="">Contact Us</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {token != null && (
                <div className="acoount">
                  <h4 className="informhead">My Account</h4>
                  <div className="information_wrapper">
                    <ul className="innersection">
                      <li className="innerlist">
                        <ChevronRightTwoToneIcon />
                        <Link href="/">
                          <a href="/">Orders</a>
                        </Link>
                      </li>
                      <li className="innerlist">
                        <ChevronRightTwoToneIcon />
                        <Link href="/">
                          <a href="/">Account details</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="popular_div">
                <div style={{padding:"20px"}} >
                <h2 className="popular_style">Popular Market</h2>
                </div>
                <div className="game_display">
                    <p className="footer_game_color">Valorent</p>
                    <p className="footer_game_color">Valorent</p>
                    <p className="footer_game_color">Valorent</p>
                    <p className="footer_game_color">Valorent</p>
                    <p className="footer_game_color">Valorent</p>
                    <p className="footer_game_color">Valorent</p>

                  </div>
                <div>
                </div>
            </div>
          </div>
        </div>
        <div className="payment-label">
          <div className="image-container">
            <img src="/images/visaicon.jpeg" height={25} width={92} />
          </div>
          <div className="image-container">
            <img src="/images/paypal.svg" height={25} width={60} />
          </div>
          <div className="image-container">
            <img src="/images/mastercard3.png" height={43} width={60} />
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-icon">
            <div className="socialwrapper" id="facebook">
              <div className="setfacebook">
                <Link
                  href="https://www.facebook.com/Esports4G/"
                  passHref={true}
                  target="_blank"
                >
                  <a href="" target="_blank">
                    <img
                      src="/images/facebookxl.png"
                      height={25}
                      width={25}
                      alt="not-found"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="socialwrapper" id="twitter">
              <Link href="https://twitter.com/Esports4gdotcom/" passHref={true}>
                <a href="" target="_blank">
                  <TwitterIcon />
                </a>
              </Link>
            </div>

            <div className="socialwrapper" id="instagram">
              <Link
                href="https://www.instagram.com/esports4g_com/"
                passHref={true}
                target="_blank"
              >
                <a href="" target="_blank">
                  <InstagramIcon />
                </a>
              </Link>
            </div>

            <div className="socialwrapper" id="linkedin">
              <Link
                href="https://www.linkedin.com/company/esports4g-com/mycompany/"
                passHref={true}
                target="_blank"
              >
                <a href="" target="_blank">
                  <LinkedInIcon />
                </a>
              </Link>
            </div>
          </div>
          <div className="copyright">
            <span className="copyrightdesc">ESPORTS4G.COM © 2021</span>
          </div>
        </div>
      </footer>
      <Topbar />
    </>
  );
};

export default footer;
