import React, { useState, useEffect } from "react";
import Navbar from "../../../components/molecule/dashboardheader";
import Dashboard from "../../../components/molecule/newdashboardleft";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/router";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
export default function PurchasedetailsUser() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [showdata, seShowdata] = useState([]);
  const [processing, setProsessing] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [complete, setComplete] = useState(false);
  const [status, checkstatus] = useState([]);
  const [sellerId, setSellerId] = useState("");
  const [ordersId, setOrdersId] = useState("");
  const [checkedone, setCheckedone] = useState(false);
  const [checkedtwo, setCheckedtwo] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [specialnote, setspecialnote] = useState("");
  const [dob, setDob] = useState("");
  const [fullname, setFullname] = useState("");
  const [secretquestion, setSecretquestion] = useState("");
  const [secretanswer, setSecretanswer] = useState("");
  const [country, setCountry] = useState("");

  const channge = () => {
    setOpen(!open);
  };
  const channge1 = () => {
    setOpen1(!open1);
  };
  function CheckData(id) {
    // alert(id)
    console.log(id);
    console.log("hii");

    fetch(`${apiKey}api/order/editorder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        seShowdata(data.result);
        checkstatus(data.result[0]);
        setProsessing(data.result[0].confirm_by_seller);
        setDelivered(data.result[0].details_by_seller);
        setComplete(data.result[0].buyer_confirm);
        setSellerId(data.result[0].selerId);
        setOrdersId(data.result[0]._id);
      });
  }
  useEffect(() => {
    if (router.isReady) {
      const id2 = router.query.purchasedetailsuser;
      CheckData(id2);
    }
  }, [router.isReady]);

  const Completebuyer = (e) => {
    e.preventDefault();
    if (router.isReady) {
      const id2 = router.query.purchasedetailsuser;
      fetch(`${apiKey}api/order/complete_by_buyer/${id2}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {});

      CheckData(id2);
      channge1();
    }
  };

  const reating = (e) => {
    e.preventDefault();
    if (router.isReady) {
      const id2 = router.query.purchasedetailsuser;
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {});
      fetch(`${apiKey}api/order/order_seller_rating/${id2}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      CheckData(id2);
    }
  };
  const reatingdis = (e) => {
    e.preventDefault();
    if (router.isReady) {
      const id2 = router.query.purchasedetailsuser;
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {});
      fetch(`${apiKey}api/order/order_seller_rating/${id2}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      CheckData(id2);
    }
  };

  function cancle() {
    if (router.isReady) {
      const id2 = router.query.purchasedetailsuser;
      fetch(`${apiKey}api/order/buyercancleorder/${id2}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      CheckData(id2);
    }
  }
  return (
    <>
      <div className="mainview">
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="purch_detail">
            <Navbar />
            <div style={{ marginTop: "3.5rem" }}>
              <h2 className="purchase_text">PURCHASE DETAIL</h2>
            </div>
            <div className="check_condition_style">
              <div className="check_condition_style_patition">
                <div className="panding_condition_style_detail">
                  <div className="details_circle_style">
                    {processing ? (
                      <img
                        src="/static/images/tickdone.png"
                        className="tickdone_style"
                      />
                    ) : (
                      <p className="first_stage_style">1</p>
                    )}
                  </div>
                  <div className="panding_condition_check">
                    <p className="panding_text">PENDING</p>
                  </div>
                  <div className="panding_condition_check">
                    <p className="placed">Your order has been placed</p>
                  </div>
                </div>
                <div className="dot_deatil_style">- - - - - - - - -</div>
                <div className="panding_condition_style_detail">
                  <div className="details_circle_style">
                    {processing ? (
                      <img
                        src="/static/images/tickdone.png"
                        className="tickdone_style"
                      />
                    ) : (
                      <p className="first_stage_style">2</p>
                    )}
                  </div>
                  <div className="panding_condition_check">
                    <p className="panding_text">VERIFYING</p>
                  </div>
                  <div className="panding_condition_check">
                    <p className="placed">Your payment is been verified</p>
                  </div>
                </div>
                <div className="dot_deatil_style">- - - - - - - - -</div>
                <div className="panding_condition_style_detail">
                  <div className="details_circle_style">
                    {status.buyer_cancel ? (
                      <img
                        src="/static/images/tickdone.png"
                        className="tickdone_style"
                      />
                    ) : (
                      <p className="first_stage_style">3</p>
                    )}
                  </div>
                  {status.confirm_by_seller ? (
                    status.view_by_seller ? (
                      ""
                    ) : (
                      <>
                        <div className="panding_condition_check">
                          <p className="panding_text">PROCESSING</p>
                        </div>
                        <div className="panding_condition_check">
                          <p className="placed">
                            Your order has been processed
                          </p>
                        </div>
                      </>
                    )
                  ) : (
                    ""
                  )}
                  {status.details_by_seller ? (
                    status.buyer_confirm ? (
                      ""
                    ) : (
                      <>
                        <div className="panding_condition_check">
                          <p className="panding_text">DELIVERED</p>
                        </div>
                        <div className="panding_condition_check">
                          <p className="placed">
                            Your order has been delivered
                          </p>
                        </div>
                      </>
                    )
                  ) : (
                    ""
                  )}
                  {status.view_by_seller ? (
                    status.details_by_seller ? (
                      ""
                    ) : (
                      <>
                        <div className="panding_condition_check">
                          <p className="panding_text">DELIVERING</p>
                        </div>
                        <div className="panding_condition_check">
                          <p className="placed">
                            Your order has been delivering
                          </p>
                        </div>
                      </>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="dot_deatil_style">- - - - - - - - -</div>
                <div className="panding_condition_style_detail">
                  <div className="details_circle_style">
                    <p className="first_stage_style">4</p>
                  </div>
                  {complete ? (
                    <>
                      <div className="panding_condition_check">
                        <p className="panding_text">COMPLETED</p>
                      </div>
                      <div className="panding_condition_check">
                        <p className="placed">Your order has been completed</p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {status.details_by_seller ? (
                status.buyer_confirm ? (
                  ""
                ) : (
                  <div className="view_detail_style">
                    <p className="view_details_text_style" onClick={channge}>
                      View Details
                    </p>
                    <KeyboardArrowDownRoundedIcon />
                  </div>
                )
              ) : (
                ""
              )}
            </div>
            {open ? (
              <div className="modal_class">
                <div className="hide_or_show_style">
                  <div className="icon_close_style">
                    <div onClick={channge}>
                      <CloseRoundedIcon />
                    </div>
                  </div>
                  <p className="please_note_style">Please note</p>
                  <p className="number_text_style_show">
                    1. If any delivered details is not working please let the
                    seller know in the chat.
                  </p>
                  <p className="number_text_style_show">
                    2. Once the seller update the data, you have to check this
                    panel again for the updated details.
                  </p>
                  <div className="login_details_style">
                    <div className="login_details_style1">
                      <p className="login_detail_para">LOGIN DETAILS</p>
                      <div className="line_with_style"></div>
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">
                        Username / Account Id
                      </p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.account_username}
                      />
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">Password</p>
                      <input
                        className="input_style_modal"
                        type="Password"
                        value={status.productId.account_password}
                      />
                    </div>
                  </div>
                  <div className="login_details_style">
                    <div className="login_details_style1">
                      <p className="login_detail_para">ACCOUNT DETAILS</p>
                      <div className="line_with_style"></div>
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">
                        Email Address
                      </p>
                      <input
                        className="input_style_modal"
                        type="email"
                        value={status.productId.account_email}
                      />
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">Password</p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.account_password}
                      />
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">
                        Country of Residence
                      </p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.account_country}
                      />
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">Full Name</p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.account_userfullname}
                      />
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">
                        Date of Birth
                      </p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.account_dob}
                      />
                      
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">
                        Secret Question
                      </p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.secret_question}
                      />
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">
                        Secret Answer
                      </p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.secret_answer}
                      />
                    </div>
                  </div>
                  <div className="login_details_style">
                    <div className="login_details_style1">
                      <p className="login_detail_para">ADDITIONAL DETAILS</p>
                      <div className="line_with_style"></div>
                    </div>
                    <div className="user_name_account_style_check">
                      <p className="username_account_text_color">
                        Additional Note
                      </p>
                      <input
                        className="input_style_modal"
                        type="text"
                        value={status.productId.account_specialnote}
                      />
                    </div>
                  </div>
                  <div className="update_buyer_button">
                      <button type="button" className="buyer_cancle_order">
                        UPDATE
                      </button>
                    </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {status.confirm_by_seller ? (
              ""
            ) : status.details_by_seller ? (
              <>
                {showdata.map((item, i) => (
                  <div className="padding_details">
                    <div className="divided_padding_style">
                      <div>
                        <p className="product_name_styel">PRODUCT</p>
                        <div className="show_text_style">
                          <img
                            src={item.productId.images[0]}
                            className="product_image_style"
                          />
                          <p className="paratext_product">
                            {item.productId.productname}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="product_name_styel">SELLER</p>
                        <img
                          src="/static/images/angry.png"
                          className="seller_img_show"
                        />
                      </div>
                      <div>
                        <p className="product_name_styel">QTY</p>
                        <p className="color_style_product">{item.quantity}</p>
                      </div>
                      <div>
                        <p className="product_name_styel">AMOUNT</p>
                        <p className="color_style_product">
                          {item.productId.price}
                        </p>
                      </div>
                      <div>
                        <p className="product_name_styel">PAYMENT METHDOH</p>
                        <p className="color_style_product1">
                          {item.paymentmode}
                        </p>
                      </div>
                      <div>
                        <p className="product_name_styel">PROCESSING FEE</p>
                        <p className="color_style_product1">
                          {item.paymentfee}
                        </p>
                      </div>
                      <div>
                        <p className="product_name_styel">SUBTOTAL</p>
                        <p className="color_style_product">
                          {item.productId.price + item.paymentfee}
                        </p>
                      </div>
                    </div>
                    <div className="center_image_product">
                      <img
                        src="/static/images/checked_1.png"
                        width={60}
                        height={60}
                      />
                      <p className="thanku_para">Thank You</p>
                      <p className="recived_para">We recived your order</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
            {status.confirm_by_seller ? (
              ""
            ) : status.details_by_seller ? (
              <div className="padding_details">
                <div className="sandbox_style">
                  <img
                    src="/static/images/sandclock.jpg"
                    className="sand_img_style"
                  />
                  <p className="hang_style_text">HANG IN THERE!</p>
                  <p className="we_verifying_style">
                    We are verifying your payment
                  </p>
                  <p className="once_recived">
                    Once we recieve your payment, your order will be processed
                    automatically
                  </p>
                  <p className="ifnot_text_style">
                    If not after 12 hours
                    <span>let us know</span>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* {status.view_by_seller ? (
              status.details_by_seller ? (
                ""
              ) : (
                <div className="padding_details">
                  <div className="sandbox_style">
                    <img
                      src="/static/images/sandclock.jpg"
                      className="sand_img_style"
                    />
                  </div>
                </div>
              )
            ) : (
              ""
            )} */}

            {status.confirm_by_seller ? (
              status.details_by_seller ? (
                ""
              ) : (
                <div className="padding_details">
                  <div className="process_style">
                    <img
                      src="/static/images/checked_1.png"
                      className="process_img_style"
                    />
                    <p className="seller_recived_style">
                      The seller recived your order
                    </p>
                    <p className="seller_preparing">
                      Please wait while the seller is preparing your order
                    </p>
                    <p className="speed_style">
                      To speed up the delivery process, you can directly chat
                      with the seller.
                    </p>
                    <div className="seller_or_chat_style">
                      <div className="seller_icon_style_product">
                        <p className="fontsize_color">SELLER</p>
                        <div className="divided_icon_batch">
                          <img
                            src="/static/images/angry.png"
                            className="seller_detail_icon_style"
                          />
                          <div className="icon_show_seller_name">
                            <p className="seller_name_text_style_show">
                              Name seller
                            </p>
                            <div className="catch_icon_divided_style">
                              <img
                                src="/static/images/angry.png"
                                className="batch_icon_style_sellers"
                              />
                              <img
                                src="/static/images/angry.png"
                                className="batch_icon_style_sellers"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="seller_icon_style_product">
                        <p className="fontsize_color">CHAT</p>
                        <img
                          src="/static/images/chat_icon.jpg"
                          className="chat_icon_style_seller"
                        />
                      </div>
                    </div>

                    <p className="please_note_style1">Please note</p>
                    <p className="speed_style1">
                      1. If the seller does not respond and you did not get the
                      game within 12 hours,
                      <span>let us know</span>
                      or
                      <span className="cancle" onClick={cancle}>
                        cancle
                      </span>
                      the order.
                    </p>
                    <p className="speed_style1">
                      2. Once the game details and been delivered you cannot
                      cancle the order.
                    </p>
                  </div>
                </div>
              )
            ) : (
              ""
            )}
            {status.buyer_confirm ? (
              ""
            ) : status.details_by_seller ? (
              <div className="padding_details">
                <div className="process_style">
                  <img
                    src="/static/images/clap.jpg"
                    className="process_img_style"
                  />
                  <p className="game_details_delivered">
                    Game Details Delivered
                  </p>
                  <p className="delevered_detail_text">
                    Click on the
                    <span onClick={channge}>view details</span>
                    above to see the delivered details
                  </p>
                  <button
                    type="button"
                    className="complete_order_style"
                    onClick={channge1}
                  >
                    COMPLETE ORDER
                  </button>
                  <p className="please_note">Please note</p>
                  <p className="note_text">
                    1. You have 12 hours to check if everything is working or
                    not.
                  </p>
                  <p className="note_text">
                    2. After 12 hours your order will be marked as completed.
                    <span>Read your T&C.</span>
                  </p>
                  <p className="note_text">
                    3. If the seller do not respond
                    <span>contact us</span>
                    immediately.
                  </p>
                </div>
                {open1 ? (
                  <div className="likeordislike_style">
                    <div className="icon_close_style">
                      <div onClick={channge1}>
                        <CloseRoundedIcon />
                      </div>
                    </div>
                    <p className="please_note_style">Are you ready?</p>

                    <div className="give_space">
                      <div className="check_tick_box">
                        <input
                          type="checkbox"
                          checked={checkedone}
                          onChange={setCheckedone}
                        />
                        <p className="checkbox_para">
                          I checked every detail is correct and working.
                        </p>
                      </div>
                      <div className="check_tick_box">
                        <input
                          type="checkbox"
                          checked={checkedtwo}
                          onChange={setCheckedtwo}
                        />
                        <p className="checkbox_para">
                          I have ownership of the account now.
                        </p>
                      </div>
                      <p className="like_the_order">
                        How do you like the order?
                      </p>
                      <div className="icon_div_style_show_done">
                        <div
                          className="done_icon_style_overlap"
                          onClick={reating}
                        >
                          <img
                            src="/static/images/thumbsup.png"
                            className="thumbs_icon_style"
                          />
                        </div>
                        <div
                          className="done_icon_style_overlap1"
                          onClick={reatingdis}
                        >
                          <img
                            src="/static/images/dislike.png"
                            className="thumbs_icon_style"
                          />
                        </div>
                      </div>
                      <button
                        onClick={Completebuyer}
                        type="button"
                        className="buyer_proceed_order1"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {complete ? (
              <div className="padding_details">
                <div className="process_style">
                  <img
                    src="/static/images/check.png"
                    className="process_img_style"
                  />
                  <p className="well_played">WELL PLAYED, HAVE FUN</p>
                  <p className="now_complete">
                    Your order is now
                    <span>complete</span>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
