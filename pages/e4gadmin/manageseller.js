import React, { useEffect, useState, useContext } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import { Navbar, Nav, Form, FormControl, NavDropdown } from "react-bootstrap";
import { Col, Container, Input, Label, Row } from "reactstrap";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../../components/checklogin/checklogin.js";

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

const ManageSeller = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

  const [data, setData] = useState([]);
  const [ischeck, setischeck] = useState([]);
  const [idcheck, setIdcheck] = useState([]);
  const [openpopup, setOpenpopup] = useState(false);
  const [allcheckuser, setallcheckuser] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const [dock, setDock] = useState("");
  const [dateat, setDatat] = useState ("");
  const [isdocuments, setisdocuments] = useState(false);
  const [isidentitydocuments, setisidentitydocuments] = useState(false);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const clickpopup = () => {
    setOpenpopup(!openpopup);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const checkfiltered1 = () => {
    setisidentitydocuments(!isidentitydocuments);
  };
  const checkfiltered2 = () => {
    setisdocuments(!isdocuments);
  };
  useEffect(() => {
    setloaderspage(true);
    if (Tokens === "") {
    } else {
      text(Tokens);
      sellerlist();
    }
  }, [Tokens]);

  function sellerlist() {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      fetch(`${apiKey}api/seller/sellerlist/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,
        },
      }).then((result) => {
        result.json().then((resp) => {
          let userData = resp.result;
          console.log("dt", userData);
          setData(userData);
          setFilteredData(userData);
          console.log("gt", data);
          setDatat(resp.date)
        });
      });
    }
  }

  const handleSearch = (event) => {
    let value = event.target.value;
    // var int = Math.floor(value);
    let array = "";
    let result = [];
    console.log(value);
    result = data.filter(function (data) {
      console.log(data);
      console.log("tg", data.id);
      console.log("hh", value);
      console.log(data.price);
      var number = Number(data.price || 0);
      console.log(typeof number);

      return (
        //   data.productname.search(value) != -1 ||
        //   data.dateCreated.search(value) != -1 ||
        //   data.userId.fullname.search(value) != -1 ||
        //   number.search(value) != -1
        Object.values(data.userId.phone)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        Object.values(data.userId.username)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        Object.values(data.userId.id)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        Object.values(number)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    });
    setFilteredData(result);
  };

  const handleallcheck = (e) => {
    setallcheckuser(!allcheckuser);
    // ischeck()
    setischeck(data.map((li) => li._id));
    if (allcheckuser) {
      setischeck([]);
    }
  };
  const handleallcheck1 = (e) => {
    setallcheckuser(!allcheckuser);
    // ischeck()
    setIdcheck(data.map((isd) => isd.userId._id));
    if (allcheckuser) {
      setIdcheck([]);
    }
  };
  console.log(idcheck);
  console.log(ischeck);

  const handlecheck = (e) => {
    console.log("click");
    const { id, checked } = e.target;
    setischeck([...ischeck, id]);
    if (!checked) {
      setischeck(ischeck.filter((item) => item !== id));
    }
  };
  const handleSelect = (e) => {
    console.log(e);
    clickpopup();
    confirm("Are you sure to" + e);
    const statusarray = { sellerid: ischeck, status: e };
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
        sellerlist();
      });
  };
  const handleVeriSelect = (e) => {
    console.log(e);
    if (e === "Disapproved") {
      clickpopup();
    } else {
      confirm("Are you sure to " + e);
      const statusarray = { sellerid: ischeck, status: e };
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
          sellerlist();
        });
    }
  };
  const handleVeriSelectupdate = () => {
      const statusarray = { 
        sellerid: ischeck, 
        status: "Disapproved",
        isidentitydocuments: isidentitydocuments,
        isdocuments: isdocuments,
        documents: dock,
       };
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
          sellerlist();
          clickpopup();
        });
    
  };

  return (
    <>
      {loaderspage ? (
        <>
          <Checklogin />
          <div className="loader loader1"></div>
        </>
      ) : (
        <>
          <Typography sx={{ m: 1 }} variant="h4">
            Manage Seller
          </Typography>
          <div style={{ margin: "20px", position: "relative" }}>
            <div className="input-title">
              <div className="boxsearches">
                <div className="selectboxes">
                  <select
                    name="searchitem"
                    id="select"
                    className="searchoption_backend"
                  >
                    <option value="1">Search All</option>
                    <option value="1">OrderId</option>
                    <option value="1">Product Name</option>
                  </select>
                </div>
                <div className="serachboxs">
                  <input
                    type="text"
                    name="search"
                    className="inputype_backend"
                    placeholder="Search games"
                    onChange={(event) => handleSearch(event)}
                  />
                  <div className="search">
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </div>
            <Box sx={{ mt: "20px" }}>
              <DropdownButton
                alignRight
                title="Action"
                id="dropdown-menu-align-right"
                variant="success"
              >
                <NavDropdown
                  title="Status"
                  id="dropdown-menu-align-right"
                  onSelect={handleSelect}
                >
                  <NavDropdown.Item eventKey="Banned">Banned</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Active">
                    Unbanned
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Verified"
                  id="basic-nav-dropdown"
                  onSelect={handleVeriSelect}
                >
                  <NavDropdown.Item
                    eventKey="Approved"
                    className="dropdown-item"
                  >
                    Approved
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="Disapproved"
                    className="dropdown-item"
                  >
                    Disapproved
                  </NavDropdown.Item>
                </NavDropdown>
              </DropdownButton>
            </Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        id="selectall"
                        name="selectall"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleallcheck, handleallcheck1;
                        }}
                        checked={allcheckuser}
                      />
                    </TableCell>
                    <TableCell align="center">User ID</TableCell>
                    <TableCell align="center">User Name</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Verification</TableCell>
                    <TableCell align="center">
                      <div style={{width:"50%"}}>
                      Date
                      </div>
                      </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredData
                  ).map((row, i) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align={"center"}>
                        {
                          <input
                            type="checkbox"
                            id={row._id}
                            key={row._id}
                            style={{ cursor: "pointer" }}
                            checked={ischeck.includes(row._id)}
                            onClick={handlecheck}
                          ></input>
                        }
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.userId.id}
                      </TableCell>
                      <Link
                        href={`/E4gadmin/edit_manageseller/${row._id}`}
                        passHref={true}
                      >
                        <TableCell
                          align="center"
                          sx={{ cursor: "pointer", color: "darkorchid" }}
                        >
                          {row.userId.username}
                        </TableCell>
                      </Link>
                      <TableCell align="center">{row.userId.phone}</TableCell>
                      <TableCell align="center">{row.userId.status}</TableCell>
                      <TableCell align="center">{row.sellerapproval}</TableCell>
                      <TableCell align="center">
                        <div style={{width:"50%"}}>
                        {dateat[i]}
                        </div>
                        </TableCell>

                    </TableRow>
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
                      count={filteredData.length}
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
            {openpopup ? (
              <div
                className={`popup_style_seller ${openpopup ? "active" : ""}`}
              >
                  <div className="right_input new_category_edit">
                    <Label className="col-xl-3 col-md-41">
                      Reagin for Disapproved
                    </Label>
                    <div>
                      <textarea
                        type="text"
                        cols="37"
                        row="10"
                        value={dock}
                        maxLength="180"
                        className="text_area_field1"
                        onChange={(e) => setDock(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="disapproved_style_edit">
                    <p className="disapproved_style_edit_para1">
                      Which document you want to disapproved
                    </p>
                  </div>
                  <div className="right_input new_category_edit">
                    <Label className="col-xl-3 col-md-41">
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
                    <Label className="col-xl-3 col-md-41">
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
                  <div className="update_seller_account">
                    <button className="update_btn" onClick={handleVeriSelectupdate}>
                      Update
                    </button>
                    <button className="update_btn" onClick={clickpopup}>
                      Cancle
                    </button>
                  </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
};
const text = (token) => {
  if (token) {
    ManageSeller.getLayout = (page) => (
      <DashboardLayout>{page}</DashboardLayout>
    );
  } else {
    alert("hlo");
  }
};
export default ManageSeller;
