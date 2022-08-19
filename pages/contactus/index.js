import React, { useEffect, useState } from "react";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import RoomIcon from "@mui/icons-material/Room";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Header from "../../components/molecule/Navbar2/Navbarhome";
import Footer from "../../components/molecule/Footer/footer";
import { ToastContainer, toast } from "react-toastify";

toast.configure();
const notify = (message) => toast(message);
const index = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [heading, setHeading] = useState("");
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [usersubject, setUsersubject] = useState("");
  const [usernote, setUsernote] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [messages, setMessages] = useState("");
  const [showerr, setshowerr] = useState(false);
  const [formerror, setformerror] = useState("");
  const [formerror1, setformerror1] = useState("");
  const [formerror2, setformerror2] = useState("");

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

  useEffect(() => {
    fetch(`${apiKey}api/pages/editcmpnydetails/`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setHeading(data.contactusheading);
        setEmail(data.esportsemail);
        setPhone(data.mobile);
        setaddress(data.address);
      });
    });
  }, []);

  async function submituser(e) {
    e.preventDefault();
    if (username.length <= 0) {
      setformerror("Username is required");
    } else if (useremail.length <= 0) {
      setformerror2("Email is required");
    } else if (usernote.length <= 0) {
      setformerror1("Message is required");
    } else {
      const data = {
        username: username,
        useremailemail: useremail,
        subject: usersubject,
        message: usernote,
      };

      fetch(`${apiKey}api/pages/submitcontactus/`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          notify("Submit succesfully");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  return (
    <>
      <div className="alerts">
        <ToastContainer autoClose={2000} />
      </div>
      <Header />
      <div className="contactus">
        <div className="contactusinner">
          <div className="leftside_contactus">
            <div className="leftside_contactus_inner">
              <h1 className="contactus_heading">Contact Us</h1>
              <p className="contactus_para">{heading}</p>
              <div className="contatus_address">
                <div className="singleadress">
                  <div className="adress_icons">
                    <PhoneAndroidIcon />
                  </div>
                  <div className="adress_text">
                    <p className="addresstext_inner">{phone}</p>
                    {/* <p className="addresstext_inner">(084) 2222 1234567</p> */}
                  </div>
                </div>
                <div className="singleadress">
                  <div className="adress_icons">
                    <RoomIcon />
                  </div>
                  <div className="adress_text">
                    <p className="addresstext_inner">{address}</p>
                    {/* <p className="addresstext_inner">United States</p> */}
                  </div>
                </div>
                <div className="singleadress">
                  <div className="adress_icons">
                    <MailOutlineIcon />
                  </div>
                  <div className="adress_text">
                    <p className="addresstext_inner">{email}</p>
                    {/* <p className="addresstext_inner">hello@example.com</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightside_contactus">
            <form method="post">
              <div className="outercontactus_form">
                <div className="conatct_us contactus_name">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="contactus_name_text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="contact_vali">
                    <p className="vali_p">
                      {username.length > 0 ? "" : formerror}
                    </p>
                  </div>
                </div>

                <div className=" conatct_us contactus_email">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="contactus_name_text"
                    required
                    onChange={(e) => {
                      validateEmail(e), setUseremail(e.target.value);
                    }}
                  />
                  <div className="contact_vali">
                    <p className="vali_p">
                      {useremail.length > 0 ? "" : formerror2}
                    </p>
                  </div>
                  <div className={`${showerr ? "showerr" : "hideerr"}`}>
                    <p
                      className={`contact_vali1 ${
                        isValid ? "success" : "error"
                      }`}
                    >
                      {messages}
                    </p>
                  </div>
                </div>

                <div className="conatct_us contactus_message">
                  <textarea
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Here goes your message"
                    className="contactus_name_text"
                    style={{ color: "#000" }}
                    onChange={(e) => setUsernote(e.target.value)}
                  ></textarea>
                  <div className="contact_vali">
                    <p className="vali_p">
                      {usernote.length > 0 ? "" : formerror1}
                    </p>
                  </div>
                </div>

                <div className="sendbutton">
                  <input
                    type="submit"
                    value="Send Message"
                    onClick={submituser}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
