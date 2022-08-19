import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../../components/molecule/dashboardheader";
import Dashboard from "../../../components/molecule/newdashboardleft";
import Footer from "../../../components/molecule/Footer/footer";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { useRouter } from "next/router";
import Contextapi from "../../../Context/Contextapi.js";


const Kyc = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { currencys, checkcurrencyslocal, currencyslocal } =
  useContext(Contextapi);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [open1, setOpen1] = useState(false);
  const [arrfile, setarrfile] = useState([]);
  const [uploaded, setuploaded] = useState(false);
  const [picture, setPicture] = useState([]);
  const [identity, setidentity] = useState([]);
  const [documenttext, setdocumenttext] = useState("");
  const [picture1, setPicture1] = useState([]);
  const [userids, setuserids] = useState("");
  const [sellerapprovalstatus, setSellerapprovalstatus] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [sellerdisapproved, setSellerdisapprove] = useState("");
  const [checkuserphoto, setcheckuserphoto] = useState("");
  const [errorseller, setErrorseller] = useState("");
  const [isidentitydocuments, setisidentitydocuments] = useState(false);
  const [isdocuments, setisdocuments] = useState(false);
  const [balance, setBalance] = useState("");
  const [totalpurches, setTotalpurches] = useState("");
  const [totalorder, setTotalorder] = useState("");
  const [listedproduct, setListedproduct] = useState("");
  const [selleravaliable, setSelleravaliable] = useState("");
  const [sellerverifystatus, setsellerveify] = useState("");
  const [Sellerdefaultdetail, setSellerdefaultdetail] = useState("");
  const [loaders, setloaders] = useState(true);
  const [timedata, setTimedata] = useState("");

  // const [selleravaliable, setSelleravaliable] = useState();

  const [{ alt1, src1 }, setImg2] = useState({
    src1: "",
    alt1: "Upload an Image",
  });
  const [{ alt2, src2 }, setImg3] = useState({
    src1: "",
    alt1: "Upload an Image",
  });
  const changeicon = () => {
    setOpen(!open);
  };
  const changeicon1 = () => {
    setOpen1(!open1);
  };

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
  console.log(errorseller);
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

  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");
    if (!arrayOfData) {
      // setloading(true)
      router.push("/login");
    } else {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const iddata = d.tokenData.email;
      const userid = d.tokenData.id;
      fetch(`${apiKey}api/checklogin/${iddata}`)
        .then((res) => res.json())
        .then((data) => {
          if (data == true) {
            router.push("/dashboard/kyc");
            // setloading(false)
          } else if (data == false) {
            router.push("/login");
            // setloading(true)
          }
        });
      getsellerverfictionsataus();
      selleravalibility(userid);
      sellerdeafultinfo();
      setuserids(userid);
      sellerdata();
    }
  }, []);

  const sellerdata = async () => {
    // setloaders(false)
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const userid = d.tokenData.id;
      setuserids(userid);
      selleravalibility(userid);
      let sellerId = await fetch(`${apiKey}api/seller/sellerdetails/${userid}`);
      sellerId = await sellerId.json();
      console.log(sellerId.error);
      setSellerapprovalstatus(sellerId.sellerapprovalstatus);
      setDocuments(sellerId.documents);
      setSellerdisapprove(sellerId.sellerapproval);
      setcheckuserphoto(sellerId._id);
      setisdocuments(sellerId.isdocuments);
      setisidentitydocuments(sellerId.isidentitydocuments);
      setidentity(sellerId.identitydocuments);
      balanceavable(sellerId._id);
      setErrorseller(sellerId.error);
      setdocumenttext(sellerId.documenttext);
    }
    getCurrentDate();
  }

  const handlesubmitphoto2 = (e) => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    // const iddata = d.tokenData.email;
    const userid = d.tokenData.id;
    e.preventDefault();
    let img1 = [picture];
    let img2 = [picture1];
    if (img1.length && img2.length >= 1) {
      console.log("hii");
      const formData = new FormData();
      formData.append("termcondition", "accepted");
      formData.append("userId", userid);
      for (let j = 0; j < img2.length; j++) {
        formData.append("documents", img2[j]);
      }
      for (let k = 0; k < img1.length; k++) {
        formData.append("identitydocuments", img1[k]);
      }
      // formData.append('name', file.name);
      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `${apiKey}api/seller/createseller/`;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          // response.json()
          toast.success("Upload sucessful.");
          // getsellerstatus(userid);
          // setthankmessage(false)
          //  setPicture([]);
          // navigate("/products/digital/digital-product-list")
        })
        .catch((e) => {
          // setErrors(e.response.data.error);
        });
    } else {
      toast.error("Upload Please");
      console.log("hello");
    }
  };

  const balanceavable = (id) => {
    fetch(`${apiKey}api/seller/sellerdashboarddetails/${id}`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setBalance(data.wallettotal);
        setTotalpurches(data.total);
        setTotalorder(data.ordercount);
        setListedproduct(data.totalproduct);
      });
    });
  };
  const handlesubmitphoto = (e) => {
    e.preventDefault();
    let img1 = [picture];
    let img2 = [picture1];
    if (img1.length && img2.length >= 1) {
      const formData = new FormData();
      for (let j = 0; j < img2.length; j++) {
        formData.append("documents", img2[j]);
      }
      for (let k = 0; k < img1.length; k++) {
        formData.append("identitydocuments", img1[k]);
      }
      formData.append("isidentitydocuments", "true");
      formData.append("isdocuments", "true");

      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const url = `${apiKey}api/seller/updatedocuments/${checkuserphoto}`;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          toast.success("Upload sucessful.");
          // navigate("/products/digital/digital-product-list")
          setuploaded(false);
          setarrfile([]);
          setPicture([]);
          setPicture1([]);
          // selleravalibility(userid);
        })
        .catch((e) => {
          // toast.success('Upload sucessfusssl.')
          // setErrors(e.response.data.error);
        });
      changeicon1();
      sellerdata();

    } else {
      toast.error("Upload Please");
      alert("hii");
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
  const sellerdeafultinfo = async () => {
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let sellerdefaults = await fetch(`${apiKey}api/seller/defaultdetails/`);
    sellerdefaults = await sellerdefaults.json();

    setSellerdefaultdetail(sellerdefaults);
  };
  const getsellerverfictionsataus = async () => {
    // setloaders(false)
    setTimeout(() => {
      setloaders(false);
    }, 1500);
    let userId = await fetch(`${apiKey}api/seller/sellerverificationstatus/`);
    userId = await userId.json();
    setsellerveify(userId);
  };
   function getCurrentDate(separator='-'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    setTimedata(`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

  return (
    <>
      <div className="mainview">
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="kyc_style">
                    <Navbar />
            <div className="onboarding_marging_div">
              <p className="onboarding">ON-BOARDING</p>
            </div>
            <>
              {sellerverifystatus ? (
                <>
                  {selleravaliable ? (
                    <>
                      {sellerapprovalstatus ? (
                        <>
                          <div className="dashboarddiv2_verified">
                            <div className="text_paragraph1">
                              <p className="seller_verification">
                                Seller Verfication
                              </p>
                              <div>
                                <p className="activeservice_style">
                                  Active Service
                                </p>
                                <div className="imag_flex_style">
                                  <div className="gameaccount_style_dashboard">
                                    <div className="image_style_circle">
                                      <img src="/images/comment.png" />
                                    </div>
                                    <p className="game_text_style">
                                      Seller Active
                                    </p>
                                  </div>
                                  <div className="gameaccount_style_dashboard">
                                    <div className="image_style_circle2">
                                      <img src="/images/comment.png" />
                                    </div>
                                    <p className="game_text_style">
                                      Game Accounts
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="imgdiv_dashboard">
                              <img
                                src="/images/buy.png"
                                className="dashboarddiv2_img"
                              />
                            </div>
                          </div>
                          <div className="overview_div">
                            <p className="overview_style">Overview</p>
                          </div>
                          <div className="dashboard_inner_all_div">
                            <div className="dashboard_inner_class">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Sold</p>
                                  <p className="order_name_style">Order</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <LocalMallRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {totalorder}
                                </p>
                                <p className="date_order_style">{timedata}</p>
                              </div>
                            </div>
                            <div className="dashboard_inner_class1">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Total</p>
                                  <p className="order_name_style">Purchase</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <LocalMallRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {totalpurches}
                                </p>
                              </div>
                            </div>
                            <div className="dashboard_inner_class2">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Wallet</p>
                                  <p className="order_name_style">Balance</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <AccountBalanceWalletRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {Math.floor(balance).toFixed(2)}
                                </p>

                                <p className="date_order_style">{currencyslocal}</p>
                              </div>
                            </div>
                            <div className="dashboard_inner_class3">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Listed</p>
                                  <p className="order_name_style">Product</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <LocalMallRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {listedproduct}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : sellerdisapproved === "Disapproved" ? (
                        <>
                          <div className="reject_style">
                            <div className="reject_text_style">
                              <p className="reject_para_style">
                                Your application has been rejected
                              </p>
                              <img
                                src="/images/warning.png"
                                className="warning_img_style"
                              />
                              <p className="reasion_style">Reasion</p>
                              <p className="resubmit">
                                {documenttext}
                              </p>
                            </div>
                          </div>
                          <div className="vrified_kyc_div">
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
                          {isidentitydocuments ? (
                            <>
                              <div className="step1" onClick={changeicon}>
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
                                    Capture and upload your live selfie. Face
                                    must be clearly visible.
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
                          {isdocuments ? (
                            <>
                              <div className="step1" onClick={changeicon1}>
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
                                    Capture and upload your live selfie. Face
                                    must be clearly visible.
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
                          <div className="thanku_style">
                            <div className="thanku_text_style">
                              <p className="thanku_text">
                                Thank you for submitting your interest.
                              </p>
                              <p className="wait_style">
                                Please wait while we are verifying your
                                documents.
                              </p>
                              <img
                                src="/images/loading.gif"
                                className="loading_style"
                              />
                            </div>
                          </div>
                        </>
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
                      <div className="vrified_kyc_div">
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
                      <div className="step1" onClick={changeicon}>
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
                              <p className="upload_image_para">Upload image</p>
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
                      <div className="step1" onClick={changeicon1}>
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
                              <p className="upload_image_para">Upload image</p>
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
                                onClick={handlesubmitphoto2}
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
                  )}
                </>
              ) : (
                <>
                  {selleravaliable ? (
                    <>
                      {sellerapprovalstatus ? (
                        <>
                          <div className="dashboarddiv2_verified">
                            <div className="text_paragraph1">
                              <p className="seller_verification">
                                Seller Verfication
                              </p>
                              <div>
                                <p className="activeservice_style">
                                  Active Service
                                </p>
                                <div className="imag_flex_style">
                                  <div className="gameaccount_style_dashboard">
                                    <div className="image_style_circle">
                                      <img src="/images/comment.png" />
                                    </div>
                                    <p className="game_text_style">
                                      Seller Active
                                    </p>
                                  </div>
                                  <div className="gameaccount_style_dashboard">
                                    <div className="image_style_circle2">
                                      <img src="/images/comment.png" />
                                    </div>
                                    <p className="game_text_style">
                                      Game Accounts
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="imgdiv_dashboard">
                              <img
                                src="/images/buy.png"
                                className="dashboarddiv2_img"
                              />
                            </div>
                          </div>
                          <div className="overview_div">
                            <p className="overview_style">Overview</p>
                          </div>
                          <div className="dashboard_inner_all_div">
                            <div className="dashboard_inner_class">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Sold</p>
                                  <p className="order_name_style">Order</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <LocalMallRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {totalorder}
                                </p>
                                <p className="date_order_style">{timedata}</p>
                              </div>
                            </div>
                            <div className="dashboard_inner_class1">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Total</p>
                                  <p className="order_name_style">Purchase</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <LocalMallRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {totalpurches}
                                </p>
                              </div>
                            </div>
                            <div className="dashboard_inner_class2">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Wallet</p>
                                  <p className="order_name_style">Balance</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <AccountBalanceWalletRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {Math.floor(balance).toFixed(2)}
                                </p>

                                <p className="date_order_style">{currencyslocal}</p>
                              </div>
                            </div>
                            <div className="dashboard_inner_class3">
                              <div className="sold_style">
                                <div>
                                  <p className="sold_name_style">Listed</p>
                                  <p className="order_name_style">Product</p>
                                </div>
                                <div className="icon_shopping_style">
                                  <LocalMallRoundedIcon />
                                </div>
                              </div>
                              <div className="bottom_div_class">
                                <p className="order_number_style">
                                  {listedproduct}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : sellerdisapproved === "Disapproved" ? (
                        <>
                          <div className="reject_style">
                            <div className="reject_text_style">
                              <p className="reject_para_style">
                                Your application has been rejected
                              </p>
                              <img
                                src="/images/warning.png"
                                className="warning_img_style"
                              />
                              <p className="reasion_style">Reasion</p>
                              <p className="resubmit">
                                {documenttext}
                              </p>
                            </div>
                          </div>
                          <div className="vrified_kyc_div">
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
                          {isidentitydocuments ? (
                            <>
                              <div className="step1" onClick={changeicon}>
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
                                    Capture and upload your live selfie. Face
                                    must be clearly visible.
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
                          {isdocuments ? (
                            <>
                              <div className="step1" onClick={changeicon1}>
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
                                    Capture and upload your live selfie. Face
                                    must be clearly visible.
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
                          <div className="thanku_style">
                            <div className="thanku_text_style">
                              <p className="thanku_text">
                                Thank you for submitting your interest.
                              </p>
                              <p className="wait_style">
                                Please wait while we are verifying your
                                documents.
                              </p>
                              <img
                                src="/images/loading.gif"
                                className="loading_style"
                              />
                            </div>
                          </div>
                        </>
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
                      <div className="vrified_kyc_div">
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
                      <div className="step1" onClick={changeicon}>
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
                              <p className="upload_image_para">Upload image</p>
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
                      <div className="step1" onClick={changeicon1}>
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
                              <p className="upload_image_para">Upload image</p>
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
                                onClick={handlesubmitphoto2}
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
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};
export default Kyc;
