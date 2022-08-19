import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Divider from "@mui/material/Divider";
// import PhoneInput from "react-phone-number-input";
// import ReactPhoneInput from "react-phone-input-2";
import PhoneInput from "react-phone-input-2";
import Calendar from "react-calendar";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import DoneIcon from "@mui/icons-material/Done";
import { Oval } from "react-loader-spinner";
import ErrorIcon from "@mui/icons-material/Error";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import Background_Image from "../../public/images/register.svg";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PasswordStrengthMeter from "../../components/atom/PasswordMeter/passwordmeter";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Header from "../../components/molecule/Navbar2/Navbarhome";
import Footer from "../../components/molecule/Footer/footer";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import Capcha from "../../components/molecule/Capcha/Capcha.js";
import Contextapi from "../../Context/Contextapi.js";
import ReactFlagsSelect from "react-flags-select";
// import Captcha from "./Capcha 2";
toast.configure();
const notify = (message) => toast(message);

export default function Register() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { capchaverify, setcapchaverify } = useContext(Contextapi);
  console.log(capchaverify);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(false);
  const [usermessage, setUserMessage] = useState("");
  const [emailmessage, setEmailMessage] = useState("");
  const [verify, setVerify] = useState("");
  const [loading, setLoading] = useState("");
  const [check, setCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [usererror, setUsererror] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [allerror, setallErros] = useState("");
  const [strength, setStrength] = useState("");
  const [disable, setDisable] = useState(false);
  const [errorN, setErrorN] = useState("");
  const [errorU, setErrorU] = useState("");
  const [errorL, setErrorL] = useState("");
  const [errorS, setErrorS] = useState("");
  const [errors, setErrors] = useState("");
  const [emailcheck, setemailcheck] = useState(true);

  const [loader, setloader] = useState(false);
  const [formerror, setformerror] = useState("");
  const [formerror1, setformerror1] = useState("");
  const [formerror2, setformerror2] = useState("");
  const [formerror3, setformerror3] = useState("");
  const [formerror4, setformerror4] = useState("");
  const [formerror5, setformerror5] = useState("");

  const [showpass, setshowpass] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [messages, setMessages] = useState("");

  const [showerr, setshowerr] = useState(false);

  const [emailength, setemail] = useState("");

  const [userchecks, setuserchecks] = useState(false);

  const [email2, setemail2] = useState(false);

  const [passwordlength, setpasswordlength] = useState("");

  const [selected, setSelected] = useState("");

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const emailsss = event.target.value;
    if (emailsss.length <= 0) {
      setshowerr(false);
    } else {
      if (emailRegex.test(emailsss)) {
        setIsValid(true);
        setMessages("");
        setshowerr(true);
      } else {
        setIsValid(false);
        setMessages("Please enter a valid email!");
        setshowerr(true);
      }
    }
  };

  const [show, setShow] = React.useState({
    password: "",
    showPassword: false,
  });
  // const [dob, setDob] = useState("");

  useEffect(() => {
    if (
      // capchaverify === true &&
      check === true &&
      email2 === true &&
      allerror == "" &&
      passwordlength.length >= 1 &&
      fullname.length > 0 &&
      selected != ""
    ) {
      setemailcheck(false);
    } else {
      setemailcheck(true);
    }
  }, [
    // capchaverify,
     email2, allerror, passwordlength, fullname,selected]);
  const toggle = () => {
    setCheck(!check);
    // console.log(email2);
    // console.log(check);
    let x = !check;
    console.log(x);

    if (
      email2 === true &&
      usererror === false &&
      x === true &&
      fullname.length > 2 &&
      allerror == "" &&
      verify === false &&
      // capchaverify === true &&
      selected != ""
    ) {
      setemailcheck(false);
    } else if (check === true) {
      setemailcheck(true);
    }
  };


  console.log(selected);

  // function onChanges(date, dateString) {
  //   Dobset(dateString);
  // }

  const [showCalendar, setShowCalendar] = useState(false);
  const changedate = () => {
    setShowCalendar((wasOpened) => !wasOpened);
  };
  const hidecalender = () => {
    setShowCalendar(false);
  };
  const handleValid = (e) => {
    let value = e.target.value;
    setpasswordlength(value);
    let number = /[0-9]/g;
    let upperCaseLetters = /[A-Z]/g;
    let lowerCaseLetters = /[a-z]/g;
    let sepcialCharacters = /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/;
    setDisable(true);
    setStrength(e.target.value);
    if (value.length >= 0) {
      setshowpass(true);
    }
    if (value.length === 0) {
      setshowpass(false);
    }
    if (value.length >= 8) {
      setErrors("");
    } else {
      setErrors(`Password must be 0-8 Characters long`);
    }
    if (!value.match(number)) {
      setErrorN(`Passoword must contain one Number`);
    } else {
      setErrorN("");
    }
    if (!value.match(upperCaseLetters)) {
      setErrorU(`Passoword must contain one Uppercase`);
    } else {
      setErrorU("");
    }
    if (!value.match(lowerCaseLetters)) {
      setErrorL(`Passoword must contain one Lowercase`);
    } else {
      setErrorL("");
    }
    if (!value.match(sepcialCharacters)) {
      setErrorS(`Passoword must contain one Special character`);
    } else {
      setErrorS("");
    }
    if (
      value.length >= 8 &&
      value.match(upperCaseLetters) &&
      value.match(number) &&
      value.match(lowerCaseLetters) &&
      value.match(sepcialCharacters)
    ) {
      setallErros("");
      if (
        email2 === true &&
        fullname.length > 2 &&
        check === true &&
        // capchaverify === true &&
        selected != ""
      ) {
        setemailcheck(false);
      }
    } else {
      setemailcheck(true);
      setallErros("pleas fill all");
    }
  };

  const handlePhoneChange = () => {
    setPhone(phone);
  };

  const handleChange = (prop) => (event) => {
    setShow({ ...show, [prop]: event.target.value });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShow({
      ...show,
      showPassword: !show.showPassword,
    });
  };
  const email_verify = (e) => {

    e.preventDefault();
    const confiq = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios({
      method: "post",
      url: apiKey + "api/emailverification",
      data: {
        email: email,
      },
    })
      .then((response) => {
        toast(response.data.message);
        setLoading(true);
        setEmailMessage(response.data.message);

      })
      .catch((e) => {
        // setLoading(true);
        console.log(e.response.data.error);
        // console.log(e.response.data.error);

        setemail2(e.response.data.error);
        // setemail2(true);
      });
  };

  console.log(email2);

  const email_verify2 = (e) => {
  
    if (email.length >= 1) {
      var count = 1;

      const timer = setInterval(() => {
        if (count < 300) {
          if (emailength !== 0) {
            count++;
            axios({
              method: "post",
              url: apiKey + "api/emailstatus",
              data: {
                email: email,
              },
            })
              .then((response) => {
                // setVerify(response.data.message);

                if (response.data.message === false) {
                  // alert('hii')
                  // if (userchecks == true) {
                  // alert('hii2')
                  // if (check === true) {
                  // setemailcheck(true);
                  setLoading(true);

                  // }
                  // }
                } else if (response.data.message === true) {
                  // setemail2(true)
                  // console.log(email2)
                  clearInterval(timer);
                  console.log(userchecks);
                  // alert('true')
                  // setVerify(true)
                  // setemail2(response.data.message)
                  // if (email2 === false && userchecks === true) {
                  // setVerify(true);
                  setLoading(false);
                  // alert('hiii')
                  // clearInterval(timer);
                  // setemailcheck(false)
                  setemail2(response.data.message);
                  // }
                }
              })
              .catch((e) => {
                // setemail2(e.response.data.error);
              });
          } else {
            clearInterval(timer);
          }
        } else {
          setLoading(false);
        }
      }, 2000);

      return () => clearInterval(timer);
    } else {
    }
  };

  console.log(email2);
  const emailInput = (e) => {
    setEmail(e);
    const emaillength = e.length;
  };
  const usercheck = () => {
    if (username.length < 1) {
      // alert(username.length)
      setemailcheck(true);
      setUserMessage("okkksss");
    } else {
      setUserMessage("okkk");
    }
    axios({
      method: "get",
      url: `${apiKey}api/usernameexists/${username}`,
    })
      .then((response) => {
        console.log(check);
        setUserMessage(response.data.message);
        setUsererror(false);
        setuserchecks(true);
        if (
          email2 === true &&
          fullname.length > 2 &&
          check === true &&
          allerror == "" &&
          // capchaverify === true &&
          selected != ""
        ) {

          setemailcheck(false);
        } else {
          setemailcheck(true);
        }
      })

      .catch((e) => {
        console.log(e.response.data.error);
        setUsererror(e.response.data.error);
      });
  };
  const register_user = () => {

    setloader(true);
    setTimeout(() => {
      setloader(false);
    }, 1500);

    if (username.length <= 0) {
      setformerror("This field is required");
    } else if (fullname.length <= 0) {
      setformerror1("This field is required");
    } else if (email.length <= 0) {
      setformerror2("This field is required");
    }
    // else if (dob <= 0) {
    //   setformerror3("This field is requiredss");
    // }
    else if (show.password.length <= 0) {
      setformerror4("This field is required");
    } else if (phone.length <= 0) {
      setformerror5("This field is required");
    }
    // notify("Fill all the fields");
    // }
    else {
      setloader(true);
      axios({
        method: "post",
        url: `${apiKey}api/userregister/`,
        data: {
          email: email,
          fullname: fullname,
          username1: username,
          // dateofbirth: dob,
          password: show.password,
          phone: "+" + phone,
          country:selected
        },
      })
        .then((response) => {
          router.replace("/login");
        })
        .catch((e) => {
          toast("Email Already exists");
          setloader(false);
        });
    }
  };

  const getdata = (e) => {
    if (e.keyCode === 8) {
      setVerify(false);
    }

    if (email.length > 1) {
      axios({
        method: "post",
        url: `${apiKey}api/emailexists/`,
        data: {
          email: email,
        },
      })
        .then((response) => {
          setMessage(response.data.message);
          // if (check === true) {
          if (response.data.error) {

            setError(response.data.error);
            if (
              userchecks &&
              fullname.length > 2 &&
              allerror == "" &&
              // capchaverify === true &&
              verify == true &&
              selected != ""
            ) {
              setemailcheck(false);
            } else {
              setemailcheck(true);
            }

            // setemailcheck(true);
          } else if (response.data.message) {

            setError(false);
          }
        })
        .catch((e) => {
          toast(e.response.data.error);
        });
    } else {
      setMessage(false);
    }
  };

  return (
    <div className={"register_view"}>
      <Header />
      <div className="alerts">
        <ToastContainer />
      </div>
      <div className={"register_second_view"}>
        <div style={{ paddingTop: "10vh" }}>
          <h2 className={"text_color"}>Register Now</h2>
          <div style={{ paddingTop: "10px", flexWrap: "wrap" }}>
            <h5 className={"text_color1"}>
              Register now and unlock the benifit to start earning. Earn more
              live more
            </h5>
          </div>
        </div>
        <div className={"display_div"}>
          <div className="background_style">
            <Image src={Background_Image} />
            {/* <Background_Image className="background_image" /> */}
          </div>

          <div className="back_img_style">
            <div className={"register_third_view"}>
              <div className={"div_text"}>
                {/* <from> */}

                <div className="input-container">
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Username"
                    name="usrnm"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyUp={usercheck}
                    // onKeyDown={usercheck}
                  />
                  {/* <i className="fa fa-user icon"></i> */}
                  <div className="materialui_style">
                    <PersonIcon />
                  </div>
                </div>
                {/* </from> */}

                <div className="vali">
                  <p className="vali_p">
                    {username.length > 0 ? "" : formerror}
                  </p>
                </div>

                {usererror ? (
                  <>
                    <p className={"p1"}>{usererror}</p>
                    <div className={"div_1"}>
                      <ErrorIcon className="svg3" />
                    </div>
                  </>
                ) : (
                  <>
                    {usermessage === "ok" && (
                      <>
                        <p className={"ps"}> You can use this username</p>
                        <div className={"div_1"}>
                          <DoneIcon className="svg2" />
                        </div>
                      </>
                    )}
                  </>
                )}
                <div className="input-container">
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Full name"
                    name="usrnm"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    autoComplete="off"
                  />
                  {/* <i className="fa fa-user icon"></i> */}
                  <div className="materialui_style">
                    {/* <PersonIcon /> */}
                    <PeopleOutlineIcon />
                  </div>
                  {fullname.length > 2 && (
                    <div className={"div_1"}>
                      {/* <DoneIcon className="svg2" /> */}
                    </div>
                  )}
                </div>
                <div className="vali">
                  <p className="vali_p">
                    {fullname.length > 0 ? "" : formerror1}
                  </p>
                </div>

                {/* <div className="input-container">
                  <Space direction="vertical">
                    <DatePicker
                      onChange={onChanges}
                      placeholder="Date of birth"
                      defaultValue={dob}
                    />
                  </Space>
                </div> */}
                {/* <div className="vali"> */}
                  {/* <p className="vali_p">{dob.length > 0 ? "" : formerror3}</p> */}
                  {/* <p className="vali_p">{formerror3}</p> */}
                {/* </div> */}

                <div className="input-container">
                  <div className="regioncontainer">
                    <ReactFlagsSelect
                    placeholder="Select Region"

                      selected={selected}
                      onSelect={(code) => setSelected(code)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="divider_style">
              <Divider
                orientation="vertical"
                sx={{ height: "100px", bgcolor: "#282828" }}
              />
            </div>
            <div className={"register_third_view"}>
              <div className={"div_text"}>
                <div style={{ display: "flex" }}>
                  <div className="input-container">
                    <input
                      className="input-field"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      // multiple
                      onChange={(e) => {
                        validateEmail(e), emailInput(e.target.value);
                      }}
                      onKeyUp={getdata}
                      // onKeyDown={email_verify2}

                      required
                      // onKeyDown={validateEmail}
                    />
                    {/* <i className="fa fa-envelope icon"></i> */}
                    <div className="materialui_style" onClick={changedate}>
                      <EmailIcon />
                    </div>
                  </div>
                </div>
                {/* <div className="vali">
                  <p className="vali_p">{email.length > 0 ? "" : formerror2}</p>
                </div> */}
                <div className={`${showerr ? "showerr" : "hideerr"}`}>
                  <p className={`vali ${isValid ? "success" : "error"}`}>
                    {messages}
                  </p>
                </div>
                {error ? (
                  <p className={"p_register"}>Email Already Exists</p>
                ) : (
                  ""
                )}

                {email2 ? (
                  <>
                    <p className={"p_register"}>Email already verified</p>
                    <div className={"div_1"}>
                      <DoneIcon className="svg2" />
                    </div>
                  </>
                ) : (
                  <>
                    {loading ? (
                      <>
                        <p className={"p_register"}>{emailmessage}</p>
                        <div className={"circle_style"}>
                          <Oval color="grey" ariaLabel="loading" />
                        </div>
                      </>
                    ) : (
                      <>
                        {message ? (
                          <>
                            {isValid ? (
                              <div className={"verified_btn"}>
                                <button
                                  type="button"
                                  className={"submit_bottom"}
                                  onClick={(e) => {
                                    email_verify(e);
                                    email_verify2();
                                  }}
                                >
                                  Verify email
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}{" "}
                      </>
                    )}
                  </>
                )}
                <div className="input-container">
                  <input
                    className="input-field"
                    type={show.showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={show.password}
                    onChange={handleChange("password")}
                    onKeyUp={handleValid}
                    // onKeyDown=""
                  />
                  {/*<i className="fa fa-key icon"></i>*/}
                  <div
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{ alignSelf: "center" }}
                  >
                    {show.showPassword ? (
                      // <i className="fa fa-eye-slash icon"></i>
                      <div className="materialui_style">
                        <VisibilityIcon />
                      </div>
                    ) : (
                      // <i className="fa fa-eye icon"></i>
                      <div className="materialui_style">
                        <VisibilityOffIcon />
                      </div>
                    )}
                  </div>
                </div>
                <div className="vali">
                  <p className="vali_p">
                    {show.password.length > 0 ? "" : formerror4}
                  </p>
                  {/* {formerror4} */}
                </div>
                <PasswordStrengthMeter password={strength} />
                {allerror == "" ? null : (
                  <div className={`password_style ${showpass ? "active" : ""}`}>
                    {disable && (
                      <ul className="register_passowrd_validation">
                        {allerror ? (
                          <h5>Suggestions for Strong Password 🔑</h5>
                        ) : null}
                        <div className="font">{errors}</div>
                        <div className="font">{errorU}</div>
                        <div className="font">{errorL}</div>
                        <div className="font">{errorS}</div>
                        <div className="font">{errorN}</div>
                      </ul>
                    )}
                  </div>
                )}

                <div className="input-phoneconatiner">
                  <div className="phone_style">
                    <PhoneInput
                      // className="form-control"
                      id="phone"
                      placeholder="Phone number"
                      value={phone}
                      onChange={setPhone}
                      name="phone"
                      // maxLength="11"
                      required=""
                    />
                  </div>
                </div>

                <div className="vali">
                  <p className="vali_phone">
                    {phone.length > 0 ? "" : formerror5}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="background_style2">
            <Image src={Background_Image} />
            {/* <Background_Image className="background_image" /> */}
          </div>
        </div>
        <div className="flex_styles">
          <div
          className="checkbtn_register"
          onClick={toggle} style={{ cursor: "pointer", zIndex: "6" }}>
            {check ? (
              <CheckBoxIcon className="check_color" />
            ) : (
              <CheckBoxOutlineBlankIcon className="check_color" />
            )}
          </div>
          <div className="pointer">
            <p className={"text_color1"}>
              I've read and accept the{" "}
              <Link
                href="https://esports4g.com/terms-of-service-agreement"
                passHref={true}
              >
                <a href="">Terms of use</a>
              </Link>{" "}
              and the{" "}
              <Link
                href="https://esports4g.com/privacy-policy-cookie-restriction-mode"
                passHref={true}
              >
                <a href="">Privacy policy</a>
              </Link>
            </p>
          </div>
        </div>
        <Capcha size="big" />
        {loader ? (
          <div className="upperloader">
            <div class="loader"></div>
          </div>
        ) : (
          <div style={{ marginTop: "30px", marginBottom: "3.4rem" }}>
            {/* {verify ? ( */}
            <button
              type="button"
              className={`verify_btn ${emailcheck ? "active" : ""}`}
              // className="verify_btn"
              onClick={register_user}
              disabled={emailcheck}
            >
              Register Now
            </button>
            {/* ):(
              <button
              type="button"
              className="verify_btn"
              // className={`verify_btn ${isDisabled ? "active" : ""}`}
              onClick={register_user}
              disabled={emailcheck}
            >
              Register Now
            </button>
            )} */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export async function getInitialProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {},
  };
}
