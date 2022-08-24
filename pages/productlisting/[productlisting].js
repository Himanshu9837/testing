import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Head from "next/head";
// import LocalMallIcon from "@mui/icons-material/LocalMall";
// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import User from "../public/images/Game_account_icon.png";
// import Stack from "@mui/material/Stack";
import Footer from "../../components/molecule/Footer/footer";
import Header from "../../components/molecule/Navbar2/Navbarhome";
// import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import axios from "axios";
// import dynamic from "next/dynamic";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
// import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Contextapi from "../../Context/Contextapi.js";

import TablePagination from "@mui/material/TablePagination";
// const useTheme = dynamic(() => import("@mui/material/styles"));
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Tooltip from "@mui/material/Tooltip";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
// const styled = dynamic(() => import("@mui/material/styles"));
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Box from "@mui/material/Box";
// const Slider = dynamic(() => import("@mui/material/Slider"));
// const SliderThumb = dynamic(() => import("@mui/material/Slider"));
import Skeleton from "react-loading-skeleton";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const config = {
  unstable_runtimeJS: false,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 4,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 4,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 4,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

toast.configure();
const notify = (message) => toast(message);

function valuetext(value) {
  return value;
}
// const ProductListing = () => {
// export default function ProductListing({ postData, pid }) {
  const ProductListing = ({ postData, pid }) => {
  console.log(pid);
  const canonicalURL = `http://206.189.136.28:3010/categories/${pid}`;
  console.log(postData);
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { setcartnmber, currencys, checkcurrencyslocal, currencyslocal } =
    useContext(Contextapi);
  console.log(currencys);

  const router = useRouter();
  const selectInputRef = useRef();
  const productname = router.query.productlisting;
  console.log(productname);
  const [productdata, setProductData] = useState([]);
  const [productdata2, setProductData2] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [resultsFound, setResultsFound] = useState(true);
  const [maxn, setMaxn] = useState("");
  const [minn, setMinn] = useState("");
  const [value, setValue] = React.useState([0, 2500]);
  const [mobile, setmobile] = useState(false);
  const [window, setwindow] = useState(false);

  const [filterdata, setFilterdata] = useState([]);
  const [filterdata1, setFilterdata1] = useState([]);
  const [suballname, setsuballname] = useState([]);
  const [content, setContent] = useState("");
  const [sort, setSort] = useState("");
  const [faqanswer, setfaqanswer] = useState([]);
  const [faqquestion, setfaqqueston] = useState([]);
  const [activeIndex1, setActiveIndex1] = React.useState("");
  const [activeIndex2, setActiveIndex2] = React.useState("");

  const [fvalue, setfvalue] = useState([]);
  const [newsubname, setnewsubname] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [close, setClose] = useState(false);
  const [closes, setCloses] = useState(false);
  const [activeIndex, setActiveIndex] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [icon, setIcon] = useState(false);
  const [loaderssss, setloaderssss] = useState(false);
  const [skeltonload, setskeltonload] = useState(true);
  const [openselect, setOpenselect] = useState(false);

  const [categry, setCategry] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    applyFilters(productdata2);
  };

  const chnageicon = (i) => {
    if (i === activeIndex1) {
      setActiveIndex1("");
    } else {
      setActiveIndex1(i);
    }
  };

  const changeicon = (i) => {
    if (i === activeIndex2) {
      setActiveIndex2("");
    } else {
      setActiveIndex2(i);
    }
  };
  console.log(activeIndex1);
  const product = () => {
    if (typeof window !== "undefined") {
      // alert('hlo')
      if (router.isReady) {
        const data = router.query.productlisting;

        fetch(`${apiKey}api/product/categoryproducts/${data}`).then((res) => {
          res.json().then((data) => {
            console.log(data);
            setProductData(data);
            setProductData2(data);
            setTotalPosts(data.length);
            setskeltonload(false);
          });
        });
      }
    } else {
      // alert('hi')
    }
  };
  const image = () => {
    if (router.isReady) {
      const data1 = router.query.productlisting;

      fetch(`${apiKey}api/category/categorydetails/${data1}`).then((res) => {
        res.json().then((data) => {
          console.log(data.categorylogo);
          console.log(data._id);
          setLogo(data.categorylogo);
          setCover(data.coverimage);
          setCategry(data.categoryheading);
          filter(data._id);
          setSort(data._id);
          setContent(data.categorycontent);
          setfaqqueston(data.questions);
          setfaqanswer(data.answers);
        });
      });
    }
  };
  const max = () => {
    fetch(apiKey + "api/product/maximumpriceitem").then((res) => {
      res.json().then((data) => {
        console.log(data);
        setMaxn(data);
      });
    });
  };
  const min = () => {
    fetch(apiKey + "api/product/minimumpriceitem").then((res) => {
      res.json().then((data) => {
        console.log(data);
        setMinn(data);
      });
    });
  };

  const sortnew = () => {
    fetch(`${apiKey}api/product/sortcategoryproducts/${sort}`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setProductData(data);
        setClose(true);
      });
    });
  };
  const filter = (ids) => {
    console.log(ids);
    fetch(`${apiKey}api/category/filtercategory/${ids}`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setFilterdata(data.innerdata);
        setFilterdata1(data.outerdata);
        let f = data.outerdata.map((fff) => fff.name);
        console.log(f);
        setfvalue(f);
      });
    });
  };

  const newproduct = (pro) => {
    console.log(pro);
    let resultproduct = pro.sort(function (a, b) {
      return a - b;
    });
    console.log("fdgfd", resultproduct);
  };
  console.log(productdata);
  React.useEffect(() => {
    product();
    max();
    min();
    image();

    newproduct(productdata);
  }, [router.isReady]);

  const handleselectedvalue = (value, num, inn) => {
    alert("hii");
    setActiveIndex("");
    console.log(value);
    console.log(num);
    console.log(suballname[1]);
    const index = suballname.map((i) => i).indexOf(value);
    console.log(index);
    const data = value;
    if (index == -1) {
      if (suballname[inn] == "undefined") {
        if (suballname.length < num) {
          const dataf = suballname.concat(data);
          setsuballname(dataf);
          console.log(dataf);
        }
      } else {
        suballname[inn] = data;
        // setsuballname(data1);
        console.log(suballname);
        let arr = [];
        setnewsubname(suballname);
      }
    }
  };
  const handleselectedvalue1 = (value, num, inn) => {
    setActiveIndex("");
    console.log(value);
    console.log(num);
    console.log(inn);
    console.log(suballname[1]);
    const index = suballname.map((i) => i).indexOf(value);
    console.log(index);
    const data = value;
    if (index == -1) {
      if (suballname[inn] == "undefined") {
        if (suballname.length < num) {
          const dataf = suballname.concat(data);
          setsuballname(dataf);
          console.log(dataf);
        }
      } else {
        suballname[inn] = data;
        // setsuballname(data1);
        console.log(suballname);
        let arr = [];
        setnewsubname(suballname);
      }
    }
    setActiveIndex2("");
  };
  // console.log(newsubname);

  const cart = (id) => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;

      fetch(`${apiKey}api/cart/checkusercart/${cart_data}&${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setdatass(data)
          if (data == true) {
            // console.log(datass);
            const res = axios({
              method: "post",
              url: apiKey + "api/cart/addtocart",
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
                  console.log(data);
                  var d = data.map((i) => setcartnmber(i.totalquantity));
                });
            }, 500);
          } else if (data == false) {
            // alert('hii')
            notify("Out of Stock");
          }
        });
    } else {
      notify("Login first");
      router.push("/login");
    }
  };

  const buynowproduct = (id) => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      fetch(`${apiKey}api/cart/checkusercart/${cart_data}&${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setdatass(data)
          if (data == true) {
            // console.log(datass);
            const res = axios({
              method: "post",
              url: apiKey + "api/cart/addtocart",
              data: {
                userId: cart_data,
                itemId: id,
                quantity: 1,
              },
            });
            // notify("Add to cart successfully");
            router.push("/checkout");
          } else if (data == false) {
            // alert('hii')
            notify("Out of Stock");
          }
        });
    } else {
      notify("Login first");
      router.push("/login");
    }
  };

  const all = (e) => {
    e.preventDefault();
    product();
    setClose(true);
    setCloses(true);
  };
  const handleRemoveItem = (e, i, filterdata) => {
    console.log(filterdata);
    console.log(i);
    setActiveIndex(i);
    const id = newsubname.indexOf(filterdata);
    const removedDrink = newsubname.splice(id, 1);
    // const y = newsubname.splice(i, 1)
    setnewsubname(newsubname);
    console.log(removedDrink);
    console.log(newsubname);
    product();
    if (newsubname.length <= 0) {
      setClose(false);
    }
  };
  const handleRemoveItemall = (e) => {
    while (newsubname.length > 0) {
      newsubname.pop();
    }

    console.log(e);
    e.target.value = "";
    product();
    setClose(false);
    setCloses(true);
  };
  console.log(newsubname);
  const filtersData = (values) => {
    console.log(fvalue);
    setClose(true);
    setCloses(false);
    axios({
      method: "POST",
      url: `${apiKey}api/product/filterpro/${values}`,

      data: {
        filtername: "Cricket",
      },
    })
      .then((res) => {
        console.log("res", res.data);
        setProductData(res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  const closedmenu = () => {
    setmobile(false);
  };
  const openmenu = () => {
    setmobile(true);
  };
  const closemenu = () => {
    setwindow(false);
  }
  const opendmenu = () => {
    setwindow(true);
  }
  // const App = () =>{
  //   const scrollRef = useRef();
  // }
  const applyFilters = (proData) => {
    const minPrice = value[0];
    const maxPrice = value[1];

    let updatedList = proData.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
    console.log(updatedList);

    setProductData(updatedList);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  const loaderstart = () => {
    setloaderssss(true);
  };

  const Loadings = () => {
    return (
      <>
        <Head>
          <link rel="canonical" href={canonicalURL} />
        </Head>
        <div className="div_flex">
          <div className="skeltonstructre">
            <Skeleton height={300} />
            <div className="skeltondesc">
              <Skeleton height={40} />
            </div>
            <div className="d-flex align-items-center">
              <div className="imgpricess">
                <Skeleton height={25} width={25} />
              </div>
              <div className="namesskelton">
                <Skeleton height={25} width={200} />
              </div>
            </div>
            <div className="buynowskelton">
              <Skeleton height={30} />
            </div>
          </div>
          <div className="skeltonstructre">
            <Skeleton height={300} />
            <div className="skeltondesc">
              <Skeleton height={40} />
            </div>
            <div className="d-flex align-items-center">
              <div className="imgpricess">
                <Skeleton height={25} width={25} />
              </div>
              <div className="namesskelton">
                <Skeleton height={25} width={200} />
              </div>
            </div>
            <div className="buynowskelton">
              <Skeleton height={30} />
            </div>
          </div>
          <div className="skeltonstructre">
            <Skeleton height={300} />
            <div className="skeltondesc">
              <Skeleton height={40} />
            </div>
            <div className="d-flex align-items-center">
              <div className="imgpricess">
                <Skeleton height={25} width={25} />
              </div>
              <div className="namesskelton">
                <Skeleton height={25} width={200} />
              </div>
            </div>
            <div className="buynowskelton">
              <Skeleton height={30} />
            </div>
          </div>
          <div className="skeltonstructre">
            <Skeleton height={300} />
            <div className="skeltondesc">
              <Skeleton height={40} />
            </div>
            <div className="d-flex align-items-center">
              <div className="imgpricess">
                <Skeleton height={25} width={25} />
              </div>
              <div className="namesskelton">
                <Skeleton height={25} width={200} />
              </div>
            </div>
            <div className="buynowskelton">
              <Skeleton height={30} />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{ background: "#121212" }}>
      {/* <Head>
        <meta name="viewport" content={postData.metadescription} />
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content={postData.metadescription}></meta>
        <meta name="keywords" content={postData.metakeyword}></meta>
        <meta name="title" content={postData.metatitle} />
        <meta name="robots" content="index, follow" />
        <title>{postData.metatitle}</title>
      </Head> */}

      <Header color="#000" inputs={true} />

      <div
        className="first_class_productlisting"
        style={{ backgroundcolor: "#121212" }}
      >
        <div className={`lodersouter ${loaderssss ? "active" : ""}`}>
          <div className="innerloaders">
            <div className="loader"></div>
          </div>
        </div>
        <div className="alerts">
          <ToastContainer />
        </div>
        <div className="productlist1">
          <div
            style={{
              background: `url(${cover})`,
              marginTop: "23px",
            }}
            className="logo_product_style"
          >
            <img src={logo} style={{ width: "30%", height: "30%" }} />
          </div>

          <div className="productlist">
            <div className="opecity">
              <div className="display_none">
                <div className={`slide_baar ${window ? "active" : ""}`}>
                  <div onClick={closemenu} className="close1">
                    <CloseIcon />

                  </div>
                  <div className="filter_icon1" >
                    <p className="filter_style1">Filters</p>
                    <FilterAltOutlinedIcon />
                  </div>
                  <div className="selectboxes">

                      {filterdata1.map((outer, index1) => (
                        <>
                          {filterdata.map((inn, index3) => (
                            <>
                              {index1 === index3 ? (
                                <div>
                                  <div
                                    className={`singleselect ${activeIndex2 === index1 ? "active" : ""}`}
                                    onClick={() => changeicon(index1)}
                                  >
                                    <label className="singlelabel">
                                      {outer.name}
                                    </label>
                                    <div
                                      className="Select_div"
                                    // onClick={() => changeicon(index1)}
                                    >
                                      {activeIndex2 === index1 ? (
                                        <ExpandLessOutlinedIcon />
                                      ) : (
                                        <ExpandMoreOutlinedIcon />
                                      )}
                                    </div>
                                  </div>
                                  <div className={`scroll ${activeIndex2 === index1 ? "active" : ""}`}>

                                    {inn.map((inss) => (
                                      <div
                                      className={`filter_name_style ${activeIndex2 === index1 ? "active" : ""}`}

                                      >
                                      
                                      <div
                                        // className={`filter_name_style ${activeIndex2 === index1 ? "active" : ""}`}
                                        onClick={(e) => {
                                          handleselectedvalue1(
                                            e.target.innerText,
                                            filterdata1.length,
                                            index3
                                          ),
                                            filtersData(e.target.innerText);
                                        }}
                                      >

                                        <p value={inss.name}>{inss.name}</p>
                                      </div>
                                      </div>
                                    ))}
                                  </div>
                                  {/* <div className="conainer">
                                   <button onClick={() => scrollToRef.current.scrollIntoView()}>
                                    
                                   </button>
                                  </div> */}
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </>
                      ))}
                    </div>
                </div>

                <div className={`box_style ${mobile ? "active" : ""}`}>
                  <div onClick={closedmenu} className="close">
                    <CloseIcon />
                  </div>
                  <div className="filter_icon_style_product">
                    <p className="filter_style_text">Filters</p>
                    <FilterAltOutlinedIcon />
                  </div>

                  <div className="top_bar">
                    <div className="slidertwo">
                      <div className="div_box_style">
                        <p className="color2">Filter by Price</p>
                      </div>
                      <div className="sliderfrontend">
                        <AirbnbSlider
                          getAriaLabel={() => "Temperature range"}
                          value={value}
                          onChange={handleChange}
                          getAriaValueText={valuetext}
                          max={maxn}
                          min={minn}
                        />
                        <div className="filter_text">
                          <p className="filter_price_color">Price :</p>
                          <p className="filter_value">
                            {" "}
                            $ {value[0]} - $ {value[1]}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="selectboxes">
                      {filterdata1.map((outer, index1) => (
                        <>
                          {filterdata.map((inn, index2) => (
                            <>
                              {index1 === index2 ? (
                                <div className="singleselect">
                                  {/* <label className="singlelabel">
                                          {outer.name}
                                        </label> */}
                                  <select
                                    className="Select_div"
                                    ref={selectInputRef}
                                    key={index2}
                                    onChange={(e) => {
                                      handleselectedvalue(
                                        e.target.value,
                                        filterdata1.length,
                                        index2
                                      ),
                                        filtersData(e.target.value);
                                    }}
                                  >
                                    <option value={""} selected hidden>
                                      {" "}
                                      {outer.name}
                                    </option>
                                    {inn.map((inns) => (
                                      <option value={inns.name}>
                                        {inns.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="outerfilterdiv">
                  <div className="mobiledilter">
                    <div className="filter_icon_style_product1">
                      <FilterAltOutlinedIcon />
                    </div>
                    <div className="div_box_style2" onClick={openmenu}>
                      <p className="color3">Filters</p>
                    </div>

                  </div>
                  <div className="leftboxfilter">
                    <div className="filtericons" onClick={opendmenu}>
                      <p className="filter_style_text">Filters</p>
                      <FilterAltOutlinedIcon />
                    </div>
                    {/* <div className="selectboxes">
                      {filterdata1.map((outer, index1) => (
                        <>
                          {filterdata.map((inn, index3) => (
                            <>
                              {index1 === index3 ? (
                                <div style={{ width: "30%" }}>
                                  <div
                                    className={`singleselect ${activeIndex2 === index1 ? "active" : ""}`}
                                    onClick={() => changeicon(index1)}
                                  >
                                    <label className="singlelabel">
                                      {outer.name}
                                    </label>
                                    <div
                                      className="Select_div"
                                    // onClick={() => changeicon(index1)}
                                    >
                                      {activeIndex2 === index1 ? (
                                        <ExpandLessOutlinedIcon />
                                      ) : (
                                        <ExpandMoreOutlinedIcon />
                                      )}
                                    </div>
                                  </div>
                                  <>
                                    {inn.map((inss) => (
                                      <div
                                        className={`filter_name_style ${activeIndex2 === index1 ? "active" : ""}`}
                                        onClick={(e) => {
                                          handleselectedvalue1(
                                            e.target.innerText,
                                            filterdata1.length,
                                            index3
                                          ),
                                            filtersData(e.target.innerText);
                                        }}
                                      >
                                        <p value={inss.name}>{inss.name}</p>
                                      </div>
                                    ))}
                                  </>

                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </>
                      ))}
                    </div> */}
                  </div>

                  <div className="filter_style_price">
                    <select className="Select_div1" onChange={sortnew}>
                      <option value="none" hidden selected>
                        Sort By
                      </option>
                      <option value="Approved">Newest product</option>
                    </select>
                    <div className="sliderone">
                      <div className="div_box_style">
                        <p className="color2">Filter by Price</p>
                      </div>
                      <div className="sliderfrontend">
                        <AirbnbSlider
                          getAriaLabel={() => "Temperature range"}
                          value={value}
                          onChange={handleChange}
                          // valueLabelDisplay="on"
                          getAriaValueText={valuetext}
                          max={maxn}
                          min={minn}
                        />
                        <div className="filter_text">
                          <p className="filter_price_color">Price :</p>
                          {checkcurrencyslocal ? (
                            <p className="filter_value">
                              {Math.round(
                                (value[0] * currencys + Number.EPSILON) * 100
                              ) / 100}
                              {currencyslocal}-
                              {Math.round(
                                (value[1] * currencys + Number.EPSILON) * 100
                              ) / 100}
                              {currencyslocal}
                            </p>
                          ) : (
                            <p className="filter_value">
                              {Math.round(
                                (value[0] * currencys + Number.EPSILON) * 100
                              ) / 100}
                              USD -
                              {Math.round(
                                (value[1] * currencys + Number.EPSILON) * 100
                              ) / 100}
                              USD
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="div_filter_product">
                    <div className="filter_product">
                      {newsubname.length > 0 ? (
                        <>
                          {newsubname.map((filterdata, i) => (
                            <>
                              <div
                                // className={` filter_contener ${activeIndex === i ? "active" : ""
                                // }  `}
                                className="filter_contener"
                                key={i}
                              >
                                {filterdata}
                              </div>

                              <div
                                onClick={(e) =>
                                  handleRemoveItem(e, i, filterdata)
                                }
                                className="iconclose"
                                // className={`iconclose ${activeIndex === i ? "active" : ""}`}
                                key={i}
                              >
                                <CloseIcon />
                              </div>
                            </>
                          ))}
                        </>
                      ) : (
                        ""
                      )}

                      <div
                        onClick={(e) => handleRemoveItemall(e)}
                        className={`all_clear_filter ${close ? "active" : ""}`}
                      >
                        <p>Clear all filter</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {skeltonload ? (
                <Loadings />
              ) : (
                <>
                  {productdata.length <= 0 && (
                    <div className="no_product">
                      <h1 style={{ color: "#fff" }}>No products were found.</h1>
                    </div>
                  )}
                  <div className="div_flex">
                    {/* {currentPosts.map((produts) => ( */}
                    {(rowsPerPage > 0
                      ? productdata.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : productdata
                    ).map((produts) => (
                      <div className="list_item">
                        <div className="image_show">
                          <div className="innerimageshow" onClick={loaderstart}>
                            <Link
                              href={{
                                pathname: `/description/${produts.metaurl}`,
                              }}
                              prefetch={true}
                              passHref
                            >
                              <img src={produts.images[0]} />
                            </Link>
                          </div>

                          <div
                            className="icon_mall_style"
                            onClick={() => cart(produts._id)}
                          >
                            <LocalMallIcon className="icon_style_product" />
                          </div>
                        </div>
                        <div className="title_top_space">
                          <Link href={`/description/${produts.metaurl}`}>
                            <p className="title_style_product">
                              {produts.productname}{" "}
                            </p>
                          </Link>
                        </div>
                        <div className="game_name">
                          <p className="color_game">Game :</p>
                          <p className="title_style_product1">
                            {produts.category.name}
                          </p>
                        </div>
                        <div className="button_contener">
                          <div className="seller_u">
                            <p className="color1">Seller</p>
                            <Tooltip
                              title={produts.userId.fullname}
                              placement="top"
                            >
                              <div className="seller_style">
                                <img src={produts.userId.image} />
                              </div>
                            </Tooltip>
                          </div>
                          <div className="text_style_product">
                            <p className="color1">Price</p>

                            {checkcurrencyslocal ? (
                              <div className="usd_style">
                                <h3 className="color">
                                  {Math.round(
                                    (produts.price * currencys +
                                      Number.EPSILON) *
                                    100
                                  ) / 100}
                                  {/* {`${produts.price * currencys}`} */}
                                </h3>
                                <p className="usd_style_p">{currencyslocal}</p>
                              </div>
                            ) : (
                              <div className="usd_style">
                                <h3 className="color">
                                  {Math.round(
                                    (produts.price * currencys +
                                      Number.EPSILON) *
                                    100
                                  ) / 100}
                                  {/* {`${produts.price * currencys}`} */}
                                </h3>
                                <p className="usd_style_p">USD</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="product_buy"
                          onClick={() => {
                            buynowproduct(produts._id);
                          }}
                        >
                          Buy now
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* <div className="list_item"></div> */}
              {/* <div className="list_item"></div> */}
              <div className="page">
                <Stack spacing={2}>
                  <TablePagination
                    count={productdata.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
        <div className="text_area_boundary">
          <div className="opecity2">
            <div className="text_area_style">
              <div
                className="box_stylec"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="text_area_boundary">
          <div className="opecity2">
            <div className="text_area_style1">
              <div className="box_stylec">
                <div className="faqline_style">
                  {/* <div className="faqline"></div> */}
                  <div className="faq_style">FAQ</div>
                  <div className="faqline"></div>
                </div>
                {faqquestion.map((ques, index) => (
                  <>
                    {faqanswer.map((ans, index2) => (
                      <>
                        {index === index2 ? (
                          <>
                            <div
                              className={`faq_text_style ${activeIndex1 === index ? "active" : ""
                                }`}
                              onClick={() => chnageicon(index)}
                            >
                              <p
                                className="text_color_style"
                                dangerouslySetInnerHTML={{
                                  __html: ques,
                                }}
                              ></p>
                              <div className="faq_icon_position">
                                {activeIndex1 === index ? (
                                  <ExpandLessOutlinedIcon />
                                ) : (
                                  <ExpandMoreOutlinedIcon />
                                )}
                              </div>
                            </div>
                            <div
                              className={`faq_answer_style ${activeIndex1 === index ? "active" : "unactive"
                                }`}
                              dangerouslySetInnerHTML={{
                                __html: ans,
                              }}
                            ></div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
// export async function getStaticProps({ params }) {
//   const apiKey = process.env.NEXT_PUBLIC_API_URL;

//   const pid = params.productListing;
//   const res = await fetch(
//     `${apiKey}api/category/categorydetails/${pid}`
//   );
//   const postData = await res.json();

//   return {
//     props: {
//       postData,
//     },
//   };
// }
// export async function getStaticPaths() {
//   const apiKey = process.env.NEXT_PUBLIC_API_URL;

//   const res = await fetch(
//     apiKey +"api/category/allbasecategory/"
//   );
//   const postData = await res.json();
//   console.log(postData.result);
//   const paths = postData.map((book) => ({
//     params: { productListing: book.metaurl },
//   }));
//   return { paths, fallback: false };
// }

export default ProductListing;
export async function getServerSideProps({ query }) {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const pid = query.productlisting;
  const pageRequest = `${apiKey}api/category/categorydetails/${query.productlisting}`;
  const res = await fetch(pageRequest);
  const postData = await res.json();

  return {
    props: {
      postData,
      pid,
    },
  };
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
