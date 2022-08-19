// import Image from 'next/image';
// import React, { useEffect } from 'react';
// import { useState } from 'react';

import Image from "next/image";
import SweetAlert from "react-bootstrap-sweetalert";
import Userpofile from "../../public/images/userprofile.jpg";
import Visa from "../../public/images/visa.svg";
import Paypalwllet from "../../public/images/bankwallet.webp";
import Paypal from "../../public/images/braintree_paypal (1).svg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Navbar from "../../components/molecule/Navbar2/Navbarhome";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
// import Pay from '../pay.js';
import React, { useContext, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import Contextapi from "../../Context/Contextapi.js";
import axios from "axios";
import Test from "./tests";
const allPostsData = Test();
const dataid = allPostsData.props.children[0];
import { ToastContainer, toast } from "react-toastify";

// import dynamic from 'next/dynamic';
// import PreDynamicState from './PreDynamicState';

// import swal from 'sweetalert';
export const config = {
  unstable_runtimeJS: false,
};

// const DynamicInnerComp = dynamic(() => import('./MyHeavyModule'), {
//     ssr: false,
//     loading: () => <PreDynamicState />
// });

export default function index() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const frontKey = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const {
    checkcurrencyslocal,
    currencys,
    currencyslocal,
    setcartnmber,
    stockss,
  } = useContext(Contextapi);

  const [card, setcard] = useState(false);
  const [card1, setcard1] = useState(false);
  const [card2, setcard2] = useState(false);
  const [card3, setcard3] = useState(false);


  const [paymentbtns, setpaymentbtns] = useState(false);
  const [continuebtn, setcotinuebtn] = useState(false);
  const [continuebtn1, setcotinuebtn1] = useState(false);
  const [continuebtn2, setcotinuebtn2] = useState(false);


  const [cart, setcart] = useState([]);
  const [count, setCount] = React.useState(0);
  const [disable, setDisable] = React.useState(true);
  const [disable1, setDisable1] = React.useState(true);

  const [setitemdata, setitempro] = useState([]);
  const [userOid, setUser] = useState();
  const [subtotalprice, setSubtotal] = useState();
  const [userid1, setiddata] = useState();
  const [alldata, setAlldata] = useState("");
  const [paymentcheck, setPaymentcheck] = useState([]);
  const [shake, setshake] = useState(false);

  const [cancels, setcancels] = useState(true);
  const [cancelsw, setcancelsw] = useState(true);

  const [deletessids1, setdeletessids1] = useState("");
  const [deletessids2, setdeletessids2] = useState("");
  const [carddetails, setcarddetails] = useState("");
  const [paymentmethod, setpaymentmethod] = useState();
  const [paymentmethod2, setpaymentmethod2] = useState();
  const [paymentprice, setpaymentprice] = useState();
  const [servicefeess, setservicefees] = useState(false);
  const [Allpayments, setallpayments] = useState([]);
  const [loading, setloading] = useState(false);
  const [deletebtnclick, setdeletebtnclick] = useState(false);
  const [Id1, setId1] = useState("");
  const [Id2, setId2] = useState("");
  const [orderdata, setorderdata] = useState();
  // const [deleteproducts, setdeleteproducts] = useState(false)

  // const [usercards,setusercards]=useState(false);
  const router = useRouter();
  let itemsArray = [];
  let cartdata = [];
  let total = [];
  fetch(`${apiKey}api/cart/cartinfo/${dataid}`).then((res) => {
    res.json().then((data1) => {
      const data = data1[0];
      const subtotal = data.subTotal;
      setSubtotal(subtotal);
      Addservicefees();
      const items = data.items;
      for (const item of items) {
        const quantity = item.quantity;
        const product = item.productId;

        itemsArray.push({
          productId: product._id, //data seems to be in item.item
          selerId: product.sellerId,
          quantity: quantity,
        });
        // }
      }
    });
  });

  //  setitempro(itemsArray);
  const paymentprocessS = () => {
    setcarddetails("paymentprocessS ");

    setcard2(false);
    setcard3(false);
    setpaymentbtns(false);
    setcotinuebtn(false);
    setcotinuebtn1(false);
    setservicefees(false);
    setcotinuebtn2(false);
    setcard1(true);
    setDisable(false);
    setcard(false);
  };
  const paymentstart = () => {
    setpaymentbtns(true);
    setcotinuebtn(true);
    setcotinuebtn1(false);
    setcotinuebtn2(false);
    setshake(true);
    setTimeout(() => {
      setshake(false);
    }, 1000);
  };
  const paywallet = () => {
    
    const itemsArray1 = [];
    for (const cartdataset of cart) {
      const setcartdata = cartdataset.items;
      for (const item of setcartdata) {
        const quantity = item.quantity;
        const product = item.productId;
        // for(const prodetails of product){

        itemsArray1.push({
          productId: product._id, //data seems to be in item.item
          selerId: product.sellerId,
          quantity: quantity,
        });
        // }
      }
    }
    // if (loading == false) {
    //   setloading(true);
    //   setTimeout(() => {
    //     setloading(false);

    //   }, 2000);
    if (itemsArray1.length > 0) {
      const transactionId = Math.random();
      const data = {
        products: itemsArray1,
        transactionId: transactionId,
        userId: userOid,
        wallet: true,
        subtotal: subtotalprice,
        currencyrate: currencys,
      };
      fetch(`${apiKey}api/order/walletorderdercreate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Order successfull created") {
            router.push(`/checkout/payment/${transactionId}`);
          } else {
            setloading(true);
            setTimeout(() => {
              setloading(false);
              setcancelsw(false);
            }, 2000);
          }
        });
    }
    // }
  };

  useEffect(async () => {
    // checkoutdata()
    const ISSERVER = typeof window === "undefined";
    if(!ISSERVER) {
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const iddata = d.tokenData.id;
      setcarts(dataid);
      setiddata(iddata);
      allpaymentmethod();

      wallet();
    } else {
      router.push("/login");
    }
  }
  }, [deletessids1, deletessids2, paymentprice, paymentmethod]);

  const allpaymentmethod = () => {
    fetch(apiKey + "api/withdrawal_wallet/enablepaymentmethode")
      .then((res) => res.json())
      .then((data) => {
        setallpayments(data);
      });
  };

  const setcarts = async (id) => {
    await fetch(`${apiKey}api/cart/cartinfo/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setcart(data);

        setpaymentprice(data[0].subTotal);
        setorderdata(data[0]);
      });
    setUser(id);

    Addservicefees();
  };

  toast.configure();
  const paymentprocess = (cash) => {
    console.log(cash);
    setcarddetails("paymentprocess");
    setcard1(false);
    setcard2(false);
    setcard3(false);
    setcotinuebtn2(false);
    if (stockss === 0) {
      toast.error("Out of Stock");
    } else {
      setcard(true);
      // setpaymentmethod('paypal')
      setservicefees(true);
      setDisable(false);
      Addservicefees(cash);
    }
  };

  const wallet = async () => {
    let userId = await fetch(
      apiKey + "api/withdrawal_wallet/enablepaymentmethode"
    );
    userId = await userId.json();

    let pay = userId.map((p) => p.paymentgateway);
    setPaymentcheck(userId);
  };

  const addProduct = async (id, cartid, qtys, stocks) => {
    let addcount = qtys + 1;
    if (addcount <= stocks) {
      const data = { cartId: cartid, quantity: addcount };
      await fetch(`${apiKey}api/cart/updatecart/${id}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((error) => {});
    } else {
      addcount = qtys;
    }
    setcarts(userid1);
    Addservicefees();
    // Addservicefees()
    setTimeout(() => {
      showcart();
    }, 500);
  };

  const deleteProduct = async (id, cartid, qtys) => {
    let deletes = qtys - 1;
    if (deletes <= 0) {
      deletes = 1;
    } else {
      const data = { cartId: cartid, quantity: deletes };
      await fetch(`${apiKey}api/cart/updatecart/${id}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((error) => {});
    }
    setcarts(userid1);
    // Addservicefees()
    // }
    setTimeout(() => {
      showcart();
    }, 500);
  };

  const deleteAll = async (id, ids) => {
    setcancels(false);

    setId1(id);
    setId2(ids);

    const data = { cartId: ids };

    // await fetch(`${apiKey}api/cart/deletecart/${id}`, {
    //   method: "Delete",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //
    //   })
    //   .catch((error) => {
    //
    //   });
    // setcancels(true);
    setcarts(userid1);
    setTimeout(() => {
      showcart();
    }, 500);
  };

  const deletbtnclicks = async () => {
    const data = { cartId: Id2 };

    await fetch(`${apiKey}api/cart/deletecart/${Id1}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {});
    setcancels(true);
    setcarts(userid1);
    setTimeout(() => {
      showcart();
    }, 500);
  };


  // function deletepopup(id1, id2) {
  //

  //   if (deletebtnclick === true) {
  //     const data = { cartId: id2 };
  //     await fetch(`${apiKey}api/cart/deletecart/${id}`, {
  //       method: "Delete",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         //
  //       })
  //       .catch((error) => {
  //
  //       });
  //     setcancels(true);
  //   }
  // }

  function showcart() {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;

      fetch(`${apiKey}api/cart/cartinfo/${cart_data}`)
        .then((res) => res.json())
        .then((data) => {
          var d = data.map((i) => setcartnmber(i.totalquantity));
        });
    } else {
      router.push("/login");
    }
  }

  const Addservicefees = ( ca) => {
    console.log(ca);
    const paymentss = ca;
    if(ca === "paypal"){
    const data = { paymethod: "paypal", price: paymentprice };

    fetch(apiKey + "api/withdrawal_wallet/paymentfee", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setpaymentmethod(data.result);
        setpaymentmethod2(data.servicefee);
      })
      .catch((error) => {});
    }else if(ca === "cashfree"){
      const data = { paymethod: "cashfree", price: paymentprice };

    fetch(apiKey + "api/withdrawal_wallet/paymentfee", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setpaymentmethod(data.result);
        setpaymentmethod2(data.servicefee);
      })
      .catch((error) => {});
    }else if(ca === "payop"){
      const data = { paymethod: "payop", price: paymentprice };

    fetch(apiKey + "api/withdrawal_wallet/paymentfee", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setpaymentmethod(data.result);
        setpaymentmethod2(data.servicefee);
      })
      .catch((error) => {});
    }

  };

  const canceldelete = () => {
    setcancels(true);
  };
  const canceldeletew = () => {
    setcancelsw(true);
  };
  const deleteproduct = () => {
    setcancels(false);
  };

  const paymentprocessS2 = (cash) => {
    console.log(cash);
    setcarddetails("paymentprocess");
    setcard1(false);
    setcard(false);
    setcotinuebtn(false);
    setcotinuebtn1(true);
    setcotinuebtn2(false);
    
    if (stockss === 0) {
      toast.error("Out of Stock");
    } else {
      setcard2(true);
      setcard3(false)
      // setpaymentmethod('paypal')
      setservicefees(true);
      setDisable(false);
      Addservicefees(cash);
    }
  };

  const paymentprocessS3 = (cash) => {
    console.log(cash);
    setcarddetails("paymentprocess");
    setcard1(false);
    setcard(false);
    setcotinuebtn(false);
    setcotinuebtn1(false);
    setcotinuebtn2(true);
    setcotinuebtn1(false);

    
    if (stockss === 0) {
      toast.error("Out of Stock");
    } else {
      setcard3(true);
      setcard2(false);
      // setpaymentmethod('paypal')
      setservicefees(true);
      setDisable(false);
      Addservicefees(cash);
    }
  };

  return (
    <>
      {/* <DynamicInnerComp /> */}
      <div className="conatiners">
        {/* <div id="myModal" class="modal fade"> */}

        {cart.map((del) => (
          <div class={`outerdeletepopup ${cancels ? "active" : ""}`}>
            {del.items.map((del2) => (
              <div class="deletepopus">
                <div class="innerdeletepopup">
                  <div class="icon-box" onClick={canceldelete}>
                    {/* <i class="material-icons">&#xE5CD;</i> */}
                    <CloseIcon />
                  </div>
                  <h4 class="deletetitles">Are you sure?</h4>
                  {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> */}
                </div>
                <div class="deleteparas">
                  <p>Do you really want to delete these Item? </p>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={canceldelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={deletbtnclicks}
                  // onClick= {
                  //   // deleteAll(del2._id, del._id);
                  //   deletbtnclicks
                  //   // deleteAll(deletessids1, deletessids2);
                  // }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
        <div class={`outerdeletepopupW ${cancelsw ? "active" : ""}`}>
          <div class="deletepopus">
            <div class="innerdeletepopup">
              <div class="icon-boxs" onClick={canceldeletew}>
                <CloseIcon />
              </div>
              <h4 class="deletetitless">Insufficient balence</h4>
            </div>
            <div class="deleteparas">
              <p>
                You have Insufficient balence in your wallet please recharge it.
              </p>
            </div>
            <div>
              <Link href="dashboard/wallet">
                <button type="button" class="btn btn-danger">
                  Add Balance
                </button>
              </Link>
            </div>
          </div>
        </div>

        <Navbar flag={true} />
        {
          // {
          cart.map((details) =>
            details.items.length > 0 ? (
              <>
                <div className="banner">
                  <div className="inner">
                    <div className="checkout">
                      <div className="checkout_box">
                        {/* <span className="title">Sold By</span>
                                    <br /> */}
                        <div className="allproducts">
                          {details.items.map((products) => (
                            <div className="allboxes">
                              <span className="title">Sold By</span>
                              {/* <br /> */}

                              <div className="box2">
                                <div className="box1">
                                  <div className="userpic">
                                    {/* <Image src={Userpofile} /> */}
                                    <img
                                      src={products.sellerId.image}
                                      alt="notfound"
                                    />
                                  </div>
                                  <p>{products.sellerId.username}</p>
                                </div>
                                <div className="products">
                                  <img
                                    src={products.productId.images[0]}
                                    alt="notfound"
                                  />
                                </div>

                                <h3 className="product_title">
                                  {products.productId.productname}
                                </h3>
                                <div
                                  className="deletebtn"
                                  onClick={() => {
                                    deleteAll(products._id, details._id);
                                    // deletepopup(products._id, details._id)
                                  }}
                                  // onClick={deleteproduct}
                                >
                                  <DeleteForeverIcon />
                                </div>
                                <p className="detail">Digital product</p>
                              </div>
                              <div className="box3">
                                <div className="inner_box-3">
                                  <button
                                    type="button"
                                    className="addcart"
                                    onClick={() => {
                                      deleteProduct(
                                        products.productId._id,
                                        details._id,
                                        products.quantity
                                      );
                                    }}
                                  >
                                    -
                                  </button>
                                  {products.quantity}

                                  <button
                                    type="button"
                                    className="addcart"
                                    onClick={() => {
                                      addProduct(
                                        products.productId._id,
                                        details._id,
                                        products.quantity,
                                        products.productId.stock
                                      );
                                    }}
                                  >
                                    {products.quantity >=
                                    products.productId.stock
                                      ? ""
                                      : "+"}
                                  </button>
                                </div>
                                {checkcurrencyslocal ? (
                                  <p className="currency">
                                    {Math.round(
                                      (products.productId.price * currencys +
                                        Number.EPSILON) *
                                        100
                                    ) / 100}

                                    <small>{currencyslocal}</small>
                                  </p>
                                ) : (
                                  <p className="currency">
                                    {Math.round(
                                      (products.productId.price * currencys +
                                        Number.EPSILON) *
                                        100
                                    ) / 100}
                                    <small>USD</small>
                                  </p>
                                )}

                                <div className="linebreak_checkout"></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <ul className="fees">
                          <li className="fees_total1">
                            Sub-total
                            {checkcurrencyslocal ? (
                              <strong id="sub_total">
                                {Math.round(
                                  (details.subTotal * currencys +
                                    Number.EPSILON) *
                                    100
                                ) / 100}

                                <small>{currencyslocal}</small>
                              </strong>
                            ) : (
                              <strong id="sub_total">
                                {Math.round(
                                  (details.subTotal * currencys +
                                    Number.EPSILON) *
                                    100
                                ) / 100}
                                <small>USD</small>
                              </strong>
                            )}
                          </li>

                          {servicefeess ? (
                            <li
                              className={`fees_total ${
                                card || card1 || card2 || card3 ? "active" : ""
                              }`}
                            >
                              Service fee
                              {checkcurrencyslocal ? (
                                <strong>
                                  {Math.round(
                                    (paymentmethod2 * currencys +
                                      Number.EPSILON) *
                                      100
                                  ) / 100}

                                  <small>{currencyslocal}</small>
                                </strong>
                              ) : (
                                <strong>
                                  {Math.round(
                                    (paymentmethod2 * currencys +
                                      Number.EPSILON) *
                                      100
                                  ) / 100}

                                  <small>USD</small>
                                </strong>
                              )}
                            </li>
                          ) : (
                            ""
                          )}
                          {/* <li className="discount">Got discount code?</li> */}

                          <li className="fees_total1 Total">
                            Grand Total:
                            {servicefeess ? (
                              <>
                                {checkcurrencyslocal ? (
                                  <span id="grand_total">
                                    {Math.round(
                                      (paymentmethod * currencys +
                                        Number.EPSILON) *
                                        100
                                    ) / 100}

                                    <small>{currencyslocal}</small>
                                  </span>
                                ) : (
                                  <span id="grand_total">
                                    {Math.round(
                                      (paymentmethod * currencys +
                                        Number.EPSILON) *
                                        100
                                    ) / 100}
                                    <small>USD</small>
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
                                {checkcurrencyslocal ? (
                                  <span id="grand_total">
                                    {Math.round(
                                      (details.subTotal * currencys +
                                        Number.EPSILON) *
                                        100
                                    ) / 100}

                                    <small>{currencyslocal}</small>
                                  </span>
                                ) : (
                                  <span id="grand_total">
                                    {Math.round(
                                      (details.subTotal * currencys +
                                        Number.EPSILON) *
                                        100
                                    ) / 100}

                                    <small>USD</small>
                                  </span>
                                )}
                              </>
                            )}
                          </li>
                        </ul>
                        {loading ? (
                          <div className="outerripple">
                            <div className="ripples"></div>
                          </div>
                        ) : (
                          <button
                            className={`check_btn ${
                              card || card1 ? "active" : ""
                            }`}
                            type="submit"
                            onClick={card ? paymentstart : paywallet}
                            // onClick={()=>paywallet(dataid)}
                            style={{ display: continuebtn ? "none" : "block" }}
                            disabled={disable}
                          >
                            Continue
                          </button>
                        )}
                        {/* <button
                          className={`check_btn ${card1 ? "active" : ""}`}
                          type="button"
                          onClick={paywallet}
                          style={{ display: continuebtn ? "none" : "block" }}
                          disabled={disable}
                        >
                          Continue
                        </button> */}
                        {/* <button className={`paypalpayment ${paymentbtns ? "active" : ""}`} href="#">Pay<span className="palspan">Pal</span></button> */}
                        {/* { */}
                        {/* card && */}
                        <div
                          className={`paypalpayment ${
                            paymentbtns ? "active" : ""
                          }`}
                        >
                          <PayPalScriptProvider
                            options={{
                              "client-id":
                                "AcBSdIBR8Bl-JbtLu41x2pVSIy7GVDcKnNw2W8Ct5O2zZ3CK6a2yD_NAaFyEVhy-_Qk36W7ZFDT_G5A9",
                              currency: currencyslocal,
                            }}
                          >
                            {paymentmethod != undefined ? (
                              <PayPalButtons
                                createOrder={(data, actions) => {
                                  return actions.order.create({
                                    purchase_units: [
                                      {
                                        amount: {
                                          value: parseInt(
                                            paymentmethod * currencys
                                          ),
                                        },

                                        item_list: {
                                          items: alldata,
                                        },

                                        // items: carddata(),
                                      },
                                    ],
                                  });
                                }}
                                onApprove={(data, actions) => {
                                  return actions.order
                                    .capture()
                                    .then((details) => {
                                      const name =
                                        details.payer.name.given_name;

                                      if (details.status == "COMPLETED") {
                                        const data = {
                                          details: details,
                                          products: itemsArray,
                                          transactionId: details.id,
                                          userId: userOid,
                                          paymentfee: paymentmethod2,
                                        };
                                        fetch(
                                          `${apiKey}api/order/orderdercreate/`,
                                          {
                                            method: "POST",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                            },
                                            body: JSON.stringify(data),
                                          }
                                        )
                                          .then((res) => res.json())
                                          .then((data) => {
                                            if (
                                              data.message ==
                                              "Order successfull created"
                                            ) {
                                              router.push(
                                                `/checkout/payment/${details.id}`
                                              );
                                            }
                                          });
                                      }
                                    });
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </PayPalScriptProvider>
                        </div>
                        {/* } */}
                      </div>
                    </div>

                    <ul className="payment">
                      {paymentcheck.map((item) => (
                        <>
                          {item.paymentgateway === "wallet" && (
                            <li className="cardpayment">
                              <div
                                className={`cardbtn1 ${card1 ? "active" : ""}`}
                                onClick={paymentprocessS}
                              >
                                <span className="radio1"></span>
                                {/* <input type="radio" className="radio" ></input> */}
                                <span className="card_name">Wallet</span>
                                <p className="description">
                                  Pay with your wallet money
                                </p>
                                <div className="card_image">
                                  <div className="visa">
                                    <Image src={Paypalwllet} />
                                  </div>
                                </div>
                                {/* <div className="card_image">
                              <div className="visa">
                                <Visa />
                              </div>
                              <div className="paypalimg">
                                <Paypal />
                              </div>
                            </div> */}
                              </div>
                            </li>
                          )}
                          {currencyslocal != "INR" &&
                            item.paymentgateway === "paypal" && (
                              <li className="cardpayment">
                                <div
                                  className={`cardbtn1 ${card ? "active" : ""}`}
                                  onClick={() => paymentprocess(item.paymentgateway)}
                                >
                                  <span className="radio1"></span>
                                  {/* <input type="radio" className="radio"  ></input> */}
                                  <span className="card_name">
                                    PayPal, Credit or debit card
                                  </span>
                                  <p className="description">
                                    Pay via Visa, Mastercard, or Maestro debit
                                    or credit card
                                  </p>
                                  <div className="card_image">
                                    <div className="visa">
                                      <Image src={Visa} />
                                    </div>
                                    <div className="paypalimg">
                                      <Image src={Paypal} />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )}

                          { currencyslocal === "INR" && currencyslocal !="" &&
                          item.paymentgateway === "cashfree" && (
                            <li className="cardpayment">
                              <form
                                id="redirectForm"
                                method="post"
                                action="https://payments.esports4g.com/"
                              >
                                <div
                                  className={`cardbtn1 ${
                                    card2 ? "active" : ""
                                  }`}
                                  onClick={() => paymentprocessS2(item.paymentgateway)}
                                >
                                  <span className="radio1"></span>

                                  <span className="card_name">Cashfree</span>
                                  <p className="description">
                                    Pay with cashfree
                                  </p>
                                  <div className="card_image">
                                    <div className="visa">
                                      <Image src={Paypalwllet} />
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="hidden"
                                  name="buyerid"
                                  value={userid1}
                                  class="btn"
                                />
                                     <input
                                  type="hidden"
                                  name="paymentmod"
                                  value='cashfree'
                                  class="btn"
                                />
                                 <input
                                  type="hidden"
                                  name="paymentfee"
                                  value={paymentmethod2}
                                  class="btn"
                                />
                                   <input
                                  type="hidden"
                                  name="currconvert"
                                  value={currencys}
                                  class="btn"
                                />
                                <button
                                  className={`check_btn1 ${
                                    card2 ? "active" : ""
                                  }`}
                                  type="submit"
                                  style={{
                                    display: continuebtn1 ? "block" : "none",
                                  }}
                                  disabled={disable}
                                >
                                  Continue
                                </button>
                              </form>
                            </li>
                          )}
                           
                           { currencyslocal !="" &&
                          item.paymentgateway === "payop" && (
                            <li className="cardpayment">
                              <form
                                id="redirectForm"
                                method="post"
                                action="https://payments.esports4g.com/"
                              >
                                <div
                                  className={`cardbtn1 ${
                                    card3 ? "active" : ""
                                  }`}
                                  onClick={() => paymentprocessS3(item.paymentgateway)}
                                >
                                  <span className="radio1"></span>

                                  <span className="card_name">Payop</span>
                                  <p className="description">
                                    Pay with Payop
                                  </p>
                                  <div className="card_image">
                                    <div className="visa">
                                      <Image src={Paypalwllet} />
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="hidden"
                                  name="buyerid"
                                  value={userid1}
                                  class="btn"
                                />
                                  <input
                                  type="hidden"
                                  name="buyerid"
                                  value={userid1}
                                  class="btn"
                                />
                                     <input
                                  type="hidden"
                                  name="currconvert"
                                  value={currencys}
                                  class="btn"
                                />
                                     <input
                                  type="hidden"
                                  name="paymentmod"
                                  value='payop'
                                  class="btn"
                                />
                                 <input
                                  type="hidden"
                                  name="paymentfee"
                                  value={paymentmethod2}
                                  class="btn"
                                />
                                   <input
                                  type="hidden"
                                  name="currency"
                                  value={currencyslocal}
                                  class="btn"
                                />
                                <button
                                  className={`check_btn1 ${
                                    card3 ? "active" : ""
                                  }`}
                                  type="submit"
                                  style={{
                                    display: continuebtn2 ? "block" : "none",
                                  }}
                                  disabled={disable}
                                >
                                  Continue
                                </button>
                              </form>
                            </li>
                          )}

                        </>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="emptycart">
                <h2 className="emptymsg">Your cart is empty</h2>
                <p className="emptypara">
                  It seems you haven't chosen your products yet
                </p>
                <Link href="/">
                  <button className="emptybtn">Shop Now</button>
                </Link>
              </div>
            )
          )

          // }
        }
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
