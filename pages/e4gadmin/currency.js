import React, { useEffect, useState, useContext } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Label } from "reactstrap";
import { toast } from "react-toastify";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../../components/checklogin/checklogin.js";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Currency = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);
  const [currencys, setcurrencys] = useState([]);
  const [ids, setids] = useState("");
  const [dates, setdate] = useState("");
  const [currencyname, setcurrencyname] = useState("");
  const [countryname, setcountryname] = useState("");
  toast.configure();

  function toggle() {
    setIsOpened(!isOpened);
  }
  function toggle2() {
    setIsOpened2(!isOpened2);
  }
  function toggle3() {
    setIsOpened3(!isOpened3);
  }
  useEffect(() => {
    setloaderspage(true);
    if (Tokens === "") {
      // alert('kk')
    } else {
      // alert('kll')
      text(Tokens);
      fetch(apiKey + "api/currency/fetchcurrency/")
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0].isenable);
          setcurrencys(data);
        });
      pricefecth();
    }
  }, [Tokens]);

  const pricefecth = () => {
    fetch(apiKey + "api/currency/fetchfixerallrate/")
      .then((res) => res.json())
      .then((data) => {
        var x = data[0]._id;
        var y = data[0].date;

        setids(x);
        setdate(y);
      });
  };
  const updateprice = (e) => {
    e.preventDefault();

    fetch(`${apiKey}api/currency/updatecurrencyrate/${ids}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(" Price Update  Successfully");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
      });
  };
  const setprice = (e) => {
    e.preventDefault();
    const data = { currencyname: currencyname, countryname: countryname };
    fetch(`${apiKey}api/currency/addcurrency`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(" Price Add  Successfully");
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
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
        <div className="currency">
          <div className="toogles" onClick={toggle}>
            <h2 className="showinputss">Currency Option</h2>
            <ArrowDropDownCircleIcon />
          </div>
          <div className={`mainheader_style ${isOpened ? "active" : ""}`}>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">Base Currency</Label>
              <div className="categoryforminput">
                <select name="" id="" className="currencyselect">
                  <option value="">USD</option>
                </select>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">Allowed Currency</Label>
              <div className="categoryforminput">
                <div className="showcurrencydiv">
                  <ul>
                    {currencys.map((curr, index) => (
                      <li key={index}>{curr.countryname}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="toogles" onClick={toggle2}>
            <h2 className="showinputss">Currency Rate</h2>
            <ArrowDropDownCircleIcon />
          </div>
          <div className={`mainheader_style ${isOpened2 ? "active" : ""}`}>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">Allowed Currency</Label>
              <div className="categoryforminput">
                <button
                  onClick={(e) => {
                    updateprice(e);
                  }}
                  className="priceupdates"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">Last Date Update</Label>
              <div className="categoryforminput">
                <p>{dates}</p>
              </div>
            </div>
          </div>
          <div className="toogles" onClick={toggle3}>
            <h2 className="showinputss">Add Currency </h2>
            <ArrowDropDownCircleIcon />
          </div>
          <div className={`mainheader_style ${isOpened3 ? "active" : ""}`}>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">Currency Name</Label>
              <div className="categoryforminput">
                <input
                  type="text"
                  onChange={(e) => setcurrencyname(e.target.value)}
                  placeholder="currency name"
                  className="changecurr"
                />
              </div>
            </div>

            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">Country Name</Label>
              <div className="categoryforminput">
                <input
                  type="text"
                  onChange={(e) => setcountryname(e.target.value)}
                  placeholder="country name"
                  className="changecurr"
                />
              </div>
            </div>
            <div className="right_input new_category">
              <div className="categoryforminput">
                <button
                  onClick={(e) => {
                    setprice(e);
                  }}
                  className="priceupdates"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="tableshowprice">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="right">Currency Name</TableCell>
                      <TableCell align="right">Country Name</TableCell>
                      <TableCell align="right">Enable/Disable</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currencys.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Link href={`/E4gadmin/edit_currency/${row._id}`}>
                            {row._id}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{row.currencyname}</TableCell>
                        <TableCell align="right">{row.countryname}</TableCell>
                        <TableCell align="right">
                          {row.isenable ? "True" : "False"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const text = (token) => {
  if (!token) {
  } else {
    Currency.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  }
};
export default Currency;
