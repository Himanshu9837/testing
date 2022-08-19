
import React, { useEffect, useRef, useState } from "react";
import Dashboard from "../../../components/molecule/Dashboard";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import dropline from "../../../public/images/Dropline.png";
import alert from "../../../public/images/alert.png";
import Image from "next/image";
import RecommendIcon from "@mui/icons-material/Recommend";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Navbar from "../../../components/molecule/Navbar2/Navbarhome";
import Footer from "../../../components/molecule/Footer/footer";
import { useRouter } from "next/router";
import axios from "axios";

export default function PurchaseDetail() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [Id, setIds] = useState("");
  const router = useRouter();
  const [status, checkstatus] = useState([]);
  const [timer, setTimer] = useState("00:00:00");
  const [details, setdetails] = useState();
  const [sellerId, setSellerId] = useState("");
  const [ordersId, setOrdersId] = useState("");

  const Completebuyer=(e)=> {
    e.preventDefault();
    fetch(`${apiKey}api/order/complete_by_buyer/${Id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {

      });
    CheckData(Id);
  }


  const Ref = useRef(null);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);

    const minutes = Math.floor((total / 1000 / 60) % 60);

    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);

    if (total >= 0) {

      setTimer(
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const clearTimer = (e) => {

    setTimer("00:00:10");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
      if (timer <= 0) {
        clearInterval(startTimer(e));
      }
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };
  useEffect(() => {

    clearTimer(getDeadTime());
  }, [Id, details]);



  function Idget() {
    if (router.isReady) {
      const id2 = router.query.purchasedetail;
      setIds(id2);
      CheckData(id2);
    }
  }


  function notwork() {
    fetch(`${apiKey}api/order/notworking/${Id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {

      });
    CheckData(Id);
  }

  const reating = (e) => {
    e.preventDefault();
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    const data = {
      sellerId: sellerId,
      userId: cart_data,
      orderId: ordersId,
      rating: "like",
    };
    fetch(`${apiKey}api/rating/addrating/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
      });
    fetch(`${apiKey}api/order/order_seller_rating/${Id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },

    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        CheckData(Id)
      });
  }
  const reatingdis=(e)=> {
    e.preventDefault()
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    const data = {
      sellerId: sellerId,
      userId: cart_data,
      orderId: ordersId,
      rating: "dislike",
    };
    fetch(`${apiKey}api/rating/addrating/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
      });
    fetch(`${apiKey}api/order/order_seller_rating/${Id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },

    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    CheckData(Id);
  }

  function CheckData(id) {
    // alert(id)
    console.log(id);
    console.log('hii');

    fetch(`${apiKey}api/order/editorder/${id}`)
      .then((res) => res.json())
      .then((data) => {

        checkstatus(data.result[0]);

        setdetails(data.result[0].details_by_seller);
        setSellerId(data.result[0].selerId);
        setOrdersId(data.result[0]._id);
      });
  }

  useEffect(() => {

    Idget();
    setInterval(() => {
      CheckData(Id);
    }, 60000);


  }, [
    router.isReady,
    Id,

  ]);
  return (
    <>
      <div className="mainview">
        <Navbar />
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="rightpannel">
            <div className="rightpannel_wrapper">
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
                            <img src="/images/Dropline.png" alt="Not-found" width={30} height={60} />
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
                            <img src="/images/Dropline.png" alt="Not-found" width={30} height={60} />
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
                          <img src='/images/alert.png' alt="Not-found" width={60} height={60} />
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
                          {status.details_by_seller ? (
                            <img src="/images/Dropline.png" alt="Not-found" width={30} height={60} />
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
                          <img src='/images/alert.png' alt="Not-found" width={60} height={60} />
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
                          <img src='/images/alert.png' alt="Not-found" width={60} height={60} />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  }

                  <div className="statusbox">
                    <div className="innerboxstatus">
                      {status.confirm_by_seller ? (
                        status.details_by_seller ? (
                          ""
                        ) : (
                          <div className="innerstatusdetail">
                            <h1 className="hii">Hi,</h1>
                            <p className="message">
                            Thank you for your order. Your order is being processed and will be delivered to you  in the next 24 Hrs
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="innerstatusdetail">
                          <h1 className="hii">Hello user!</h1>
                          <p className="message">Your order is yet to be confirmed by the seller. Kindly wait for the confirmation and check the order status again after 24Hrs</p>
                          <p className="Ordermessage">Your order number is</p>
                          <h3 className="ordernumber">{status.id}</h3>
                          <p className="lastmessage">
                          Thank you
                          </p>
                        </div>
                      )}

                      {
                        <>

                          {status.details_by_seller ? (
                            status.buyer_confirm ? (
                              <div className="innerstatusdetail">
                                <h1 className="hii  confirmedorder">
                                  See you around.
                                </h1>
                                <span className="ordercompleted">
                                  Your order has been completed.
                                </span>
                                <h6 className="likepara">
                                  Did you like the order?
                                </h6>
                                {
                                  status.issellerrating ? (
                                    <h1>thank you</h1>
                                  ) : (
                                    <div className="followup">
                                      <div className="likebtn" onClick={(e) => reating(e)}>
                                        <RecommendIcon />
                                      </div>
                                      <div className="dislikebtn" onClick={(e)=>reatingdis(e)}>
                                        <ThumbDownAltIcon />
                                      </div>
                                    </div>

                                  )
                                }

                              </div>
                            ) : (
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
                                          value={status.account_username}
                                          disabled
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
                                          value={status.account_email}
                                          disabled
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
                                          value={status.account_password}
                                          disabled
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
                                      value={status.account_specialnote}
                                      disabled
                                      required
                                    ></textarea>
                                  </div>


                                  <div className="clocks">
                                    <p className="timer">{timer}</p>
                                    <button
                                      className="confirmbutton"
                                      onClick={(e)=>{Completebuyer(e)}}
                                    >
                                      Confirm

                                    </button>
                                  </div>
                                  <div className="confirmdesc notworking">
                                    <p className="para">
                                      Automatically completed after 24 hours
                                    </p>
                                    <button
                                      className="confirmbutton notworkbtn"
                                      onClick={notwork}
                                    >
                                      Not Working
                                    </button>
                                    <p className="para">
                                      If given detail not working
                                    </p>
                                  </div>

                                </div>
                              </div>
                            )
                          ) : (
                            ""
                          )}
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getInitialProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}