import React, { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Image from "next/image";
// import Userbackground from "../../../public/images/userbackground.jpg";
// import UserImage from "../../../public/images/userprofile.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import PhoneInput from "react-phone-input-2";
// import moment from "moment";
import PasswordStrengthMeter from "../../../components/atom/PasswordMeter/passwordmeter";

const Userdetail = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [value, setValue] = React.useState("1");
  const [currentemail, setemail] = useState(false);
  const [currentpassword, setpassword] = useState(false);
  const [upload, setupload] = useState([]);
  const [password, showpassword] = useState(false);
  const [fname, setfname] = useState("");
  const [username, setusername] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");

  const [posts, setPosts] = useState([]);

  const [address, setaddress] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");

  const [emails, setemails] = useState("");
  const [passwords, setpasswords] = useState("");
  const [updateemails, setupdateemails] = useState("");
  const [currentpasswords, setcurrentpasswords] = useState("");
  const [newpasswords, setnewpasswords] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [errorN, setErrorN] = useState("");
  const [errorU, setErrorU] = useState("");
  const [errorL, setErrorL] = useState("");
  const [errorS, setErrorS] = useState("");
  const [errors, setErrors] = useState("");
  const [allerror, setallErros] = useState("");
  const [strength, setStrength] = useState("");
  const [disable, setDisable] = useState(false);
  const [showpass, setshowpass] = useState(false);
  const [src, setSelectedImage] = useState(null);
  const [closep, setClosep] = useState(false);
  const [crop, setCrop] = useState({
    aspect: 16 / 9,
    width: 300,
    zoom: 1,
  });
  const [src1, setSelectedImage1] = useState(null);
  const [closep1, setClosep1] = useState(false);
  const [crop1, setCrop1] = useState({
    aspect: 16/9,
    width: 200,
    zoom: 1,    
  });

  console.log(crop);
  // const [image, setImage] = useState("");
  const [upload2, setupload2] = useState("");
  const [loaders, setloaders] = useState(true);

  const [coverimage, setCoverimage] = useState("");
  const [phone, setphone] = useState("");
  const [rid, setrid] = useState("");
  const [dob, setDob] = useState("");
  const [blob, setBlob] = useState(null);
  const [imageResult, setImageResult] = useState(null);
  const [saveimg, setsaveimg] = useState(false);
  const [image, setImage] = useState(null);
  const [blob1, setBlob1] = useState(null);
  const [imageResult1, setImageResult1] = useState(null);
  const [saveimg1, setsaveimg1] = useState(false);
  const [image1, setImage1] = useState(null);
  const [about, setAbout] = useState("");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleemail = () => {
    setemail(!currentemail);
  };
  const togglepassword = () => {
    setpassword(!currentpassword);
  };

  // const uploadfiles = (e) => {
  //     const file = URL.createObjectURL(e.target.files[0])
  //
  //     setupload(file);
  //     setCoverimage(e.target.files[0])
  // }
  // const [{ alt, src }, setImg] = useState({
  //   src: "",
  //   alt: "Upload an Image",
  // });
  // const [{ alt1, src1 }, setImg2] = useState({
  //   src1: "",
  //   alt1: "Upload an Image",
  // });

  const handleValid = (e) => {
    let value = e.target.value;
    let number = /[0-9]/g;
    let upperCaseLetters = /[A-Z]/g;
    let lowerCaseLetters = /[a-z]/g;
    let sepcialCharacters = /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/;
    setDisable(true);
    setStrength(e.target.value);

    if (value.length >= 0) {
      setshowpass(true);
    }
    if (value.length === 0) {
      setshowpass(false);
    }
    if (value.length >= 8) {
      setErrors("");
    } else {
      setErrors(`Password must be 0-8 Characters long`);
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
      setallErros("pleas fill all");
    }
  };

  const uploadfiles = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    console.log("gf", src);
    setsaveimg(false);
    setClosep(false);
    e.target.value = null;
  };

  const uploadfiles2 = (e) => {
    setSelectedImage1(URL.createObjectURL(e.target.files[0]));
    console.log("gf", src);
    setsaveimg1(false);
    setClosep1(false);
    e.target.value = null;
  };

  // const uploadprofile = (e) => {
  //
  //     // const userfile = e.target.files[0];
  //
  //     // setuserupload(userfile)
  //     setImage(e.target.files[0])
  // }

  useEffect(() => {
    UserData();
    setTimeout(() => {
      setloaders(false);
    }, 1500);
  }, []);
  const UserData = async () => {
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;

      let userId = await fetch(`${apiKey}api/edituser/${cart_data}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      userId = await userId.json();
      setPosts(userId.result);
      setfname(userId.result.fullname);
      setusername(userId.result.username);
      setDob(userId.result.dateofbirth);
      setemails(userId.result.email);
      setupdateemails(userId.result.updateemails);
      setaddress(userId.result.address);
      setzipcode(userId.result.zipcode);
      setcity(userId.result.city);
      setcountry(userId.result.country);
      // setphone(userId.result.phone);
      setImageResult1(userId.result.image);
      setImageResult(userId.result.coverimage);
      setpassword(userId.result.passowrd);
      setcpassword(userId.result.cpassword);
      setcurrentpasswords(userId.result.currentpassword);
      setphone(userId.result.phone);
      setrid(userId.result.id);
      setAbout(userId.result.about);
      // setStatus(userId.result.status);
      // setcurrentpasswords(userId.result.currentpassword);
      // document.addEventListener('mousedown', () => {
      //     setDisable(false);
      // });
    }
  };

  toast.configure();

  async function updateUser(e) {
    e.preventDefault();
    const arrayOfData = localStorage.getItem("user");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
      const token = d.accesstoken;

      const formData = new FormData();
      formData.append("fullname", fname);
      formData.append("username", username);
      formData.append("dateofbirth", dob);
      formData.append("address", address);
      // formData.append('dateofbirth', dateofbirth);
      formData.append("email", emails);
      formData.append("password", passwords);
      formData.append("updateemails", updateemails);
      formData.append("currentpassword", currentpasswords);
      formData.append("newpasswords", newpasswords);
      formData.append("cpassword", cpassword);
      formData.append("image", blob1);
      formData.append("coverimage", blob);
      formData.append("zipcode", zipcode);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("phone", phone);
      formData.append("rid", rid);
      formData.append("about", about);


      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
          "content-type": "application/json",
          Token: `${token}`,
        },
      };
      const url = `${apiKey}api/updateuser/${cart_data}`;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          toast.success(response.data.message);
          // JSON.stringify(response)
          // toast('Profile Updated Successfully');

          // toast.success("Profile Update Sucessfully.");
        })
        .catch((e) => {
          toast.error("Image size to large");

          // toast.error(e.response.data.error);
        });
    }
  }
  const togglepasswords = () => {
    showpassword(!password);
  };

  function getCroppedImg(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    console.log(image.naturalWidth);
    const scaleX = image.naturalWidth / image.width;
    console.log(scaleX);
    console.log(image.naturalHeight);
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob(
      (blob) => {
        setBlob(blob);
        console.log("data", blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult(base64Image);

    console.log("data", canvas);
    setsaveimg(true);
  }
  function getCroppedImg1(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    const scaleX = image1.naturalWidth / image1.width;
    const scaleY = image1.naturalHeight / image1.height;
    canvas.width = crop1.width;
    canvas.height = crop1.height;
    const ctx = canvas.getContext("2d");


    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop1.width * pixelRatio;
    canvas.height = crop1.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image1,
      crop1.x * scaleX,
      crop1.y * scaleY,
      crop1.width * scaleX,
      crop1.height * scaleY,
      0,
      0,
      crop1.width,
      crop1.height
    );

    canvas.toBlob(
      (blob) => {

        setBlob1(blob);
        console.log("data", blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult1(base64Image);


    console.log("data", canvas);
    setsaveimg1(true);
  }
  const closedmenu = (e) => {
    setClosep(true);
  };
  const closedmenu1 = (e) => {
    setClosep1(true);
  };

  return (
    <>
      {loaders ? (
        <div class="loader loader1"></div>
      ) : (
        <div className="usersdetails">
          <h2 className="h2tag_style">USER ACCOUNT</h2>
          <div className="table_div_user_daat" >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="scrollable"
                >
                  <Tab label="Information" value="1" />
                  <Tab label="Security" value="2" />
                  <Tab label="Image" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <form action="post">
                    <div className="inform-inner">
                      <div className="users">
                        <div class="group">
                          <input
                            type="text"
                            className="inputs"
                            onChange={(e) => setfname(e.target.value)}
                            defaultValue={fname}
                            required
                          />

                          <label className="labels">Full Name</label>
                        </div>
                      </div>
                      <div className="users">
                        <div class="group">
                          <input
                            type="text"
                            className="inputs"
                            onChange={(e) => setusername(e.target.value)}
                            defaultValue={username}
                            required
                          />

                          <label className="labels">Username</label>
                        </div>
                      </div>
                      <div className="users">
                        <div class="group">
                          <input
                            type="text"
                            className="inputs"
                            onChange={(e) => setzipcode(e.target.value)}
                            defaultValue={zipcode}
                            required
                          />

                          <label className="labels">Zip Code</label>
                        </div>
                      </div>
                      <div className="users">
                        <div class="group">
                          <input
                            type="text"
                            className="inputs"
                            onChange={(e) => setcountry(e.target.value)}
                            defaultValue={country}
                            required
                          />

                          <label className="labels">Country</label>
                        </div>
                      </div>
                      <div className="users">
                        <div class="group">
                          <input
                            type="text"
                            className="inputs"
                            onChange={(e) => setcity(e.target.value)}
                            defaultValue={city}
                            required
                          />

                          <label className="labels">City</label>
                        </div>
                      </div>

                      <div className="users ">
                        <div class="group">
                          <input
                            type="text"
                            className="inputs"
                            onChange={(e) => setaddress(e.target.value)}
                            defaultValue={posts.address}
                            required
                          />

                          <label className="labels">Address</label>
                        </div>
                      </div>
                      <div className="users">
                        <div class="group" id="detsss">
                          <input
                            type="date"
                            className="inputs"
                            onChange={(e) => setDob(e.target.value)}
                            defaultValue={dob}
                            required
                          />

                          <label className="labels">Date</label>
                        </div>
                      </div>
                      <div className="users">
                        <div class="group">
                          <PhoneInput
                            // className="inputs"
                            id="phone"
                            placeholder="Phone number"
                            value={phone}
                            onChange={setphone}
                            name="phone"
                            // maxLength="11"
                            required=""
                          />

                          <label className="labels">Phone</label>
                        </div>
                      </div>
                      <div className="users ">
                        <div class="group">
                          <input
                            type="text"
                            className="inputs"
                            onChange={(e) => setAbout(e.target.value)}
                            defaultValue={about}
                            required
                          />

                          <label className="labels">About Us</label>
                        </div>
                      </div>
      
                      
                    </div>
                    <div className="updatebtn">
                        <button
                          className="update"
                          onClick={(e) => {
                            updateUser(e);
                          }}
                        >
                          Update
                        </button>
                      </div>
                  </form>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="basic-inform">
                  <form action="post">
                    <div className="inform-inners">
                      <div className="users">
                        {/* <label for="email">Email:</label>
                                        <div class="input-container">
                                            <input id="name" class="input" type="text" pattern=".+" required />
                                            <label class="label" for="name">Nome</label>
                                        </div> */}
                        <div class="group">
                          <input
                            type="email"
                            className="inputs"
                            onChange={(e) => setemails(e.target.value)}
                            defaultValue={emails}
                            required
                          />

                          <label className="labels">Email</label>
                        </div>
                        {/* <div className="inputsform">
                                            <input type="email" id="email" name='fname' placeholder='Enter email' className='userdetails'
                                                onChange={(e) => setemails(e.target.value)}
                                                defaultValue={emails}
                                                required />
                                            <div className="pen">
                                                <BorderColorIcon />
                                            </div>
                                        </div> */}
                      </div>
                      {/* <div className="users"> */}
                      {/* <label for="password">Password:</label> */}
                      {/* <div className="inputsform">
                                            <input type={password ? "text" : "password"} id="password" name='password' placeholder='Enter password' className='userdetails'
                                                onChange={(e) => setpasswords(e.target.value)}
                                                defaultValue=''
                                                required />
                                            <div className="pen" onClick={togglepasswords}>
                                                <BorderColorIcon />
                                            </div>
                                        </div> */}
                      {/* <div class="group">
                      <input
                        type="password"
                        className="inputs"
                        onChange={(e) => setpasswords(e.target.value)}
                        defaultValue=""
                        required
                      />
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label className="labels">Password</label>
                    </div> */}
                      {/* </div> */}

                      <div className="updatebutton ">
                        <button className=" btns first" onClick={toggleemail}>
                          Update Email
                        </button>
                      </div>
                      <div
                        className={`users email ${
                          currentemail ? "active" : ""
                        }`}
                      >
                        {/* <label for="newemail">Update Email:</label> */}
                        {/* <div className="inputsform">
                                            <input type="email" id="newemail" name='newemail' placeholder='Update Email' className='userdetails'
                                                onChange={(e) => setupdateemails(e.target.value)}
                                                defaultValue={updateemails}
                                                required />
                                            <div className="pen">
                                                <BorderColorIcon />
                                            </div>
                                        </div> */}
                        <div class="group">
                          <input
                            type="password"
                            className="inputs"
                            onChange={(e) => setupdateemails(e.target.value)}
                            defaultValue={updateemails}
                            required
                          />

                          <label className="labels">Update Email</label>
                        </div>
                      </div>
                      <div className="updatebuttons">
                        {/* <button className='update' onClick={toggleemail}>Update Email</button> */}
                        <button
                          className="btns first password"
                          onClick={togglepassword}
                        >
                          Update Password
                        </button>
                      </div>

                      <div
                        className={`users currentpassword ${
                          currentpassword ? "active" : ""
                        }`}
                      >
                        {/* <label for="currentpass">Current Passowrd:</label> */}
                        {/* <div className="inputsform">
                                            <input type={password ? "text" : "password"} id="currentpass" name='currentpass' placeholder='Enter your current password' className='userdetails'
                                                onChange={(e) => setcurrentpasswords(e.target.value)}
                                                defaultValue=''

                                                required />
                                            <div className="pen" onClick={togglepasswords}>
                                                <BorderColorIcon />
                                            </div>
                                        </div> */}
                        <div class="group">
                          <input
                            type="password"
                            className="inputs"
                            onChange={(e) =>
                              setcurrentpasswords(e.target.value)
                            }
                            defaultValue=""
                            required
                          />

                          <label className="labels">Current Password</label>
                        </div>
                      </div>
                      <div
                        className={`users currentpassword ${
                          currentpassword ? "active" : ""
                        }`}
                      >
                        {/* <label for="newpass">  New Passowrd:</label> */}
                        {/* <div className="inputsform">
                                            <input type={password ? "text" : "password"} id="newpass" name='newpass' placeholder='Enter your new password' className='userdetails'
                                                onChange={(e) => setnewpasswords(e.target.value)}
                                                defaultValue=''
                                                required />
                                            <div className="pen" onClick={togglepasswords}>
                                                <BorderColorIcon />
                                            </div>
                                        </div> */}
                        <div class="group">
                          <input
                            type="password"
                            className="inputs"
                            onChange={(e) => setnewpasswords(e.target.value)}
                            defaultValue=""
                            onKeyUp={handleValid}
                            required
                          />

                          <label className="labels">New Password</label>
                        </div>
                        <PasswordStrengthMeter password={strength} />
                        {allerror == "" ? null : (
                          <div
                            className={`password_style ${
                              showpass ? "active" : ""
                            }`}
                          >
                            {disable && (
                              <ul className="register_passowrd_validation">
                                {allerror ? (
                                  <h5>Suggestions for Strong Password 🔑</h5>
                                ) : null}
                                <div className="font">{errors}</div>
                                <div className="font">{errorU}</div>
                                <div className="font">{errorL}</div>
                                <div className="font">{errorS}</div>
                                <div className="font">{errorN}</div>
                              </ul>
                            )}
                          </div>
                        )}
                      </div>

                      <div
                        className={`users currentpassword ${
                          currentpassword ? "active" : ""
                        }`}
                      >
                        {/* <label for="confirmpass">Confirm Passowrd:</label> */}
                        {/* <div className="inputsform">
                                            <input type={password ? "text" : "password"} id="confirmpass" name='confirmpass' placeholder='Confirm password' className='userdetails'
                                                onChange={(e) => setcpassword(e.target.value)}
                                                defaultValue=''
                                                required />
                                            <div className="pen" onClick={togglepasswords}>
                                                <BorderColorIcon />
                                            </div>
                                        </div> */}
                        <div class="group">
                          <input
                            type="password"
                            className="inputs"
                            onChange={(e) => setcpassword(e.target.value)}
                            defaultValue=""
                            required
                          />

                          <label className="labels">Confirm Password</label>
                        </div>
                      </div>
                      <div className="updatebtn">
                        <button
                          className="update"
                          onClick={(e) => {
                            updateUser(e);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className="profileimg">
                  <div className="profileimage_account">
                  {imageResult && (
                            <img
                              src={imageResult}
                              alt="image"
                              style={{
                                width: "100%",
                                height: "100%",
                                
                              }}
                            />
                        )}
                  </div>
                  <div className="userprofileimg">
                    <label class="custom-user ">
                      <input
                        type="file"
                        onChange={uploadfiles2}
                        className="form-control"
                        multiple
                        id="images"
                        name="images"
                        accept="image/*"
                      />
                        {/* {imageResult1 && (
                          <div style={{ width: "100%" }}>
                            <img
                              src={imageResult1}
                              alt="image"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                        )} */}
                      <div className="defaultimg1">
                         {imageResult1 && (
                            <img
                              src={imageResult1}
                              alt="image"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                              }}
                            />
                        )}
                      </div>

                    </label>
                    <p className="size">80x80</p>
                  </div>
                  <div className="uploadbtn1">
                    <label class="custom-file-upload">
                      <CameraAltIcon />
                      <input
                        type="file"
                        // onChange={(e)=>{setCoverimage(e.target.files[0])}}
                        onChange={uploadfiles}
                        // defaultValue={uploadfiles}
                      />
                      Edit Cover Photo
                    </label>
                  </div>
                </div>
                <div className="updatebtn">
                  <button
                    className="update"
                    onClick={(e) => {
                      updateUser(e);
                    }}
                  >
                    Update
                  </button>
                </div>

                {src && (
                        <div
                          className={`conatinerimage ${closep ? "ative" : ""}`}
                        >
                          <div
                            className={`conatinerimage ${
                              saveimg ? "ative" : ""
                            }`}
                          >
                            <div className="conatinerimagewrapper">
                              <div className="innerconatiner">
                                <div className="croppersdiv">
                                  <div className="imageshow">
                                    <ReactCrop
                                      onImageLoaded={setImage}
                                      src={src}
                                      crop={crop}
                                      onChange={setCrop}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => getCroppedImg(e)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{ marginLeft: "10px" }}
                              onClick={closedmenu}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      {src1 && (
                        <div
                          className={`conatinerimage ${closep1 ? "ative" : ""}`}
                        >
                          <div
                            className={`conatinerimage ${
                              saveimg1 ? "ative" : ""
                            }`}
                          >
                            <div className="conatinerimagewrapper">
                              <div className="innerconatiner">
                                <div className="croppersdiv">
                                  <div className="imageshow">
                                    <ReactCrop
                                      onImageLoaded={setImage1}
                                      src={src1}
                                      crop={crop1}
                                      onChange={setCrop1}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => getCroppedImg1(e)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{ marginLeft: "10px" }}
                              onClick={closedmenu1}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
              </TabPanel>
              {/* <div className="updatebtn">
                        <button className='update' onClick={() => { updateUser() }}>Update</button>
                    </div> */}
            </TabContext>
          </div>
        </div>
      )}
    </>
  );
};

export default Userdetail;
