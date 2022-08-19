import React, { useState, useEffect } from "react";
import Navbar from "../../../components/molecule/dashboardheader";
import Dashboard from "../../../components/molecule/newdashboardleft";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/router";

export default function PurchasedetailsUser() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [showdatas, seShowdatas] = useState([]);
  const [processing, setProsessing] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [complete, setComplete] = useState(false);
  const [status, checkstatus] = useState([]);
  const [rating, setRating] = useState("");
  const [id, setId] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [specialnote, setspecialnote] = useState("");

  const channge = () => {
    setOpen(!open);
  };
  function CheckData(id) {
    // alert(id)
    console.log(id);
    console.log("hii");

    fetch(`${apiKey}api/order/editorder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        seShowdatas(data.result);
        checkstatus(data.result[0]);
        setProsessing(data.result[0].confirm_by_seller);
        setDelivered(data.result[0].details_by_seller);
        setComplete(data.result[0].buyer_confirm);
        setId(data.result[0]._id);
      });
  }
  console.log(showdatas);
  useEffect(() => {
    if (router.isReady) {
      const id2 = router.query.myorder;
      CheckData(id2);
      ratintshow(id2);
    }
  }, [router.isReady]);

  function vieworder() {
    if (router.isReady) {
      const id2 = router.query.myorder;
      fetch(`${apiKey}api/order/view_by_seller/${id2}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
        CheckData(id2);

    }
  }
  const sumbitHandle = (e) => {
    e.preventDefault();
    if (router.isReady) {
        const id2 = router.query.myorder;
    const data = {
      username: username,
      email: email,
      password: password,
      specialnote: specialnote,
    };
    fetch(`${apiKey}api/order/details_by_seller/${id2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {});
      CheckData(id2)
    }
  };
  function cancle() {
    if (router.isReady) {
      const id2 = router.query.myorder;
      fetch(`${apiKey}api/order/sellercancleorder/${id2}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
        CheckData(id2)
    }
  }
  function ratintshow(id2) {
    //   if (status.buyer_confirm === "true") {
    fetch(`${apiKey}api/rating/orderreating/${id2}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRating(data);
      });
      CheckData(id2)
    //   }
  }

  return (
    <>
      <div className="mainview">
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="purch_detail">
          <Navbar />
            <div>
              <h2 className="purchase_text">ORDER ID {id}</h2>
            </div>
            <div className="check_condition_style">
              <div className="check_condition_style_patition">
                <div className="panding_condition_style_detail">
                  <div className="details_circle_style">
                    {status.details_by_seller ? (
                      <img
                        src="/static/images/tickdone.png"
                        className="tickdone_style"
                      />
                    ) : (
                      <p className="first_stage_style">1</p>
                    )}
                  </div>
                  {status.view_by_seller ? (
                    <>
                      <div className="panding_condition_check">
                        <p className="panding_text">DELIVERING</p>
                      </div>
                      <div className="panding_condition_check">
                        <p className="placed">You got a new order</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="panding_condition_check">
                        <p className="panding_text">PROCESSING</p>
                      </div>
                      <div className="panding_condition_check">
                        <p className="placed">You got a new order</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="dot_deatil_style">- - - - - - - -</div>
                <div className="panding_condition_style_detail">
                  <div className="details_circle_style">
                    {status.buyer_confirm ? (
                      <img
                        src="/static/images/tickdone.png"
                        className="tickdone_style"
                      />
                    ) : (
                      <p className="first_stage_style">2</p>
                    )}
                  </div>
                  {status.details_by_seller ? (
                    <>
                      <div className="panding_condition_check">
                        <p className="panding_text">DELIVERED</p>
                      </div>
                      <div className="panding_condition_check">
                        <p className="placed">Processing the order</p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="dot_deatil_style">- - - - - - - -</div>
                <div className="panding_condition_style_detail">
                  <div className="details_circle_style">
                    <p className="first_stage_style">3</p>
                  </div>
                  {status.buyer_confirm ? (
                    <>
                      <div className="panding_condition_check">
                        <p className="panding_text">COMPLETED</p>
                      </div>
                      <div className="panding_condition_check">
                        <p className="placed">Order has been completed</p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {status.confirm_by_seller ? (
              status.view_by_seller ? (
                ""
              ) : (
                <div className="padding_details">
                  {showdatas.map((item, i) => (
                    <>
                      <div className="divided_padding_style1">
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
                          <p className="product_name_styel">BUYER</p>
                          <img
                            src={item.userId.image}
                            className="seller_img_show"
                          />
                        </div>
                        <div>
                          <p className="product_name_styel">QTY</p>
                          <p className="color_style_product">{item.quantity}</p>
                        </div>
                        <div>
                          <p className="product_name_styel">TOTAL AMOUNT</p>
                          <p className="color_style_product">
                            {item.productId.price}
                          </p>
                        </div>
                        <div>
                          <p className="product_name_styel">SERVICE FEE</p>
                          <p className="color_style_product">
                            {item.paymentfee}
                          </p>
                        </div>
                        <div>
                          <p className="product_name_styel">REVENUE</p>
                          <p className="color_style_product">
                            {item.productId.price + item.paymentfee}
                          </p>
                        </div>
                      </div>
                      <div className="center_image_product">
                        <div className="buyer">
                          <button
                            type="button"
                            className="buyer_cancle_order"
                            onClick={channge}
                          >
                            CANCLE ORDER
                          </button>
                          <button
                            type="button"
                            className="buyer_proceed_order"
                            onClick={vieworder}
                          >
                            PROCEED
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                  {open ? (
                    <div className="cancle_confarm_style">
                      <p className="cancle_order_parmition">
                        Are you sure to cancle the order
                      </p>
                      <div>
                        <div className="buyer">
                          <button
                            type="button"
                            className="buyer_cancle_order"
                            onClick={cancle}
                          >
                            YES
                          </button>
                          <button
                            type="button"
                            className="buyer_proceed_order"
                            onClick={channge}
                          >
                            NO
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )
            ) : (
              ""
            )}
            {status.view_by_seller ? (
              status.details_by_seller ? (
                ""
              ) : (
                <div className="padding_details">
                  <div className="hide_or_show_style">
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
                        <input className="input_style_modal" type="text"
                        onChange={(e) => {
                            setusername(e.target.value);
                          }}
                        />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">Password</p>
                        <input className="input_style_modal" type="Password" 
                        onChange={(e) => {
                            setpassword(e.target.value);
                          }}
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
                        <input className="input_style_modal" type="text"
                        onChange={(e) => {
                            setemail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">Password</p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Country of Residence
                        </p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">Full Name</p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Date of Birth
                        </p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Secret Question
                        </p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Secret Answer
                        </p>
                        <input className="input_style_modal" type="text" />
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
                        <input className="input_style_modal" type="text"
                        onChange={(e) => {
                            setspecialnote(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="update_buyer_button">
                      <button type="button" className="buyer_cancle_order" onClick={sumbitHandle}>
                        UPDATE DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              ""
            )}

            {status.details_by_seller ? (
              status.buyer_confirm ? (
                ""
              ) : (
                <div className="padding_details">
                  <div className="hide_or_show_style">
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
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">Password</p>
                        <input className="input_style_modal" type="Password" />
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
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">Password</p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Country of Residence
                        </p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">Full Name</p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Date of Birth
                        </p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Secret Question
                        </p>
                        <input className="input_style_modal" type="text" />
                      </div>
                      <div className="user_name_account_style_check">
                        <p className="username_account_text_color">
                          Secret Answer
                        </p>
                        <input className="input_style_modal" type="text" />
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
                        <input className="input_style_modal" type="text" />
                      </div>
                    </div>
                    <div className="update_buyer_button">
                      <button type="button" className="buyer_cancle_order">
                        UPDATE DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              ""
            )}
            {status.buyer_confirm ? (
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
                  <p className="like_the_order1">
                    Buyer left
                    <span>
                      {rating === "like" && (
                        <div className="done_icon_style_overlap_d">
                          <img
                            src="/static/images/thumbsup.png"
                            className="thumbs_icon_style1"
                          />
                        </div>
                      )}
                      {rating === "dislike" && (
                        <div className="done_icon_style_overlap1_n">
                          <img
                            src="/static/images/dislike.png"
                            className="thumbs_icon_style1"
                          />
                        </div>
                      )}
                    </span>
                    for your order
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
