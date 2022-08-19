import * as React from "react";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import Passwordmeter from "../../../components/common/passwordmeter";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
import { styled } from "@mui/material/styles";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Contextapi from "../../../Context/Contextapi.js";
import Checklogin from '../../../components/checklogin/checklogin.js';
const EditPage = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens,setloaderspage } = useContext(Contextapi);

  const router = useRouter();
  const edit_id = router.query.edit;

  const [value, setValue] = React.useState("1");
  const [disable, setDisable] = useState(false);
  const [coverimage, setCoverImage] = useState("");
  const [image, setImage] = useState("");
  const [strength, setStrength] = useState("");
  const [error, setError] = useState("");
  const [errorN, setErrorN] = useState("");
  const [errorU, setErrorU] = useState("");
  const [errorL, setErrorL] = useState("");
  const [errorS, setErrorS] = useState("");
  const [allerror, setallErros] = useState("");
  const [password, setpassword] = useState("");
  const [status, setStatus] = React.useState("");
  const [posts, setPosts] = useState([]);
  const [fname, setfname] = useState("");
  const [uname, setUname] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState("");
  const [currentpassword, setcurrentpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [key, setKey] = useState("profile");
  //     const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [withdarawdata, setwithdrawdata] = useState([]);

  const [showwithdraws2, setshowwithdraws2] = useState(false);
  const [showwithdraws3, setshowwithdraws3] = useState(false);
  const [showwithdraws4, setshowwithdraws4] = useState(false);
  const [showfundss, setshowfundss] = useState("");
  const [check, setchecck] = useState("");
  const [checks, setcheccks] = useState("");

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  const statusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleValid = (e) => {
    let value = e.target.value;
    let number = /[0-9]/g;
    let upperCaseLetters = /[A-Z]/g;
    let lowerCaseLetters = /[a-z]/g;
    let sepcialCharacters = /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/;
    setDisable(true);
    setStrength(e.target.value);
    if (value.length >= 8) {
      setError("");
    } else {
      setError(`Password must be 0-8 Characters long`);
    }
    if (!value.match(number)) {
      setErrorN(`Passoword must contain one Number`);
    } else {
      setErrorN("");
    }
    if (!value.match(upperCaseLetters)) {
      setErrorU(`Passoword must contain one Uppercase`);
    } else {
      setErrorU("");
    }
    if (!value.match(lowerCaseLetters)) {
      setErrorL(`Passoword must contain one Lowercase`);
    } else {
      setErrorL("");
    }
    if (!value.match(sepcialCharacters)) {
      setErrorS(`Passoword must contain one Special character`);
    } else {
      setErrorS("");
    }
    if (
      value.length >= 8 &&
      value.match(upperCaseLetters) &&
      value.match(number) &&
      value.match(lowerCaseLetters) &&
      value.match(sepcialCharacters)
    ) {
      setallErros("");
    } else {
      setallErros("leas fill all");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const UserData = async () => {
    if (router.isReady) {
      const edit_id = router.query.edit;
      let userId = await fetch(apiKey + "api/edituser/" + edit_id);
      userId = await userId.json();
      setPosts(userId.result);
      setfname(userId.result.fullname);
      setUname(userId.result.username);
      setdateofbirth(userId.result.dateofbirth);
      setemail(userId.result.email);
      setaddress(userId.result.address);
      setzipcode(userId.result.zipcode);
      setcity(userId.result.city);
      setcountry(userId.result.country);
      setphone(userId.result.phone);
      setImage(userId.result.image);
      setCoverImage(userId.result.coverimage);
      setpassword(userId.result.passowrd);
      setcpassword(userId.result.cpassword);
      setStatus(userId.result.status);
      setcurrentpassword(userId.result.currentpassword);
      document.addEventListener("mousedown", () => {
        setDisable(false);
      });
    }
  };

  const badgecondition = async (edit_id) => {
    let sellerId = await fetch(apiKey + "api/badges/applybadges/" + edit_id);
    sellerId = await sellerId.json();
    console.log(sellerId);
    setchecck(sellerId.checkdata.slice(-1));
    setcheccks(sellerId.verified);
  };

  const withdrawsdetail = async () => {
    if (router.isReady) {
      const edit_id = router.query.edit;
      badgecondition(edit_id);
      let userId = await fetch(
        apiKey + "api/withdrawal_wallet/userwithdrawallist/" + edit_id
      );
      userId = await userId.json();
      console.log(userId);
      setwithdrawdata(userId);
      // setPosts(userId);
    }
  };

  //   const user_Info=localStorage.getItem('userInfo')
  //   console.log(user_Info);

  useEffect(async () => {
    setloaderspage(true)
    if (Tokens === '') {

    } else {
      text(Tokens)
      UserData();
      withdrawsdetail();    }
  }, [router.isReady,Tokens]);

  async function updateProfile() {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      const formData = new FormData();
      formData.append("fullname", fname);
      formData.append('username', uname);
      formData.append("dateofbirth", dateofbirth);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("zipcode", zipcode);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("phone", phone);
      formData.append("image", image);
      formData.append("coverimage", coverimage);
      formData.append("password", password);
      formData.append("cpassword", cpassword);
      formData.append("currentpassword", currentpassword);
      formData.append("status", status);
      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
          Token: `${BearerToken}`,
        },
      };
      const url = apiKey + "api/adminupdateuser/" + edit_id;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          toast("Profile Updated Successfully");
        })
        .catch((e) => {
          toast.error(e.response.data.error);
        });
    }
  }

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

  const openwidthdraws2 = () => {
    setshowwithdraws2(!showwithdraws2);
  };
  const openwidthdraws3 = () => {
    setshowwithdraws3(!showwithdraws3);
  };
  const openwidthdraws4 = () => {
    setshowwithdraws4(!showwithdraws4);
  };

  // function TablePaginationActions(props) {
  //     const theme = useTheme();
  //     const { count, page, rowsPerPage, onPageChange } = props;

  //     const handleFirstPageButtonClick = (event) => {
  //       onPageChange(event, 0);
  //     };

  //     const handleBackButtonClick = (event) => {
  //       onPageChange(event, page - 1);
  //     };

  //     const handleNextButtonClick = (event) => {
  //       onPageChange(event, page + 1);
  //     };

  //     const handleLastPageButtonClick = (event) => {
  //       onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  //     };

  //     return (
  //       <Box sx={{ flexShrink: 0, ml: 2.5 }}>
  //         <IconButton
  //           onClick={handleFirstPageButtonClick}
  //           disabled={page === 0}
  //           aria-label="first page"
  //         >
  //           {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
  //         </IconButton>
  //         <IconButton
  //           onClick={handleBackButtonClick}
  //           disabled={page === 0}
  //           aria-label="previous page"
  //         >
  //           {theme.direction === "rtl" ? (
  //             <KeyboardArrowRight />
  //           ) : (
  //             <KeyboardArrowLeft />
  //           )}
  //         </IconButton>
  //         <IconButton
  //           onClick={handleNextButtonClick}
  //           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
  //           aria-label="next page"
  //         >
  //           {theme.direction === "rtl" ? (
  //             <KeyboardArrowLeft />
  //           ) : (
  //             <KeyboardArrowRight />
  //           )}
  //         </IconButton>
  //         <IconButton
  //           onClick={handleLastPageButtonClick}
  //           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
  //           aria-label="last page"
  //         >
  //           {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
  //         </IconButton>
  //       </Box>
  //     );
  //   }
  // TablePaginationActions.propTypes = {
  //     count: PropTypes.number.isRequired,
  //     onPageChange: PropTypes.func.isRequired,
  //     page: PropTypes.number.isRequired,
  //     rowsPerPage: PropTypes.number.isRequired,
  //   };

  console.log(typeof showfundss);
  // console.log(typeof 42);

  toast.configure();

  const addfundss = (e) => {
    e.preventDefault();

    if (showfundss.length <= 0) {
      toast.error("Please Enter Amount");
    } else {
      const edit_id = router.query.edit;

      const data = { amount: showfundss };

      fetch(`${apiKey}api/withdrawal_wallet/updatewallet/${edit_id}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // alert('Wallet Updated Successfully');
          toast.success(data);
          // console.log('Success:', data);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error(error);
        });
    }
  };

  return (
    <>
   {loaderspage ? (
      <>
      <Checklogin />
      <div className="loader loader1"></div>
    </>
   ): (
    <section className="main">
      <div style={{ textAlign: "right", marginTop: "50px", padding: "10px" }}>
        <button
        type="button"
        className={"update_btn"}
         onClick={updateProfile}>
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
                  <Tab eventKey="profile"
                  title="Profile">
                    <div className={"row_top"}>
                      <Row>
                        <Col md="4">
                          <Label for="fname">Full Name</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="fname"
                            name="fname"
                            placeholder="First Name"
                            required=""
                            defaultValue={posts.fullname}
                            onChange={(e) => setfname(e.target.value)}
                            //  name="fname"
                          />
                        </Col>
                        <Col md="4">
                          <Label for="uname">User Name</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lname"
                            placeholder="User Name"
                            name="uname"
                            defaultValue={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="4">
                          <Label for="dateofbirth">Date of Birth</Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="dateofbirth"
                            placeholder="Date of Birth"
                            name="dateofbirth"
                            defaultValue={posts.dateofbirth}
                            onChange={(e) => setdateofbirth(e.target.value)}
                            required=""
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className={"row_top"}>
                      <row>
                        <Col md="12">
                          <Label for="address">Address</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="address"
                            name="address"
                            defaultValue={posts.address}
                            onChange={(e) => setaddress(e.target.value)}
                            required=""
                          />
                        </Col>
                      </row>
                    </div>
                    <div className={"row_top"}>
                      <Row>
                        <Col md="4">
                          <Label for="city">City</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="Enter your city"
                            name="city"
                            defaultValue={posts.city}
                            onChange={(e) => setcity(e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="4">
                          <Label for="country">Country</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="country"
                            placeholder="Enter your country"
                            name="country"
                            defaultValue={posts.country}
                            onChange={(e) => setcountry(e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="4">
                          <Label for="zipcode">Zipcode</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="zipcode"
                            placeholder="Enter your Zipcode"
                            name="zipcode"
                            defaultValue={posts.zipcode}
                            onChange={(e) => setzipcode(e.target.value)}
                            required=""
                          />
                        </Col>
                      </Row>
                    </div>
                    {/*<a href="#" className="btn_update" onClick={updateProfile}>Update Account</a>*/}
                  </Tab>
                  <Tab eventKey="password"
                   title="Security">
                    <div className={"row_top"}>
                      <Row>
                        <Col md="6">
                          <Label for="email">email</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            defaultValue={posts.email}
                            onChange={(e) => setemail(e.target.value)}
                            required=""
                          />
                        </Col>
                        <Col md="6">
                          <Label for="phone">Phone</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Enter your Phone"
                            name="phone"
                            defaultValue={posts.phone}
                            onChange={(e) => setphone(e.target.value)}
                            required=""
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className={"btn_div"}>
                      <button
                        type="button"
                        className={"update_btn"}
                        onClick={toggle}
                      >
                        Update Password
                      </button>
                    </div>
                    {isOpened && (
                      <div className={"row_top"}>
                        <Row>
                          <Col md="4">
                            <Label for="currentpassword">
                              Current Password
                            </Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="currentpassword"
                              placeholder="Enter your current password"
                              name="currentpassword"
                              defaultValue=""
                              onChange={(e) =>
                                setcurrentpassword(e.target.value)
                              }
                              required=""
                            />
                          </Col>
                          <Col md="4">
                            <Label for="password">Password</Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Enter your password"
                              name="password"
                              defaultValue=""
                              onChange={(e) => setpassword(e.target.value)}
                              onKeyUp={handleValid}
                              required=""
                            />
                            <Passwordmeter password={strength} />
                            {disable && (
                              <ul className="error_validation">
                                {allerror ? (
                                  <h5>Suggestions for Strong Password 🔑</h5>
                                ) : null}
                                <div>{error}</div>
                                <div>{errorU}</div>
                                <div>{errorL}</div>
                                <div>{errorS}</div>
                                <div>{errorN}</div>
                              </ul>
                            )}
                          </Col>
                          <Col md="4">
                            <Label for="cpassword">Confirm Password</Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="cpasword"
                              placeholder="confirm password"
                              name="cpassword"
                              defaultValue=""
                              onChange={(e) => setcpassword(e.target.value)}
                              required=""
                            />
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Tab>
                  <Tab eventKey="image"
                  title="Image">
                    <Col md="12 image_container">
                      {/* <Label for="image">Upload Image</Label> */}
                      <div className="profile_cover_image">
                        <Input
                          type="file"
                          className="form-control"
                          id="coverimage"
                          name="coverimage"
                          onChange={(e) => setCoverImage(e.target.files[0])}
                          required=""
                        />
                        <div className="profileimg">
                          <img src={`${posts.coverimage}`}
                          alt="" />
                        </div>
                        <div className="profile_image_tab">
                          <Input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            required=""
                          />
                          <div className="profileimg">
                            <img src={`${posts.image}`}
                            alt="" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Tab>
                  <Tab eventKey="status"
                  title="Status">
                    <div className={"row_top"}>
                      <FormControl variant="standard"
                       fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                          {posts.status}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={status}
                          onChange={statusChange}
                          // label="Age"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Unactive">Unactive</MenuItem>
                          <MenuItem value="Ban">Ban</MenuItem>
                          <MenuItem value="Unban">Unban</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Tab>

                  <Tab eventKey="withdraw"
                  title="Withdraw">
                    <div className="dropdownsbtnss">
                      <h2 className="showwithdrawtitle">Withdraw Request</h2>
                      <div className="dropdownssvg" onClick={openwidthdraws2}>
                        <ArrowDropDownIcon />
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
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell align="center">
                                  Amount
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Payment Method
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Payment Details
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {/* {(rowsPerPage > 0
                                                                ? sold.slice(
                                                                    page * rowsPerPage,
                                                                    page * rowsPerPage + rowsPerPage
                                                                )
                                                                : sold
                                                            ).map((row) => ( */}
                              {withdarawdata.map((draw,index) => (
                                <StyledTableRow
                                key={index}
                                // key={row._id}
                                >
                                  <StyledTableCell component="th"
                                  scope="row">
                                    {draw._id}
                                  </StyledTableCell>
                                  <StyledTableCell component="th"
                                  scope="row">
                                    {draw.amount}
                                  </StyledTableCell>
                                  <StyledTableCell component="th"
                                  scope="row">
                                    {draw.paymethod}
                                  </StyledTableCell>
                                  <StyledTableCell component="th"
                                  scope="row">
                                    <Link href={`/E4gadmin/walletdetails/${draw._id}`} >
                                    <a>
                                      View
                                    </a>
                                    </Link>
                                  </StyledTableCell>
                                  {/* <StyledTableCell component="th"
                                  scope="row">
                                    {draw.paydetails}
                                  </StyledTableCell> */}
                                  {/* <StyledTableCell align="center">
                                                                        {row.productId.productname}
                                                                    </StyledTableCell> */}
                                  {/* <StyledTableCell align="center">
                                                                        {row.userId.username}
                                                                    </StyledTableCell> */}
                                  {/* <StyledTableCell align="center">
                                                                        {row.order_status}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        {row.productId.price}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        {row.productId.qty}
                                                                    </StyledTableCell> */}
                                </StyledTableRow>
                              ))}
                              {/* ))} */}
                            </TableBody>
                            <TableFooter>
                              <TableRow>
                                {/* <TablePagination
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
                                                                /> */}
                              </TableRow>
                            </TableFooter>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>

                    <div className="dropdownsbtnss">
                      <h2 className="showwithdrawtitle">Add Funds</h2>
                      <div className="dropdownssvg" onClick={openwidthdraws3}>
                        <ArrowDropDownIcon />
                      </div>
                    </div>

                    <div
                      className={`showithdraw3 ${
                        showwithdraws3 ? "active" : ""
                      }`}
                    >
                      <input
                        type="number"
                        onChange={(e) => {
                          setshowfundss(e.target.value);
                        }}
                        className="withdrawinput"
                        min={0}
                      />
                      <button
                      onClick={addfundss}
                      className="withdrawbtn">
                        submit
                      </button>
                    </div>
                    <div className="dropdownsbtnss">
                      <h2 className="showwithdrawtitle">Update Funds</h2>
                      <div className="dropdownssvg" onClick={openwidthdraws4}>
                        <ArrowDropDownIcon />
                      </div>
                    </div>
                    <div
                      className={`showithdraw3 ${
                        showwithdraws4 ? "active" : ""
                      }`}
                    >
                      <input
                      type="number"
                       className="withdrawinput"
                        min={0} />
                      <button
                       className="withdrawbtn">submit</button>
                    </div>
                  </Tab>
                  <Tab eventKey="Badges"
                  title="Badges">
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
    )}
    </>
  );
};
const text = (token) => {
  if (token) {
    EditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  }
  else {
    alert('hlo')
  }
}
export default EditPage;
