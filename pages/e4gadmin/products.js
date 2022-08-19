import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
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
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from '../../components/checklogin/checklogin.js';



toast.configure();
const notify = (message) => toast(message);
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

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

const Products = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);
  console.log(Tokens);

  const [productlist, setProductList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [timeout, setTimeout] = useState([]);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const open = Boolean(anchorEl);
  const handleClicki = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(productlist.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  console.log(isCheck);

  function getproduct() {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      fetch(apiKey + "api/product/productlist/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProductList(data.result);
          setFilteredData(data.result);
          setData(data.result);
          setTimeout(data.datearray)
        });
    }
  }
  console.log(timeout);
  useEffect(() => {
    setloaderspage(true)
    if (Tokens === '') {

    } else {
      text(Tokens)
      getproduct();
    }
  }, [Tokens]);

  function deleteProduct() {
    const userid = { userid: isCheck };
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      console.log("id", isCheck);
      confirm("Are you sure to delete");
      fetch(`${apiKey}api/product/deleteproduct/${isCheck}`, {
        method: "delete",
        body: JSON.stringify(userid),
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,

        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // getList();
          notify(data.message);
          getproduct();
        });
    }
  }

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const handleSelect = (e) => {
    const statusarray = { userid: isCheck, status: e };
    fetch(apiKey + "api/changeuserstatus", {
      method: "POST",
      body: JSON.stringify(statusarray),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getproduct();
      });
  };

  const onChangeOption = (event) => {
    if (event.detail === 0) {
      console.log(event.target.value);
    }
  }
  const [selectoption, setselectoption] = useState('This is Order Id');



  const selectoptions = (e) => {
    console.log(e.target.value);
    const selectedOption = e.target.value;
    console.log(`This is ${selectedOption}`)
    setselectoption(selectedOption);
  }


  const handleSearch = (event) => {

    if (selectoption == "productname") {

      let value = event.target.value;
      console.log(value);
      let array = "";
      let result = [];
      // console.log(value);
      console.log(productlist);
      result = productlist.filter(function (data, i) {
        // let y =  parseInt(value);
        // console.log(typeof y);
        // console.log(y)
        // console.log(typeof value)
        console.log(data);
        console.log("tg", data.id);
        console.log("hh", value);
        console.log(data.price);
        console.log(data.userId.fullname)
        var number = data.price
        let x = number.toString();


        return (
          Object.values(data.productname).join('').toLowerCase().includes(value.toLowerCase())
          // Object.values(data.userId.fullname).join('').toLowerCase().includes(value.toLowerCase()) ||
          // Object.values(timeout[i]).join('').toLowerCase().includes(value.toLowerCase()) ||
          // Object.values(x).join('').toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(result);
    } else if (selectoption == "sellername") {
      let value = event.target.value;
      console.log(value);

      let result = [];
      // console.log(value);
      // console.log(productlist);
      result = productlist.filter(function (data, i) {



        return (
          Object.values(data.userId.fullname).join('').toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(result);
    }
    else if (selectoption == "orderids") {
      let value = event.target.value;
      console.log(value);
      let result = [];
      result = productlist.filter(function (data, i) {
        var number = data.id
        let x = number.toString();
      return (
          Object.values(x).join('').toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(result);
    }
    // let c = typeof updatedvalue;
    // console.log(c);
    // let array = "";



    // let result = [];
    // result = productlist.filter(function (data, i) {
    //   console.log(productlist);      
    //   console.log(data);
    //   console.log("tg", data.id);
    //   console.log(typeof data.id);
    //   // console.log("hh", updatedvalue)       
    //   return (

    //    console.log(Object.values(data.id))
    //   );
    // });
  };

  return (
    <>
      <div className="alerts">
        <ToastContainer autoClose={2000} />
      </div>
      {
        loaderspage ? (
          <>
            <Checklogin />
            <div className="loader loader1"></div>
          </>

        ) : (
          <>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "27px",
              }}
            >

              <Typography
                // sx={{m: 1}}
                variant="h4"
              >
                Product
              </Typography>
              <Link href="/E4gadmin/add_product"
                passHref={true}
              >
                <button className={"add_product_btn"}>Add products</button>
              </Link>
            </div>
            <div className="input-title2">
              <div className="boxsearches">
                <div className="selectboxes">
                  <select
                    name="searchitem"

                    id="select"
                    className="searchoption_backend"
                    value={selectoption}
                    onChange={(e) => {
                      selectoptions(e)
                    }}
                  >
                    <option>Select an Option</option>
                    <option value="orderids">Order ID</option>
                    <option value="productname" >Product Name</option>
                    <option value="sellername" >Seller Name</option>
                  </select>
                </div>
                <div className="serachboxs">
                  <input
                    type="text"
                    name="search"
                    className="inputype_backend"
                    placeholder="Search"
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


            {/* <div className="input-title_customer">
              <div className="seletdivs">
                <select
                  name="searchitem"
                  id="select"
                  className="searchoption_customer">
                  <option value="1">Search All</option>
                  <option value="1">Product Name</option>
                  <option value="1">Date</option>
                </select>
              </div>
              <div className="inputsearch">
                <input
                  type="text"
                  name="search"
                  className="inputype_customer"
                  placeholder="Search"
                  onChange={(event) => handleSearch(event)}
                />
                <div className="search">
                  <SearchIcon />
                </div>
              </div>
            </div> */}
            <Box component="main">
              <Container maxWidth={false}>
                {/* <ProductListToolbar /> */}
                <Box sx={{ mt: "20px" }}>
                  <DropdownButton
                    alignRight
                    title="Action"
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                    variant="success"
                    style={{ marginBottom: '2rem' }}
                  >
                    <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                    <Dropdown.Item eventKey="Unactive">Unactive</Dropdown.Item>
                    <Dropdown.Item onClick={deleteProduct}>Delete</Dropdown.Item>
                  </DropdownButton>
                </Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }}
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
                        <StyledTableCell align="center">Id</StyledTableCell>
                        {/* <StyledTableCell align="center">Thumbnail</StyledTableCell> */}
                        <StyledTableCell align="center">Product Name</StyledTableCell>
                        <StyledTableCell align="center">Sellar</StyledTableCell>
                        <StyledTableCell align="center">Qty</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">Total Price</StyledTableCell>
                        <StyledTableCell align="center"
                          sort>
                          Date & Time
                        </StyledTableCell>
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
                          <StyledTableCell>
                            <input
                              type="checkbox"
                              id={row._id}
                              name={row.productname}
                              key={row._id}
                              onClick={handleClick}
                              checked={isCheck.includes(row._id)}
                              style={{ cursor: "pointer" }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.id}</StyledTableCell>
                          <Link href={`/E4gadmin/edit_product/${row._id}`}
                            passHref={true}
                          >
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                              sx={{ cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={row.category.images}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "contain",
                                  }}
                                />
                                <p className="product_name_style_frontend">{row.productname}</p>
                              </div>
                            </StyledTableCell>
                          </Link>
                          <StyledTableCell align="center">
                            {row.userId.fullname}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.qty}</StyledTableCell>
                          <StyledTableCell align="center">
                            {row.price}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.price * row.qty}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {timeout[i]}
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
              </Container>
            </Box>
          </>
        )

      }

    </>
  );
};


const text = (token) => {
  if (token) {
    Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  }
  else {
    alert('hlo')
  }
}

export default Products;
