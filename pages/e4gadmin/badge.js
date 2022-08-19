import React, { useContext, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../../components/checklogin/checklogin.js";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Badge = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

  const [uploadcategoryimg, setcategoryimg] = useState([]);
  const [categoryimage, setImage] = useState("");
  const [uploadcoverimag, setcoverimage] = useState([]);
  const [coverimg, setcoverimg] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);

  const [conditions, setconditions] = useState([]);
  const [conditions2, setconditions2] = useState([]);

  const [conditions3, setconditions3] = useState("");

  const [badgename, setbadgename] = useState("");
  const [badgedesc, setbadgedesc] = useState("");
  const [conditionss, setconditionss] = useState("");

  const [isCheckedFilter, setcheckfilter] = useState(false);
  const [isCheckedFilter2, setcheckfilter2] = useState(false);

  useEffect(() => {
    setloaderspage(true)
    if (Tokens === '') {
      // alert('kk')
    } else {
      text(Tokens)
      const arrayOfData = localStorage.getItem("userInfo");
      if (arrayOfData) {
        const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
        const cart_data = d.accesstoken;
        console.log(cart_data);
        const BearerToken = cart_data;
        fetch(apiKey + "api/badges/fetchcondition", {
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            Token: `${BearerToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setconditions(data);
          });
      }
      Seebadge();
      Seecondition();
    }
  }, [Tokens]);

  const Seebadge = () => {
    fetch(apiKey + "api/badges/fetchbadges")
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].badgesenable);
        setconditions2(data);
      });
  };
  const Seecondition = () => {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      text(cart_data);

      console.log(cart_data);
      const BearerToken = cart_data;

      fetch(apiKey + "api/badges/fetchbadgesconfig", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data[0].badgesenable);
          setconditions3(data._id);
          setcheckfilter(data.badgesenablesetting);
        });
    }
  };

  console.log(isCheckedFilter);
  console.log(conditions3);

  function toggle() {
    setIsOpened(!isOpened);
  }
  function toggle2() {
    setIsOpened2(!isOpened2);
  }
  function toggle3() {
    setIsOpened3(!isOpened3);
  }
  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });
  const [{ alt1, src1 }, setImg1] = useState({
    src1: "",
    alt1: "Upload an Image",
  });

  const handleImage = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setcategoryimg(file);
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  console.log(conditionss);

  toast.configure();

  async function Datesend(e) {
    e.preventDefault();
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      const formData = new FormData();
      formData.append("badgename", badgename);
      formData.append("badgediscription", badgedesc);
      formData.append("badgesenable", isCheckedFilter2);
      formData.append("conditionid", conditionss);
      formData.append("badgesicon", categoryimage);

      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
          Token: `${BearerToken}`,
        },
      };
      const url = apiKey + "api/badges/addbadges";
      axios
        .post(url, formData, confiq)
        .then((response) => {
          console.log(response.data.message);
          toast.success("Badge Add Successfully");
          Seebadge();
        })
        .catch((e) => {
          // console.log(e.response.data.error);
          toast.error("Something Wrong");
        });
    }
  }

  const Datesend2 = (e) => {
    e.preventDefault();
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      const data = { condition: isCheckedFilter };
      fetch(apiKey + "api/badges/updatebadgeconfig/" + conditions3, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Enable Successfully");
        })
        .catch((error) => {
          toast.error("Something Wrong");
        });
    }
  };

  const checkfiltered = () => {
    setcheckfilter(!isCheckedFilter);
  };
  const checkfiltered2 = () => {
    setcheckfilter2(!isCheckedFilter2);
  };

  const changeids = (e) => {
    console.log(e.target.value);
    setconditionss(e.target.value);
  };

  const deletefun = (id) => {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      alert("hi");
      console.log(id);
      fetch(apiKey + "api/badges/deletebadges/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token: `${BearerToken}`,
        },
      })
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          console.log(res);
          toast.success("Delete Successfully");
          Seebadge();
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
      ) : (
        <div className="badges_backend">
          <div className="right_input new_category">
            <Label className="col-xl-3 col-md-4">
              <span>*</span>Global Enable
            </Label>
            <div className="categoryforminput">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={checkfiltered}
                  checked={isCheckedFilter}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <Button variant="success" onClick={Datesend2}>
            Update
          </Button>
          <div className="toogles" onClick={toggle}>
            <h2 className="showinputss">Add Badge</h2>
            <ArrowDropDownCircleIcon />
          </div>
          <div className={`mainheader_style ${isOpened ? "active" : ""}`}>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Badge Enable
              </Label>
              <div className="categoryforminput">
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={checkfiltered2}
                    checked={isCheckedFilter2}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Badge Name
              </Label>
              <div className="badgename">
                <input
                  type="text"
                  className="badgenameinput"
                  onChange={(e) => setbadgename(e.target.value)}
                  defaultValue={badgename}
                  required
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Badge Description
              </Label>
              <div className="badgename">
                <input
                  type="text"
                  className="badgenameinput"
                  onChange={(e) => setbadgedesc(e.target.value)}
                  defaultValue={badgedesc}
                  required
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Badge Icon
              </Label>
              <div className="uploadbtnbackend">
                <label className="custom-file-uploadbackend">
                  <div className="thumbnailbtn">Upload</div>
                  <input
                    type="file"
                    onChange={handleImage}
                    className="inputdisplay"
                  />
                </label>
              </div>
            </div>
            {uploadcategoryimg.length > 0 ? (
              <div className="profileimage">
                <img src={uploadcategoryimg} alt="noss" />
              </div>
            ) : (
              ""
            )}

            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Badge Conditions
              </Label>
              <div className="uploadbtnbackend">
                <select
                  name=""
                  id=""
                  className="badgedropdown"
                  onChange={(e) => {
                    changeids(e);
                  }}
                >
                  <option value="" hidden selected>
                    Select Dropdown...
                  </option>
                  {conditions.map((condition, index) => (
                    <option value={condition._id} key={index}>
                      {condition.conditionname}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button variant="success" onClick={Datesend}>
              Save
            </Button>
          </div>

          <div className="toogles" onClick={toggle2}>
            <h2 className="showinputss">See Badge</h2>
            <ArrowDropDownCircleIcon />
          </div>
          <div className={`mainheader_style ${isOpened2 ? "active" : ""}`}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Badge Icon</TableCell>
                    <TableCell align="right">Badge Name</TableCell>
                    <TableCell align="right">Badge Description</TableCell>
                    <TableCell align="right">Badge Id</TableCell>
                    <TableCell align="right">Badge Toggle</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {conditions2.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="bagdeicon">
                          <img src={row.badgesicon} alt="Not-found" />
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link href={`/E4gadmin/edit_badge/${row._id}`} passHref={true}>
                          <div className="badgename">{row.badgename}</div>
                        </Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.badgediscription}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.conditionId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.badgesenable ? (
                          <div className="enable">
                            <p>Enable</p>
                          </div>
                        ) : (
                          <div className="disable">
                            <p>Disable</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => {
                          deletefun(row._id);
                        }}
                      >
                        <div className="deletebadge">
                          <DeleteIcon />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <Button variant="success" onClick={Datesend}>Save</Button> */}
          </div>

          <div className="toogles" onClick={toggle3}>
            <h2 className="showinputss">All Conditions</h2>
            <ArrowDropDownCircleIcon />
          </div>
          <div className={`mainheader_style ${isOpened3 ? "active" : ""}`}>
            <ul className="codition">
              {conditions.map((con, index) => (
                <li className="conditionlist" key={index}>
                  {con.conditionname}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
const text = (token) => {
  if (token) {
    Badge.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  } else {
    alert("hlo");
  }
};
export default Badge;
