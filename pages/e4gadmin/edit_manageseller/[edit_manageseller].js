import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { useEffect, useState } from "react";
import { convertToRaw } from "draft-js";
import { EditorState } from "draft-js";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";
import Box from "@mui/material/Box";
// import { Editor } from "react-draft-wysiwyg";
// const Editor = dynamic(() => import("react-draft-wysiwyg"), { ssr: false });
// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//   { ssr: false }
// )
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
// import JoditEditor from "jodit-react";

import Editor from "./Editor";

const config2 = {
  useSearch: false,
  spellcheck: false,
  enter: "P",
  defaultMode: "1",
  toolbarAdaptive: false,
  toolbarSticky: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  minHeight: 200,
  maxHeight: 500,
  minWidth: null,
  buttons:
    "paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,fontsize,brush,,link,|,align,undo,redo",
  editorCssClass: "alic",
  placeHolder: "",
  controls: {
    fontsize: {
      list: [
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "18",
        "24",
        "30",
        "36",
        "48",
        "60",
        "72",
        "96",
        "100",
      ],
    },
    font: {
      command: "fontname",
      list: {
        "": "Default",
        "'Open Sans',sans-serif": "Open Sans",
        "Helvetica,sans-serif": "Helvetica",
        "Arial,Helvetica,sans-serif": "Arial",
        "Georgia,serif": "Georgia",
        "Impact,Charcoal,sans-serif": "Impact",
        "Tahoma,Geneva,sans-serif": "Tahoma",
        "'Times New Roman',Times,serif": "Times New Roman",
        "Verdana,Geneva,sans-serif": "Verdana",
      },
    },
  },
};
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

