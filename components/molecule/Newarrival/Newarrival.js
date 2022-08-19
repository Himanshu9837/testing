import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Contextapi from "../../../Context/Contextapi.js";
import { useRef } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import Tooltip from "@mui/material/Tooltip";
export const config = {
  unstable_runtimeJS: false,
};

const TOTAL_SLIDES = 3; // n-1 in Array

const Newarrival = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const { setcartnmber, checkcurrencyslocal, currencys, currencyslocal } =
    useContext(Contextapi);

  const [newdata, setdatas] = useState([]);
  const [alldata, setalldata] = useState([]);
  const [activeIndex, setActiveIndex] = React.useState("");
  const [allbtns, setallbtns] = useState(true);
  const [show, setshow] = useState(false);

  const [circledata, setcircledata] = useState([]);

  const [Id, setId] = useState([]);

  const [loaders, setloaders] = useState(false);
  const [datass, setdatass] = useState();

  const [loaderssss, setloaderssss] = useState(false);

  const [numberss, setnumberss] = useState();

  const [ids, setids] = useState(0);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    getdatas();
    getdatas1();
  }, []);

  const router = useRouter();
  function getdatas() {
    fetch(`${apiKey}api/category/newarrivalcategory`)
      .then((res) => res.json())
      .then((data) => {
        const data3 = data.slice(0, 3);
        setdatas(data);
        setcircledata(data3);
      });
  }
  function getdatas1() {
    fetch(`${apiKey}api/product/newarrivalproducts/`)
      .then((res) => res.json())
      .then((data) => {
        const data2 = data.slice(0, 8);
        setalldata(data2);
        console.log(data2);
      });
    setallbtns(true);
    setActiveIndex("");
  }

  function getdatas2(id) {
    fetch(`${apiKey}api/product/newcatarrivalproducts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const data3 = data.slice(0, 8);

        setalldata(data3);
      });
    setallbtns(false);
    setId(id);
  }
  toast.configure();
  const notify = (message) => toast(message);

  const addcarts = (id) => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;

      fetch(`${apiKey}api/cart/checkusercart/${cart_data}&${id}`)
        .then((res) => res.json())
        .then((data) => {
          setdatass(data);
          if (data == true) {
            const res = axios({
              method: "post",
              url: `${apiKey}api/cart/addtocart`,
              data: {
                userId: cart_data,
                itemId: id,
                quantity: 1,
              },
            });
            notify("Add to cart successfully");
            setTimeout(() => {
              fetch(`${apiKey}api/cart/cartinfo/${cart_data}`)
                .then((res) => res.json())
                .then((data) => {
                  var d = data.map((i) => setcartnmber(i.totalquantity));
                });
            }, 500);
          } else if (data == false) {
            notify("Out of Stock");
          }
        });
    } else {
      notify("Login first");
    }
  };

  const nextpage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setloaderssss(true);
  };

  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const next = () => {
    if (ids < newdata.length - 1) {
      let y = ids + 1;
      let i = newdata[y]._id;
      getdatas2(i);
      setCurrent(current + 1);
      setids(ids + 1);
    } else {
      setids(0);
      getdatas2(newdata[0]._id);
      setCurrent(0);
    }
  };

  const prev = () => {
    if (current === 0) {
      getdatas2(newdata[newdata.length - 1]._id);
      setids(newdata.length - 1);
      setCurrent(newdata.length - 1);
    } else {
      let y = ids - 1;
      let i = newdata[y]._id;
      getdatas2(i);
      setCurrent(current - 1);
      setids(ids - 1);
    }
  };

  const desired = (e, index) => {
    setCurrent(Number(e.target.id));
    setids(index);
  };

  useEffect(() => {
    ref.current.style.transition = "all 0.2s ease-in-out";
    ref.current.style.transform = `translateX(-${current}00%)`;
  }, [current]);
  return (
    <>
      <div className={`lodersouter ${loaderssss ? "active" : ""}`}>
        <div className="innerloaders">
          <div class="loader"></div>
        </div>
      </div>
      <section className="newarrival" id="newarrivals">
        <div className="alerts">
          <ToastContainer />
        </div>
        <h5 className="newsellingame">New Arrival Products</h5>
        <div className="newarraival row">
          <div className="column_container col-md-4">
            <div className="column_inner">
              <div className="frame">
                <div className="box-container" ref={ref}>
                  {newdata.map((img) => (
                    <div className="box">
                      {/* <img src={img.categoryimage} alt="not-found" /> */}
                      <img src='/images/homevalo.jpg' alt="not-found" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="button-container">
                <div className="buttons" onClick={prev}>
                  <ArrowCircleLeftOutlinedIcon />
                </div>
                {/* {circledata.map((num, index) => (
                  <div
                    className={`button-2 ${index === current && "active"}`}
                    onClick={(e) => {
                      desired(e, index), getdatas2(num._id);
                    }}
                    id={index}
                    key={index}
                  />
                ))} */}
                <div className="buttons" onClick={next}>
                  <ArrowCircleRightOutlinedIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="column_container col-md-8">
            <div className="column_inner">
              <div className="products_newarrival mb-0">
                <div className="e-commerce columns-4">
                  <ul className="product-conatiner-grid">
                    {alldata.length >= 1 ? (
                      alldata.map((items) => (
                        <li className="product-col product-outlineimage">
                          <div className="product-inner">
                            <div className="product-image">
                              <Tooltip
                                title={`seller: ${items.userId.fullname}`}
                                placement="top"
                              >
                                <div className="product_like">
                                  <img
                                    src={items.userId.image}
                                    alt="notfound"
                                  />
                                </div>
                              </Tooltip>
                              <Link
                                href={`/productlisting/${items.category.metaurl}`}
                              >
                                <a>
                                  <div className="inner_newarrival">
                                    <img
                                      src={items.category.categorythumblinimage}
                                      alt="not-found"
                                    />
                                  </div>
                                </a>
                              </Link>
                              <div className="link-on-image">
                                <div className="add-link-wrap">
                                  <div className="add-link">
                                    <div
                                      className="quick-view"
                                      onClick={() => {
                                        setcartnmber(numberss),
                                          addcarts(items._id);
                                      }}
                                    >
                                      Add to Cart
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="product-content">
                            <span className="category-list">
                            <span className="sl">Game: </span>{items.category.name}
                              </span>
                              <a href="" className="product-loop-title">
                                <h3 className="product_title_newarrival">
                                  {items.productname}
                                </h3>
                              </a>
                              <span className="price">
                                <span className="price-amount">
                                  <>
                                    {checkcurrencyslocal ? (
                                      <>
                                        {Math.round(
                                          (items.price * currencys +
                                            Number.EPSILON) *
                                            100
                                        ) / 100}
                                      </>
                                    ) : (
                                      <>
                                        {Math.round(
                                          (items.price * currencys +
                                            Number.EPSILON) *
                                            100
                                        ) / 100}
                                      </>
                                    )}
                                    {checkcurrencyslocal ? (
                                      <span className="price-currency-symbol">
                                        {currencyslocal}
                                      </span>
                                    ) : (
                                      <span className="price-currency-symbol">
                                        USD
                                      </span>
                                    )}
                                  </>
                                </span>
                              </span>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="no-product">
                        Sorry,
                        <br />
                        No Product Available For this Items.
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newarrival;
