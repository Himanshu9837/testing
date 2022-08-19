// import React from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import Attention from '../Attention/Attention';
import { useRouter } from "next/router";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from "react-toastify";
// import CheckIcon from '@mui/icons-material/Check';
const index = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [sellerverifystatus, setsellerveify] = useState();
  const [sellerstatus, setSellerstatus] = useState();
  const [selleravaliable, setSelleravaliable] = useState();
  const [Sellerdetail, setSellerdetail] = useState("");
  const [Sellerdefaultdetail, setSellerdefaultdetail] = useState("");
  const [alert, setalert] = useState("");
  const [arrfile, setarrfile] = useState([]);
  const [uploaded, setuploaded] = useState(false);
  const [userids, setuserids] = useState("");
  const [checkuserphoto, setcheckuserphoto] = useState("");
  // const [buttonss, setbuttons] = useState('')

  const [loaders, setloaders] = useState(true);
  const [picture, setPicture] = useState([]);

  const [thanksmessgae, setthankmessage] = useState(true)

  const router = useRouter();

  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");
    if (!arrayOfData) {
      // setloading(true)
      router.push("/login");
    } else {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const iddata = d.tokenData.email;
      const userid = d.tokenData.id;
      fetch(`${apiKey}api/checklogin/${iddata}`)
        .then((res) => res.json())
        .then((data) => {

          if (data == true) {
            router.push("/dashboard/sellercentral");
            // setloading(false)
          } else if (data == false) {
            router.push("/login");
            // setloading(true)
          }
        });
      getsellerverfictionsataus();
      getsellerstatus(userid);
      selleravalibility(userid);
      sellerdeafultinfo();
      setuserids(userid);
    }
  }, []);

  const getsellerverfictionsataus = async () => {
    // setloaders(false)
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let userId = await fetch(
      `${apiKey}api/seller/sellerverificationstatus/`
    );
    userId = await userId.json();
    setsellerveify(userId);

  };
  const getsellerstatus = async (userid) => {
    // setloaders(false)
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let sellerId = await fetch(
      `${apiKey}api/seller/sellerdetails/${userid}`
    );
    sellerId = await sellerId.json();

    setSellerstatus(sellerId.sellerapprovalstatus);
    setSellerdetail(sellerId);

    setcheckuserphoto(sellerId._id);
    setalert(sellerId.alertbox);

  };

  const selleravalibility = async (userid) => {
    // setloaders(false)
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let selleravailable = await fetch(
      `${apiKey}api/seller/checkavailability/${userid}`
    );
    selleravailable = await selleravailable.json();

    setSelleravaliable(selleravailable);
  };
  const sellerdeafultinfo = async () => {
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let sellerdefaults = await fetch(
      `${apiKey}api/seller/defaultdetails/`
    );
    sellerdefaults = await sellerdefaults.json();

    setSellerdefaultdetail(sellerdefaults);
  };

  // let checkseller = false;
  const change = {
    clip: "rect(0px, 200px, 200px, 100px)",
  };

  const changedate = () => {
    setShowCalendar(true);
  };
  const hidecalender = () => {
    setShowCalendar(false);
  };
  toast.configure();
  // const error = (message) => toast(message);
  const onchangepicture = (e) => {
    let output = [];
    // let pictureoutput=[];
    for (var i = 0; i < e.target.files.length; i++) {
      // setfile(e.target.files[1]);
      let filedata = e.target.files;
      if (filedata[i].size > 5000000) {

        toast.error("File Size too big");
      } else {

        output.push(filedata[i].name);
        // pictureoutput.push(filedata);

        setarrfile(output);
        setPicture(filedata);
        setuploaded(true);

      }
    }
  };

  const handlesubmitphoto = (e) => {

    e.preventDefault();
    if (picture.length >= 1) {
      const formData = new FormData();
      for (let j = 0; j < picture.length; j++) {
        formData.append("documents", picture[j]);
      }
      // formData.append('name', file.name);
      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url =
        `${apiKey}api/seller/updatedocuments/${checkuserphoto}`;
      axios
        .post(url, formData, confiq)
        .then((response) => {

          toast.success("Upload sucessful.");
          // navigate("/products/digital/digital-product-list")
          setuploaded(false);
          setarrfile([]);

          setPicture([]);
          // selleravalibility(userid);
        })
        .catch((e) => {
          // toast.success('Upload sucessfusssl.')
          // setErrors(e.response.data.error);

        });
    } else {
      toast.error("Upload Please");
    }
  };
  const handlesubmitphoto2 = (e) => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    // const iddata = d.tokenData.email;
    const userid = d.tokenData.id;


    e.preventDefault();

    if (picture.length >= 1) {
      const formData = new FormData();
      formData.append("termcondition", "accepted");
      formData.append("userId", userids);
      for (let j = 0; j < picture.length; j++) {
        formData.append("documents", picture[j]);
      }
      // formData.append('name', file.name);
      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `${apiKey}api/seller/createseller/`;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          // response.json()

          toast.success("Upload sucessful.");
          getsellerstatus(userid);
          setthankmessage(false)
          //  setPicture([]);
          // navigate("/products/digital/digital-product-list")
        })
        .catch((e) => {
          // setErrors(e.response.data.error);

        });
    } else {
      toast.error("Upload Please");
    }
  };

  return (
    <>
      <div className="rightpannel">
        <div className="alerts">
          <ToastContainer />
        </div>
        <div className="rightpannel_wrapper">
          <div className="seller">
            <h3 className="sellername">Seller Central</h3>
            <p className="sellerdescription">Welcome to seller panel</p>
          </div>

          {loaders ? (
            <div class="loader loader1"></div>
          ) : (

            <div className="cards">
              <div className=" cardss card1">
                <div className="seller-verify">
                  <h4 className="verification">Seller Approval Status</h4>
                  <div className="rightinformation">
                    {/* <h4 className="status">Status</h4>
                                    <h4 className="approve">Approved</h4> */}
                  </div>
                </div>
                <div className="main-content">
                  <div className={sellerstatus ? "checkicon" : "uncheckicon"}>
                    {sellerverifystatus ? (
                      <>{sellerstatus ? <CheckCircleIcon /> : <CancelIcon />}</>
                    ) : (
                      <CheckCircleIcon />
                    )}
                  </div>

                  <div className="benefits">
                    {sellerverifystatus ? (
                      <>
                        {sellerstatus ? (
                          <h5 className="authorize">
                            You are <span className="approve">authorized</span>{" "}
                            as a seller.
                          </h5>
                        ) : (
                          <h5 className="authorize">
                            You are{" "}
                            <span className="unapprove">unauthorized</span> as a
                            seller.
                          </h5>
                        )}
                      </>
                    ) : (
                      <h5 className="authorize">
                        You are <span className="approve">authorized</span> as a
                        seller.
                      </h5>
                    )}
                    <div className="benift">
                      <div className="benefiticon">
                        {sellerverifystatus ? (
                          <>{sellerstatus ? <CheckIcon /> : ""}</>
                        ) : (
                          <CheckIcon />
                        )}
                      </div>
                      <div className="benefitdescription">
                        {sellerverifystatus ? (
                          <>
                            {sellerstatus ? (
                              <>
                                <p>No limit of selling</p>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            <p>No limit of selling</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="benift">
                      <div className="benefiticon">
                        {sellerverifystatus ? (
                          <>{sellerstatus ? <CheckIcon /> : ""}</>
                        ) : (
                          <CheckIcon />
                        )}
                      </div>
                      <div className="benefitdescription">
                        {sellerverifystatus ? (
                          <>
                            {sellerstatus ? (
                              <>
                                <p>No limit of selling</p>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            <p>No limit of selling</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {sellerverifystatus ? (
                <>
                  {selleravaliable ? (
                    <>
                      {sellerstatus ? (
                        <>
                          <div className="allcard">
                            <div className=" cardss card2">
                              <div className="earn">
                                <h4 className="earntitle">Earning</h4>
                                <div class="donut-chart">
                                  <div
                                    id="part1"
                                    class="portion-block"
                                    style={change}
                                  >
                                    <div class="circle"></div>
                                  </div>
                                  <div id="part2" class="portion-block">
                                    <div class="circle"></div>
                                  </div>
                                  <div id="part3" class="portion-block">
                                    <div class="circle"></div>
                                  </div>
                                  <p class="center">
                                    <div className="walletbalance">
                                      <div className="balanceicon">
                                        <AccountBalanceWalletOutlinedIcon />
                                      </div>
                                      <p className="money">$12,560.30</p>
                                      <p className="balancename">Balance</p>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className=" cardss card3">
                              <div className="card3head">
                                <h4 className="statics">Statics</h4>
                                <div className="calender">
                                  <div
                                    className="calendericon"
                                    onMouseOver={changedate}
                                    onMouseLeave={hidecalender}
                                  >
                                    <DateRangeIcon />
                                    <Calendar
                                      onChange={onChange}
                                      value={value}
                                      className={showCalendar ? "" : "hide"}
                                      onClickMonth={(values) => {

                                      }}
                                    />
                                  </div>
                                  <span className="days" >
                                    <select name="select" id="selected" style={{ width: '7rem' }}>
                                      <option value="30">Last 30 days</option>
                                      <option value="60">Last 60 days</option>
                                      <option value="90">Last 90 days</option>
                                    </select>
                                  </span>
                                </div>
                              </div>
                              <div className="staticdetails">
                                <div className="orderdetail">
                                  <div className="ordericon">
                                    <ListAltIcon />
                                  </div>
                                  <div className="purchasedetail">
                                    <h3 className="ordername">Order</h3>
                                    <h4 className="orderqty">134</h4>
                                  </div>
                                </div>
                                <div className="orderdetail">
                                  <div className="ordericon">
                                    <LocalAtmIcon />
                                  </div>
                                  <div className="purchasedetail">
                                    <h3 className="ordername">Revenue</h3>
                                    <h4 className="orderqty">$3460.00</h4>
                                  </div>
                                </div>
                                <div className="orderdetail">
                                  <div className="ordericon">
                                    <ListAltIcon />
                                  </div>
                                  <div className="purchasedetail">
                                    <h3 className="ordername">Earning</h3>
                                    <h4 className="orderqty">$1750.00</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="attention">
                            <div className="innerattention">
                              <h3 className="attentiontitle">
                                {alert ? "Alert" : "Attention"}
                              </h3>
                              <div className="attentionicon">
                                {alert ? (
                                  <HelpOutlineIcon />
                                ) : (
                                  <ErrorOutlineIcon />
                                )}
                              </div>
                              <div className="attentiontext">
                                {alert ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: Sellerdetail.alerttextarea,
                                    }}
                                  />
                                ) : (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: Sellerdetail.attentiontextarea,
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="documentverify">
                            <div className="innerverify">
                              <div className="requiredbtn">
                                <button className="reqbtn">
                                  Required Documents
                                </button>
                              </div>

                              <div className="idcard">
                                <p className="documenttitle">
                                  {Sellerdetail.documenttext}
                                </p>
                                <div className="idcardwrapper">
                                  <div className="uploadbtns">
                                    <div className="submitphotos">
                                      <div className="uploadsellerbtn">
                                        <label className="upload-documnet">
                                          <input
                                            type="file"
                                            onChange={(e) => onchangepicture(e)}
                                            name="file"
                                            multiple
                                          />
                                          <p className="upload-text">Upload</p>
                                        </label>
                                      </div>
                                      <div className="photocheckseller">
                                        {uploaded ? <CheckIcon /> : ""}
                                      </div>
                                      <div className="filecheckbtnseller">
                                        {arrfile.length > 1 ? (
                                          <p className="photonamess">
                                            {
                                              `${arrfile[0]}, ${arrfile[1]}, ...`
                                            }
                                          </p>
                                        ) : (
                                          <p className="photonamess">{arrfile}</p>
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <div className="sumbitbutton">
                                <button
                                  className="button submitbtn"
                                  onClick={handlesubmitphoto}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="attention">
                        <div className="innerattention">
                          <h3 className="attentiontitle">Attention</h3>
                          <div className="attentionicon">
                            <ErrorOutlineIcon />
                          </div>
                          <div className="attentiontext">
                            {Sellerdefaultdetail.attentiontextarea}
                          </div>
                        </div>
                      </div>
                      <div className="documentverify">
                        <div className="innerverify">
                          {
                            thanksmessgae ? (
                              <>
                                <div className="requiredbtn">
                                  <button className="reqbtn">
                                    Required Documents
                                  </button>
                                </div>

                                <div className="idcard">
                                  <p className="documenttitle">
                                    {Sellerdefaultdetail.documenttext}
                                  </p>
                                  <div className="idcardwrapper">
                                    <div className="uploadbtns">
                                      <div className="submitphotos">
                                        <div className="uploadsellerbtn">
                                          <label className="upload-documnet">
                                            <input
                                              type="file"
                                              onChange={(e) => onchangepicture(e)}
                                              name="file"
                                              multiple
                                            />
                                            <p className="upload-text">Upload</p>
                                          </label>
                                        </div>
                                        <div className="photocheckseller">
                                          {uploaded ? <CheckIcon /> : ""}
                                        </div>
                                        <div className="filecheckbtnseller">
                                          {arrfile.length > 1 ? (
                                            <p className="photonamess">
                                              {
                                                `${arrfile[0]}, ${arrfile[1]}, ...`
                                              }
                                            </p>
                                          ) : (
                                            <p className="photonamess">{arrfile}</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="sumbitbutton">
                                  <button
                                    className="button submitbtn"
                                    onClick={handlesubmitphoto2}
                                  >
                                    Sumbit
                                  </button>
                                </div>
                              </>
                            ) : (
                            <div className="thanksmsg">
                              <span className="thanksinnermsg">
                                Thanks for sumbit documents.We will Update Soon.
                              </span>
                            </div>
                            )

                  }
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="allcard">
                  <div className=" cardss card2">
                    <div className="earn">
                      <h4 className="earntitle">Earning</h4>
                      <div class="donut-chart">
                        <div id="part1" class="portion-block" style={change}>
                          <div class="circle"></div>
                        </div>
                        <div id="part2" class="portion-block">
                          <div class="circle"></div>
                        </div>
                        <div id="part3" class="portion-block">
                          <div class="circle"></div>
                        </div>
                        <p class="center">
                          <div className="walletbalance">
                            <div className="balanceicon">
                              <AccountBalanceWalletOutlinedIcon />
                            </div>
                            <p className="money">$12,560.30</p>
                            <p className="balancename">Balance</p>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" cardss card3">
                    <div className="card3head">
                      <h4 className="statics">Statics</h4>
                      <div className="calender">
                        <div
                          className="calendericon"
                          onMouseOver={changedate}
                          onMouseLeave={hidecalender}
                        >
                          <DateRangeIcon />
                          <Calendar
                            onChange={onChange}
                            value={value}
                            className={showCalendar ? "" : "hide"}
                            onClickMonth={(values) => {

                            }}
                          />
                        </div>
                        <span className="days">
                          <select name="select" id="selected">
                            <option value="30">Last 30 days</option>
                            <option value="60">Last 60 days</option>
                            <option value="90">Last 90 days</option>
                          </select>
                        </span>
                      </div>
                    </div>
                    <div className="staticdetails">
                      <div className="orderdetail">
                        <div className="ordericon">
                          <ListAltIcon />
                        </div>
                        <div className="purchasedetail">
                          <h3 className="ordername">Order</h3>
                          <h4 className="orderqty">134</h4>
                        </div>
                      </div>
                      <div className="orderdetail">
                        <div className="ordericon">
                          <LocalAtmIcon />
                        </div>
                        <div className="purchasedetail">
                          <h3 className="ordername">Revenue</h3>
                          <h4 className="orderqty">$3460.00</h4>
                        </div>
                      </div>
                      <div className="orderdetail">
                        <div className="ordericon">
                          <ListAltIcon />
                        </div>
                        <div className="purchasedetail">
                          <h3 className="ordername">Earning</h3>
                          <h4 className="orderqty">$1750.00</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          )}
        </div>
      </div>
    </>
  );
};

export default index;
