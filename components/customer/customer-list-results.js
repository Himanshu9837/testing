import { useState, useEffect, useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import Link from "next/link";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
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
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../checklogin/checklogin.js";
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

export const CustomerListResults = ({ customers, ...rest }) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);
  console.log(setloaderspage);  
  const [datetime, setdatetime] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [userdate, setDate] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // const [status,setstatus]=useState([])

  const [allcheckuser, setallcheckuser] = useState(false);
  const [ischeck, setischeck] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const [arrays, setarrays] = useState('')
  const [selectoption, setselectoption] = useState('This is Order Id');

  const selectoptions = (e) => {
    console.log(e.target.value);
    const selectedOption = e.target.value;
    console.log(`This is ${selectedOption}`)
    setselectoption(selectedOption);
  }


  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function getList() {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;

      fetch(`${apiKey}api/userlist`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Token: `${BearerToken}`,
        },
      }).then((result) => {
        result.json().then((resp) => {
          setData(resp.result);
          setFilteredData(resp.result);
          setdatetime(resp.date);
          // console.log(resp)
        });
      });
    }
  }

  useEffect(() => {
    setloaderspage(true);
    if (Tokens === "") {
    } else {
      text(Tokens);
      getList();
    }
  }, [Tokens]);
  function deleteUser(id) {
    fetch(`${apiKey}api/deleteuser/${id}`, {
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp.result);
        getList();
      });
    });
  }
  // console.log(data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function deleteusers() {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      const userids = { userid: ischeck };
      fetch(`${apiKey}api/deleteselecteduser/`, {
        method: "POST",
        body: JSON.stringify(userids),
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getList();
        });
    }
  }
  // check condition
  const handleallcheck = (e) => {
    setallcheckuser(!allcheckuser);
    // ischeck()
    setischeck(data.map((li) => li._id));
    if (allcheckuser) {
      setischeck([]);
    }
  };
  console.log(ischeck);
  console.log(allcheckuser);
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
  const handleSelect = (e) => {
    console.log(e);
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      const statusarray = { userid: ischeck, status: e };
      fetch(`${apiKey}api/changeuserstatus`, {
        method: "POST",
        body: JSON.stringify(statusarray),
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getList();
        });
    }
  };
  console.log(userdate);
  const handleSearch = (event) => {
    if (selectoption == 'name') {
      let value = event.target.value;
      let result = [];
      console.log(value);
      console.log(data);
      result = data.filter(function (data, i) {
        return (
          
          Object.values(data.username)
            .join("")
            .toLowerCase()
            .includes(value.toLowerCase()) 
        );
      });
      setFilteredData(result);
    }
    else if(selectoption == 'email'){
      let value = event.target.value;
      let result = [];
      console.log(value);
      console.log(data);
      result = data.filter(function (data, i) {
        return (
          
          Object.values(data.email)
            .join("")
            .toLowerCase()
            .includes(value.toLowerCase()) 
        );
      });
      setFilteredData(result);

    }
   
  };
  return (
    <>
      {loaderspage ? (
        <>
          <Checklogin />
          <div className="loader loader1"></div>
        </>
      ) : (
        <div>

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
                    <option value="123">None</option>
                    <option value="name"> Name</option>
                    <option value="email"> Email</option>
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
          <div className="dropdownmenu">
          <DropdownButton
            alignRight
            title="Action"
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
            variant="success"
          >
            <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
            <Dropdown.Item eventKey="Unactive">Unactive</Dropdown.Item>
            <Dropdown.Item onClick={deleteusers}>Delete</Dropdown.Item>
          </DropdownButton>
          </div>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <input
                        type="checkbox"
                        id="selectall"
                        name="selectall"
                        style={{ cursor: "pointer" }}
                        onClick={handleallcheck}
                        checked={allcheckuser}
                      />
                      {/* <select
                    id="selectall" style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }} onChange={e => setchangeinput(e.target.value)} value={changeinput} >
                    <option onClick={actionhandle}>Action</option>
                    <option>Active</option>
                    <option>Unactive</option>
                    <option>Banned</option>
                    <option>UnBanned</option>
                    <option>Delete</option>
                  </select> */}
                    </TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    {/* <TableCell>
                  Action
                </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredData
                  ).map((customer, i) => (
                    <>
                      <TableRow
                        hover
                        key={customer.id}
                        selected={
                          selectedCustomerIds.indexOf(customer._id) !== -1
                        }
                      >
                        <TableCell align={"center"}>
                          {
                            <input
                              type="checkbox"
                              id={customer._id}
                              key={customer._id}
                              style={{ cursor: "pointer" }}
                              checked={ischeck.includes(customer._id)}
                              onClick={handlecheck}
                            ></input>
                          }
                        </TableCell>
                        <TableCell align="center">
                          <Link href={`/E4gadmin/edit/${customer._id}`} passHref={true}>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                cursor: "pointer",
                              }}
                            >
                              <Avatar
                                src={customer.image}
                                sx={{ mr: 2 }}
                              ></Avatar>
                              <Typography color="textPrimary" variant="body1">
                                {customer.username}
                              </Typography>
                            </Box>
                          </Link>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{datetime[i]}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.status}</TableCell>
                      </TableRow>
                    </>
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
            </Box>
          </PerfectScrollbar>
        </div>
      )}
    </>
  );
};

const text = (token) => {
  if (token) {
    CustomerListResults.propTypes = {
      customers: PropTypes.array.isRequired,
    };
  } else {
    alert("hlo");
  }
};