const Edit_ManageSeller = (props) => {
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [key, setKey] = useState("profile");
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = React.useState("");
  const [fullname, setfullname] = useState("");
  const [identitydocuments, setidentitydocuments] = useState([]);
  const [dateofbirth, setdateofbirth] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState("");
  const [verification, setVerification] = useState(false);
  const [verificationW, setVerificationW] = useState("");
  const [note, setNote] = useState("");

  const [isCheckedFilter, setcheckfilter] = useState(false);
  const [isCheckedFilter2, setcheckfilter2] = useState(false);

  const [sellerverify, setsellerverify] = useState("");

  toast.configure();

  const [isOpeneds2, setIsOpeneds2] = useState(false);
  const [isOpeneds3, setIsOpeneds3] = useState(false);
  const [isOpeneds4, setIsOpeneds4] = useState(true);
  const [isOpeneds5, setIsOpeneds5] = useState(false);

  const [username, setUserName] = useState("");
  const [emails, setemails] = useState("");
  const [attentiontextarea, setAttentiontextarea] = useState("");
  const [alerttextarea, setAlerttextarea] = useState("");
  const [sold, setSold] = useState([]);
  const [lists, setLists] = useState([]);
  const [alertvalue, setAlertvalue] = useState(false);
  const [attention, setAttentionvalue] = useState();
  // const [editorState, setEditorState] = useState("");
  // var editor = new FroalaEditor('#example')
  const [personName, setPersonName] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [currentPage, setCurrentPage] = useState(0);
  const [postParPage, setPpstPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);
  const [iswithdrawalidentity, setIswithdrawalidentity] = useState(false);
  const [iswithdrawaldocuments, setIswithdrawaldocuments] = useState(false);

  // const indexOfLastPost = currentPage + postParPage;
  // const indexOfFirstPost = indexOfLastPost - postParPage;
  // const currentPosts = lists.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = (pageNum) => setCurrentPage(pageNum);
  // const prevPage = () => setCurrentPage(currentPage - 1);
  // const nextPage = () => setCurrentPage(currentPage + 1);

  useEffect(() => {
    SellerData();
    soldlist();
    list();
    Withdrawstatus();
  }, [router.isReady]);

  console.log(attentiontextarea);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeM = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [docImage, setdocImage] = useState([]);
  const [docImage2, setdocImage2] = useState([]);

  const [withdrawstatus, setWithdrawstatus] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [showbox, setShowBox] = useState(true);
  const [docnumber, setDocnumber] = useState();
  const [sellerRestriction, setsellerRestriction] = useState("");
  const [sellerlistingRestriction, setsellerlistingRestriction] = useState("");
  const [sellerwithdrawalRestriction, setsellerwithdrawalRestriction] =
    useState("");
  const [dock, setDock] = useState("");
  const [check, setchecck] = useState("");
  const [checks, setcheccks] = useState("");
  const [showwithdraws, setshowwithdraws] = useState(false);
  const [showwithdraws2, setshowwithdraws2] = useState(false);
  const [showwithdraws3, setshowwithdraws3] = useState(false);
  const [isdocuments, setisdocuments] = useState(false);
  const [isidentitydocuments, setisidentitydocuments] = useState(false);
  const [withdrawalapprovalstatus, setWithdrawalapprovalstatus] =
    useState(false);
  const [withdrawalidentity, setWithdrawalidentity] = useState([]);
  const [length, setLength] = useState("");

  const toggles = (e) => {
    console.log(e);
    setShowBox(e);
    setIsOpened(e);
    // alert(e);
  };
  const toggless = (e) => {
    console.log(e);
    if (e == "Alert") {
      setAlertvalue(true);
    } else if (e == "Attention") {
      setAttentionvalue(true);
      setAlertvalue(false);
    }
    // alert(e);
  };
  const handleChangeFile = (event) => {
    console.log(event.target.files);
  };

  const SellerData = () => {
    if (typeof window !== "undefined") {
      if (router.isReady) {
        const edit_id = router.query.edit_manageseller;
        const arrayOfData = localStorage.getItem("userInfo");
        if (arrayOfData) {
          const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
          const cart_data = d.accesstoken;
          console.log(cart_data);
          const BearerToken = cart_data;
          console.log(edit_id);
          fetch(`${apiKey}api/seller/selleredit/${edit_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Token: `${BearerToken}`,
            },
          }).then((res) => {
            res.json().then((data) => {
              // sellerId = a.json();
              setfullname(data.result.userId.fullname);
              // console.log(fullname);
              setdateofbirth(data.result.userId.dateofbirth);
              console.log(dateofbirth);
              setzipcode(data.result.userId.zipcode);
              setaddress(data.result.userId.address);
              setcity(data.result.userId.city);
              setemail(data.result.userId.email);
              setcountry(data.result.userId.country);
              setphone(data.result.userId.phone);
              setUserName(data.result.userId.username);
              // setemails(data.result.userId.username);
              setsellerRestriction(data.result.sellerRestriction);
              setsellerwithdrawalRestriction(
                data.result.sellerwithdrawalRestriction
              );
              setsellerlistingRestriction(data.result.sellerlistingRestriction);
              setDock(data.result.documenttext);
              setsellerverify(data.result.sellerapproval);
              setVerificationW(data.result.withdrawalsellerapproval);
              setAttentiontextarea(data.result.attentiontextarea);
              setAlerttextarea(data.result.alerttextarea);
              setDocnumber(data.result.documentcount);
              setdocImage(data.result.documents);
              // console.log(data.result.document.length);/
              setdocImage2(data.result.withdrawaldocuments);
              setStatus(data.result.userId.status);
              setNote(data.result.withdrawalcontent);
              badgecondition(data.result.userId._id);
              console.log(data.result.documentcount);
              setidentitydocuments(data.result.identitydocuments);
              setisidentitydocuments(data.result.isidentitydocuments);
              setisdocuments(data.result.isdocuments);
              setWithdrawalapprovalstatus(data.result.withdrawalapprovalstatus);
              setWithdrawalidentity(data.result.withdrawalidentity);
              setIswithdrawalidentity(data.result.iswithdrawalidentity);
              setIswithdrawaldocuments(data.result.iswithdrawaldocuments);
            });
          });
        }
      }
      document.addEventListener("mousedown", () => {
        setDisable(false);
      });
    } else {
    }
  };
  const badgecondition = async (userid) => {
    let sellerId = await fetch(`${apiKey}api/badges/applybadges/${userid}`);
    sellerId = await sellerId.json();
    console.log(sellerId);
    setchecck(sellerId.checkdata.slice(-1));
    setcheccks(sellerId.verified);
  };

  const Withdrawstatus = () => {
    fetch(`${apiKey}api/seller/withdrawalverificationstatus`).then((res) => {
      res.json().then((data) => {
        // sellerId = a.json();
        console.log(data.result);
        setWithdrawstatus(data.result.withdrawalverfication);
      });
    });
  };
  console.log(withdrawstatus);

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  const statusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleVeriSelect = (e) => {
    console.log(e);
    confirm("Are you sure to " + e);
    const statusarray = { sellerid: [edit_id], status: e };
    fetch(`${apiKey}api/seller/changesellerstatus/`, {
      method: "POST",
      body: JSON.stringify(statusarray),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SellerData();
      });
  };
  const sellerpannel = (e) => {
    const { checked } = e.target;

    console.log("checked " + checked);

    setsellerRestriction(checked);
  };
  const sellerpannel2 = (e) => {
    const { checked } = e.target;

    console.log("checked " + checked);

    setsellerlistingRestriction(checked);
  };
  const sellerpannel3 = (e) => {
    const { checked } = e.target;

    console.log("checked " + checked);

    setsellerwithdrawalRestriction(checked);
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
  };
  const handleSelect = (e) => {
    console.log(e);
    confirm("Are you sure to" + e);
    const statusarray = { sellerid: [edit_id], status: e };
    fetch(`${apiKey}api/seller/changeuserstatus`, {
      method: "POST",
      body: JSON.stringify(statusarray),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SellerData();
      });
  };

  const handlecheck = (e) => {
    console.log(e);
    // const { checked} = e.target;
    if (e == "true") {
      alert("hello");
      setsellerRestriction(true);
    } else {
      alert("hii");
      setsellerRestriction(false);
    }
    console.log(e);
  };

  async function updateSeller(e) {
    console.log(e);
    if (router.isReady) {
      const edit_idss = router.query.edit_manageseller;
      const arrayOfData = localStorage.getItem("userInfo");
      if (arrayOfData) {
        const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
        const cart_data = d.accesstoken;
        console.log(cart_data);
        const BearerToken = cart_data;
        //  if( verification === false){
        //   setisdocuments(true) && setisidentitydocuments(true)

        // }else{
        //   setisdocuments(false)
        //   setisidentitydocuments(false)
        // }
        const datau = {
          alerttext: alerttextarea,
          attentiontext: attentiontextarea,
          alertboxstatus: alertvalue,
          sellerrestriction: sellerRestriction,
          sellerlisting: sellerlistingRestriction,
          sellerwithdarawal: sellerwithdrawalRestriction,
          documents: dock,
          fullname: fullname,
          dateofbirth: dateofbirth,
          email: email,
          zipcode: zipcode,
          address: address,
          city: city,
          country: country,
          phone: phone,
          username: username,
          status: verification,
          withdrawalstatus: verificationW,
          withdrawalcontent: note,
          isidentitydocuments: isidentitydocuments,
          isdocuments: isdocuments,
          withdrawalapprovalstatus: withdrawalapprovalstatus,
          iswithdrawaldocuments: iswithdrawaldocuments,
          iswithdrawalidentity: iswithdrawalidentity,
        };
        fetch(`${apiKey}api/seller/sellerupdate/${edit_idss}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            Token: `${BearerToken}`,
          },
          body: JSON.stringify(datau),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            toast(data.message);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        
      }
    }
  }

  function soldlist() {
    if (router.isReady) {
      const edit_ids = router.query.edit_manageseller;
      console.log(edit_ids);
      fetch(`${apiKey}api/seller/sellersoldproduct/${edit_ids}`).then(
        (result) => {
          result.json().then((resp) => {
            console.log("dt", resp);
            setSold(resp);
            console.log("ed", sold);
          });
        }
      );
    }
  }
  function list() {
    if (router.isReady) {
      const edit_ids = router.query.edit_manageseller;
      console.log(edit_ids);
      fetch(`${apiKey}api/seller/sellerproductlist/${edit_ids}`).then(
        (result) => {
          result.json().then((resp) => {
            console.log("dt", resp);
            setLists(resp.list);
            // setTotalPosts(resp.length);
            console.log("ed", lists);
          });
        }
      );
    }
  }

  const openwidthdraws = () => {
    setshowwithdraws(!showwithdraws);
  };
  const openwidthdraws2 = () => {
    setshowwithdraws2(!showwithdraws2);
  };
  const openwidthdraws3 = () => {
    setshowwithdraws3(!showwithdraws3);
  };

  useEffect(() => {
    if (sellerverify === "Approved") {
      setVerification(true);
    } else if (sellerverify === "Disapproved") {
      setVerification(false);
    }
  }, [sellerverify]);

  const checkfiltered = () => {
    setVerification(!verification);
  };
  const checkfiltered1 = () => {
    setisidentitydocuments(!isidentitydocuments);
  };
  const checkfiltered2 = () => {
    setisdocuments(!isdocuments);
  };
  const checkfiltered3 = () => {
    setWithdrawalapprovalstatus(!withdrawalapprovalstatus);
  };
  const checkfiltered5 = () => {
    setIswithdrawaldocuments(!iswithdrawaldocuments);
  };
  const checkfiltered4 = () => {
    setIswithdrawalidentity(!iswithdrawalidentity);
  };

  const showboxmsgbox = () => {
    setcheckfilter(!isCheckedFilter);
    console.log(isCheckedFilter);
  };
  const showboxmsgbox2 = () => {
    setcheckfilter2(!isCheckedFilter2);
    console.log(isCheckedFilter);
  };
  console.log(verification);
  function toggles2() {
    setIsOpeneds2(!isOpeneds2);
  }
  function toggles3() {
    setIsOpeneds3(!isOpeneds3);
  }
  function toggles4() {
    // alert('hi')
    setIsOpeneds4(!isOpeneds4);
  }
  function toggles5() {
    // alert('hi')
    setIsOpeneds5(!isOpeneds5);
  }
  function countChar(e) {
    console.log(e);
    var len = e.target.value.length;
    if (len >= 180) {
      e.target.value = e.target.value.substring(0, 180);
    } else {
      setLength(180 - len);
    }
  };
  return (
    <section className="main">
      <div style={{ textAlign: "right", marginTop: "50px", padding: "10px" }}>
        <button type="button" className={"update_btn"} onClick={updateSeller}>
          Update
        </button>
      </div>
      <Container>
        <Row>
          <Col lg="12">
            <div>
              <Form method="POST">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                >
                  <Tab eventKey="profile" title="Profile">
                    <div className={"row_top"}>
                      <Row>
                        <Col md="4">
                          <Label for="fname">Full Name</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="fname"
                            name="fname"
                            placeholder="Full Name"
                            required=""
                            defaultValue={fullname}
                            onChange={(e) => setfullname(e.target.value)}
                            // name="fname"
                          />
                        </Col>
                        <Col md="4">
                          <Label for="lname">Phone Number</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="lname"
                            placeholder="Phone number"
                            name="lname"
                            defaultValue={phone}
                            onChange={(e) => setphone(e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="4">
                          <Label for="dateofbirth">Date of Birth</Label>
                          <Input
                            type="date"
                            className="form-control1"
                            id="dateofbirth"
                            placeholder="Date of Birth"
                            name="dateofbirth"
                            defaultValue={dateofbirth}
                            onChange={(e) => setdateofbirth(e.target.value)}
                            required=""
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className={"row_top"}>
                      <Row>
                        <Col md="4">
                          <Label for="fname">User Name</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="username"
                            placeholder="User Name"
                            required=""
                            defaultValue={username}
                            onChange={(e) => setUserName(e.target.value)}
                            name="username"
                          />
                        </Col>
                        <Col md="4">
                          <Label for="fname">Email</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="username"
                            placeholder="User EMail"
                            required=""
                            defaultValue={email}
                            onChange={(e) => setemail(e.target.value)}
                            name="email"
                          />
                        </Col>
                        <Col md="4">
                          <Label for="lname">Address</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="address"
                            placeholder="Address"
                            name="address"
                            defaultValue={address}
                            onChange={(e) => setaddress(e.target.value)}
                            required=""
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className={"row_top"}>
                      <Row>
                        <Col md="4">
                          <Label for="city">City</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="city"
                            placeholder="Enter your city"
                            name="city"
                            defaultValue={city}
                            onChange={(e) => setcity(e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="4">
                          <Label for="country">Country</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="country"
                            placeholder="Enter your country"
                            name="country"
                            defaultValue={country}
                            onChange={(e) => setcountry(e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="4">
                          <Label for="zipcode">Zipcode</Label>
                          <Input
                            type="text"
                            className="form-control1"
                            id="zipcode"
                            placeholder="Enter your Zipcode"
                            name="zipcode"
                            defaultValue={zipcode}
                            onChange={(e) => setzipcode(e.target.value)}
                            required=""
                          />
                        </Col>
                      </Row>
                    </div>
                  </Tab>
                  <Tab eventKey="verifaction" title="Verification">
                    <div className={"row_top"}>
                      <div className="toogles" onClick={toggles4}>
                        <h2 className="showinputss">Current Verification</h2>
                        {isOpeneds4 ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpOutlinedIcon />
                        )}
                      </div>

                      <div
                        className={`mainheader_style ${
                          isOpeneds4 ? "active" : ""
                        }`}
                      >
                        <div className="current_status_edit_div">
                          <p className="current_status_edit">
                            Current Status {sellerverify}
                          </p>
                        </div>
                        <div className="right_input new_category_edit">
                          <Label className="col-xl-3 col-md-4">
                            Disapproved/Approved
                          </Label>
                          <div className="toggle-button-cover">
                            <div className="button-cover">
                              <div className="button1 r" id="button-1">
                                <input
                                  type="checkbox"
                                  className="checkbox1"
                                  onChange={checkfiltered}
                                  checked={verification}
                                />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {verification ? (
                          ""
                        ) : (
                          <>
                            <div className="right_input new_category_edit">
                              <Label className="col-xl-3 col-md-4">
                                Reagin for Disapproved
                              </Label>
                              <div>
                                <textarea
                                  // onkeyup={(e) => countChar(e)}
                                  onKeyUp={(e) => countChar(e)}
                                  type="text"
                                  cols="37"
                                  row="10"
                                  value={dock}
                                  maxLength="180"
                                  className="text_area_field"
                                  onChange={(e) => setDock(e.target.value)}
                                />
                                <div style={{fontSize:"12px", marginLeft:"2rem"}}>{length}</div>
                              </div>
                            </div>
                            <div className="disapproved_style_edit">
                              <p className="disapproved_style_edit_para">
                                Which document you want to disapproved
                              </p>
                            </div>
                            <div className="right_input new_category_edit">
                              <Label className="col-xl-3 col-md-4">
                                Step 1 Identitydocuments
                              </Label>
                              <div className="toggle-button-cover">
                                <div className="button-cover">
                                  <div className="button1 r" id="button-1">
                                    <input
                                      type="checkbox"
                                      className="checkbox1"
                                      onChange={checkfiltered1}
                                      checked={isidentitydocuments}
                                    />
                                    <div class="knobs"></div>
                                    <div class="layer"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="right_input new_category_edit">
                              <Label className="col-xl-3 col-md-4">
                                Step 2 Documnets
                              </Label>
                              <div className="toggle-button-cover">
                                <div className="button-cover">
                                  <div className="button1 r" id="button-1">
                                    <input
                                      type="checkbox"
                                      className="checkbox1"
                                      onChange={checkfiltered2}
                                      checked={isdocuments}
                                    />
                                    <div class="knobs"></div>
                                    <div class="layer"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* 
                      <div className="toogles" onClick={toggles2}>
                        <h2 className="showinputss">Current Restricted</h2>
                        <KeyboardArrowDownIcon />
                      </div> */}

                      {/* <div
                        className={`mainheader_style ${
                          isOpeneds2 ? "active" : ""
                        }`}
                      >
                        <div className="right_input new_category">
                          <Label className="col-xl-3 col-md-4">
                            <span>*</span>Seller Panel
                          </Label>
                          <div className="categoryforminput">
                            <label className="switch">
                              <input
                                type="checkbox"
                                onChange={sellerpannel}
                                checked={sellerRestriction}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>

                        <div className="right_input new_category">
                          <Label className="col-xl-3 col-md-4">
                            <span>*</span>Create Listing
                          </Label>
                          <div className="categoryforminput">
                            <label className="switch">
                              <input
                                type="checkbox"
                                onChange={sellerpannel2}
                                checked={sellerlistingRestriction}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                        <div className="right_input new_category">
                          <Label className="col-xl-3 col-md-4">
                            <span>*</span> Withdrawwal Button
                          </Label>
                          <div className="categoryforminput">
                            <label className="switch">
                              <input
                                type="checkbox"
                                onChange={sellerpannel3}
                                checked={sellerwithdrawalRestriction}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div> */}

                      <div className="toogles" onClick={toggles5}>
                        <h2 className="showinputss">Uploaded Documents</h2>
                        {isOpeneds5 ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpOutlinedIcon />
                        )}{" "}
                      </div>

                      <div
                        className={`mainheader_style ${
                          isOpeneds5 ? "active" : ""
                        }`}
                      >
                        <div className="manage_div">
                          <div className="text_style2">
                            <p>Documentation:</p>
                          </div>
                          <textarea
                            type="text"
                            cols="37"
                            row="10"
                            value={dock}
                            className="text_area_field"
                            onChange={(e) => setDock(e.target.value)}
                          />
                        </div>
                        <p className="identitydock_style">Documents Photo</p>
                        {docImage.length > 0 ? (
                          <div className="alldoc">
                            {docImage.map((imgdoc, i) => (
                              <div className="doc" key={i}>
                                <p>{i}: </p>
                                <div style={{ marginLeft: "5px" }}>
                                  <a
                                    href={imgdoc}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {imgdoc}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                        <p className="identitydock_style">
                          Identitydocuments Photo
                        </p>

                        {identitydocuments.length > 0 ? (
                          <div className="alldoc">
                            {identitydocuments.map((imgdocs, i) => (
                              <div className="doc" key={i}>
                                <p>{i}: </p>
                                <div style={{ marginLeft: "5px" }}>
                                  <a
                                    href={imgdocs}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {imgdocs}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="list product" title="Listed Products">
                    <div className="tabletop">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>ProductId</StyledTableCell>
                              <StyledTableCell align="center">
                                Product Name
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Price
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Stock
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Status
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {lists.length >= 1 ? (
                              <>
                                {(rowsPerPage > 0
                                  ? lists.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                    )
                                  : lists
                                ).map((row) => (
                                  <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                      {row.id}
                                    </StyledTableCell>
                                    <Link
                                      href={`/E4gadmin/edit_product/${row._id}`}
                                    >
                                      <StyledTableCell align="center">
                                        <div className="product_name_div_style">
                                          <img
                                            src={row.category.images}
                                            style={{
                                              height: "100%",
                                              width: "33%",
                                            }}
                                          />
                                          <p className="productname_style">
                                            {row.productname}
                                          </p>
                                        </div>
                                      </StyledTableCell>
                                    </Link>
                                    <StyledTableCell align="center">
                                      {row.price}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {row.stock}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {row.stock <= 0 ? (
                                        <p style={{ color: "red" }}>Inactive</p>
                                      ) : (
                                        <p style={{ color: "green" }}>Active</p>
                                      )}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </>
                            ) : (
                              "Not product Found"
                            )}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[
                                  5,
                                  10,
                                  25,
                                  { label: "All", value: -1 },
                                ]}
                                // colSpan={3}
                                count={lists.length}
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
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    </div>
                  </Tab>
                  <Tab eventKey="sold product" title="Sold Products">
                    <div className="tabletop">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>OrderId</StyledTableCell>
                              <StyledTableCell align="center">
                                Product Name
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Buyer Name
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Order Status
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Price
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Qty
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {(rowsPerPage > 0
                              ? sold.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                              : sold
                            ).map((row) => (
                              <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                  {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.productId.productname}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {/* {row.userId.username} */}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.order_status}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.productId.price}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.productId.qty}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[
                                  5,
                                  10,
                                  25,
                                  { label: "All", value: -1 },
                                ]}
                                // colSpan={3}
                                count={lists.length}
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
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    </div>
                  </Tab>
                  <Tab eventKey="withdraw" title="Withdrawal">
                    <div className="dropdownsbtnss" onClick={openwidthdraws}>
                      <h2 className="showwithdrawtitle">
                        Withdraw Verification
                      </h2>
                      <div className="dropdownssvg">
                        {showwithdraws ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpOutlinedIcon />
                        )}
                      </div>
                    </div>
                    <div
                      className={`showithdraw ${showwithdraws ? "active" : ""}`}
                    >
                      <div
                        className={`${
                          withdrawstatus
                            ? "withdrawalstatus"
                            : " withdrawalstatuss"
                        }`}
                      >
                        <div className="right_input new_category_edit">
                          <Label className="col-xl-3 col-md-4">
                            Disbaled/Enabled
                          </Label>
                          <div className="toggle-button-cover">
                            <div className="button-cover">
                              <div className="button1 r" id="button-1">
                                <input
                                  type="checkbox"
                                  className="checkbox1"
                                  onChange={checkfiltered3}
                                  checked={withdrawalapprovalstatus}
                                />
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {withdrawalapprovalstatus ? (
                          ""
                        ) : (
                          <>
                            <div className="manage_div">
                              <div className="text_style2">
                                <p>Reagin for Disable</p>
                              </div>
                              <textarea
                                type="text"
                                cols="37"
                                row="10"
                                value={note}
                                className={`${
                                  withdrawstatus
                                    ? "text_area_field"
                                    : " text_area_fields"
                                }`}
                                onChange={(e) => setNote(e.target.value)}
                              />
                            </div>
                            <div className="disapproved_style_edit">
                              <p className="disapproved_style_edit_para2">
                                Which document you want to disapproved
                              </p>
                            </div>
                            <div className="right_input new_category_edit">
                              <Label className="col-xl-3 col-md-4">
                                Step 1 Identitydocuments
                              </Label>
                              <div className="toggle-button-cover">
                                <div className="button-cover">
                                  <div className="button1 r" id="button-1">
                                    <input
                                      type="checkbox"
                                      className="checkbox1"
                                      onChange={checkfiltered4}
                                      checked={iswithdrawalidentity}
                                    />
                                    <div class="knobs"></div>
                                    <div class="layer"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="right_input new_category_edit">
                              <Label className="col-xl-3 col-md-4">
                                Step 2 Documnets
                              </Label>
                              <div className="toggle-button-cover">
                                <div className="button-cover">
                                  <div className="button1 r" id="button-1">
                                    <input
                                      type="checkbox"
                                      className="checkbox1"
                                      onChange={checkfiltered5}
                                      checked={iswithdrawaldocuments}
                                    />
                                    <div class="knobs"></div>
                                    <div class="layer"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <p className="identitydock_style">Documents Photo</p>
                        {docImage2.length > 0 ? (
                          <div className="alldoc">
                            {docImage2.map((imgdoc, i) => (
                              <div className="doc" key={i}>
                                <p>{i}: </p>
                                <div style={{ marginLeft: "5px" }}>
                                  <a
                                    href={imgdoc}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {imgdoc}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}

                        <p className="identitydock_style">
                          Identity Documents Photo
                        </p>
                        {withdrawalidentity.length > 0 ? (
                          <div className="alldoc">
                            {withdrawalidentity.map((imgdoc, i) => (
                              <div className="doc" key={i}>
                                <p>{i}: </p>
                                <div style={{ marginLeft: "5px" }}>
                                  <a
                                    href={imgdoc}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {imgdoc}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="dropdownsbtnss" onClick={openwidthdraws2}>
                      <h2 className="showwithdrawtitle">Withdraw Request</h2>
                      <div className="dropdownssvg">
                        {showwithdraws2 ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpOutlinedIcon />
                        )}
                      </div>
                    </div>

                    <div
                      className={`showithdraw2 ${
                        showwithdraws2 ? "active" : ""
                      }`}
                    >
                      <div className="tabletop">
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>OrderId</StyledTableCell>
                                <StyledTableCell align="center">
                                  Product Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Buyer Name
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Order Status
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Price
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Qty
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(rowsPerPage > 0
                                ? sold.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                : sold
                              ).map((row) => (
                                <StyledTableRow key={row.name}>
                                  <StyledTableCell component="th" scope="row">
                                    {row.id}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.productId.productname}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {/* {row.userId.username} */}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.order_status}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.productId.price}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.productId.qty}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                            <TableFooter>
                              <TableRow>
                                <TablePagination
                                  rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: "All", value: -1 },
                                  ]}
                                  // colSpan={3}
                                  count={lists.length}
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
                            </TableFooter>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Badges" title="Badges">
                    <div className="badges_style">
                      <h4>Current Badges</h4>
                      <div className="badge_style_cus">
                        <img src={check} />
                        <img src={checks} />
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

Edit_ManageSeller.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Edit_ManageSeller;
