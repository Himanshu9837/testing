import React, { useContext, useState } from "react";
const DoneIcon = dynamic(() => import("@mui/icons-material/Done"));
import dynamic from "next/dynamic";
import Contextapi from "../../../Context/Contextapi.js";
const AddModeratorIcon = dynamic(() =>
  import("@mui/icons-material/AddModerator")
);
const CheckCircleOutlineIcon = dynamic(() =>
  import("@mui/icons-material/CheckCircleOutline")
);
import Link from "next/link";
import ChatIcon from "@mui/icons-material/Chat";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

toast.configure();
const notify = (message) => toast(message);
export default function Rightdescription({ data, outerdata, innerdata, game }) {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { setcartnmber, currencys, checkcurrencyslocal, currencyslocal } =
    useContext(Contextapi);
  const [count, setCount] = React.useState(1);
  const router = useRouter();
  const [check, setchecck] = useState("");
  const [checks, setcheccks] = useState("");
  const inc = (event) => {
    setCount(count + 1);
  };

  const dec = () => {
    if (count <= 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };
  const cart = (id) => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;

      const res = axios({
        method: "post",
        url: apiKey + "api/cart/addtocart",
        data: {
          userId: cart_data,
          itemId: id,
          quantity: count,
        },
      });
      notify("Add to cart successfully");
      setTimeout(() => {
        showcart();
      }, 500);
    } else {
      notify("Login first");
      router.push("/login");
    }
  };
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
  const badgecondition = async (cart_data) => {
    let sellerId = await fetch(`${apiKey}api/badges/applybadges/${cart_data}`);
    sellerId = await sellerId.json();
  
    setchecck(sellerId.checkdata.slice(-1));
    setcheccks(sellerId.verified);
  };
  const buynowproduct = (id) => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      fetch(`${apiKey}api/cart/checkusercart/${cart_data}&${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data == true) {
            const res = axios({
              method: "post",
              url: apiKey + "api/cart/addtocart",
              data: {
                userId: cart_data,
                itemId: id,
                quantity: 1,
              },
            });
            router.push("/checkout");
          } else if (data == false) {
            notify("Out of Stock");
          }
        });
    } else {
      notify("Login first");
      router.push("/login");
    }
  };
  return (
    <div>
      {data.map((alldata, i) => (
        <div className={"image_div_box_style"}>
          <h3 className={"title_style"}>{alldata.productname}</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5rem",
            }}
          >
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={"filter_box_style"}>
                  <p className="color_p">Game</p>
                </div>
                <div className="donetick_style">
                  <DoneIcon className="svg2" />
                  <div style={{ marginTop: "4px" }}>
                    <span className={"span_style"}>{game}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{width:"30%"}}>
                {outerdata.map((out, i) => (
                  <div className={"filter_box_style1"}>
                    <p className="color_p">{out.name}</p>
                  </div>
                ))}
                </div>
                <div>
                {innerdata.map((ia, i) => (
                  <div className="donetick_style1">
                    <DoneIcon className="svg2" />
                    <div style={{ marginTop: "4px" }}>
                      <span className={"span_style"}>{ia}</span>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "20px", textAlign: "end" }}>
              <p className={"p_style"}>Price</p>
              {checkcurrencyslocal ? (
                <div className="styleprices">
                  <h1 className={"price_style"}>
                    {Math.round(
                      (alldata.price * currencys + Number.EPSILON) * 100
                    ) / 100}
                  </h1>
                  <p>{currencyslocal}</p>
                </div>
              ) : (
                <div className="styleprices">
                  <h1 className={"price_style"}>
                    {Math.round(
                      (alldata.price * currencys + Number.EPSILON) * 100
                    ) / 100}
                  </h1>
                  <p>USD</p>
                </div>
              )}
            </div>
          </div>
          <div className="low_div_style">
            <div className="buyclass">
              <div>
                <p className="color_p2">Sold by</p>
                <div className="user_div">
                  <img src={alldata.userId.image} className="profile_style" />
                  <div className={"sole_div"}>
                    <div style={{ marginLeft: "10px" }}>
                      <p className={"psold"}>{alldata.userId.username}</p>
                      <div className={"batch_style"}>
                        {check.length > 0 ? (
                          <div className="innerbadge">
                            <img src={check} />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div>
                      <CheckCircleOutlineIcon className="svg2" />
                    </div>
                    <Link href="/chat">
                      <div style={{ marginLeft: "5px", cursor: "pointer" }}>
                        <ChatIcon className="svg2" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="soldclass"
              style={{ width: "35%", textAlign: "end" }}
            >
              <div className="div-3">
                {alldata.stock >= 2 && (
                  <div className="div-4">
                    <a href="#" onClick={() => dec()}>
                      <span className="span-3">-</span>
                    </a>
                    <div className="div-5">
                      <input value={count} className="input-text"></input>
                    </div>
                    {count < alldata.stock && (
                      <a href="#">
                        <span className="span-3" onClick={() => inc()}>
                          +
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="alldescbtn">
                <button
                  type="button"
                  className="cart_btn"
                  onClick={() => cart(alldata._id)}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="bye_btn"
                  onClick={() => {
                    buynowproduct(alldata._id);
                  }}
                >
                  Buy now
                </button>
              </div>
              <p className="para_style">
                Register or login to earn 36 E4GCoin with this purchase
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
