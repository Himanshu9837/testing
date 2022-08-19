import React, { useState, useEffect, useContext } from "react";
import Product from "../../../public/images/userprofile.jpg";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import InfoIcon from '@mui/icons-material/Info';
import Contextapi from "../../../Context/Contextapi.js";
const Cart = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const { setcartnmber, checkcurrencyslocal, currencys, currencyslocal } = useContext(Contextapi);

  const [data, setData] = useState([]);
  const [Cartdata, setCartData] = useState(false);


  const [Tokens, SetTokens] = useState(false);


  const Delete = async (id) => {
    const map1 = data.map((x) => x._id);
    const res = axios({
      method: "delete",
      url: `${apiKey}api/cart/deletecart/${id}`,
      data: {
        cartId: map1,
      },
    });
    // not("Delete item successfully");
    // router.push("/");
    addcart();
    addcart();
  };


  const addProduct = async (id, cartid, qtys, stocks) => {

    let addcount = qtys + 1
    if (addcount <= stocks) {
      const data = { cartId: cartid, quantity: addcount }
      await fetch(`${apiKey}api/cart/updatecart/${id}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {

          // setcart(data);
        })
        .catch((error) => {

        });
    } else {
      addcount = qtys;
    }
    // setData(userid1);
    addcart();
  }

  const deleteProduct = async (id, cartid, qtys) => {

    let deletes = qtys - 1
    if (deletes <= 0) {
      deletes = 1
    } else {
      const data = { cartId: cartid, quantity: deletes }
      await fetch(`${apiKey}api/cart/updatecart/${id}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {

        })
        .catch((error) => {

        });
    }
    addcart()
    // }
  }

  const addcart = async () => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      setCartData(true);
      SetTokens(true)


      fetch(`${apiKey}api/cart/cartinfo/${cart_data}`)
        .then((res) => res.json())
        .then((data) => {

          var d = data.map((i) => (
            setData(data),
            setcartnmber(i.totalquantity)
          ))

        })
    }

  };

  useEffect(async () => {
    addcart();
  }, []);

  return (
    <>

      <div className="cartpage">
        {Tokens ? (
          <>
            {data.map((cart) => (

              <div className="cartwrapper">
                <div className="allproductcarts">
                  {cart.items.map((product) => (
                    <div className="productcart">
                      <div className="productnamewrapper">
                        <div className="productimage">
                          <img src={product.productId.category.categorythumblinimage} />
                        </div>
                        <div className="proudctname">
                          <p className="names">{product.productId.productname}</p>
                          {/* <div className="productprice"> */}
                          <h6 className="prices">{product.price} x {product.quantity}</h6>
                          {/* <h6 className="prices"></h6> */}
                          {/* </div> */}
                          <div className="allcartbtn">
                            <div className="inner_box-3">

                              <button type="button" className="addcart" onClick={() => { deleteProduct(product.productId._id, cart._id, product.quantity) }}>-</button>
                              {product.quantity}

                              <button type="button" className="addcart" onClick={() => { addProduct(product.productId._id, cart._id, product.quantity, product.productId.stock) }}>
                                {
                                  product.quantity >= product.productId.stock ? ('') : (
                                    '+'
                                  )

                                }
                              </button>
                            </div>
                          </div>

                        </div>
                        <div className="productdelete" onClick={() => Delete(product._id)}>
                          <DeleteForeverIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


                {
                  Cartdata ? (
                    <>
                      {
                        cart.items.length < 1 ? (
                          <div className="noitem">
                            <div className="noitemwrapper">
                              <div className="noitemicon">
                                <InfoIcon />
                              </div>
                              <h5 className="noitemhead">
                                Your shopping cart is empty
                              </h5>
                              <p className="noitempara">
                                It seems you haven't chosen your products yet
                              </p>
                            </div>
                          </div>

                        ) : (
                          <div className="alldivsss">
                            <div className="subtotalcart">
                              <div className="subtotalinner">
                                <h4 className="cartstitle">CART SUBTOTAL:</h4>

                                {
                                  checkcurrencyslocal ? (
                                    <h4 className="cartmoney">
                                      {
                                        Math.round((cart.subTotal * currencys + Number.EPSILON) * 100) / 100
                                      }
                                      <small>
                                        {currencyslocal}
                                      </small>
                                    </h4>
                                  ) : (
                                    <h4 className="cartmoney">
                                      {
                                        Math.round((cart.subTotal * currencys + Number.EPSILON) * 100) / 100
                                      }
                                      <small>
                                        USD
                                      </small>
                                    </h4>
                                  )
                                }

                              </div>
                            </div>
                            <div className="cartstotalbtn">
                              <Link href="/checkout" passHref={true}>
                                <a>
                                  <button className="cartsbutton">
                                    Proceed To Checkout
                                  </button>
                                </a>
                              </Link>
                            </div>
                          </div>
                        )
                      }
                    </>
                  ) : (
                    <div className="noitem">
                      <div className="noitemwrapper">
                        <div className="noitemicon">
                          <InfoIcon />
                        </div>
                        <h5 className="noitemhead">
                          Your shopping cart is empty
                        </h5>
                        <p className="noitempara">
                          It seems you haven't chosen your products yet
                        </p>
                      </div>
                    </div>
                  )
                }


              </div>
            ))
            }
          </>
        ) : (
          <div className="cartwrapper">
            <div className="noitem">
              <div className="noitemwrapper">
                <div className="noitemicon">
                  <InfoIcon />
                </div>
                <h5 className="noitemhead">
                  Your shopping cart is empty
                </h5>
                <p className="noitempara">
                  Please Login First
                </p>
              </div>
            </div>
          </div>
        )



        }


      </div>
    </>
  );
};

export default Cart;
