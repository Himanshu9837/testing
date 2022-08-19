import React, { useContext, useEffect, useState } from "react";
// import Heading from '../../components/atom/Heading/Heading.js';
// import Span from '../../components/atom/Span/Span.js';
// import Capcha from '../../components/molecule/Capcha/Capcha.js';
// import dynamic from "next/dynamic";

// const Heading = dynamic(() =>
//   import("../../components/atom/Heading/Heading.js")
// );
// const Span = dynamic(() => import("../../components/atom/Span/Span.js"));
// const Capcha = dynamic(() => import("../../components/molecule/Capcha/Capcha"));
// const Navbar = dynamic(() =>
//   import("../../components/molecule/Navbar3")
// );
import Heading from "../../components/atom/Heading/Heading.js";
import Span from "../../components/atom/Span/Span.js";
import Capcha from "../../components/molecule/Capcha/Capcha";
import Navbar from "../../components/molecule/Navbar2/Navbarhome";
// const Footer = dynamic(() => import("../../components/molecule/Footer/footer"));
import Footer from "../../components/molecule/Footer/footer";
// import Contextapi from "../../../Context/Contextapi.js";
// const Contextapi = dynamic(() => import('../../Context/Contextapi.js'))

import { Fragment } from "react";
import Image from "next/image";

import Imgtest from "../../public/images/Login_design.svg";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
// import Navbar from '../../components/molecule/Navbar2/Navbarhome.js';
// import Footer from '../../components/molecule/Footer/footer.js';
import Contextapi from "../../Context/Contextapi.js";

toast.configure();
const notify = (message) => toast(message);
const Login = () => {
  // const  {capchaverify,setcapchaverify}  = useContext(Contextapi)
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  // const {
  //   cartnumber,
  //   notify,
  //   capchaverify,
  //   setnotify,
  //   checkfalse,
  //   setsocket,
  //   setmobileseacrh,
  //   setcurrencys,
  //   setcheckcurrencyslocal,
  //   setcurrencyslocal,
  // } = useContext(Contextapi);
  const { capchaverify } = useContext(Contextapi);
  console.log(capchaverify);

  const [loader, setloader] = useState(false);
  const [checked, setChecked] = useState(false);

  const [passwords, showpassword] = useState(false);

  const [forgetpass, setfogetpass] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    setloader(true);

    e.preventDefault();
    const { email, password } = user;
    const res = await fetch(apiKey + "api/usersignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        checked,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      notify(data.error);
      setloader(false);
    } else {
      notify("Successfully Login");
      router.replace("/");
      window.localStorage.setItem("user", JSON.stringify(data));
    }
  };

  function togglepassword() {
    showpassword(!passwords);
  }

  function forgots() {
    setfogetpass(true);
  }

  const ForgotPassword = async () => {
    const { email } = user;
    const res = await fetch(apiKey + "api/forgetpassword/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      notify(data.error);
    } else {
      notify("Email Send");
    }
  };

  const backclick = () => {
    setfogetpass(false);
  };

  return (
    <Fragment>
      <div className="outerconatinersss">
        <Navbar />
        <div className=" containerss">
          <div className="alerts">
            <ToastContainer autoClose={600} />
          </div>

          {loader ? (
            <div class="loader"></div>
          ) : (
            <>
              <div className="innerwrapper">
                <div className="image1">
                  <Image src={Imgtest} />
                  {/* <Imgtest /> */}
                </div>
                {forgetpass ? (
                  <div
                    className={`innerwarpper4  ${forgetpass ? "active" : ""}`}
                  >
                    <div className="backbtn" onClick={backclick}>
                      <ArrowBackIcon />
                    </div>
                    <div className="title_login">
                      <Span prop="Login to your account" spanalign="Center" />
                    </div>
                    <div className="input-fields">
                      <form method="post">
                        <div className="passwordstitle">
                          <Span
                            prop="Enter your email address to send password link."
                            spanalign="Left"
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          className="input"
                          onChange={handleInputs}
                          required
                        />
                      </form>
                    </div>

                    <div className="btn">
                      <button className="button" onClick={ForgotPassword}>
                        Confirm
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`innerwarpper3 ${forgetpass ? "active" : ""}`}
                  >
                    <div className="title_login">
                      <Heading prop="Welcome Back" />
                      <Span prop="Login to your account" spanalign="Center" />
                    </div>
                    <div className="input-fields">
                      <form method="post">
                        <input
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          className="input"
                          onChange={handleInputs}
                          required
                        />
                        <div className="passwordshow">
                          <input
                            type={passwords ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            className="input"
                            onChange={handleInputs}
                            required
                          />
                          <div className="passwords" onClick={togglepassword}>
                            {passwords ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </div>
                        </div>
                      </form>
                      <div className="cpcha_login">
                        <Capcha />
                      </div>
                      <div className="staysign">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            setChecked(e.target.checked);
                          }}
                        />
                        <Span prop="Stay singned In" />
                      </div>
                    </div>

                    <div className="btnloginpage">
                      <button
                        className={`button ${capchaverify ? "" : "active"}`}
                        onClick={PostData}
                        disabled={capchaverify}
                      >
                        Login
                      </button>
                    </div>
                    <div className="signups">
                      <p className="signup-text">
                        If not Register then
                        <Link href="/register">
                          <span>SignUp</span>
                        </Link>
                      </p>
                    </div>
                    <div className="forgot" onClick={forgots}>
                      <span className="forgotspan">Forget password ?</span>
                    </div>
                  </div>
                )}

                <div className="image2">
                  <Image src={Imgtest} />
                  {/* <Imgtest /> */}
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Login;

// export async function getInitialProps({ req, res }) {
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   )

//   return {
//     props: {},
//   }
// }
