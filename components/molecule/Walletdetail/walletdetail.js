import React, { useState, useEffect, useContext } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DoneIcon from "@mui/icons-material/Done";
import Logo from "../../../public/images/paypalwallet.png";
import Checked from "../../../public/images/checked_1.png";
import Bank from "../../../public/images/bankwallet.webp";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
// import Popup from "../Popup/Popup.js";
import Contextapi from "../../../Context/Contextapi.js";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Checkeds from "../../../public/images/done.gif";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

toast.configure();
const notify = (message) => toast(message);
export default function walletdetail() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const { checkcurrencyslocal, currencys, currencyslocal } =
    useContext(Contextapi);

  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [value, setValue] = React.useState("1");
  const [sellerstatus, setsellerstatus] = useState();
  const [arrfile, setarrfile] = useState([]);
  const [uploaded, setuploaded] = useState(false);
  const [uploadeds, setuploadeds] = useState(false);
  const [withdrawstatus, setWithdrawstatus] = useState();
  const [paytime, setTimepal] = useState(false);
  const [picture, setPicture] = useState([]);
  const [picture1, setPicture1] = useState([]);
  const [userid1, setiddata] = useState();
  const [sellerId, setSellerId] = useState("");
  const [withdrawapproval, setWithdrawapproval] = useState();
  const [isselect, setisselect] = useState("");
  const [prices, setprices] = useState("");
  const [selecttopup, setselecttopup] = useState("");
  const [userid, setuserId] = useState("");
  const [selleravaliable, setSelleravaliable] = useState("");
  const [disable, setdisbale] = useState(true);
  const [continuebtn, setcotinuebtn] = useState(false);
  const [cont, setconst] = useState(true);
  const [sucessfull, setSucessfull] = useState([]);
  const [float, setFloat] = useState([]);
  const [request, setRequest] = useState([]);
  const [balance, setBalance] = useState([]);
  const [enteramount, setEnteramount] = useState("");
  const [methad, setMethad] = useState("");
  const [paydetail, setPaydetail] = useState("");
  const [bank, setBank] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountholdername, setAccountholdername] = useState("");
  const [paymentcheck, setPaymentcheck] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [showpopup, setshowpopus] = useState(false);
  const [approvals, setapprovals] = useState();
  const [loaders, setloaders] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [withdrawaldocuments, setWithdrawaldocuments] = useState([]);
  const [withdrawalidentity, setWithdrawalidentity] = useState([]);
  const [iswithdrawaldocuments, setIswithdrawaldocuments] = useState("");
  const [iswithdrawalidentity, setIswithdrawalidentity] = useState("");
  const [withdrawalcontent, setWithdrawalcontent] = useState("");
  const [cashfree, setCashfree] = useState(false);
  const [{ alt1, src1 }, setImg2] = useState({
    src1: "",
    alt1: "Upload an Image",
  });
  const [{ alt2, src2 }, setImg3] = useState({
    src1: "",
    alt1: "Upload an Image",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const changeicon = () => {
    setOpen(!open);
  };
  const changeicon1 = () => {
    setOpen1(!open1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showdiv = () => {
    setShow(!show);
    setShow1(true);
    setMethad("paypal");
  };
  const showdiv1 = () => {
    setShow1(!show1);
    setShow(true);
    setMethad("bank");
  };
  const showdiv2 = () => {
    setCashfree(!cashfree);
  };
  const onclickpay = (e) => {
    setcotinuebtn(true);
    setloading(true);
    showdiv2();

    setTimeout(() => {
      setloading(false);
      setTimepal(true);
    }, 2000);
  };
  const onchangepicture = (e) => {
    let output = [];
    for (var i = 0; i < e.target.files.length; i++) {
      let filedata = e.target.files;
      if (filedata[i].size > 5000000) {
        toast.error("File Size too big");
      } else {
        output.push(filedata[i].name);

        setarrfile(output);
        setPicture(filedata);
        setuploaded(true);
      }
    }
  };

  const handlesubmitphoto = (e) => {
    e.preventDefault();
    let img1 = [picture];
    let img2 = [picture1];
    if (img1.length && img2.length >= 1) {
      const formData = new FormData();
      for (let j = 0; j < img2.length; j++) {
        formData.append("withdrawaldocuments", img2[j]);
      }
      for (let k = 0; k < img1.length; k++) {
        formData.append("withdrawalidentity", img1[k]);
      }
      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `${apiKey}api/seller/updatewithdrawaldocuments/${sellerId}`;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          setuploadeds(true);
          toast.success("Upload sucessful.");
          setarrfile([]);
          setPicture1([]);
          setPicture([]);
        })
        .catch((e) => {});
    } else {
      toast.error("Upload Please");
    }
  };

  const selleravalibility = async (userid) => {
    // setloaders(false)
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let selleravailable = await fetch(
      `${apiKey}api/seller/checkavailability/${userid}`
    );
    selleravailable = await selleravailable.json();
    setSelleravaliable(selleravailable);
  };
  const getsellerstatus = async () => {
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_dataa = d.tokenData.id;
      setuserId(cart_dataa);
      let sellerId = await fetch(
        `${apiKey}api/seller/sellerdetails/${cart_dataa}`
      );
      sellerId = await sellerId.json();

      setsellerstatus(sellerId.sellerapprovalstatus);
      setSellerId(sellerId._id);
      setWithdrawapproval(sellerId.withdrawalapprovalstatus);
      setWithdrawaldocuments(sellerId.withdrawaldocuments);
      setWithdrawalidentity(sellerId.withdrawalidentity);
      setIswithdrawaldocuments(sellerId.iswithdrawaldocuments);
      setIswithdrawalidentity(sellerId.iswithdrawalidentity);
      setWithdrawalcontent(sellerId.withdrawalcontent);
    }
  };
  const Withdrawstatus = () => {
    fetch(`${apiKey}api/seller/withdrawalverificationstatus`).then((res) => {
      res.json().then((data) => {
        // sellerId = a.json();

        setWithdrawstatus(data.result.withdrawalverfication);
      });
    });
  };
  const sucessful = (id) => {
    fetch(`${apiKey}api/seller/sellersuccessfullorder/${id}`).then((res) => {
      res.json().then((data) => {
        setSucessfull(data);
      });
    });
  };

  const requsetwithdraw = (id) => {
    fetch(`${apiKey}api/withdrawal_wallet/userwithdrawallist/${id}`).then(
      (res) => {
        res.json().then((data) => {
          setRequest(data);
        });
      }
    );
  };
  const balanceavable = (id) => {
    fetch(`${apiKey}api/withdrawal_wallet/wallettotal/${id}`).then((res) => {
      res.json().then((data) => {
        setBalance(data);
      });
    });
  };
  const submitrequest = () => {
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      const data = {
        paymethod: methad,
        paydetails: paydetail,
        amount: parseInt(enteramount),
      };
      fetch(
        `${apiKey}api/withdrawal_wallet/sellerwithdarawalrequest/${cart_data}`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          notify(data);
        })
        .catch((error) => {
          notify(error);
        });
    }
  };
  const submitrequest1 = () => {
    var dataarray = { accountholdername, bank, ifsc };
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      const data = {
        paymethod: methad,
        paydetails: dataarray,
        amount: parseInt(enteramount),
      };
      fetch(
        `${apiKey}api/withdrawal_wallet/sellerwithdarawalrequest/${cart_data}`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          notify(data);
        })
        .catch((error) => {
          notify(error);
        });
    }
  };

  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      setTimeout(() => {
        setloaders(false);
      }, 1500);
      selleravalibility(cart_data);
      getsellerstatus();
      Withdrawstatus();
      sucessful(sellerId);
      requsetwithdraw(cart_data);
      balanceavable(cart_data);
      setiddata(cart_data);
      wallet();

      // floating(sellerId);
    }
  }, [prices, sellerId]);

  React.useEffect(() => {
    console.log(sellerId);
    setTimeout(() => {
      fetch(`${apiKey}api/seller/sellerflotorders/${sellerId}`).then((res) => {
        res.json().then((data) => {
          setFloat(data);
        });
      });
    }, 2000);
  }, [sellerId]);

  const uploadfiles = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    console.log(file);
    // setupload2(file);
    setPicture(e.target.files[0]);
    if (e.target.files[0]) {
      setImg2({
        alt1: e.target.files[0].name,
        src1: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const uploadfiles1 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    console.log(file);
    // setupload2(file);
    setPicture1(e.target.files[0]);
    if (e.target.files[0]) {
      setImg3({
        alt1: e.target.files[0].name,
        src1: URL.createObjectURL(e.target.files[0]),
      });
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

  const clickcards = (index) => {
    setisselect(index);
    // setshowdetail(true);
  };

  const chnageprice = (e) => {
    e.preventDefault();

    setprices(e.target.value);
    if (e.target.value.length > 0) {
      setdisbale(false);
      setconst(false);
    } else {
      setconst(true);
      setdisbale(true);
    }
  };
  const topuposelect = (index) => {
    setselecttopup(index);
    setprices(index);
    setdisbale(false);
    setconst(false);
  };
  const closepaypals = () => {
    setTimepal(false);
    setcotinuebtn(false);
    setprices("");
    setconst(true);
  };

  // const testclick=()=>{
  //   settest(true)
  // }

  const closepopups = () => {
    setshowpopus(false);
  };
  const router = useRouter();
  return (
    <>
      {/* <div className="popups">
        <div className={`popupinner ${showpopup ? "active" : ""}`}>
          <div className="closeiconss" onClick={closepopups}>
            <CloseOutlinedIcon />
          </div>
          <div className="popupicon">
            <img
              src="/images/checked_1.png"
              alt="Not-found"
              width={20}
              height={20}
            />
          </div>
          <div className="popupdetails">
            <span className="popupdteialsinner">
              Thanks For payment Your Wallet Update soon.
            </span>
          </div>
        </div>
      </div> */}
      <div className="walletmain">
        <div className="alerts">
          <ToastContainer autoClose={2000} />
        </div>
        <div>
          <h2 className="wallet_text_style">E4GWallet</h2>
        </div>
        {loaders ? (
          <div class="loader loader1"></div>
        ) : (
          <div className="dividedive2">
            <p style={{ color: "#848484" }}>
              In our Esports4g wallet, you may rapidly recharge and withdraw
              money.
            </p>
            {withdrawapproval ? (
              ""
            ) : (
              <div className="margin_top_div">
                <div className="spacedesigen">
                  <div className="divdesign">
                    <p>Available</p>
                    <p>
                      $
                      {Math.round(
                        (balance * currencys + Number.EPSILON) * 100
                      ) / 100}
                    </p>
                  </div>
                  {withdrawapproval ? (
                    <div className="divdesign">
                      <p>Reserved</p>
                      <p>$ 0</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
            <div className="firstdiv">
              {selleravaliable ? (
                sellerstatus ? (
                  withdrawstatus ? (
                    withdrawapproval ? (
                      <div className="walletss">
                        <div className="spacedesigen">
                          <div className="divdesign">
                            <p>Available</p>
                            <p>
                              $
                              {Math.round(
                                (balance * currencys + Number.EPSILON) * 100
                              ) / 100}
                            </p>
                          </div>
                          {sellerstatus ? (
                            <div className="divdesign">
                              <p>Reserved</p>
                              <p>$ 0</p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="width">
                          <div className="givespace">
                            <p className="wallte_withdraw_style_para">
                              Withdraw To
                            </p>
                            <div className="divided_line"></div>
                          </div>
                          <div className="boxdesigen">
                            <div className="boxdesigen1" onClick={showdiv}>
                              <div
                                className={`donedesisen ${
                                  show ? "active" : ""
                                }`}
                              >
                                <DoneIcon />
                              </div>
                              <img
                                src="/images/paypalwallet.png"
                                width={40}
                                height={40}
                              />
                              <p className="fontsize_style">Paypal</p>
                            </div>
                            <div className="boxdesigen1" onClick={showdiv1}>
                              <div
                                className={`donedesisen ${
                                  show1 ? "active" : ""
                                }`}
                              >
                                <DoneIcon />
                              </div>
                              <img
                                src="/images/bankwallet.webp"
                                alt="Not-found"
                                width={40}
                                height={40}
                              />

                              <p className="fontsize_style">Bank</p>
                            </div>
                          </div>
                          <div
                            className={`amountdesign ${show ? "active" : ""}`}
                          >
                            <p>Enter amount</p>
                            <input
                              type="number"
                              className="inputdesign"
                              placeholder="amount"
                              value={enteramount}
                              onChange={(e) => setEnteramount(e.target.value)}
                            />

                            <input
                              type="text"
                              className="inputdesign"
                              placeholder="payment details"
                              onChange={(e) => setPaydetail(e.target.value)}
                            />
                            {/* <select
                          className="select"
                          onChange={(e) => setMethad(e.target.value)}
                        >
                          <option selected hidden>
                            Select Method
                          </option>
                          <option value="paypal">Paypal</option>
                          <option value="bank">Bank</option>
                        </select> */}
                            <div className={`submit ${show ? "active" : ""}`}>
                              <button
                                type="submit"
                                className="submitbutton"
                                onClick={submitrequest}
                              >
                                Submit request
                              </button>
                            </div>
                          </div>
                          <div
                            className={`amountdesign ${show1 ? "active" : ""}`}
                          >
                            <p>Enter amount</p>
                            <input
                              type="number"
                              className="inputdesign"
                              placeholder="amount"
                              value={enteramount}
                              onChange={(e) => setEnteramount(e.target.value)}
                            />

                            <input
                              type="text"
                              className="inputdesign"
                              placeholder="Account number"
                              onChange={(e) => setBank(e.target.value)}
                            />
                            <input
                              type="text"
                              className="inputdesign"
                              placeholder="IFSC code"
                              onChange={(e) => setIfsc(e.target.value)}
                            />
                            <input
                              type="text"
                              className="inputdesign"
                              placeholder="Account Holder Name"
                              onChange={(e) =>
                                setAccountholdername(e.target.value)
                              }
                            />

                            {/* <select
                          className="select"
                          onChange={(e) => setMethad(e.target.value)}
                        >
                          <option selected hidden>
                            {" "}
                            Select Method
                          </option>
                          <option value="paypal">Paypal</option>
                          <option value="bank">Bank</option>
                        </select> */}
                            <div className={`submit ${show1 ? "active" : ""}`}>
                              <button
                                type="submit"
                                className="submitbutton"
                                onClick={submitrequest1}
                              >
                                Submit request
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : withdrawaldocuments.length > 0 &&
                      withdrawalidentity.length > 0 ? (
                      <>
                        <div className="reject_style1">
                          <div className="reject_text_style">
                            <p className="reject_para_style">
                              Your application has been rejected
                            </p>
                            <img
                              src="/images/warning.png"
                              className="warning_img_style"
                            />
                            <p className="reasion_style">Reasion</p>
                            <p className="resubmit">{withdrawalcontent}</p>
                          </div>
                        </div>
                        <div className="varified_wallet_style">
                          <div className="vecome_verifed">
                            <p className="verifird_seller">
                              Complete your KYC to become verifed seller.
                            </p>
                            <div className="circle_style_page">
                              <div className="circle_div_style">
                                <p className="verified_number">1</p>
                              </div>
                              <div className="dash_gap">
                                <p className="dash_style">-------------</p>
                              </div>
                              <div className="circle_div_style">
                                <p className="verified_number">2</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {iswithdrawalidentity ? (
                          <>
                            <div className="step1_wallet" onClick={changeicon}>
                              <p className="step_color">STEP 1</p>
                              <div>
                                <p className="identity">
                                  Identity Verification
                                </p>
                              </div>
                              <div className="icon_verified">
                                {open ? (
                                  <KeyboardArrowDownRoundedIcon />
                                ) : (
                                  <KeyboardArrowUpRoundedIcon />
                                )}
                              </div>
                            </div>
                            {open ? (
                              <div className="step1_show">
                                <p className="visibal">
                                  Capture and upload your live selfie. Face must
                                  be clearly visible.
                                </p>
                                <div className="uploade_img_style">
                                  <div>
                                    <p className="upload_image_para">
                                      Upload image
                                    </p>
                                    <input
                                      type="file"
                                      onChange={(e) => uploadfiles(e)}
                                      name="file"
                                      multiple
                                    />
                                  </div>
                                  <div className="button_proceed">
                                    <button
                                      className="proceed_button_class"
                                      type="button"
                                      onClick={handlesubmitphoto}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                        {iswithdrawaldocuments ? (
                          <>
                            <div className="step1_wallet" onClick={changeicon1}>
                              <p className="step_color">STEP 2</p>
                              <div>
                                <p className="identity">
                                  Document Verification
                                </p>
                              </div>
                              <div className="icon_verified">
                                {open1 ? (
                                  <KeyboardArrowDownRoundedIcon />
                                ) : (
                                  <KeyboardArrowUpRoundedIcon />
                                )}
                              </div>
                            </div>
                            {open1 ? (
                              <div className="step1_show">
                                <p className="visibal">
                                  Capture and upload your live selfie. Face must
                                  be clearly visible.
                                </p>
                                <div className="uploade_img_style">
                                  <div>
                                    <p className="upload_image_para">
                                      Upload image
                                    </p>
                                    <input
                                      type="file"
                                      onChange={(e) => uploadfiles1(e)}
                                      name="file"
                                      multiple
                                    />
                                  </div>
                                  <div className="button_proceed">
                                    <button
                                      className="proceed_button_class"
                                      type="button"
                                      onClick={handlesubmitphoto}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <div className="account_style">
                          <p className="active_style">
                            Your account is{" "}
                            <span className="change_active_color">active</span>.
                            Complete your KYC
                          </p>
                        </div>
                        <div className="varified_wallet_style">
                          <div className="vecome_verifed">
                            <p className="verifird_seller">
                              Complete your KYC to become verifed seller.
                            </p>
                            <div className="circle_style_page">
                              <div className="circle_div_style">
                                <p className="verified_number">1</p>
                              </div>
                              <div className="dash_gap">
                                <p className="dash_style">-------------</p>
                              </div>
                              <div className="circle_div_style">
                                <p className="verified_number">2</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="step1_wallet" onClick={changeicon}>
                          <p className="step_color">STEP 1</p>
                          <div>
                            <p className="identity">Identity Verification</p>
                          </div>
                          <div className="icon_verified">
                            {open ? (
                              <KeyboardArrowDownRoundedIcon />
                            ) : (
                              <KeyboardArrowUpRoundedIcon />
                            )}
                          </div>
                        </div>
                        {open ? (
                          <div className="step1_show">
                            <p className="visibal">
                              Capture and upload your live selfie. Face must be
                              clearly visible.
                            </p>
                            <div className="uploade_img_style">
                              <div>
                                <p className="upload_image_para">
                                  Upload image
                                </p>
                                <input
                                  type="file"
                                  onChange={(e) => uploadfiles(e)}
                                  name="file"
                                  multiple
                                  style={{ color: "#000" }}
                                />
                              </div>
                              <div className="button_proceed">
                                <button
                                  className="proceed_button_class"
                                  type="button"
                                  onClick={() => {
                                    changeicon1(), changeicon();
                                  }}
                                >
                                  Proceed
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="step1_wallet" onClick={changeicon1}>
                          <p className="step_color">STEP 2</p>
                          <div>
                            <p className="identity">Document Verification</p>
                          </div>
                          <div className="icon_verified">
                            {open1 ? (
                              <KeyboardArrowDownRoundedIcon />
                            ) : (
                              <KeyboardArrowUpRoundedIcon />
                            )}
                          </div>
                        </div>
                        {open1 ? (
                          <div className="step1_show">
                            <p className="visibal">
                              Capture and upload your live selfie. Face must be
                              clearly visible.
                            </p>
                            <div className="uploade_img_style">
                              <div>
                                <p className="upload_image_para">
                                  Upload image
                                </p>
                                <input
                                  type="file"
                                  onChange={(e) => uploadfiles1(e)}
                                  name="file"
                                  multiple
                                  style={{ color: "#000" }}
                                />
                              </div>
                              <div className="button_proceed">
                                <button
                                  className="proceed_button_class"
                                  type="button"
                                  onClick={handlesubmitphoto}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )
                  ) : (
                    <div className="walletss">
                      <div className="spacedesigen">
                        <div className="divdesign">
                          <p>Available</p>
                          <p>
                            $
                            {Math.round(
                              (balance * currencys + Number.EPSILON) * 100
                            ) / 100}
                          </p>
                        </div>
                        {sellerstatus ? (
                          <div className="divdesign">
                            <p>Reserved</p>
                            <p>$ 0</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="width">
                        <div className="givespace">
                          <p className="wallte_withdraw_style_para">
                            Withdraw To
                          </p>
                          <div className="divided_line"></div>
                        </div>
                        <div className="boxdesigen">
                          <div className="boxdesigen1" onClick={showdiv}>
                            <div
                              className={`donedesisen ${show ? "active" : ""}`}
                            >
                              <DoneIcon />
                            </div>
                            <img
                              src="/images/paypalwallet.png"
                              width={40}
                              height={40}
                            />
                            <p className="fontsize_style">Paypal</p>
                          </div>
                          <div className="boxdesigen1" onClick={showdiv1}>
                            <div
                              className={`donedesisen ${show1 ? "active" : ""}`}
                            >
                              <DoneIcon />
                            </div>
                            <img
                              src="/images/bankwallet.webp"
                              alt="Not-found"
                              width={40}
                              height={40}
                            />

                            <p className="fontsize_style">Bank</p>
                          </div>
                        </div>
                        <div className={`amountdesign ${show ? "active" : ""}`}>
                          <p>Enter amount</p>
                          <input
                            type="number"
                            className="inputdesign"
                            placeholder="amount"
                            value={enteramount}
                            onChange={(e) => setEnteramount(e.target.value)}
                          />

                          <input
                            type="text"
                            className="inputdesign"
                            placeholder="payment details"
                            onChange={(e) => setPaydetail(e.target.value)}
                          />
                          {/* <select
                          className="select"
                          onChange={(e) => setMethad(e.target.value)}
                        >
                          <option selected hidden>
                            Select Method
                          </option>
                          <option value="paypal">Paypal</option>
                          <option value="bank">Bank</option>
                        </select> */}
                          <div className={`submit ${show ? "active" : ""}`}>
                            <button
                              type="submit"
                              className="submitbutton"
                              onClick={submitrequest}
                            >
                              Submit request
                            </button>
                          </div>
                        </div>
                        <div
                          className={`amountdesign ${show1 ? "active" : ""}`}
                        >
                          <p>Enter amount</p>
                          <input
                            type="number"
                            className="inputdesign"
                            placeholder="amount"
                            value={enteramount}
                            onChange={(e) => setEnteramount(e.target.value)}
                          />

                          <input
                            type="text"
                            className="inputdesign"
                            placeholder="Account number"
                            onChange={(e) => setBank(e.target.value)}
                          />
                          <input
                            type="text"
                            className="inputdesign"
                            placeholder="IFSC code"
                            onChange={(e) => setIfsc(e.target.value)}
                          />
                          <input
                            type="text"
                            className="inputdesign"
                            placeholder="Account Holder Name"
                            onChange={(e) =>
                              setAccountholdername(e.target.value)
                            }
                          />

                          {/* <select
                          className="select"
                          onChange={(e) => setMethad(e.target.value)}
                        >
                          <option selected hidden>
                            {" "}
                            Select Method
                          </option>
                          <option value="paypal">Paypal</option>
                          <option value="bank">Bank</option>
                        </select> */}
                          <div className={`submit ${show1 ? "active" : ""}`}>
                            <button
                              type="submit"
                              className="submitbutton"
                              onClick={submitrequest1}
                            >
                              Submit request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <div className="givespace">
              <p className="wallte_withdraw_style_para">Add Funds</p>
              <div className="divided_line"></div>
            </div>
            <div className="seconddiv_wallet">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      variant="scrollable"
                      scrollButtons="off"
                    >
                      <Tab label="Recharge Wallet" value="1" />
                      {withdrawapproval ? (
                        <Tab label="Successfull Order" value="2" />
                      ) : (
                        ""
                      )}
                      {withdrawapproval ? (
                        <Tab label="Floating Amount" value="3" />
                      ) : (
                        ""
                      )}
                      {withdrawapproval ? (
                        <Tab label="Request History" value="4" />
                      ) : (
                        ""
                      )}
                      {/* {sellerstatus ? "" : <Tab label="Verify" value="5" />} */}
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="addmoney">
                      <h1 style={{ color: "#fff" }}>Add Funds</h1>
                      <div className="paymentmethods">
                        <div className={"alldetailsa"}>
                          <div className="Amountdetails">
                            <div className="amountinput">
                              <span className="amounttitle">Amount</span>
                              <div className="inputamounts">
                                <input
                                  type="number"
                                  placeholder="Enter Amount"
                                  onChange={(e) => {
                                    chnageprice(e);
                                  }}
                                  value={prices}
                                  disabled={continuebtn}
                                />
                                <div
                                  className={`closepaypal ${
                                    cont ? "active" : ""
                                  }`}
                                  onClick={() => {
                                    closepaypals(), showdiv2();
                                  }}
                                >
                                  <CloseIcon />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="topups">
                            <div
                              className={`topupbox ${
                                selecttopup === "10" ? "active" : ""
                              }`}
                              onClick={() => {
                                topuposelect("10");
                              }}
                            >
                              <p className="amountstyle">$10</p>
                            </div>
                            <div
                              className={`topupbox ${
                                selecttopup === "20" ? "active" : ""
                              }`}
                              onClick={() => {
                                topuposelect("20");
                              }}
                            >
                              <p className="amountstyle">$20</p>
                            </div>
                            <div
                              className={`topupbox ${
                                selecttopup === "30" ? "active" : ""
                              }`}
                              onClick={() => {
                                topuposelect("30");
                              }}
                            >
                              <p className="amountstyle">$30</p>
                            </div>
                          </div> */}
                          <div className="rechargebtn">
                            <button
                              className={`rechargebutton ${
                                disable ? "" : "active"
                              }`}
                              onClick={onclickpay}
                              disabled={disable}
                              style={{
                                display: continuebtn ? "none" : "block",
                              }}
                            >
                              Add
                            </button>

                            {loading ? (
                              <div className="ripple"></div>
                            ) : (
                              <>
                                {paymentcheck.map((item, i) => (
                                  <>
                                    {currencyslocal === "INR" &&
                                      currencyslocal != "" &&
                                      item.paymentgateway === "cashfree" && (
                                        <>
                                          {cashfree ? (
                                            <form
                                              target="_blank"
                                              id="redirectForm"
                                              method="post"
                                              action="https://payments.esports4g.com/walletrechagre.php"
                                            >
                                              <input
                                                type="hidden"
                                                name="buyerid"
                                                value={userid1}
                                                class="btn"
                                              />

                                              <input
                                                type="hidden"
                                                name="amount"
                                                value={prices}
                                                class="btn"
                                              />
                                              <input
                                                type="hidden"
                                                name="currency"
                                                value={currencyslocal}
                                                class="btn"
                                              />
                                              <button
                                                type="submit"
                                                className="cashfree_button_style_wallet"
                                              >
                                                CASHFREE
                                              </button>
                                            </form>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      )}
                                    {currencyslocal != "INR" &&
                                      item.paymentgateway === "paypal" && (
                                        <>
                                          {paytime ? (
                                            <div className="paypals">
                                              <PayPalScriptProvider
                                                options={{
                                                  "client-id":
                                                    "AcBSdIBR8Bl-JbtLu41x2pVSIy7GVDcKnNw2W8Ct5O2zZ3CK6a2yD_NAaFyEVhy-_Qk36W7ZFDT_G5A9",
                                                }}
                                              >
                                                <PayPalButtons
                                                  createOrder={(
                                                    data,
                                                    actions
                                                  ) => {
                                                    return actions.order.create(
                                                      {
                                                        purchase_units: [
                                                          {
                                                            amount: {
                                                              value: prices,
                                                              currency_code:
                                                                "USD",
                                                            },

                                                            item_list: {
                                                              items: "recharge",
                                                            },
                                                          },
                                                        ],
                                                      }
                                                    );
                                                  }}
                                                  onApprove={(
                                                    data,
                                                    actions
                                                  ) => {
                                                    return actions.order
                                                      .capture()
                                                      .then((details) => {
                                                        const name =
                                                          details.payer.name
                                                            .given_name;
                                                        if (
                                                          details.status ==
                                                          "COMPLETED"
                                                        ) {
                                                          const data = {
                                                            details: details,
                                                            amount: prices,
                                                            status:
                                                              details.status,
                                                            userId: userid,
                                                          };
                                                          fetch(
                                                            apiKey +
                                                              "api/withdrawal_wallet/walletrecharge/",
                                                            {
                                                              method: "POST",
                                                              headers: {
                                                                "Content-Type":
                                                                  "application/json",
                                                              },
                                                              body: JSON.stringify(
                                                                data
                                                              ),
                                                            }
                                                          )
                                                            .then((res) =>
                                                              res.json()
                                                            )
                                                            .then((data) => {
                                                              setshowpopus(
                                                                true
                                                              );
                                                              // router.push('/dashboard/wallet/success/payment')
                                                              // if (data.status == 200) {
                                                              //   router.push('/dashboard/wallet/success/payment')
                                                              // }
                                                            });
                                                        }
                                                      });
                                                  }}
                                                />
                                              </PayPalScriptProvider>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      )}
                                  </>
                                ))}
                              </>
                            )}

                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  {withdrawapproval ? (
                    <TabPanel value="2">
                      <div>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>OrderId</StyledTableCell>
                                <StyledTableCell align="left">
                                  Product Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Status
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Buyer Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Quantity
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Price
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(rowsPerPage > 0
                                ? sucessfull.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                : sucessfull
                              ).map((row) => (
                                <StyledTableRow key={row.name}>
                                  <StyledTableCell component="th" scope="row">
                                    {row.id}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <img
                                        src={row.productId.images}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          objectFit: "contain",
                                        }}
                                      />
                                      <p className="lines_backend">
                                        {row.productId.productname}
                                      </p>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    style={{ color: "green" }}
                                  >
                                    {row.order_status}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.userId.username}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.quantity}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.productId.price}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                            {/* <TableFooter>
                          <TableRow>
                            <TablePagination
                              count={sucessfull.length}
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
                          </TableRow>
                        </TableFooter> */}
                          </Table>
                        </TableContainer>
                        <div className="page">
                          <Stack spacing={2}>
                            <TablePagination
                              count={sucessfull.length}
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
                    </TabPanel>
                  ) : (
                    ""
                  )}
                  {withdrawapproval ? (
                    <TabPanel value="3">
                      <div>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>OrderId</StyledTableCell>
                                <StyledTableCell align="left">
                                  Product Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Status
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Buyer Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Quantity
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Price
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(rowsPerPage > 0
                                ? float.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                : float
                              ).map((row) => (
                                <StyledTableRow key={row.name}>
                                  <StyledTableCell component="th" scope="row">
                                    {row.id}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <img
                                        src={row.userId.image}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          objectFit: "contain",
                                        }}
                                      />
                                      <p className="lines_backend">
                                        {row.productId.productname}
                                      </p>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.order_status === "Pending" ? (
                                      <p style={{ color: "red" }}>
                                        {row.order_status}
                                      </p>
                                    ) : row.order_status === "Processing" ? (
                                      <p style={{ color: "yellow" }}>
                                        {row.order_status}
                                      </p>
                                    ) : row.order_status === "Delivered" ? (
                                      <p style={{ color: "orange" }}>
                                        {row.order_status}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.userId.username}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.quantity}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.productId.price}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div className="page">
                          <Stack spacing={2}>
                            <TablePagination
                              count={float.length}
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
                    </TabPanel>
                  ) : (
                    ""
                  )}

                  {withdrawapproval ? (
                    <TabPanel value="4">
                      <div>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 400 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell align="center">
                                  BuyerId
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Amount
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Status
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Payment Detail
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Payment Method
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(rowsPerPage > 0
                                ? request.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                : request
                              ).map((row) => (
                                <StyledTableRow key={row.name}>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    {row.userId}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.amount}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.withdrawalstatus}
                                  </StyledTableCell>
                                  {row.paymethod === "paypal" ? (
                                    <StyledTableCell align="center">
                                      {row.paydetails}
                                    </StyledTableCell>
                                  ) : (
                                    <StyledTableCell align="center">
                                      {row.paydetails.accountholdername}-
                                      {row.paydetails.bank}-
                                      {row.paydetails.ifsc}
                                    </StyledTableCell>
                                  )}

                                  <StyledTableCell align="center">
                                    {row.paymethod}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div className="page">
                          <Stack spacing={2}>
                            <TablePagination
                              count={request.length}
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
                    </TabPanel>
                  ) : (
                    ""
                  )}
                  {withdrawapproval ? (
                    <TabPanel value="5">
                      {withdrawapproval ? (
                        <div>
                          <div className="attention_style">
                            <p>Attention</p>
                            <div className="attentionicon_style">
                              <ErrorOutlineIcon />
                            </div>
                          </div>
                          <div className="idcardwrapper_style">
                            <div className="uploadbtns_style">
                              <div className="submitphoto_style">
                                <label className="upload-documnet_style">
                                  <input
                                    type="file"
                                    onChange={(e) => onchangepicture(e)}
                                    name="file"
                                    multiple
                                  />
                                  <p className="upload-text">Upload</p>
                                </label>
                                {arrfile.length > 1 ? (
                                  `${arrfile[0]}, ${arrfile[1]}, ...`
                                ) : (
                                  <p className="photoname_style">{arrfile}</p>
                                )}
                              </div>
                              <div className="photocheck">
                                {uploaded ? <CheckIcon /> : ""}
                              </div>
                            </div>
                          </div>
                          <div className="sumbitbutton_style">
                            <button
                              className="button submitbtn_style"
                              onClick={handlesubmitphoto}
                            >
                              Submit
                            </button>
                            <div className="photocheck_style">
                              {uploadeds ? <CheckIcon /> : ""}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // <div className="verify">
                        //   <div className="verifysvg">
                        //     <Image src={Checked} />
                        //   </div>
                        //   <h2 className="verifytitle">You are Now Verified.</h2>
                        // </div>
                        ""
                      )}
                    </TabPanel>
                  ) : (
                    ""
                  )}
                </TabContext>
              </Box>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
