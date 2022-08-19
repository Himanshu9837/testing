import React, { useEffect, useState, useRef } from "react";
import Dashboard from "../../../components/molecule/Dashboard";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputEmoji from "react-input-emoji";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Navbar from "../../../components/molecule/Navbar2/Navbarhome";
import Footer from "../../../components/molecule/Footer/footer";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

toast.configure();
const notify = (message) => toast(message);
export default function Viewlist() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const ref = useRef(null);
  const [value, setValue] = React.useState("1");
  const [editData, setEditData] = useState([]);
  const [stockss, setStock] = useState("");
  const [productnames, setproductname] = useState("");
  const [qty, setqty] = useState("");
  const [prices, setprices] = useState("");
  const [metaurl, setmetaurl] = useState("");
  const [metadescription, setmetadescription] = useState("");
  const [metakeyword, setmetakeyword] = useState("");
  const [metatitle, setmetatitle] = useState("");
  const [sortdescription, setSortdescription] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [ids, setids] = useState([]);
  const [closep, setClosep] = useState(false);
  const [closep1, setClosep1] = useState(false);
  const [closep2, setClosep2] = useState(false);
  const [closep3, setClosep3] = useState(false);
  const [closep4, setClosep4] = useState(false);
  const [imagep, setImagep] = useState("");
  const [imageResult, setImageResult] = useState(null);
  const [imageResult1, setImageResult1] = useState(null);
  const [imageResult2, setImageResult2] = useState(null);
  const [imageResult3, setImageResult3] = useState(null);
  const [imageResult4, setImageResult4] = useState(null);
  const [Autos, setAutos] = useState();
  const [categorylist, setcategorylist] = useState([]);
  const [usernames, setusernames] = useState("");
  const [emails, setemails] = useState("");
  const [passwords, setpasswordss] = useState("");
  const [specialnotes, setspecialnotes] = useState("");

  const closedmenu = (e) => {
    setClosep(true);
    ref.current.value = "";
    e.target.value = null;
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

  useEffect(() => {
    if (router.isReady) {
      const edit_pid = router.query.viewlisting;

      const editproduct = () => {
        fetch(`${apiKey}api/product/editproduct/${edit_pid}`).then((res) => {
          res.json().then((data) => {
            setEditData(data.result);
            setproductname(data.result.productname);
            setprices(data.result.price);
            setqty(data.result.qty);
            setSortdescription(data.result.productname);
            setStock(data.result.stock);
            setcategoryname(data.result.category.name);
            setImageResult(data.result.images[0]);
            setImageResult1(data.result.images[1]);
            setImageResult2(data.result.images[2]);
            setImageResult3(data.result.images[3]);
            setImageResult4(data.result.images[4]);
            setAutos(data.result.autodelivery);
            setusernames(data.result.account_username);
            setemails(data.result.account_email);
            setpasswordss(data.result.account_password);
            setspecialnotes(data.result.account_specialnote);
            setChecked(data.result.timeperiod);
            setmetaurl(data.result.metaurl);
            setmetadescription(data.result.metadescription);
            setmetakeyword(data.result.metakeyword);
            setmetatitle(data.result.metatitle);
            setcategoryid(data.result.category._id);
            setids(data.result._id);
            setImagep(data.result.images);
            let var2 = [];
            var2.push(data.result.categorydetails[0]);
            for (let i = 0; i < var2.length; i++) {
              const element = var2[i];
              var Lists = [];
              for (const property in element) {
                Lists.push(element[property]);
              }
            }
            setcategorylist(Lists);

            setsuballname(Lists);
            setImage(data.result.images);
          });
        });
      };
      editproduct();
      fetch(`${apiKey}api/category/searchgame/${categoryname}`)
        .then((response) => response.json())
        .then((data) => {
          const data1 = data.map((i) => i._id);
          searchgames(data1);
          setsearchs(data);
        });
    } else {
    }
  }, [router.isReady, categoryname]);

  const searchgames = (id) => {
    fetch(`${apiKey}api/category/gamedropdowns/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setinnersearch(data.outerdata);
        setinnersdatas(data.innerdata);
        let var1 = data.outerdata.map((inns) => inns.name);
        setallname(var1);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const automatichandle = () => {
    setAutos(true);
  };
  const selfhandle = () => {
    setAutos(false);
  };

  const [src, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
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
  const [searchs, setsearchs] = useState([]);
  const [inputs, setinputs] = useState("");
  const [innerserach, setinnersearch] = useState([]);
  const [innersdatas, setinnersdatas] = useState([]);
  const [allname, setallname] = useState([]);
  const [suballname, setsuballname] = useState([]);
  const [Categoryid, setcategoryid] = useState("");
  const [idseller, setIdSeller] = useState("");
  const [indeximg, setIndeximg] = useState([]);
  const [imagefields, setimageFields] = useState([]);
  const [checked, setChecked] = useState("");

  const [Indeximage, setIndeximage] = useState([]);

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

  var arrs = [];
  const HandlefileChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    arrs.push([...arrs, URL.createObjectURL(e.target.files[0])]);

    setsaveimg(false);
    setClosep(false);
    e.target.value = null;
  };
  const HandlefileChange1 = (e) => {
    arrs.push([...arrs, URL.createObjectURL(e.target.files[0])]);

    setSelectedImage1(URL.createObjectURL(e.target.files[0]));
    setsaveimg1(false);
    setClosep1(false);
    e.target.value = null;
  };
  const HandlefileChange2 = (e) => {
    setSelectedImage2(URL.createObjectURL(e.target.files[0]));
    setsaveimg2(false);
    setClosep2(false);
    e.target.value = null;
  };
  const HandlefileChange3 = (e) => {
    setSelectedImage3(URL.createObjectURL(e.target.files[0]));
    setsaveimg3(false);
    setClosep3(false);
    e.target.value = null;
  };
  const HandlefileChange4 = (e) => {
    setSelectedImage4(URL.createObjectURL(e.target.files[0]));
    setsaveimg4(false);
    setClosep4(false);
    e.target.value = null;
  };

  const setCheckedfunction =(e) =>{
    setChecked(e.target.value)
  }

  function deleteFile(e) {
    setImageResult(null);
  }
  function deleteFile1(e) {
    setImageResult1(null);
  }
  function deleteFile2(e) {
    setImageResult2(null);
  }
  function deleteFile3(e) {
    setImageResult3(null);
  }
  function deleteFile4(e) {
    setImageResult4(null);
  }

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
    setClosep(true);
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
    setClosep1(true);
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
    setClosep2(true);
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
    setClosep3(true);
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
    setClosep4(true);
  }

  const searchgame = (e) => {
    e.preventDefault();
    fetch(`${apiKey}api/category/searchgame/${inputs}`)
      .then((response) => response.json())
      .then((data) => {
        setsearchs(data);
      });
  };

  const SellerId = () => {
    fetch(`${apiKey}api/seller/searchseller/${idseller}`)
      .then((response) => response.json())
      .then((data) => { });
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

  function findAllIndexOf(img, needle) {
    return [].concat(
      ...(function* () {
        for (var i = 0; i < img.length; i++) if (img[i] === needle) yield [i];
      })()
    );
  }

  async function updateUser(e) {
    const edit_pids = router.query.viewlisting;
    let img = [blob, blob1, blob2, blob3, blob4];
    setIndeximg(findAllIndexOf(img));
    e.preventDefault();
    const formData = new FormData();
    formData.append("productname", productnames);
    formData.append("sortdescription", sortdescription);
    formData.append("autodelivery", Autos);
    formData.append("price", prices);
    formData.append("qty", qty);
    formData.append("stock", stockss);
    formData.append("account_username", usernames);
    formData.append("account_password", passwords);
    formData.append("account_email", emails);
    formData.append("account_specialnote", specialnotes);
    formData.append("dropdownname", allname);
    formData.append("subdropdown", suballname);
    formData.append("timeperiod", checked);
    formData.append("category", Categoryid);
    for (let v = 0; v < imagefields.length; v++) {
      if (imagefields[v] != "empty") {
        formData.append("imageindex", imagefields[v]);
      }
    }
    formData.append("metaurl", metaurl);
    formData.append("metadescription", metadescription);
    formData.append("metakeyword", metakeyword);
    formData.append("metatitle", metatitle);

    for (let j = 0; j < img.length; j++) {
      formData.append("images", img[j]);
    }
    const confiq = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = apiKey + "api/seller/sellerupdateProduct/" + edit_pids;

    axios
      .post(url, formData, confiq)
      .then((response) => {
        notify(response.data.message);
      })
      .catch((e) => { });
  }

  const changephoto = (index) => {
    let newArr = [...imagefields];
    newArr[index] = index;
    setimageFields(newArr);

  };

  // const handleOnChange = (e, idx) => {
  //   setFields(prevFields => {
  //     const newFields = [...fields];
  //     newFields[idx] = {
  //       ...newFields[idx],
  //       value: e.target.value
  //     };

  //     return newFields;
  //   });
  // };

  const getnextpage = () => {

    const x = parseInt(value);
    if (x < 5) {
      const res = x + 1;
      var result = res.toString();
      setValue(result);
    }
  };

  const prevpage = () => {
    const x = parseInt(value);
    if (x > 1) {
      const res = x - 1;
      var result = res.toString();
      setValue(result);
    }
  };

  return (
    <>
      <div className="mainview">
        <Navbar />
        <div className="alerts">
          <ToastContainer autoClose={2000} />
        </div>
        <div className="mainview_wrapper">
          <Dashboard />
          <div className="rightpannel">
            <div className="rightpannel_wrapper">
              <h2 className="createlisting">Edit Product</h2>
              <div className="seconddiv">
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
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
                            defaultValue={categoryname}
                            required
                          />
                          <div className="pen">
                            <SearchIcon />
                          </div>
                        </div>
                      </div>
                      {searchs.map((search) => (
                        <>
                          <div
                            className="divs"
                            onClick={(e) => {
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
                              <h2 style={{ color: "white" }}>{search.name}</h2>
                            </div>
                          </div>

                          <div className="searchresultscreate active">
                            <div className="outerimgsearch">

                              <div className="searchresultimg">
                                <img
                                  src={search.categorythumblinimage}
                                  alt="not found"
                                />
                              </div>
                            </div>

                            <div className="allinerdivs">
                              <div className="innerdiv1">
                                {innerserach.map((inners, index) => (
                                  <>
                                    {innersdatas.map((inn, i) => (
                                      <>
                                        {
                                          index === i ? (
                                            <div className="gamedropdows">
                                              <label for="cars">{inners.name}</label>
                                              {categorylist.map((iss, index) => (
                                                <>
                                                  {index === i ? (
                                                    <select
                                                      name=""
                                                      id=""
                                                      className="selectgames"
                                                      defaultValue={iss}
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
                                                        selected
                                                      ></option>

                                                      {inn.map((inns) => (
                                                        <>
                                                          <option
                                                            value={inns.name}
                                                            className="gamesoption"
                                                            selected={iss}
                                                          >
                                                            {inns.name}
                                                          </option>
                                                        </>
                                                      ))}
                                                    </select>
                                                  ) : (
                                                    ""
                                                  )}
                                                </>
                                              ))}
                                            </div>
                                          ) : ('')
                                        }
                                      </>
                                    ))}
                                  </>
                                ))}




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
                            <label for="title">Product Title</label>
                            <div className="inputsform">
                              <input
                                type="text"
                                id="title"
                                className="userdetails productsdetail"
                                name="productname"
                                onChange={(e) => {
                                  setproductname(e.target.value);
                                }}
                                defaultValue={productnames}
                                required
                              />
                            </div>
                          </div>

                          <div className="users productdesc">
                            <label for="desc">Product Description</label>
                            <div className="inputsform descriptionform">
                              <InputEmoji
                                defaultValue={prices}
                                //  value={prices}
                                onChange={(e) => {
                                  setSortdescription(e);
                                }}
                                classname={"react-input-emoji--input"}
                                placeholder="Add description or use emoji"
                              // value={editData.sortdescription}
                              />
                            </div>
                          </div>
                          <div className="users productdesc">
                              <div className="made">
                                <label for="title" className="star">
                                  *
                                </label>
                                <label for="desc">Dureaction</label>
                              </div>
                              <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              margin: "1rem 0 5rem 0",
                            }}
                            onChange={(e) => setCheckedfunction(e)}
                          >
                            <div>
                              <input
                                type="radio"
                                checked={checked === "7" || checked === 7}
                                value="7"
                              />
                              <label htmlFor="desc" style={{padding: "0.5rem"}}>7 Days</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                checked={checked === "14" || checked === 14}
                                value="14"
                                // onChange={(e) => setCheckedfunction(e)}
                              />
                              <label htmlFor="desc" style={{padding: "0.5rem"}}>14 Days</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                checked={checked === "30" || checked === 30}
                                value="30"
                                // onChange={(e) => setCheckedfunction(e)}
                              />
                              <label htmlFor="desc" style={{padding: "0.5rem"}}>30 Days</label>
                            </div>
                          </div>

                            </div>

                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="3">
                      <form action="" method="post">
                        <div className="ProductListing">
                          <div className="users productprice">
                            <label for="title">Price</label>
                            <div className="inputsform">
                              <input
                                type="number"
                                id="title"
                                className="userdetails stockdetail"
                                placeholder="$"
                                name="price"
                                onChange={(e) => {
                                  setprices(e.target.value);
                                }}
                                defaultValue={prices}
                                required
                              />
                            </div>
                          </div>
                          <div className="users productprice">
                            <label for="title">Quantity/Stock</label>
                            <div className="inputsform">
                              <input
                                type="number"
                                id="ti"
                                className="userdetails stockdetail"
                                name="stock"
                                onChange={(e) => {
                                  setStock(e.target.value);
                                }}
                                defaultValue={stockss}
                                placeholder="stock"
                                required
                              />
                            </div>
                          </div>
                          <div className="users productprice">
                            <label for="title">Minimum Quantity Per Order</label>
                            <div className="inputsform">
                              <input
                                type="number"
                                id="ti"
                                className="userdetails stockdetail"
                                name="qty"
                                onChange={(e) => {
                                  setqty(e.target.value);
                                }}
                                defaultValue={qty}
                                placeholder="qty"
                                required
                              />
                            </div>
                          </div>


                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="4">
                      <div style={{ display: "flex" }}>
                        <div className="input-group1 mb-3 upload_image1">
                          <div
                            className="upload_image_container1"
                            onClick={() => changephoto("0")}
                          >
                            <div className="upload_image_input1 ">
                              <input
                                type="file"
                                className="form-control"
                                multiple
                                id="images"
                                onChange={(e) => HandlefileChange(e)}
                                name="images"
                                accept="image/*"
                                ref={ref}
                              />
                              <div className="cropsimageresult">
                                {imageResult && (
                                  <div style={{ width: "100%",height:'100%'}}>
                                    <img
                                      src={imageResult}
                                      alt="image"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "10px",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>

                            </div>
                            <AddIcon className="upload_icon1" />
                            <button
                                onClick={(e) => deleteFile(e)}
                                className="deletephotos"
                              >
                                <DeleteIcon />
                              </button>
                          </div>
                        </div>
                        <div>
                          <div className="input-group1 mb-3 upload_image2">
                            <div
                              className="upload_image_container2"
                              onClick={() => changephoto("1")}
                            >
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
                                  {imageResult1 && (
                                    <div
                                      style={{ width: "100%", height: "100%" }}
                                    >
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
                                  )}
                                </div>
                                <button
                                  onClick={(e) => deleteFile1(e)}
                                  className="deletephotos"
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                              <AddIcon className="upload_icon2" />
                            </div>
                          </div>
                          <div className="input-group1 mb-3 upload_image2">
                            <div
                              className="upload_image_container2"
                              onClick={() => changephoto("2")}
                            >
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
                                  {imageResult2 && (
                                    <div
                                      style={{ width: "100%", height: "100%" }}
                                    >
                                      <img
                                        src={imageResult2}
                                        alt="image"
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "10px",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => deleteFile2(e)}
                                  className="deletephotos"
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
                            <div
                              className="upload_image_container2"
                              key="2"
                              onClick={() => changephoto("3")}
                            >
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
                                  {imageResult3 && (
                                    <div
                                      style={{ width: "100%", height: "100%" }}
                                    >
                                      <img
                                        src={imageResult3}
                                        alt="image"
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "10px",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => deleteFile3(e)}
                                  className="deletephotos"
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                              <AddIcon className="upload_icon2" />
                            </div>
                          </div>
                          <div className="input-group1 mb-3 upload_image2">
                            <div
                              className="upload_image_container2"
                              onClick={() => changephoto("4")}
                            >
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
                                  {imageResult4 && (
                                    <div
                                      style={{ width: "100%", height: "100%" }}
                                    >
                                      <img
                                        src={imageResult4}
                                        alt="image"
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          borderRadius: "10px",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => deleteFile4(e)}
                                  className="deletephotos"
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                              <AddIcon className="upload_icon2" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* // ))} */}

                      {src && (
                        <div
                          className={`conatinerimage ${closep ? "ative" : ""}`}
                        >
                          <div
                            className={`conatinerimage ${saveimg ? "ative" : ""}`}
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
                          className={`conatinerimage ${closep1 ? "ative" : ""}`}
                        >
                          <div
                            className={`conatinerimage ${saveimg1 ? "ative" : ""
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
                          className={`conatinerimage ${closep2 ? "ative" : ""}`}
                        >
                          <div
                            className={`conatinerimage ${saveimg2 ? "ative" : ""
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
                          className={`conatinerimage ${closep3 ? "ative" : ""}`}
                        >
                          <div
                            className={`conatinerimage ${saveimg3 ? "ative" : ""
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
                          className={`conatinerimage ${closep4 ? "ative" : ""}`}
                        >
                          <div
                            className={`conatinerimage ${saveimg4 ? "ative" : ""
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

                      {Autos ? (
                        <>
                          <div className="deliverydesc">
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
                                    name="title"
                                    required
                                    value={usernames}
                                    onChange={(e) => {
                                      setusernames(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="users productstitles">
                                <label for="title">Register Email-Id</label>
                                <div className="inputsform">
                                  <input
                                    type="email"
                                    id="title"
                                    className="userdetails productsdetail usersformsumbit"
                                    name="title"
                                    required
                                    value={emails}
                                    onChange={(e) => {
                                      setemails(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="users productstitles">
                                <label for="title">Password</label>
                                <div className="inputsform">
                                  <input
                                    type="text"
                                    id="title"
                                    className="userdetails productsdetail usersformsumbit"
                                    name="title"
                                    required
                                    value={passwords}
                                    onChange={(e) => {
                                      setpasswordss(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="rightform">
                              <div className="users productstitles">
                                <label for="title">Special Note</label>
                                <textarea
                                  name=""
                                  className="notes"
                                  value={specialnotes}
                                  onChange={(e) => {
                                    setspecialnotes(e.target.value);
                                  }}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="ordercomplete">
                          <h2 className="deliver">Deliver thedetail product</h2>
                        </div>
                      )}

                      <div className="saveorderbtn">
                        <button
                          className="saveorder update"
                          onClick={(e) => updateUser(e)}
                        >
                          Save
                        </button>
                      </div>


                    </TabPanel>
                  </TabContext>
                </Box>
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
        <Footer />
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
