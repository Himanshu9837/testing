import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Stack from "@mui/material/Stack";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import Footer from "../../components/molecule/Footer/footer";
import Header from "../../components/molecule/Navbar2/Navbarhome";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Contextapi from "../../Context/Contextapi.js";

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
function TablePaginationActions1(props) {
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
TablePaginationActions1.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
function TablePaginationActions2(props) {
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
TablePaginationActions2.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function VendorProfile  () {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { setcartnmber, currencys, checkcurrencyslocal, currencyslocal } =
    useContext(Contextapi);
  const { query } = useRouter();
  const router = useRouter();

  const [sidebarView, setSidebarView] = useState(false);
  const [data, setData] = useState([]);
  const [sold, setSold] = useState([]);
  const [files, setFiles] = useState([]);
  const [cover, setCover] = useState("");
  const [image, setImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [dateuser, setDateuser] = useState("");
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [sellerstatus, setsellerstatus] = useState();
  const [userid, setUserId] = useState();
  const [listitem, setListitem] = useState([]);

  const [page, setPage] = React.useState(0);
  const [page1, setPage1] = React.useState(0);
  const [page2, setPage2] = React.useState(0);
  const [change, setChange] = useState(true);
  const [about, setAbout] = useState("");

  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [rowsPerPage1, setRowsPerPage1] = React.useState(12);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(12);
  const [check, setchecck] = useState("");
  const [checks, setcheccks] = useState("");
  const [trues, setTrues] = useState("");
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const [likebuyer, setLikebuyer] = useState("");
  const [dislikebuyer, setDislikebuyer] = useState("");
  const changeui = () => {
    setChange(!change);
    // setChange1(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };
  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const UserDatas = async () => {
    if (router.isReady) {
      const data = router.query.userprofile;

      let userId = await fetch(apiKey + "api/userprofile/" + data);
      userId = await userId.json();
      console.log(userId);
      setFullname(userId.result.fullname);
      setCover(userId.result.coverimage);
      setImage(userId.result.image);
      setDateuser(userId.result.date);
      setUserId(userId.result._id);
      setAbout(userId.result.about);
    }
  };
  const purchesitem = async () => {
    let userId = await fetch(apiKey + "api/order/buyerorderlist/" + userid);
    userId = await userId.json();
    console.log(userId.orderlist);
    setData(userId.orderlist);
  };
  const reating = async (sellerid) => {
    let userId = await fetch(apiKey + "api/rating/fetchrating/" + sellerid);
    userId = await userId.json();
    console.log(userId);
    setLike(userId.like);
    setDislike(userId.dislike);
  };
  const reatingbuyer = async (buyerid) => {
    let userId = await fetch(apiKey + "api/rating/fetchbuyerrating/" + buyerid);
    userId = await userId.json();
    console.log(userId);
    setLikebuyer(userId.like);
    setDislikebuyer(userId.dislike);
  };

  const badgecondition = async (userid) => {
    let sellerId = await fetch(apiKey + "api/badges/applybadges/" + userid);
    sellerId = await sellerId.json();
    console.log(sellerId);
    setchecck(sellerId.checkdata.slice(-1));
    setcheccks(sellerId.verified);
  };
  const badgeconditiontrue = async () => {
    let sellerId = await fetch(apiKey + "api/badges/fetchbadgesconfig");
    sellerId = await sellerId.json();
    console.log(sellerId);
    setTrues(sellerId.badgesenablesetting);
  };

  const solditem = async (userid) => {
    getsellerstatus(userid);
    badgecondition(userid);
    let userId = await fetch(apiKey + "api/order/sellerorderlist/" + userid);
    userId = await userId.json();
    console.log(userId.orderlist);
    setSold(userId.orderlist);
  };
  const getsellerstatus = async (userid) => {
    let sellerId = await fetch(apiKey + "api/seller/sellerdetails/" + userid);
    sellerId = await sellerId.json();
    console.log(sellerId._id);
    setsellerstatus(sellerId.sellerapprovalstatus);
    listeditem(sellerId._id);
    reating(sellerId._id);
  };

  const listeditem = async (id) => {
    let sellerId = await fetch(apiKey + "api/seller/sellerproductlist/" + id);
    sellerId = await sellerId.json();
    console.log(sellerId);
    setListitem(sellerId.list);
  };
  console.log(sold);
  useEffect(() => {
    UserDatas();
    purchesitem(userid);
    solditem(userid);
    badgeconditiontrue();
    reatingbuyer(userid);
  }, [router.isReady, userid]);
  return (
    <div style={{ background: "#121212" }}>
      <Header />
      <div className="vendor-cover">
        <div className="bg-size">
          <div className="div-17">
            <img src={cover} className="cover_style" />
          </div>
        </div>
      </div>
      <div className="sizecontainer">
        <div className="div-13">
          <section className="vendor-profile">
            <div className="profile-left">
              <div className="profile-image">
                <div>
                  <img
                    src={image}
                    style={{
                      height: "170px",
                      width: "170px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="username_style">
              <div className="profile-detail">
                <div className="full_style">
                  <h4 style={{ fontSize: "16px" }}>{fullname}</h4>
                  {checks.length > 0 ? (
                    <img
                      src={checks}
                      alt="Verified Badge"
                      className="verifiediconbadge"
                    />
                  ) : (
                    ""
                  )}
                </div>
                {/* <p className="date_Tyle">Since {dateuser}</p> */}
              </div>
              <div className="reating_style">
                {sellerstatus ? (
                  <div className="rating_style">
                    <p style={{ fontSize: "13px" }}>Seller rating</p>
                    {/* <p className="date_Tyle">Out of 0 order</p> */}

                    <div className="like_style">
                      <ThumbUpIcon />
                      <p className="date_Tyle1">{like}</p>
                    </div>
                    <div className="dislike_style">
                      <ThumbDownAltIcon />
                      <p className="date_Tyle1">{dislike}</p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="rating_style">
                  <p style={{ fontSize: "13px" }}>Buyer reating</p>
                  {/* <p className="date_Tyle">Out of 0 order</p> */}
                  <div className="like_style">
                    <ThumbUpIcon />
                    <p className="date_Tyle1">{likebuyer}</p>
                  </div>
                  <div className="dislike_style">
                    <ThumbDownAltIcon />
                    <p className="date_Tyle1">{dislikebuyer}</p>
                  </div>
                </div>
              </div>
              {trues ? (
                <div className="bud_style">
                  {check.length > 0 ? (
                    <>
                      <p>Badges</p>
                      <div className="icon_style">
                        <img src={check} />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </section>
          <div className="tabu_style">
            <div className="about_style_div">
              <div className="about_data">
                <h4 style={{color:"#fff"}}>About</h4>
                <p>{about} </p>
              </div>
            </div>
            <div className="change_style">
              <Box sx={{ bgcolor: "background.paper" }}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    // variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    {sellerstatus ? (
                      <Tab label="Listed Items" {...a11yProps(0)} />
                    ) : (
                      ""
                    )}
                    {sellerstatus ? (
                      <Tab label="Sold Product" {...a11yProps(1)} />
                    ) : (
                      ""
                    )}
                    <Tab label="Purchased Order" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <div onClick={changeui} className="view_style">
                  <FlipCameraAndroidIcon />
                </div>
                {sellerstatus ? (
                  <>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <div className={`${change ? "changefr1" : "changefr"}`}>
                        {listitem.length > 0 &&
                          (rowsPerPage > 0
                            ? listitem.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : listitem
                          ).map((item) => (
                            <div
                              className={`${
                                change
                                  ? "divided_style_pur1"
                                  : "divided_style_pur"
                              }`}
                            >
                              <Link href={`/description/${item.metaurl}`}>
                                <div
                                  className={` ${
                                    change ? "pur_style1" : "pur_style"
                                  }`}
                                >
                                  <img
                                    src={item.images[0]}
                                    className="img_purches"
                                  />
                                </div>
                              </Link>
                              <div
                                className={` ${
                                  change ? "style_restitem1" : "style_restitem"
                                }`}
                              >
                                <p className="length">{item.productname}</p>
                                {checkcurrencyslocal ? (
                                  <div className="usd_style">
                                    <h3 className="color">
                                      {Math.round(
                                        (item.price * currencys +
                                          Number.EPSILON) *
                                          100
                                      ) / 100}
                                    </h3>
                                    <p className="usd_style_p">
                                      {currencyslocal}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="usd_style">
                                    <h3 className="color">
                                      {Math.round(
                                        (item.price * currencys +
                                          Number.EPSILON) *
                                          100
                                      ) / 100}
                                    </h3>
                                    <p className="usd_style_p">USD</p>
                                  </div>
                                )}
                                <p style={{ marginTop: "3px" }}>
                                  {" "}
                                  Stock : {item.stock}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="table_center_style">
                        <Stack spacing={2}>
                          <TablePagination
                            count={listitem.length}
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
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className={`${change ? "changefr1" : "changefr"}`}>
                      {(rowsPerPage > 0
                        ? sold.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : sold
                      ).map((item) => (
                        <div
                          className={`${
                            change ? "divided_style_pur1" : "divided_style_pur"
                          }`}
                        >
                          {console.log(item.productId)}
                          <Link href={`/description/${item.metaurl}`}>
                            <div
                              className={` ${
                                change ? "pur_style1" : "pur_style"
                              }`}
                            >
                              <img
                                src={item.productId.images[0]}
                                className="img_purches"
                              />
                            </div>
                          </Link>
                          <div
                            className={` ${
                              change ? "style_restitem1" : "style_restitem"
                            }`}
                          >
                            <p className="length">
                              {item.productId.productname}
                            </p>
                            {checkcurrencyslocal ? (
                              <div className="usd_style">
                                <h3 className="color">
                                  {Math.round(
                                    (item.productId.price * currencys +
                                      Number.EPSILON) *
                                      100
                                  ) / 100}
                                </h3>
                                <p className="usd_style_p">{currencyslocal}</p>
                              </div>
                            ) : (
                              <div className="usd_style">
                                <h3 className="color">
                                  {Math.round(
                                    (item.productId.price * currencys +
                                      Number.EPSILON) *
                                      100
                                  ) / 100}
                                </h3>
                                <p className="usd_style_p">USD</p>
                              </div>
                            )}
                            <p>
                              {item.order_status === "Pending" ? (
                                <p style={{ color: "#eb2f06" }}>
                                  {item.order_status}
                                </p>
                              ) : item.order_status === "Processing" ? (
                                <p style={{ color: "yellow" }}>
                                  {item.order_status}
                                </p>
                              ) : item.order_status === "Complete" ? (
                                <p style={{ color: "green" }}>
                                  {item.order_status}
                                </p>
                              ) : item.order_status === "Delivered" ? (
                                <p style={{ color: "orange" }}>
                                  {item.order_status}
                                </p>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="table_center_style">
                      <Stack spacing={2}>
                        <TablePagination
                          count={sold.length}
                          rowsPerPage={rowsPerPage1}
                          page={page1}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage1}
                          onRowsPerPageChange={handleChangeRowsPerPage1}
                          ActionsComponent={TablePaginationActions1}
                        />
                      </Stack>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                  <div className={`${change ? "changefr1" : "changefr"}`}>
                    {(rowsPerPage > 0
                      ? data.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : data
                    ).map((item) => (
                      <div
                        className={`${
                          change ? "divided_style_pur1" : "divided_style_pur"
                        }`}
                      >
                        <Link href={`/description/${item.metaurl}`}>
                          <div
                            className={` ${
                              change ? "pur_style1" : "pur_style"
                            }`}
                          >
                            <img
                              src={item.productId.images[0]}
                              className="img_purches"
                            />
                          </div>
                        </Link>
                        <div
                          className={` ${
                            change ? "style_restitem1" : "style_restitem"
                          }`}
                        >
                          <p className="length">{item.productId.productname}</p>
                          {checkcurrencyslocal ? (
                            <div className="usd_style">
                              <h3 className="color">
                                {Math.round(
                                  (item.productId.price * currencys +
                                    Number.EPSILON) *
                                    100
                                ) / 100}
                              </h3>
                              <p className="usd_style_p">{currencyslocal}</p>
                            </div>
                          ) : (
                            <div className="usd_style">
                              <h3 className="color">
                                {Math.round(
                                  (item.productId.price * currencys +
                                    Number.EPSILON) *
                                    100
                                ) / 100}
                              </h3>
                              <p className="usd_style_p">USD</p>
                            </div>
                          )}
                          <p>
                            {item.order_status === "Pending" ? (
                              <p style={{ color: "#eb2f06" }}>
                                {item.order_status}
                              </p>
                            ) : item.order_status === "Processing" ? (
                              <p style={{ color: "yellow" }}>
                                {item.order_status}
                              </p>
                            ) : item.order_status === "Complete" ? (
                              <p style={{ color: "green" }}>
                                {item.order_status}
                              </p>
                            ) : item.order_status === "Delivered" ? (
                              <p style={{ color: "orange" }}>
                                {item.order_status}
                              </p>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="table_center_style">
                    <Stack spacing={2}>
                      <TablePagination
                        count={data.length}
                        rowsPerPage={rowsPerPage2}
                        page={page2}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage2}
                        onRowsPerPageChange={handleChangeRowsPerPage2}
                        ActionsComponent={TablePaginationActions2}
                      />
                    </Stack>
                  </div>
                </TabPanel>
                  </>
                ) : (
                  <TabPanel value={value} index={0} dir={theme.direction}>
                  <div className={`${change ? "changefr1" : "changefr"}`}>
                    {(rowsPerPage > 0
                      ? data.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : data
                    ).map((item) => (
                      <div
                        className={`${
                          change ? "divided_style_pur1" : "divided_style_pur"
                        }`}
                      >
                        <Link href={`/description/${item.metaurl}`}>
                          <div
                            className={` ${
                              change ? "pur_style1" : "pur_style"
                            }`}
                          >
                            <img
                              src={item.productId.images[0]}
                              className="img_purches"
                            />
                          </div>
                        </Link>
                        <div
                          className={` ${
                            change ? "style_restitem1" : "style_restitem"
                          }`}
                        >
                          <p className="length">{item.productId.productname}</p>
                          {checkcurrencyslocal ? (
                            <div className="usd_style">
                              <h3 className="color">
                                {Math.round(
                                  (item.productId.price * currencys +
                                    Number.EPSILON) *
                                    100
                                ) / 100}
                              </h3>
                              <p className="usd_style_p">{currencyslocal}</p>
                            </div>
                          ) : (
                            <div className="usd_style">
                              <h3 className="color">
                                {Math.round(
                                  (item.productId.price * currencys +
                                    Number.EPSILON) *
                                    100
                                ) / 100}
                              </h3>
                              <p className="usd_style_p">USD</p>
                            </div>
                          )}
                          <p>
                            {item.order_status === "Pending" ? (
                              <p style={{ color: "#eb2f06" }}>
                                {item.order_status}
                              </p>
                            ) : item.order_status === "Processing" ? (
                              <p style={{ color: "yellow" }}>
                                {item.order_status}
                              </p>
                            ) : item.order_status === "Complete" ? (
                              <p style={{ color: "green" }}>
                                {item.order_status}
                              </p>
                            ) : item.order_status === "Delivered" ? (
                              <p style={{ color: "orange" }}>
                                {item.order_status}
                              </p>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="table_center_style">
                    <Stack spacing={2}>
                      <TablePagination
                        count={data.length}
                        rowsPerPage={rowsPerPage2}
                        page={page2}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage2}
                        onRowsPerPageChange={handleChangeRowsPerPage2}
                        ActionsComponent={TablePaginationActions2}
                      />
                    </Stack>
                  </div>
                </TabPanel>
                )}
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
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
