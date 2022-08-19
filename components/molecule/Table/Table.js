import React, { useContext } from "react";
import Image from "next/image";
import Userprofile from "../../../public/images/userprofile.jpg";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Box } from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import SearchIcon from "@mui/icons-material/Search";
import Contextapi from "../../../Context/Contextapi.js";

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

const Tables = ({ prop, timeout, filteredData, gamedata, ...head }) => {
  // const apiKey = process.env.NEXT_PUBLIC_API_URL;

  // hooks call here
  // const [dates, setdate] = useState([prop])
  // const earning=earn
  const { currencys, checkcurrencyslocal, currencyslocal } =
    useContext(Contextapi);
  console.log(currencys);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loaders, setloaders] = useState(true);
  const [allcheckuser, setallcheckuser] = useState(false);
  const [ischeck, setischeck] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setloaders(false);
    }, 1500);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleallcheck = (e) => {
    setallcheckuser(!allcheckuser);
    // ischeck()
    setischeck(filteredData.map((li) => li._id));
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

  // more function
  const more = () => {};

  return (
    <>
      {loaders ? (
        <div className="tableloder">
          <div class="loader "></div>
        </div>
      ) : (
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
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
                  {/* <StyledTableCell>Order Id</StyledTableCell>
                                <StyledTableCell>Product Name</StyledTableCell> */}
                  <StyledTableCell>{head.props1}</StyledTableCell>
                  <StyledTableCell align="initial">
                    {head.props2}
                  </StyledTableCell>
                  <StyledTableCell align="initial">Order Date</StyledTableCell>
                  {/* <StyledTableCell align="initial">Type</StyledTableCell> */}
                  <StyledTableCell align="initial">
                    {head.props9}
                  </StyledTableCell>
                  <StyledTableCell align="initial">
                    {head.props4}
                  </StyledTableCell>
                  {/* <StyledTableCell align="initial">
                    {head.props5}
                  </StyledTableCell> */}
                  {/* <StyledTableCell align="initial">
                    {head.props10}
                  </StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredData
                ).map((item, i) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      <input
                        type="checkbox"
                        id={item._id}
                        key={item._id}
                        style={{ cursor: "pointer" }}
                        checked={ischeck.includes(item._id)}
                        onClick={handlecheck}
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                        {item.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Link href={`/dashboard/purchasedetails/${item._id}`}>
                        <div className="image_or_produntname_style">
                          <img
                            src={item.productId.images[0]}
                            width={67}
                            height={85}
                          />
                          <div className="details">
                            {item.productId.productname}
                          </div>
                        </div>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p style={{ color: "#696A6B" }}>{timeout[i]}</p>
                    </StyledTableCell>
                    {/* <StyledTableCell>
                      <p style={{ color: "#696A6B" }}>{gamedata[i]}</p>
                    </StyledTableCell> */}
                    <StyledTableCell component="th" scope="row">
                      {item.order_status === "Pending" ? (
                        <p style={{ color: "#eb2f06" }}>{item.order_status}</p>
                      ) : item.order_status === "Processing" ? (
                        <p style={{ color: "yellow" }}>{item.order_status}</p>
                      ) : item.order_status === "Complete" ? (
                        <p style={{ color: "green" }}>{item.order_status}</p>
                      ) : item.order_status === "Delivered" ? (
                        <p style={{ color: "orange" }}>{item.order_status}</p>
                      ) : item.order_status === "Canceled" ? (
                        <p style={{ color: "red" }}>{item.order_status}</p>
                      ) : item.order_status === "Delivering" ? (
                        <p style={{ color: "orange" }}>{item.order_status}</p>
                      ) : (
                        ""
                      )}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {checkcurrencyslocal ? (
                        <div className="changecurrency_price">
                          <div className="innercurrency">
                            {Math.round(
                              (item.productId.price * currencys +
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
                              (item.productId.price * currencys +
                                Number.EPSILON) *
                                100
                            ) / 100}
                          </div>
                          <div className="usd_style_currency">USD</div>
                        </div>
                      )}
                    </StyledTableCell>
                    {/* <StyledTableCell component="th" scope="row">
                      {checkcurrencyslocal ? (
                        <div className="changecurrency_price">
                          <div className="innercurrency">
                            {Math.round(
                              (item.productId.price *
                                currencys *
                                item.quantity +
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
                              (item.productId.price *
                                currencys *
                                item.quantity +
                                Number.EPSILON) *
                                100
                            ) / 100}
                          </div>
                          <div className="usd_style_currency">USD</div>
                        </div>
                      )}
                    </StyledTableCell> */}

                    {/* <StyledTableCell component="th" scope="row">
                      <Link href={`/invoice/${item._id}`}>View Order</Link>
                    </StyledTableCell> */}
                    {/* )) */}
                    {/* } */}
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
        </div>
      )}
    </>
  );
};

export default Tables;
