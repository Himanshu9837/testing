import React, { useEffect, useState } from "react";
import Dashboard from "../../../components/molecule/Dashboard";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import RecommendIcon from "@mui/icons-material/Recommend";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Navbar from "../../../components/molecule/Navbar2/Navbarhome";
import Footer from "../../../components/molecule/Footer/footer";
import { useRouter } from "next/router";

export default function details() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [timer, settimer] = useState("0");
  const [timer2, settimer2] = useState("0");
  const [timeend, settimeend] = useState(false);
  const [Id, setIds] = useState("");
  const router = useRouter();
  const [status, checkstatus] = useState([]);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [specialnote, setspecialnote] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [ordersId, setOrdersId] = useState("");

  function Idget() {
    if (router.isReady) {
      const id2 = router.query.details;

      setIds(id2);
      CheckData(id2);
    }
  }

  const Confirmorder =(e) => {
      e.preventDefault()
    fetch(`${apiKey}api/order/confirm_by_seller/${Id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {});
    CheckData(Id);
  }

  const CheckData =(id) => {
    fetch(`${apiKey}api/order/editorder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        checkstatus(data.result[0]);

        setSellerId(data.result[0].selerId);
        setOrdersId(data.result[0]._id);
      });
  }

  useEffect(() => {
    Timer();
    Idget();
  }, [router.isReady]);

  const sumbitHandle = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      specialnote: specialnote,
    };
    fetch(`${apiKey}api/order/details_by_seller/${Id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {});
    CheckData(Id);

  };

  const reating = (e) => {
    e.preventDefault();

    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      const data = {
        sellerId: sellerId,
        userId: cart_data,
        orderId: ordersId,
        rating: "like",
      };
      fetch(`${apiKey}api/rating/addbuyerrating/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {});
      fetch(`${apiKey}api/order/order_buyer_rating/${Id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      CheckData(Id);
    }
  };
  const reatingdis = (e) => {
    e.preventDefault();
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      const data = {
        sellerId: sellerId,
        userId: cart_data,
        orderId: ordersId,
        rating: "dislike",
      };
      fetch(`${apiKey}api/rating/addbuyerrating/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {});

      fetch(`${apiKey}api/order/order_buyer_rating/${Id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      CheckData(Id);
    }
  };

  const Timer = () => {
    var timeSecond = 5;
    const countDown = setInterval(() => {
      timeSecond--;

      displayTime(timeSecond);
      if (timeSecond == 0 || timeSecond < 1) {
        endCount();
        clearInterval(countDown);
      }
    }, 1000);
  };
  function endCount() {
    settimeend(true);
  }

  function displayTime(second) {
    const min = Math.floor(second / 60);

    settimer(min);
    const sec = Math.floor(second % 60);
    settimer2(sec);
  }
  return (
    <>
      <div className="mainview">
        <Navbar />
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="rightpannel">
            <div className="rightpannel_wrapper">
              <h2 className="detailhead">Product details</h2>
              <div className="orderdetail">
                <div className="allbtns">
                  <div className="startbtndiv">
                    <button className="btnss statusbtn">Status</button>
                  </div>
                  <div className="descbtndiv">
                    <button className="btnss descbtn">Description</button>
                  </div>
                </div>

                <div className="statusboxes">
                  {
                    <div className="statusstage">
                      <div className="status svg">
                        {status.confirm_by_seller ? (
                          <CheckCircleOutlinedIcon />
                        ) : (
                          <RadioButtonCheckedOutlinedIcon />
                        )}

                        <div className="process">
                          {status.confirm_by_seller ? (
                            <img src='/images/Dropline.png' alt="Not-found" width={30} height={60} />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="status">
                        <h5 className="statusdesc">Pending</h5>
                      </div>
                      <div className="alertstatusmessage">
                        {status.confirm_by_seller ? (
                          ""
                        ) : (
                          <img src='/images/alert.png' alt="Not-found" width={60} height={60} />
                        )}
                      </div>
                      <div className="status svg">
                        {status.confirm_by_seller ? (
                          status.details_by_seller ? (
                            <CheckCircleOutlinedIcon />
                          ) : (
                            <RadioButtonCheckedOutlinedIcon />
                          )
                        ) : (
                          <CircleOutlinedIcon />
                        )}

                        <div className="process">
                          {status.details_by_seller ? (
                            <img src='/images/Dropline.png' alt="Not-found" width={30} height={60}  />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="status">
                        <h5 className="statusdesc">Processing</h5>
                      </div>
                      <div className="alertstatusmessage">
                        {status.details_by_seller ? (
                          ""
                        ) : status.confirm_by_seller ? (
                          <img src='/images/alert.png' alt="Not-found" width={60} height={60}  />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="status svg">
                        {status.details_by_seller ? (
                          status.buyer_confirm ? (
                            <CheckCircleOutlinedIcon />
                          ) : (
                            <RadioButtonCheckedOutlinedIcon />
                          )
                        ) : (
                          <CircleOutlinedIcon />
                        )}
                        <div className="process">
                          {status.buyer_confirm ? (
                            <img src='/images/Dropline.png' alt="Not-found" width={30} height={60}  />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="status">
                        <h5 className="statusdesc">Delivered</h5>
                      </div>
                      <div className="alertstatusmessage">
                        {status.buyer_confirm ? (
                          ""
                        ) : status.details_by_seller ? (
                          <img src='/images/alert.png' alt="Not-found" width={60} height={60}  />
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="status svg">
                        {status.buyer_confirm ? (
                          <RadioButtonCheckedOutlinedIcon />
                        ) : (
                          <CircleOutlinedIcon />
                        )}
                      </div>
                      <div className="status">
                        <h5 className="statusdesc">Completed</h5>
                      </div>
                      <div className="alertstatusmessage">
                        {status.buyer_confirm ? (
                          <img src='/images/alert.png' alt="Not-found" width={60} height={60}  />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  }

                  <div className="statusbox">
                    {status.details_by_seller ? (
                      <div className="innerboxstatus">
                        <div className="innerstatusdetail">
                          <h1 className="hii  confirmedorder">
                            See you around.
                          </h1>
                          <span className="ordercompleted">
                            Your order has been completed.
                          </span>
                          <h6 className="likepara">Did you like the order?</h6>
                          {status.isbuyerrating ? (
                            <h1>Thank you</h1>
                          ) : (
                            <div className="followup">
                              <div
                                className="likebtn"
                                onClick={(e) => reating(e)}
                              >
                                <RecommendIcon />
                              </div>
                              <div
                                className="dislikebtn"
                                onClick={(e) => reatingdis(e)}
                              >
                                <ThumbDownAltIcon />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="innerboxstatus ">
                        <div className="innerstatusdetail">
                          <div className="seller-detailsdesc">
                            <h4 className="reqdetail">
                              The Seller have just delivered the required
                              detail.
                            </h4>
                            <p className="requestcustomer">
                              Your request to make sure that are correct.
                            </p>
                          </div>
                          <div className="user-box">
                            {status.confirm_by_seller ? (
                              <>
                                <div className="onebox">
                                  <form action="post">
                                    <div className="userorders">
                                      <label
                                        htmlFor="detail1"
                                        className="detail1"
                                      >
                                        Username
                                      </label>
                                      <input
                                        type="text"
                                        id="detail1"
                                        className="userorderdetail"
                                        onChange={(e) => {
                                          setusername(e.target.value);
                                        }}
                                        required
                                      />
                                    </div>
                                    <div className="userorders">
                                      <label
                                        htmlFor="detail1"
                                        className="detail1"
                                      >
                                        Register Email
                                      </label>
                                      <input
                                        type="email"
                                        id="detail1"
                                        className="userorderdetail"
                                        onChange={(e) => {
                                          setemail(e.target.value);
                                        }}
                                        required
                                      />
                                    </div>
                                    <div className="userorders">
                                      <label
                                        htmlFor="detail1"
                                        className="detail1"
                                      >
                                        Password
                                      </label>
                                      <input
                                        type="email"
                                        id="detail1"
                                        className="userorderdetail"
                                        onChange={(e) => {
                                          setpassword(e.target.value);
                                        }}
                                        required
                                      />
                                    </div>
                                  </form>
                                </div>
                                <div className="twobox">
                                  <label htmlFor="users">
                                    Special note for you
                                  </label>
                                  <textarea
                                    name=""
                                    id="users"
                                    className="usersuggestion"
                                    maxlength="250"
                                    onChange={(e) => {
                                      setspecialnote(e.target.value);
                                    }}
                                    required
                                  ></textarea>
                                </div>
                              </>
                            ) : (
                              ""
                            )}

                            {status.confirm_by_seller ? (
                              ""
                            ) : (
                              <div className="threebox">
                                <p className="confirmdilvery">
                                  You have{" "}
                                  <span className="hour">new Order.</span>
                                </p>

                                <div className="confirmdesc">
                                  <button
                                    className="confirmbutton"
                                    onClick={(e)=> Confirmorder(e)}
                                  >
                                    Confirm
                                  </button>
                                  <p className="para">
                                    Automatically completed after 24 hours
                                  </p>
                                </div>
                              </div>
                            )}

                            {status.confirm_by_seller ? (
                              <div className="submitsellerdetail">
                                <button
                                  className="confirmbutton savesellerbtn"
                                  onClick={(e) => sumbitHandle(e)}
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
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
