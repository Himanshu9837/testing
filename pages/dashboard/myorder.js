import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/molecule/newdashboardleft";

import Inputfield from "../../components/molecule/inputfield/inputfield";
import Navbar from "../../components/molecule/dashboardheader";
import Footer from "../../components/molecule/Footer/footer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
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
import TableFooter from "@mui/material/TableFooter";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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

export default function Myorder() {
  const { load, setload, currencys, checkcurrencyslocal, currencyslocal } =
    useContext(Contextapi);

  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [orders, setorders] = useState([]);
  const [loaders, setloaders] = useState(true);
  const [filterdata, setFilteredData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [timeouts, setTimeouts] = useState([]);
  const [searched, setSearched] = useState("");
  const [allcheckuser, setallcheckuser] = useState(false);
  const [ischeck, setischeck] = useState([]);

  const [toggle, settoggle] = useState(false);
  const [selectoption, setselectoption] = useState("This is Order Id");

  const toggledropdown = () => {
    settoggle(!toggle);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const selectoptions = (e) => {
    const selectedOption = e.target.value;

    setselectoption(selectedOption);
  };

  const handleallcheck = (e) => {
    setallcheckuser(!allcheckuser);
    // ischeck()
    setischeck(filterdata.map((li) => li._id));
    if (allcheckuser) {
      setischeck([]);
    }
  };
  const handlecheck = (e) => {
    console.log("click");
    const { id, checked } = e.target;
    console.log(id);
    console.log(checked);
    setischeck([...ischeck, id]);
    if (!checked) {
      setischeck(ischeck.filter((item) => item !== id));
    }
  };

  function vieworder(id) {
      fetch(`${apiKey}api/order/view_by_seller/${id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const sellerorder = (localids) => {
    fetch(`${apiKey}api/order/sellerorderlist/${localids}`)
      .then((res) => res.json())
      .then((data) => {
        setorders(data.orderlist);
        setFilteredData(data.orderlist);
        setTimeouts(data.datearray);
      });
  };

  useEffect(async () => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    sellerorder(cart_data);
    setTimeout(() => {
      setloaders(false);
    }, 1500);
  }, []);

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

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  // const handleSearch = (event) => {
  //   let value = event.target.value;
  //   let array = "";
  //   let result = [];

  //   result = orders.filter(function (data, i) {
  //     return (
  //       Object.values(data.productId.productname)
  //         .join("")
  //         .toLowerCase()
  //         .includes(value.toLowerCase()) ||
  //       Object.values(data.userId.fullname)
  //         .join("")
  //         .toLowerCase()
  //         .includes(value.toLowerCase()) ||
  //       Object.values(data.id)
  //         .join("")
  //         .toLowerCase()
  //         .includes(value.toLowerCase()) ||
  //       Object.values(data.productId.price)
  //         .join("")
  //         .toLowerCase()
  //         .includes(value)
  //     );
  //   });
  //   setFilteredData(result);
  // };

  const handleSearch = (event) => {
    if (selectoption == "orderid") {
      let value = event.target.value;
      let array = "";
      let result = [];
      result = orders.filter(function (data, i) {
        return Object.values(data.id)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredData(result);
    } else if (selectoption == "productname") {
      let value = event.target.value;
      let result = [];
      result = orders.filter(function (data, i) {
        return Object.values(data.productId.productname)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredData(result);
    } else if (selectoption == "sellername") {
    }
  };
  return (
    <>
      <div className="mainview">
        
        <div className={`lodersouter ${load ? "active" : ""}`}>
          <div className="innerloaders">
            <div class="loader"></div>
          </div>
        </div>
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="rightpannel">
            <div className="rightpannel_wrapper">
              <Navbar />
              <h2 className="purchase">MY ORDER</h2>

              {/* <div className="input-title">
                <div className="boxsearches">
                  <div className="selectboxes">
                    <select
                      name="searchitem"
                      id="select"
                      className="searchoption"
                    >
                      <option value="1">Search All</option>
                      <option value="1">Order Id</option>
                      <option value="1">Product Name</option>
                      <option value="1">User Name</option>
                    </select>
                  </div>
                  <div className="serachboxs">
                    <input
                      type="text"
                      name="search"
                      className="inputype"
                      placeholder="Search games"
                      onChange={(event) => handleSearch(event)}
                    />
                    <div className="search">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="dashboard_style_bg">
                <div className="input-title">
                  <div className="boxsearches">
                    <div className="selectboxes_dashboard">
                      <select
                        name="searchitem"
                        id="select"
                        className="searchoption"
                        onChange={(e) => {
                          selectoptions(e);
                        }}
                      >
                        <option value="selectall">Search All</option>
                        <option value="orderid">OrderId</option>
                        <option value="productname">Product Name</option>
                        <option value="sellername">Seller Name</option>
                      </select>
                    </div>
                    <div className="serachboxs">
                      <input
                        type="text"
                        name="search"
                        className="inputype"
                        placeholder="Search games"
                        onChange={(event) => handleSearch(event)}
                      />
                      <div className="search">
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                </div>
                {loaders ? (
                  <div class="loader loader1"></div>
                ) : (
                  <div className="table">
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 600 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              <input
                                type="checkbox"
                                id="selectall"
                                name="selectall"
                                style={{ cursor: "pointer" }}
                                onClick={handleallcheck}
                                checked={allcheckuser}
                              />
                            </StyledTableCell>
                            <StyledTableCell>Order Id</StyledTableCell>
                            <StyledTableCell>Product Name</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(rowsPerPage > 0
                            ? filterdata.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : filterdata
                          ).map((items, i) => (
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                <input
                                  type="checkbox"
                                  id={items._id}
                                  key={items._id}
                                  style={{ cursor: "pointer" }}
                                  checked={ischeck.includes(items._id)}
                                  onClick={handlecheck}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                onClick={() => setload(true)}
                              >
                                  {items.id}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                <Link
                                  href={`/dashboard/myorderedit/${items._id}`}
                                >
                                  <div className="image_or_produntname_style">
                                    <img
                                      src={items.productId.images[0]}
                                      width={67}
                                      height={85}
                                    />
                                    <div className="details">
                                      {items.productId.productname}
                                    </div>
                                  </div>
                                </Link>
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                {timeouts[i]}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                {items.order_status === "Pending" ? (
                                  <p style={{ color: "#eb2f06" }}>
                                    {items.order_status}
                                  </p>
                                ) : items.order_status === "Processing" ? (
                                  <p style={{ color: "yellow" }}>
                                    {items.order_status}
                                  </p>
                                ) : items.order_status === "Complete" ? (
                                  <p style={{ color: "green" }}>
                                    {items.order_status}
                                  </p>
                                ) : items.order_status === "Delivered" ? (
                                  <p style={{ color: "orange" }}>
                                    {items.order_status}
                                  </p>
                                ) : items.order_status === "Canceled" ? (
                                  <p style={{ color: "red" }}>
                                    {items.order_status}
                                  </p>
                                ) : items.order_status === "Delivering" ? (
                                  <p style={{ color: "orange" }}>
                                    {items.order_status}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                {checkcurrencyslocal ? (
                                  <div className="changecurrency_price">
                                    <div className="innercurrency">
                                      {Math.round(
                                        (items.productId.price * currencys +
                                          Number.EPSILON) *
                                          100
                                      ) / 100}
                                    </div>
                                    <div className="usd_style_currency">
                                      {currencyslocal}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="changecurrency_price">
                                    <div className="innercurrency">
                                      {Math.round(
                                        (items.productId.price * currencys +
                                          Number.EPSILON) *
                                          100
                                      ) / 100}
                                    </div>
                                    <div className="usd_style_currency">
                                      USD
                                    </div>
                                  </div>
                                )}
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
                              count={filterdata.length}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
