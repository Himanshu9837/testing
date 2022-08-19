import React, { useContext, useState } from "react";
import Dashboard from "../../../components/molecule/newdashboardleft";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputEmoji from "react-input-emoji";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Navbar from "../../../components/molecule/dashboardheader";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import Contextapi from "../../../Context/Contextapi.js";

toast.configure();
const notify = (message) => toast(message);
export default function Createlisting() {
  const { load } = useContext(Contextapi);
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [value, setValue] = useState("1");
  const [showSelect1, setShowSelect1] = useState(false);
  const [showSelect2, setShowSelect2] = useState(false);

  const [auotmatic, setautomatic] = useState(false);
  const [auotmatic2, setautomatic2] = useState(false);
  const [values, setvalues] = useState(value);
  function onchangeID(e) {
    let catid = e.target.value;

    setShowSelect1(true);
  }
  function onchangeID1(e) {
    let catid = e.target.value;

    setShowSelect2(true);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [text, setText] = useState("");

  const handlechange = () => {
    let valuestab;

    if (values == 1) {
      valuestab = values + 1;
      setvalues(valuestab);
    }
  };
  const automatichandle = () => {
    setautomatic(true);
    setautomatic2(false);
    setAuto(true);
    setSelf(false);
  };
  const selfhandle = () => {
    setautomatic2(true);
    setautomatic(false);
    setAuto(false);
    setSelf(true);
  };

  const [src, setSelectedImage] = useState(null);
  const [src_u, setSelectedImage_u] = useState(null);

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage1_u, setSelectedImage1_u] = useState(null);
  const [selectedImage2_u, setSelectedImage2_u] = useState(null);
  const [selectedImage3_u, setSelectedImage3_u] = useState(null);
  const [selectedImage4_u, setSelectedImage4_u] = useState(null);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [auto, setAuto] = useState(null);
  const [self, setSelf] = useState(false);

  const [imageResult, setImageResult] = useState(null);
  const [imageResult1, setImageResult1] = useState(null);
  const [imageResult2, setImageResult2] = useState(null);
  const [imageResult3, setImageResult3] = useState(null);
  const [imageResult4, setImageResult4] = useState(null);

  const [blob, setBlob] = useState(null);
  const [blob1, setBlob1] = useState(null);
  const [blob2, setBlob2] = useState(null);
  const [blob3, setBlob3] = useState(null);
  const [blob4, setBlob4] = useState(null);
  const [saveimg, setsaveimg] = useState(false);
  const [saveimg1, setsaveimg1] = useState(false);
  const [saveimg2, setsaveimg2] = useState(false);
  const [saveimg3, setsaveimg3] = useState(false);
  const [saveimg4, setsaveimg4] = useState(false);
  const [showvalue, setShowvalue] = useState(false);
  const [closep, setClosep] = useState(false);
  const [closep1, setClosep1] = useState(false);
  const [closep2, setClosep2] = useState(false);
  const [closep3, setClosep3] = useState(false);
  const [closep4, setClosep4] = useState(false);

  const [sortdescription, setSortdescription] = useState("");
  const [searchs, setsearchs] = useState([]);
  const [inputs, setinputs] = useState("");
  const [dropdowns, setdropdowns] = useState(false);
  const [innerserach, setinnersearch] = useState([]);
  const [inner2, setinner2] = useState([]);
  const [index, setindex] = useState(0);

  const [innersdatas, setinnersdatas] = useState([]);

  const [productname, setproducttitle] = useState("");
  const [productdescription, setproductdescription] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [allname, setallname] = useState([]);
  const [suballname, setsuballname] = useState([]);
  const [deletetrue, setDeletetrue] = useState(true);
  const [deletetrue1, setDeletetrue1] = useState(true);
  const [deletetrue2, setDeletetrue2] = useState(true);
  const [deletetrue3, setDeletetrue3] = useState(true);
  const [deletetrue4, setDeletetrue4] = useState(true);
  const [images, setimages] = useState();
  const [Categoryid, setcategoryid] = useState("");
  const [checked, setChecked] = useState("");

  const [{ alt1, src1 }, setImg2] = useState({
    src1: "",
    alt1: "Upload an Image",
  });
  console.log(src1);
  const [crop, setCrop] = useState({
    aspect: 16 / 9,
    width: 300,
    zoom: 1,
  });
  const [crop1, setCrop1] = useState({
    aspect: 16 / 9,
    width: 300,
    zoom: 1,
  });
  const [crop2, setCrop2] = useState({
    aspect: 16 / 9,
    width: 300,
    zoom: 1,
  });
  const [crop3, setCrop3] = useState({
    aspect: 16 / 9,
    width: 300,
    zoom: 1,
  });
  const [crop4, setCrop4] = useState({
    aspect: 16 / 9,
    width: 300,
    zoom: 1,
  });

  function deleteFile(e) {
    setSelectedImage_u(null);
    setDeletetrue(true);
  }
  function deleteFile1(e) {
    setSelectedImage1_u(null);
    setDeletetrue1(true);
  }
  function deleteFile2(e) {
    setSelectedImage2_u(null);
    setDeletetrue2(true);
  }
  function deleteFile3(e) {
    setSelectedImage3_u(null);
    setDeletetrue3(true);
  }
  function deleteFile4(e) {
    setSelectedImage4_u(null);
    setDeletetrue4(true);
  }
  const closedmenu = (e) => {
    setClosep(true);
  };
  const closedmenu1 = () => {
    setClosep1(true);
  };
  const closedmenu2 = () => {
    setClosep2(true);
  };
  const closedmenu3 = () => {
    setClosep3(true);
  };
  const closedmenu4 = () => {
    setClosep4(true);
  };

  const setCheckedfunction = (e) => {
    setChecked(e.target.value);
  };

  const checkdescription = (e) => {
    setSortdescription(e);
  };
  console.log(sortdescription);

  function handleOnEnter(sortdescription) {
    console.log("enter", sortdescription);
    setstock(sortdescription);
  }
  console.log(stock);
  // const uploadfiles = (e) => {
  //   const file = URL.createObjectURL(e.target.files[0]);
  //   setImage(e.target.files[0]);
  //   if (e.target.files[0]) {
  //     setImg2({
  //       alt1: e.target.files[0].name,
  //       src1: URL.createObjectURL(e.target.files[0]),
  //     });
  //   }
  // };

  const HandlefileChange = (e) => {
    setSelectedImage_u(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
    setsaveimg(false);
    setDeletetrue(false);
    setClosep(false);
    e.target.value = null;
  };
  const HandlefileChange1 = (e) => {
    setSelectedImage1_u(URL.createObjectURL(e.target.files[0]));
    setImage1(e.target.files[0])
    setsaveimg1(false);
    setDeletetrue1(false);
    setClosep1(false);
    e.target.value = null;
  };
  const HandlefileChange2 = (e) => {
    setSelectedImage2_u(URL.createObjectURL(e.target.files[0]));
    setImage2(e.target.files[0])

    setsaveimg2(false);
    setDeletetrue2(false);
    setClosep2(false);
    e.target.value = null;
  };
  const HandlefileChange3 = (e) => {
    setSelectedImage3_u(URL.createObjectURL(e.target.files[0]));
    setImage3(e.target.files[0])
    setsaveimg3(false);
    setDeletetrue3(false);
    setClosep3(false);
    e.target.value = null;
  };
  const HandlefileChange4 = (e) => {
    setSelectedImage4_u(URL.createObjectURL(e.target.files[0]));
    setImage4(e.target.files[0])
    setsaveimg4(false);
    setDeletetrue4(false);
    setClosep4(false);
    e.target.value = null;
  };

  function getCroppedImg(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");

    const scaleX = image.naturalWidth / image.width;

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
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult(base64Image);

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
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult1(base64Image);

    setsaveimg1(true);
  }
  function getCroppedImg2(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");

    const scaleX = image2.naturalWidth / image2.width;

    const scaleY = image2.naturalHeight / image2.height;
    canvas.width = crop2.width;
    canvas.height = crop2.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop2.width * pixelRatio;
    canvas.height = crop2.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image2,
      crop2.x * scaleX,
      crop2.y * scaleY,
      crop2.width * scaleX,
      crop2.height * scaleY,
      0,
      0,
      crop2.width,
      crop2.height
    );

    canvas.toBlob(
      (blob) => {
        setBlob2(blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult2(base64Image);

    setsaveimg2(true);
  }
  function getCroppedImg3(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");

    const scaleX = image3.naturalWidth / image3.width;

    const scaleY = image3.naturalHeight / image3.height;
    canvas.width = crop3.width;
    canvas.height = crop3.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop3.width * pixelRatio;
    canvas.height = crop3.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image3,
      crop3.x * scaleX,
      crop3.y * scaleY,
      crop3.width * scaleX,
      crop3.height * scaleY,
      0,
      0,
      crop3.width,
      crop3.height
    );

    canvas.toBlob(
      (blob) => {
        setBlob3(blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult3(base64Image);

    setsaveimg3(true);
  }
  function getCroppedImg4(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");

    const scaleX = image4.naturalWidth / image4.width;
    const scaleY = image4.naturalHeight / image4.height;
    canvas.width = crop4.width;
    canvas.height = crop4.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop4.width * pixelRatio;
    canvas.height = crop4.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image4,
      crop4.x * scaleX,
      crop4.y * scaleY,
      crop4.width * scaleX,
      crop4.height * scaleY,
      0,
      0,
      crop4.width,
      crop4.height
    );

    canvas.toBlob(
      (blob) => {
        setBlob4(blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult4(base64Image);

    setsaveimg4(true);
  }
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const [user, setUser] = useState({
    productname: "",
    stock: "",
    price: "",
    images: "",
    dropdownname: "",
    subdropdown: "",
    qty: "",
  });

  const createlist = (e) => {
    if (localStorage.getItem("user") != null) {
      if (suballname.length === innerserach.length) {
        const arrayOfData = localStorage.getItem("user");
        const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
        const cart_data = d.tokenData.id;
        e.preventDefault();
        let img = [image, image1, image2, image3, image4];
        setimages(img);
        const formData = new FormData();
        formData.append("productname", user.productname);
        formData.append("sortdescription", sortdescription);
        formData.append("price", user.price);
        formData.append("stock", user.stock);
        formData.append("qty", user.qty);
        formData.append("dropdownname", allname);
        formData.append("subdropdown", suballname);
        formData.append("category", Categoryid);
        formData.append("timeperiod", checked);

        for (let j = 0; j < img.length; j++) {
          formData.append("images", img[j]);
        }
        const confiq = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const url = `${apiKey}api/seller/selleraddproducts/${cart_data}`;
        axios
          .post(url, formData, confiq)
          .then((response) => {
            notify(response.data.message);
            // router.push("/dashboard/myorder");
          })
          .catch((error) => {
            notify(error.response.data.error);
          });
      } else {
        notify("Please filled all category");
      }
    }
  };

  const searchgame = (e) => {
    e.preventDefault();
    fetch(`${apiKey}api/category/searchgame/${inputs}`)
      .then((response) => response.json())
      .then((data) => {
        setsearchs(data);
      });
    if (inputs.length < 1) {
      setdropdowns(false);
      setShowvalue(false);
    }
  };
  const handleselectedvalue = (value, num, inn) => {
    const index = suballname.map((i) => i).indexOf(value);

    const data = value;
    if (index == -1) {
      if (suballname[inn] == "undefined") {
        if (suballname.length < num) {
          const data1 = suballname.concat(data);
          setsuballname(data1);
        }
      } else {
        suballname[inn] = data;
      }
    }
  };

  const hadnledropdown = (id) => {
    setdropdowns(true);
    setShowvalue(true);

    fetch(`${apiKey}api/category/gamedropdowns/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setinnersearch(data.outerdata);
        setinnersdatas(data.innerdata);
        let var1 = data.outerdata.map((inns) => inns.name);

        setallname(var1);
      });
  };

  const getnextpage = () => {
    const x = parseInt(value);
    if (x <= 4) {
      const res = x + 1;
      var result = res.toString();
      setValue(result);
    }
  };

  const prevpage = () => {
    const x = parseInt(value);
    if (x >= 2) {
      const res = x - 1;
      var result = res.toString();

      setValue(result);
    }
  };

  return (
    <>
      <div className="mainview">
        <div className="alerts">
          <ToastContainer autoClose={2000} />
        </div>
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
              <h2 className="createlisting">CREATE LISTING</h2>
              <div className="backbround_color_style">
                <div className="secondcreatediv">
                  <div className="seconddiv">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="scrollable auto tabs example"
                            variant="scrollable"
                            scrollButtons="off"
                          >
                            <Tab label="Game" value="1" />
                            <Tab label="Description" value="2" />
                            <Tab label="Price" value="3" />
                            <Tab label="Photo" value="4" />
                            <Tab label="Delivery" value="5" />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <div className="selectgame">
                            <h3 className="selectgamehead">Select Your Game</h3>
                            <div className="inputsform selectinputsgame">
                              <input
                                type="text"
                                id="fname"
                                className="userdetails gameselect"
                                name="game"
                                onChange={(e) => {
                                  setinputs(e.target.value);
                                }}
                                onKeyUp={searchgame}
                                placeholder="Search Game"
                                required
                              />
                              <div className="pen">
                                <SearchIcon />
                              </div>
                            </div>
                          </div>
                          {searchs.map((search) => (
                            <>
                              {inputs.length >= 1 ? (
                                <div
                                  className={`divs ${
                                    showvalue ? "active" : ""
                                  } `}
                                  onClick={(e) => {
                                    hadnledropdown(search._id),
                                      setcategoryid(search._id);
                                  }}
                                >
                                  <div className="divsimg">
                                    <img
                                      src={search.categorythumblinimage}
                                      alt="notfound"
                                    />
                                  </div>
                                  <div className="divstitle_create">
                                    <h2 style={{ color: "#fff" }}>
                                      {search.name}
                                    </h2>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              <div
                                className={`searchresultscreate ${
                                  dropdowns ? "active" : ""
                                }`}
                              >
                                <div className="outerimgsearch">
                                  <div className="searchresultimg">
                                    <img
                                      src={search.categorythumblinimage}
                                      alt="not found"
                                    />
                                  </div>
                                </div>
                                <div className="allinerdivscreate">
                                  <div className="innerdiv1">
                                    {innerserach.map((inners, index) => (
                                      <>
                                        {innersdatas.map((inn, i) => (
                                          <>
                                            {index === i ? (
                                              <div className="gamedropdows">
                                                <label for="cars">
                                                  {inners.name}
                                                </label>
                                                <select
                                                  name=""
                                                  id=""
                                                  className="selectgames"
                                                  onChange={(e) =>
                                                    handleselectedvalue(
                                                      e.target.value,
                                                      innerserach.length,
                                                      i
                                                    )
                                                  }
                                                >
                                                  <option
                                                    value=""
                                                    hidden
                                                  ></option>
                                                  {inn.map((inns) => (
                                                    <option
                                                      value={inns.name}
                                                      className="gamesoption"
                                                    >
                                                      {inns.name}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        ))}
                                      </>
                                    ))}

                                    {/* <div className="innersdivs">
                                    {innerserach.map((inners) => (
                                      <div className="gamedropdows">
                                        <label for="cars">{inners.name}</label>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="inners2div">
                                    {innersdatas.map((inn, i) => (
                                      <select
                                        name=""
                                        id=""
                                        className="selectgames"

                                        onChange={(e) =>
                                          handleselectedvalue(
                                            e.target.value,
                                            innerserach.length,
                                            i
                                          )
                                        }
                                      >

                                        <option value="" hidden></option>

                                        {inn.map((inns) => (
                                          <option
                                            value={inns.name}
                                            className="gamesoption"
                                          >
                                            {inns.name}
                                          </option>
                                        ))}
                                      </select>
                                    ))}
                                  </div> */}
                                  </div>
                                  <div className="innerdiv2"></div>
                                </div>
                              </div>
                            </>
                          ))}
                        </TabPanel>
                        <TabPanel value="2">
                          <form action="" method="post">
                            <div className="ProductListing">
                              <div className="users productstitles">
                                <div className="made">
                                  <label for="title" className="star">
                                    *
                                  </label>
                                  <label for="title">Product Title</label>
                                </div>
                                <div className="inputsform">
                                  <input
                                    type="text"
                                    id="title"
                                    className="userdetails productsdetail"
                                    name="productname"
                                    onChange={handleInputs}
                                    value={user.productname}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="users productdesc">
                                <div className="made">
                                  <label for="title" className="star">
                                    *
                                  </label>
                                  <label for="desc">Product Description</label>
                                </div>
                                <div className="inputsform descriptionform">
                                  <InputEmoji
                                    onChange={(e) => {
                                      checkdescription(e);
                                    }}
                                    value={stock}
                                    onEnter={handleOnEnter}
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </TabPanel>
                        <TabPanel value="3">
                          <form action="" method="post">
                            <div className="ProductListing">
                              <div className="users productprice">
                                <div className="made">
                                  <label for="title" className="star">
                                    *
                                  </label>
                                  <label for="title">Price</label>
                                </div>
                                <div className="inputsform1">
                                  <label
                                    style={{
                                      position: "relative",
                                      left: "13px",
                                    }}
                                  >
                                    $
                                  </label>
                                  <input
                                    type="number"
                                    id="title"
                                    className="userdetails1 stockdetail"
                                    name="price"
                                    onChange={handleInputs}
                                    value={user.price}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="users productprice">
                                <div className="made">
                                  <label for="title" className="star">
                                    *
                                  </label>
                                  <label for="title">Quantity/Stock</label>
                                </div>
                                <div className="inputsform">
                                  <input
                                    type="number"
                                    id="ti"
                                    className="userdetails stockdetail"
                                    name="stock"
                                    onChange={handleInputs}
                                    value={user.stock}
                                    placeholder="stock"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="users productprice">
                                <div className="made">
                                  <label for="title" className="star">
                                    *
                                  </label>
                                  <label for="title">
                                    Minimum Quantity Per Order
                                  </label>
                                </div>
                                <div className="inputsform">
                                  <input
                                    type="number"
                                    id="ti"
                                    className="userdetails stockdetail"
                                    name="qty"
                                    onChange={handleInputs}
                                    value={user.qty}
                                    placeholder="qty"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </TabPanel>
                        <TabPanel value="4">
                          <div className="photo_panal_style">
                            <div className="input-group1 mb-3 upload_image1">
                              <div className="upload_image_container1">
                                <div className="upload_image_input1 ">
                                  <input
                                    type="file"
                                    className="form-control"
                                    multiple
                                    id="images"
                                    onChange={HandlefileChange}
                                    name="images"
                                    accept="image/*"
                                  />
                                  <div className="cropsimageresult">
                                    {src_u && (
                                      <div style={{ width: "100%", height:"194px" }}>
                                        <img
                                          src={src_u}
                                          alt={alt1}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "10px",
                                            objectFit:"cover"
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <AddIcon className="upload_icon1" />
                                <button
                                  onClick={(e) => deleteFile(e)}
                                  className={`deletephotos ${
                                    deletetrue ? "" : "active"
                                  }`}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="input-group1 mb-3 upload_image2">
                                <div className="upload_image_container2">
                                  <div className="upload_image_input0 ">
                                    <input
                                      type="file"
                                      className="form-control"
                                      multiple
                                      id="images"
                                      onChange={HandlefileChange1}
                                      name="images"
                                      accept="image/*"
                                    />
                                    <div className="cropsimageresult">
                                      {selectedImage1_u && (
                                        <div style={{ width: "100%", height:"90px" }}>
                                          <img
                                            src={selectedImage1_u}
                                            alt="image"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              borderRadius: "10px",
                                              objectFit:"cover",
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={(e) => deleteFile1(e)}
                                      className={`deletephotos ${
                                        deletetrue1 ? "" : "active"
                                      }`}
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                  <AddIcon className="upload_icon2" />
                                </div>
                              </div>
                              <div className="input-group1 mb-3 upload_image2">
                                <div className="upload_image_container2">
                                  <div className="upload_image_input1 ">
                                    <input
                                      type="file"
                                      className="form-control"
                                      multiple
                                      id="images"
                                      onChange={HandlefileChange2}
                                      name="images"
                                      accept="image/*"
                                    />
                                    <div className="cropsimageresult">
                                      {selectedImage2_u && (
                                        <div style={{ width: "100%", height:"90px" }}>
                                          <img
                                            src={selectedImage2_u}
                                            alt="image"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              borderRadius: "10px",
                                              objectFit:"cover",

                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      className={`deletephotos ${
                                        deletetrue2 ? "" : "active"
                                      }`}
                                      onClick={(e) => deleteFile2(e)}
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                  <AddIcon className="upload_icon2" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="input-group1 mb-3 upload_image2">
                                <div className="upload_image_container2">
                                  <div className="upload_image_input2 ">
                                    <input
                                      type="file"
                                      className="form-control"
                                      multiple
                                      id="images"
                                      onChange={HandlefileChange3}
                                      name="images"
                                      accept="image/*"
                                    />
                                    <div className="cropsimageresult">
                                      {selectedImage3_u && (
                                        <div style={{ width: "100%", height:"90px" }}>
                                          <img
                                            src={selectedImage3_u}
                                            alt="image"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              borderRadius: "10px",
                                              objectFit:"cover",
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      className={`deletephotos ${
                                        deletetrue3 ? "" : "active"
                                      }`}
                                      onClick={(e) => deleteFile3(e)}
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                  <AddIcon className="upload_icon2" />
                                </div>
                              </div>
                              <div className="input-group1 mb-3 upload_image2">
                                <div className="upload_image_container2">
                                  <div className="upload_image_input_3">
                                    <input
                                      type="file"
                                      className="form-control"
                                      multiple
                                      id="images"
                                      onChange={HandlefileChange4}
                                      name="images"
                                      accept="image/*"
                                    />
                                    <div className="cropsimageresult">
                                      {selectedImage4_u && (
                                        <div style={{ width: "100%", height:"90px" }}>
                                          <img
                                            src={selectedImage4_u}
                                            alt="image"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              borderRadius: "10px",
                                              objectFit:"cover",

                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={(e) => deleteFile4(e)}
                                      className={`deletephotos ${
                                        deletetrue4 ? "" : "active"
                                      }`}
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                  <AddIcon className="upload_icon2" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {src && (
                            <div
                              className={`conatinerimage ${
                                closep ? "ative" : ""
                              }`}
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

                          {selectedImage1 && (
                            <div
                              className={`conatinerimage ${
                                closep1 ? "ative" : ""
                              }`}
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
                                          src={selectedImage1}
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
                          {selectedImage2 && (
                            <div
                              className={`conatinerimage ${
                                closep2 ? "ative" : ""
                              }`}
                            >
                              <div
                                className={`conatinerimage ${
                                  saveimg2 ? "ative" : ""
                                }`}
                              >
                                <div className="conatinerimagewrapper">
                                  <div className="innerconatiner">
                                    <div className="croppersdiv">
                                      <div className="imageshow">
                                        <ReactCrop
                                          onImageLoaded={setImage2}
                                          src={selectedImage2}
                                          crop={crop2}
                                          onChange={setCrop2}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => getCroppedImg2(e)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-danger"
                                  style={{ marginLeft: "10px" }}
                                  onClick={closedmenu2}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                          {selectedImage3 && (
                            <div
                              className={`conatinerimage ${
                                closep3 ? "ative" : ""
                              }`}
                            >
                              <div
                                className={`conatinerimage ${
                                  saveimg3 ? "ative" : ""
                                }`}
                              >
                                <div className="conatinerimagewrapper">
                                  <div className="innerconatiner">
                                    <div className="croppersdiv">
                                      <div className="imageshow">
                                        <ReactCrop
                                          onImageLoaded={setImage3}
                                          src={selectedImage3}
                                          crop={crop3}
                                          onChange={setCrop3}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => getCroppedImg3(e)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-danger"
                                  style={{ marginLeft: "10px" }}
                                  onClick={closedmenu3}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                          {selectedImage4 && (
                            <div
                              className={`conatinerimage ${
                                closep4 ? "ative" : ""
                              }`}
                            >
                              <div
                                className={`conatinerimage ${
                                  saveimg4 ? "ative" : ""
                                }`}
                              >
                                <div className="conatinerimagewrapper">
                                  <div className="innerconatiner">
                                    <div className="croppersdiv">
                                      <div className="imageshow">
                                        <ReactCrop
                                          onImageLoaded={setImage4}
                                          src={selectedImage4}
                                          crop={crop4}
                                          onChange={setCrop4}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => getCroppedImg4(e)}
                                >
                                  Save
                                </button>

                                <button
                                  className="btn btn-danger"
                                  style={{ marginLeft: "10px" }}
                                  onClick={closedmenu4}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </TabPanel>
                        <TabPanel value="5">
                          <div className="deliverybtn">
                            <div className="automaticbtn">
                              <button
                                className="automatic-delivery"
                                onClick={automatichandle}
                              >
                                Automatic Delivery
                              </button>
                            </div>
                            <div className="automaticbtn">
                              <button
                                className="automatic-delivery selfcare"
                                onClick={selfhandle}
                              >
                                Self Care
                              </button>
                            </div>
                          </div>

                          {auotmatic ? (
                            <>
                              {/* <div className="deliverydesc">
                              <div className="automaticbtn">
                                <p className="automaticdesc">
                                  Lorem, ipsum dolor sit amet consectetur
                                  adipisicing elit. Tempora facilis laborum sint
                                  tenetur quis sit.
                                </p>
                              </div>
                              <div className="automaticbtn">
                                <p className="automaticdesc">
                                  Lorem, ipsum dolor sit amet consectetur
                                  adipisicing elit. Tempora facilis laborum sint
                                  tenetur quis sit.
                                </p>
                              </div>
                            </div>
                            <div className="deliveryform">
                              <div className="leftform">
                                <div className="users productstitles">
                                  <label for="title">Username</label>
                                  <div className="inputsform">
                                    <input
                                      type="text"
                                      id="title"
                                      className="userdetails productsdetail usersformsumbit"
                                      name="username"
                                      onChange={handleInputs}
                                      value={user.username}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="users productstitles">
                                  <label for="title">Register Email-Id</label>
                                  <div className="inputsform">
                                    <input
                                      type="text"
                                      id="title"
                                      className="userdetails productsdetail usersformsumbit"
                                      name="email"
                                      onChange={handleInputs}
                                      value={user.email}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="users productstitles">
                                  <label for="title">Password</label>
                                  <div className="inputsform">
                                    <input
                                      type="password"
                                      id="title"
                                      className="userdetails productsdetail usersformsumbit"
                                      name="password"
                                      onChange={handleInputs}
                                      value={user.password}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="rightform">
                                <div className="users productstitles">
                                  <label for="title">Special Note</label>
                                  <textarea
                                    name="specialnote"
                                    className="notes"
                                    value={user.specialnote}
                                    onChange={handleInputs}
                                  ></textarea>
                                </div>
                              </div>
                            </div> */}

                              <div className="login_details_style">
                                <div className="login_details_style1">
                                  <p className="login_detail_para">
                                    LOGIN DETAILS
                                  </p>
                                  <div className="line_with_style"></div>
                                </div>
                                <div className="user_desigen_style">
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Username / Account Id
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                      onChange={handleInputs}
                                      value={user.username}
                                    />
                                  </div>
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Password
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="Password"
                                      onChange={handleInputs}
                                      value={user.password}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="login_details_style">
                                <div className="login_details_style1">
                                  <p className="login_detail_para">
                                    ACCOUNT DETAILS
                                  </p>
                                  <div className="line_with_style"></div>
                                </div>
                                <div className="user_desigen_style">
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Email Address
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                      onChange={handleInputs}
                                      value={user.email}
                                    />
                                  </div>
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Password
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                    />
                                  </div>
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Country of Residence
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                    />
                                  </div>
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Full Name
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                    />
                                  </div>
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Date of Birth
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                    />
                                  </div>
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Secret Question
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                    />
                                  </div>
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Secret Answer
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="login_details_style">
                                <div className="login_details_style1">
                                  <p className="login_detail_para">
                                    ADDITIONAL DETAILS
                                  </p>
                                  <div className="line_with_style"></div>
                                </div>
                                <div className="user_desigen_style">
                                  <div className="user_name_account_style_check">
                                    <p className="username_account_text_color">
                                      Additional Note
                                    </p>
                                    <input
                                      className="input_style_modal"
                                      type="text"
                                      value={user.specialnote}
                                    onChange={handleInputs}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          {auotmatic2 ? (
                            <div className="ordercomplete">
                              <h2 className="deliver">
                                Deliver thedetail product
                              </h2>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="duration_show_style">
                            <div className="made">
                              <label for="title" className="star">
                                *
                              </label>
                              <label for="desc">Dureaction</label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                margin: "1rem 0 5rem 0",
                              }}
                              onChange={(e) => setCheckedfunction(e)}
                            >
                              <div className="radio_button_div_style">
                                <input
                                  type="radio"
                                  checked={checked === "7"}
                                  value="7"
                                />
                                <label
                                  htmlFor="desc"
                                  style={{
                                    padding: "0.5rem 2rem 0.5rem 0.5rem",
                                    fontSize: "14px",
                                  }}
                                >
                                  7 Days
                                </label>
                              </div>
                              <div className="radio_button_div_style">
                                <input
                                  type="radio"
                                  checked={checked === "14"}
                                  value="14"
                                  // onChange={(e) => setCheckedfunction(e)}
                                />
                                <label
                                  htmlFor="desc"
                                  style={{
                                    padding: "0.5rem 2rem 0.5rem 0.5rem",
                                    fontSize: "14px",
                                  }}
                                >
                                  14 Days
                                </label>
                              </div>
                              <div className="radio_button_div_style">
                                <input
                                  type="radio"
                                  checked={checked === "30"}
                                  value="30"
                                  // onChange={(e) => setCheckedfunction(e)}
                                />
                                <label
                                  htmlFor="desc"
                                  style={{
                                    padding: "0.5rem 2rem 0.5rem 0.5rem",
                                    fontSize: "14px",
                                  }}
                                >
                                  30 Days
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="saveorderbtn">
                            {auto === null ? (
                              <button
                                className="saveorder update"
                                onClick={createlist}
                                style={{ cursor: "not-allowed" }}
                                disabled
                              >
                                Submit Listing
                              </button>
                            ) : (
                              <button
                                className="saveorder update"
                                onClick={createlist}
                              >
                                Submit Listing
                              </button>
                            )}
                          </div>
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </div>
                </div>
                <div className="createlistbutton">
                  <div className="prevbtns">
                    <ArrowCircleLeftOutlinedIcon onClick={prevpage} />
                    <h6 className="nextpage">Prev</h6>
                  </div>
                  <div className="nextbtns">
                    <ArrowCircleRightOutlinedIcon onClick={getnextpage} />
                    <h6 className="nextpage">Next</h6>
                  </div>
                </div>
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
