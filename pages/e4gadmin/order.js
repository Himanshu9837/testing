import { DashboardLayout } from "../../components/dashboard-layout";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Link from "next/link";
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
import { Box, Container, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from '../../components/checklogin/checklogin.js';

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

const Order = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens,setloaderspage } = useContext(Contextapi);
  console.log(Tokens);

  const [order, setorder] = useState([]);
  const [timeout, setTimeout] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filteredData, setFilteredData] = useState([]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setloaderspage(true)
    if (Tokens === '') {

    } else {
      text(Tokens)
      getorder();
    }

  }, [Tokens]);
  const [selectoption, setselectoption] = useState('This is Order Id');

  const selectoptions = (e) => {
    console.log(e.target.value);
    const selectedOption = e.target.value;
    console.log(`This is ${selectedOption}`)
    setselectoption(selectedOption);
  }

  const getorder = () => {
    fetch(apiKey + "api/order/orderlist/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.orderlist);
        setorder(data.orderlist);
        setTimeout(data.datearray)
        setFilteredData(data.orderlist)
      });
  };

  const handleSearch = (event) => {
    if (selectoption == 'orderid') {
      let value = event.target.value;
      
      let array = "";
      let result = [];
      console.log(value);
      result = order.filter(function (data) {
       
      return (
          Object.values(data.id).join('').toLowerCase().includes(value.toLowerCase()) 
        );
      });
      setFilteredData(result);
    }else if( selectoption == 'productname'){
      let value = event.target.value;
      let array = "";
      let result = [];
      console.log(value);
      result = order.filter(function (data) {
        console.log(data);
        console.log("tg", data.id);
        console.log("hh", value);
        console.log(data.price);
        var number = Number(data.price);
        console.log(typeof (number));
      return (
          Object.values(data.productId.productname).join('').toLowerCase().includes(value.toLowerCase()) 
        );
      });
      setFilteredData(result);

    }else if(selectoption == 'customername'){
      let value = event.target.value;
      // let array = "";
      let result = [];
      console.log(value);
      result = order.filter(function (data, i) {
      
      return (
        Object.values(data.userId.fullname).join('').toLowerCase().includes(value.toLowerCase()) 
        );
      });
      setFilteredData(result);
    }

    };
   
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(order.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  console.log(isCheckAll);
  console.log(isCheck);

  const handleClicks = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // delete item
  function deleteorder() {
    const orderids = { orderid: isCheck };
    fetch(`${apiKey}api/order/selectdelete/`, {
      method: "DELETE",
      body: JSON.stringify(orderids),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getorder();
      });
  }

  return (
    <>
      {
        loaderspage ? (
          <>
            <Checklogin />
            <div className="loader loader1"></div>
          </>
        ) : (
          <div className="orderdetail">
            <Typography
              // sx={{m: 1}}
              variant="h4"
            >
              Order
            </Typography>
            <div className="input-title">
              <div className="boxsearches">
                <div className="selectboxes">
                  <select
                    name="searchitem"
                    id="select"
                    className="searchoption_backend"
                    onChange={(e) => {
                      selectoptions(e)
                    }}
                  >
                    <option value="1">None</option>
                    <option value="orderid">OrderId</option>
                    <option value="productname">Product Name</option>
                    <option value="customername">Customer Name</option>
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

              {/* <div className="filters">
                <button className="btns filterbtn">Apply</button>
              </div> /}

              {/ <div className="actions" onClick={toggledropdown}>
                <button className="btns filterbtn">Actions</button>
                <div
                  id="myDropdown"
                  className={dropdown-content ${toggle ? "active" : ""}}
                >
                  <a href="#">Delete</a>
                </div>
              </div> */}
            </div>
          <div className="dropdown_backend">
            <DropdownButton
              alignRight
              title="Action"
              id="dropdown-menu-align-right"
              // onSelect={handleSelect}
              variant="success"
              // style={{marginBottom: '1rem'}}
              >
              <Dropdown.Item onClick={deleteorder}>Delete</Dropdown.Item>
            </DropdownButton>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }}
                aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <input
                        type="checkbox"
                        id="selectall"
                        name="selectall"
                        onClick={handleSelectAll}
                        checked={isCheckAll}
                        style={{ cursor: "pointer" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">Order-Id</StyledTableCell>
                    <StyledTableCell align="center">Puroduct Name</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Price PerUnit</StyledTableCell>
                    <StyledTableCell align="center">Grand Total</StyledTableCell>
                    {/* <StyledTableCell align="center">Service Fess</StyledTableCell> */}
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Customer Name</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">View</StyledTableCell>
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
                    <StyledTableRow key={row._id}>
                      <StyledTableCell
                        component="th"
                        scope="row">
                        <input
                          type="checkbox"
                          id={row._id}
                          name={row.first_name}
                          key={row._id}
                          onClick={handleClicks}
                          checked={isCheck.includes(row._id)}
                          style={{ cursor: "pointer" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell align="center">
                        <div
                          className="orderimg"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <img
                            src={row.productId.images[0]}
                            alt="not found"
                            style={{ width: "100%", height: "100%" }}
                          />
                          <p className="title"
                            style={{ marginLeft: "1rem" }}>
                            {row.productId.productname}
                          </p>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.productId.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.productId.price * row.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {timeout[i]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.userId.fullname}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.order_status === "Pending" ? (
                          <p style={{ color: "red" }}>{row.order_status}</p>
                        ) : row.order_status === "Processing" ? (
                          <p style={{ color: "yellow" }}>{row.order_status}</p>
                        ) : row.order_status === "Complete" ? (
                          <p style={{ color: "green" }}>{row.order_status}</p>
                        ) : row.order_status === "Delivered" ? (
                          <p style={{ color: "orange" }}>{row.order_status}</p>
                        ) : (
                          ""
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link href={`/E4gadmin/view/${row._id}`}>View</Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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

const text = (token) => {
  console.log(token);
  if (token) {
    Order.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  }
  else {

  }
}

export default Order;