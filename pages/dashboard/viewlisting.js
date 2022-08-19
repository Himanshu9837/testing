import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/molecule/Dashboard";

import Inputfield from "../../components/molecule/inputfield/inputfield";
import Navbar from "../../components/molecule/Navbar2/Navbarhome";
import Footer from "../../components/molecule/Footer/footer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import SearchIcon from '@mui/icons-material/Search';
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
  const { load } = useContext(Contextapi);
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [timeout, setTimeout] = useState([]);
  const [toggle, settoggle] = useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [selectoption, setselectoption] = useState('This is Order Id');

  const toggledropdown = () => {
    settoggle(!toggle)
  }
  const [orders, setorders] = useState([]);


  const sellerorder = (id) => {

    fetch(`${apiKey}api/seller/sellerproductlist/${id}`)
      .then((res) => res.json())
      .then((data) => {

        setorders(data.list);
        setTimeout(data.datearray);
        setFilteredData(data.list)
      });
  };

  const selectoptions = (e) => {
  
    const selectedOption = e.target.value;
    
    setselectoption(selectedOption);
  }

  const handleSearch = (event) => {
    if (selectoption == "productname") {
    let value = event.target.value;
    let result = [];

    result = orders.filter(function (data, i) {

      var number = Number(data.price);


      return (

        Object.values(data.productname).join('').toLowerCase().includes(value.toLowerCase()) 
      );
    });
    setFilteredData(result);
  }else if(selectoption == "orderid"){
    let value = event.target.value;
 
    let result = [];
    result = orders.filter(function (data, i) {
      var number = data.id
      let x = number.toString();
    return (
        Object.values(x).join('').toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(result);
  }
  };

  const getsellerstatus = async (userid) => {
    let sellerId = await fetch(
      apiKey + "api/seller/sellerdetails/" + userid
    );
    sellerId = await sellerId.json();

    sellerorder(sellerId._id);
  };

  useEffect(async () => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    getsellerstatus(cart_data);
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

   

  return (
    <>
      <div className="mainview">
        <Navbar />
        <div className={`lodersouter ${load ? 'active' : ''}`}>
          <div className="innerloaders">
            <div class="loader"></div>
          </div>
        </div>
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="rightpannel">
            <div className="rightpannel_wrapper">

              <h2 className="purchase">View Listing</h2>
              <div className="input-title">
                <div className="boxsearches">
                  <div className="selectboxes">
                    <select
                      name="searchitem"
                      id="select"
                      className="searchoption"
                      onChange={(e) => {
                        selectoptions(e)
                      }}
                    >
                      <option>None</option>
                      <option value="productname"> Product Name </option>
                      <option value="orderid"> Order Id </option>
                      {/* <option value="1">third</option> */}
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

                {/* <div className="filters">
                  <button className="btns filterbtn">Apply</button>
                </div> */}

                {/* <div className="actions" onClick={toggledropdown}>
                  <button className="btns filterbtn">Actions</button>
                  <div
                    id="myDropdown"
                    className={`dropdown-content ${toggle ? "active" : ""}`}
                  >
                    <a href="#">Delete</a>
                  </div>
                </div> */}
              </div>
              <div className="table">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Serial</StyledTableCell>
                        <StyledTableCell>ProductId</StyledTableCell>
                        <StyledTableCell>Product Name</StyledTableCell>
                        <StyledTableCell>Stock</StyledTableCell>
                        <StyledTableCell>Price</StyledTableCell>

                        <StyledTableCell>Status</StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {

                        (rowsPerPage > 0
                          ? filteredData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          : filteredData
                        ).map((items, i) => (
                          <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                              <input type="checkbox" />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Link
                                href={`/dashboard/viewlisting/${items._id}`}
                              >
                                <a href="">{items.id}</a>
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <div className="details">{items.productname}</div>
                            </StyledTableCell>

                            <StyledTableCell component="th" scope="row">
                              {items.stock}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {items.price}
                            </StyledTableCell>

                            <StyledTableCell component="th" scope="row">
                              {items.stock <= 0 ? (
                                <p>Inactive</p>
                              ) : (
                                <p>Active</p>
                              )}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      }
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
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
