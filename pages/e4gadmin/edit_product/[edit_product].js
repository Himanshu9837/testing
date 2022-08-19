import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InputEmoji from "react-input-emoji";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { DashboardLayout } from "../../../components/dashboard-layout";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const Editproduct = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const ref = useRef(null);

  const [value, setValue] = useState("1");
  const [showSelect1, setShowSelect1] = useState(false);
  const [showSelect2, setShowSelect2] = useState(false);
  const [auotmatic, setautomatic] = useState(false);
  const [auotmatic2, setautomatic2] = useState(false);
  const [values, setvalues] = useState(value);

  const [editData, setEditData] = useState([]);

  const [stockss, setStock] = useState("");
  const [productnames, setproductname] = useState("");
  const [qty, setqty] = useState("");
  const [prices, setprices] = useState("");
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
  const [Categoryid, setcategoryid] = useState("");


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
      const edit_pid = router.query.edit_product;

      const editproduct = () => {
        fetch(`${apiKey}api/product/editproduct/${edit_pid}`).then((res) => {
          res.json().then((data) => {
            console.log(data);
            setEditData(data.result);
            setproductname(data.result.productname);
            setprices(data.result.price);
            setqty(data.result.qty);
            setSortdescription(data.result.sortdescription);
            setStock(data.result.stock);
            setcategoryname(data.result.category.name);
            setIdSeller(data.result.sellerId);
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
            setcategoryid(data.result.category._id);
            console.log(data.result.images);
            setImagep(data.result.images);
            setChecked(data.result.timeperiod);
            console.log(data.result.categorydetails);
            let var2 = [];
          
            var2.push(data.result.categorydetails[0]);
            console.log(var2);

            for (let i = 0; i < var2.length; i++) {
              const element = var2[i];
              console.log(element);
              var Lists = [];
              for (const property in element) {
                console.log(`${property}: ${element[property]}`);
                Lists.push(element[property]);
              }
            }
            setcategorylist(Lists);
            setsuballname(Lists)
            console.log(categorylist);

            console.log(imagep);
            console.log(categorylist);
          });
        });
      };
      editproduct();

      fetch(`${apiKey}api/category/searchgame/${categoryname}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const data1 = data.map((i) => i._id);
          searchgames(data1);
          setsearchs(data);
        });
    } else {
    }
  }, [router.isReady, categoryname, Categoryid]);

  console.log(categorylist);
  console.log(imageResult);

  const searchgames = (id) => {
    // console.log(id);
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
    event.preventDefault();
    setValue(newValue);
  };



  const automatichandle = () => {

    setAutos(true);
  };
  const selfhandle = () => {

    setAutos(false);
  };
  toast.configure();

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
  // const [dropdowns, setdropdowns] = useState(false);
  const [innerserach, setinnersearch] = useState([]);
  const [inner2, setinner2] = useState([]);
  const [index, setindex] = useState(0);
  // const [ids, setids] = useState([])

  const [innersdatas, setinnersdatas] = useState([]);

  const [productname, setproducttitle] = useState("");
  const [productdescription, setproductdescription] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [allname, setallname] = useState([]);
  const [suballname, setsuballname] = useState([]);
  const [checkednew, setCheckednew] = useState("");
  const [checked, setChecked] = useState("");


  const [images, setimages] = useState();
  const [idseller, setIdSeller] = useState("");
  const [selects, setselects] = useState("");
  const [sellername, setsellername] = useState("");
  const [show, setShow] = useState(false);

  const [imagefields, setimageFields] = useState([]);

  // const [listss,setlistss]=useState('');

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

  const setCheckedfunction =(e) =>{
    setCheckednew(e.target.value)
    setChecked(e.target.value)
  }

  const HandlefileChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    console.log("gf", src);
    setsaveimg(false);
    setClosep(false);
    e.target.value = null;
  };
  const HandlefileChange1 = (e) => {
    setSelectedImage1(URL.createObjectURL(e.target.files[0]));
    console.log("gf", src);
    setsaveimg1(false);
    setClosep1(false);
    e.target.value = null;
  };
  const HandlefileChange2 = (e) => {
    setSelectedImage2(URL.createObjectURL(e.target.files[0]));
    console.log("gf", src);
    setsaveimg2(false);
    setClosep2(false);
    e.target.value = null;
  };
  const HandlefileChange3 = (e) => {
    setSelectedImage3(URL.createObjectURL(e.target.files[0]));
    console.log("gf", src);
    setsaveimg3(false);
    setClosep3(false);
    e.target.value = null;
  };
  const HandlefileChange4 = (e) => {
    setSelectedImage4(URL.createObjectURL(e.target.files[0]));
    console.log("gf", src);
    setsaveimg4(false);
    setClosep4(false);
    e.target.value = null;
  };

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
    console.log(image.naturalWidth); //640
    const scaleX = image.naturalWidth / image.width;
    console.log(scaleX); //1.128
    console.log(image.naturalHeight); //480
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
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
        // blob.name = fileName;
        setBlob(blob);
        console.log("data", blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult(base64Image);
    // console.log("image",base64Image);

    console.log("data", canvas);
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

    // New lines to be added
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
        // blob.name = fileName;
        setBlob1(blob);
        console.log("data", blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult1(base64Image);
    // console.log("image",base64Image);

    console.log("data", canvas);
    setsaveimg1(true);
    setClosep1(true);
  }
  function getCroppedImg2(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    console.log(image2.naturalWidth); //640
    const scaleX = image2.naturalWidth / image2.width;
    console.log(scaleX); //1.128
    console.log(image2.naturalHeight); //480
    const scaleY = image2.naturalHeight / image2.height;
    canvas.width = crop2.width;
    canvas.height = crop2.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
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
        // blob.name = fileName;
        setBlob2(blob);
        console.log("data", blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult2(base64Image);
    // console.log("image",base64Image);

    console.log("data", canvas);
    setsaveimg2(true);
    setClosep2(true);
  }
  function getCroppedImg3(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    console.log(image3.naturalWidth); //640
    const scaleX = image3.naturalWidth / image3.width;
    console.log(scaleX); //1.128
    console.log(image3.naturalHeight); //480
    const scaleY = image3.naturalHeight / image3.height;
    canvas.width = crop3.width;
    canvas.height = crop3.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
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
        // blob.name = fileName;
        setBlob3(blob);
        console.log("data", blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult3(base64Image);
    // console.log("image",base64Image);

    console.log("data", canvas);
    setsaveimg3(true);
    setClosep3(true);
  }
  function getCroppedImg4(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    console.log(image4.naturalWidth); //640
    const scaleX = image4.naturalWidth / image4.width;
    console.log(scaleX); //1.128
    console.log(image4.naturalHeight); //480
    const scaleY = image4.naturalHeight / image4.height;
    canvas.width = crop4.width;
    canvas.height = crop4.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
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
        // blob.name = fileName;
        setBlob4(blob);
        console.log("data", blob);
      },
      "image/jpeg",
      1
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setImageResult4(base64Image);
    // console.log("image",base64Image);

    console.log("data", canvas);
    setsaveimg4(true);
    setClosep4(true);
  }
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // console.log(searchs);

  // search game
  const searchgame = (e) => {
    e.preventDefault();
    console.log(searchs);
    console.log(inputs);
    console.log(inputs.length);
    fetch(`${apiKey}api/category/searchgame/${inputs}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setsearchs(data);
      });
    // if (inputs.length < 1) {
    //   setdropdowns(false);
    // }
  };

  const SellerId = () => {
    fetch(`${apiKey}api/seller/searchseller/${idseller}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setsellername(data);
      });
  };

  const changesellername = () => {
    setIdSeller(sellername.sellerid);
    setShow(true);
  };

  const handleselectedvalue = (value, num, inn) => {
    console.log(value);
    console.log(num);
    console.log(suballname[1]);

    const index = suballname.map((i) => i).indexOf(value);
    console.log(index);
    const data = value;
    if (index == -1) {
      if (suballname[inn] == "undefined") {
        if (suballname.length < num) {
          const data1 = suballname.concat(data);
          setsuballname(data1);
          console.log(data1);
        }
      } else {
        suballname[inn] = data;
        // setsuballname(data1);
        console.log(suballname);
      }
    }
  };

  console.log(Categoryid);

  async function updateUser(e) {
    const edit_pids = router.query.edit_product;
    let img = [blob, blob1, blob2, blob3, blob4];
    // console.log("file", file);
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      e.preventDefault();
      const formData = new FormData();
      formData.append("productname", productnames);
      formData.append("sortdescription", sortdescription);
      formData.append("autodelivery", Autos);
      formData.append("price", prices);
      formData.append("qty", qty);
      formData.append("stock", stockss);
      // formData.append("account_username", usernames);
      // formData.append("account_password", passwords);
      // formData.append("account_email", emails);
      // formData.append("account_specialnote", specialnotes);
      formData.append("dropdownname", allname);
      formData.append("subdropdown", suballname);
      formData.append("category", Categoryid);
      formData.append("timeperiod", checkednew);
      for (let v = 0; v < imagefields.length; v++) {
        if (imagefields[v] != "empty") {
          formData.append("imageindex", imagefields[v]);
        }
      }
      formData.append("sellerid", idseller);
      for (let j = 0; j < img.length; j++) {
        formData.append("images", img[j]);
      }

      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
          Token: `${BearerToken}`,
        },
      };
      const url = apiKey + "api/product/updateproduct/" + edit_pids;
      // axios
      //   .post(url, formData, confiq)
      //   .then((response) => {
      //     toast("Product Updated Successfully");
      // history.push('/products/digital/digital-product-list')
      // })
      // .catch((e) => {
      // toast.error(e.response.data.error);
      // console.log(e.response);
      // });
      fetch(apiKey + "api/product/updateproduct/" + edit_pids, {
        method: "POST",
        headers: {
          Token: `${BearerToken}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {

          toast.success(result.message);
        })
        .catch((error) => {
          result.message
          console.error("Error:", error);
        });
    }
  }

  const changephoto = (index) => {
    let newArr = [...imagefields];
    newArr[index] = index;
    setimageFields(newArr);
    console.log(newArr);
  };


  const prevpage = () => {
    const x = parseInt(value);
    const res = x - 1;
    var result = res.toString();
    setValue(result);
  }

  const nextpage = () => {
    const x = parseInt(value);
    const res = x + 1;
    var result = res.toString();
    setValue(result);
  }
      console.log("enter", sortdescription);
  function handleOnEnter(sortdescription) {
    console.log("enter", sortdescription);
    setSortdescription(sortdescription)
  }
  return (
    <>
      <div className="mainview_product">
        {/* <Navbar /> */}
        <div className="mainview_wrapper_product">
          {/* <Dashboard /> */}
          <div className="rightpannel_product">
            <div className="rightpannel_wrapper_product">
              <h2 className="createlisting">Edit Product</h2>
              <div className="seconddiv">
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Game"
                          value="1" />
                        <Tab label="Description"
                          value="2" />
                        <Tab label="Price"
                          value="3" />
                        <Tab label="Photo"
                          value="4" />
                        <Tab label="Seller"
                          value="5" />
                        <Tab label="Delivery"
                          value="6" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div className="selectgame">
                        <h3 className="selectgamehead">Select Your Game</h3>
                        <div className="inputsform-backend selectinputsgame">
                          <input
                            type="text"
                            id="fname"
                            className="userdetails_product"
                            name="game"
                            onChange={(e) => {
                              setinputs(e.target.value);
                            }}
                            onKeyUp={searchgame}
                            // onKeyDown={searchgame}
                            placeholder="Search Game"
                            defaultValue={categoryname}
                            required
                          />
                          <div className="pen_product">
                            <SearchIcon />
                          </div>
                        </div>
                      </div>
                      {searchs.map((search, index) => (
                        <>
                          {/* {inputs.length >= 1 ? ( */}
                          <div
                            key={index}
                            className="divs"
                            onClick={(e) => {
                              // hadnledropdown(search._id),
                              setcategoryid(search._id);
                            }}
                          >
                            <div className="divsimg">
                              <img
                                src={search.categorythumblinimage}
                                alt="notfound"
                              />
                              {/* <img src={Thumb} alt="notfound" /> */}
                              {/* <Thumb/> */}
                            </div>
                            <div className="divstitle">
                              <h2 style={{ color: "white" }}>{search.name}</h2>
                            </div>
                          </div>
                          {/* ) : ( */}
                          {/* "" */}
                          {/* )} */}

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
                                <div
                                  key={index}
                                  className="innersdivs"
                                >
                                  {innerserach.map((inners, index) => (
                                    <div
                                      key={index}
                                      className="gamedropdows"
                                    >
                                      {/* {hadnledropdown2(inners._id) } */}
                                      <label htmlFor="cars">{inners.name}</label>
                                    </div>
                                  ))}
                                </div>
                                <div className="inners2div">
                                  {categorylist.map((iss, index) => (
                                    <>

                                      {innersdatas.map((inn, i) => (
                                        <>
                                          {
                                            i === index ? (


                                              <select
                                                name=""
                                                id=""
                                                className="selectgames_product"
                                                defaultValue={iss}
                                                // value={categorylist}
                                                // value={categorylist}
                                                // onChange={handleselectedvalue}
                                                // defaultValue={is}
                                                onChange={(e) =>
                                                  handleselectedvalue(
                                                    e.target.value,
                                                    innerserach.length,
                                                    i
                                                  )
                                                }
                                              >
                                                {/* <option value="" disabled></option> */}
                                                <option
                                                  value=""
                                                  hidden
                                                  selected
                                                ></option>
                                                {/* <option value="" hidden selected>{categorylist}</option> */}
                                                {inn.map((inns, index) => (
                                                  <>
                                                    <option
                                                      key={index}
                                                      value={inns.name}
                                                      className="gamesoption"
                                                      selected={iss}

                                                    // selected={categorylist[0]}
                                                    // selected={selected ? 'selected' : ''}
                                                    >
                                                      {inns.name}
                                                    </option>
                                                  </>
                                                ))}
                                              </select>
                                            ) : ('')
                                          }
                                        </>
                                      ))}
                                    </>
                                  ))}
                                </div>
                              </div>
                              <div className="innerdiv2"></div>
                            </div>
                          </div>
                        </>
                      ))}
                      <div className="buttonsto">
                        <div className="prevbtnback">
                          <ArrowCircleLeftOutlinedIcon />
                          <h6 className="prevpage">Prev</h6>
                        </div>
                        <div className="nextbtnback" onClick={nextpage}>
                          <ArrowCircleRightOutlinedIcon />
                          <h6 className="nextpage">Next</h6>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <form action=""
                        method="post">
                        <div className="ProductListing">
                          <div className="users productstitles">
                            <label htmlFor="title">Product Title</label>
                            <div className="inputsform-backend">
                              <input
                                type="text"
                                id="title"
                                className="userdetails_product"
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
                            <label htmlFor="desc">Product Description</label>
                            <div className="inputsform-backend descriptionform">
                            
                              <InputEmoji
                                onChange={(e) => {
                                  setSortdescription(e);
                                }}
                                classname={"react-input-emoji--input-backend"}
                                placeholder="Add description or use emoji"
                                value={sortdescription}
                                onEnter={handleOnEnter}

                              />
                            </div>
                          </div>
                          <div className="users productdesc">
                          <div className="made">
                            <label htmlFor="title" className="star">
                              *
                            </label>
                            <label htmlFor="desc">Dureaction</label>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              margin: "0 0 5rem 0",
                            }}
                            onChange={(e) => setCheckedfunction(e)}
                          >
                            <div>
                              <input
                                type="radio"
                                checked={checked === 7 || checked === "7"}
                                value="7"
                                // defaultValue="0"
                              />
                              <label htmlFor="desc" style={{padding: "0.5rem"}}>7 Days</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                checked={checked === 14 || checked === "14"}
                                value="14"
                                // defaultValue="0"

                              />
                              <label htmlFor="desc" style={{padding: "0.5rem"}}>14 Days</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                checked={checked === 30 || checked === "30"}
                                value="30"
                                // defaultValue="0"
                              />
                              <label htmlFor="desc" style={{padding: "0.5rem"}}>30 Days</label>
                            </div>
                          </div>
                        </div>
                          <div className="buttonsto">
                            <div className="prevbtnback" onClick={prevpage}>
                              <ArrowCircleLeftOutlinedIcon />
                              <h6 className="prevpage">Prev</h6>
                            </div>
                            <div className="nextbtnback" onClick={nextpage} >
                              <ArrowCircleRightOutlinedIcon />
                              <h6 className="nextpage">Next</h6>
                            </div>
                          </div>
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel value="3">
                      <form action=""
                        method="post">
                        <div className="ProductListing">
                          <div className="users productprice">
                            <label htmlFor="title">Price</label>
                            <div className="inputsform-backend">
                              <input
                                type="number"
                                id="title"
                                className="userdetails_product stockdetail"
                                placeholder="$"
                                name="price"
                                onChange={(e) => {
                                  setprices(e.target.value);
                                }}
                                // value={user.price}
                                defaultValue={prices}
                                required
                              />
                            </div>
                          </div>
                          <div className="users productprice">
                            <label htmlFor="title">Quantity/Stock</label>
                            <div className="inputsform-backend">
                              <input
                                type="number"
                                id="ti"
                                className="userdetails_product stockdetail"
                                name="stock"
                                onChange={(e) => {
                                  setStock(e.target.value);
                                }}
                                // value={stockss}
                                defaultValue={stockss}
                                placeholder="stock"
                                required
                              />
                            </div>
                          </div>
                          <div className="users productprice">
                            <label htmlFor="title">Minimum Quantity Per Order</label>
                            <div className="inputsform-backend">
                              <input
                                type="number"
                                id="ti"
                                className="userdetails_product stockdetail"
                                name="qty"
                                onChange={(e) => {
                                  setqty(e.target.value);
                                }}
                                // value={user.qty}
                                defaultValue={qty}
                                placeholder="qty"
                                required
                              />
                            </div>
                          </div>
                          <div className="buttonsto">
                            <div className="prevbtnback" onClick={prevpage}>
                              <ArrowCircleLeftOutlinedIcon />
                              <h6 className="prevpage">Prev</h6>
                            </div>
                            <div className="nextbtnback" onClick={nextpage} >
                              <ArrowCircleRightOutlinedIcon />
                              <h6 className="nextpage">Next</h6>
                            </div>
                          </div>
                        </div>
                      </form>
                    </TabPanel>

                    <TabPanel value="4">
                      {/* <input type="file" /> */}
                      {/* {imagep.map((input, i) => ( */}
                      <div style={{ display: "flex" }}>
                        <div className="input-group1 mb-3 upload_image1">
                          <div className="upload_image_container1"
                            onClick={() => changephoto("0")}
                          >
                            <div className="upload_image_input1 ">
                              <input
                                type="file"
                                className="form-control"
                                multiple
                                id="images"
                                // value={imagep}
                                // defaultValue
                                onChange={HandlefileChange}
                                name="images"
                                accept="image/*"
                                ref={ref}
                              />
                              <div className="cropsimageresult">
                                {imageResult && (
                                  <div
                                    // className="Cropdiv"
                                    style={{ width: "100%", height: "32vh" }}
                                  >
                                    <img
                                      src={imageResult}
                                      alt="image"
                                      // value={imagep}
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
                                onClick={(e) => deleteFile(e)}
                                className="deletephoto"
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                            <AddIcon className="upload_icon1" />
                          </div>
                        </div>
                        <div>
                          <div className="input-group1 mb-3 upload_image2">
                            <div className="upload_image_container2"
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
                                // value={imagep}
                                />
                                <div className="cropsimageresult">
                                  {imageResult1 && (
                                    <div
                                      // className="Cropdiv"
                                      style={{ width: "100%", height: "15vh" }}
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
                                  className="deletephoto"
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                              <AddIcon className="upload_icon2" />
                            </div>
                          </div>
                          <div className="input-group1 mb-3 upload_image2">
                            <div className="upload_image_container2"
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
                                      // className="Cropdiv"
                                      style={{ width: "100%", height: "15vh" }}
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
                                  className="deletephoto"
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
                            <div className="upload_image_container2"
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
                                      // className="Cropdiv"
                                      style={{ width: "100%", height: "15vh" }}
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
                                  className="deletephoto"
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                              <AddIcon className="upload_icon2" />
                            </div>
                          </div>
                          <div className="input-group1 mb-3 upload_image2">
                            <div className="upload_image_container2"
                              onClick={() => changephoto("4")}
                            >
                              <div className="upload_image_input3">
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
                                      // className="Cropdiv"
                                      style={{ width: "100%", height: "15vh" }}
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
                                  className="deletephoto"
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
                                    // onZoomChange={onZoomChange}
                                    // zoom={zoom}
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
                                    // onZoomChange={onZoomChange}
                                    // zoom={zoom}
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
                                    // onZoomChange={onZoomChange}
                                    // zoom={zoom}
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
                                    // onZoomChange={onZoomChange}
                                    // zoom={zoom}
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
                                    // onZoomChange={onZoomChange}
                                    // zoom={zoom}
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
                      <div className="buttonsto">
                        <div className="prevbtnback" onClick={prevpage}>
                          <ArrowCircleLeftOutlinedIcon />
                          <h6 className="prevpage">Prev</h6>
                        </div>
                        <div className="nextbtnback" onClick={nextpage} >
                          <ArrowCircleRightOutlinedIcon />
                          <h6 className="nextpage">Next</h6>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="5"
                      tabId="5"
                      eventKey="Seller">
                      <div className="SellerId">
                        <label htmlFor="title">Seller Id</label>
                        <div className="inputsform-backend">
                          <input
                            type="text"
                            id="title"
                            className="userdetails_input"
                            placeholder="Sellerid"
                            name="Sellerid"
                            onChange={(e) => {
                              setIdSeller(e.target.value);
                            }}
                            onKeyUp={SellerId}
                            value={idseller}
                            required
                          />
                        </div>
                        {/* <p onClick={changesellername}>{sellername.username}</p> */}
                        <div
                          onClick={() => changesellername()}
                          className={`setId  ${show ? "active" : ""}`}
                        >
                          <p style={{ cursor: "pointer" }}>
                            {sellername.username}
                          </p>
                        </div>
                      </div>
                      <div className="buttonsto">
                        <div className="prevbtnback" onClick={prevpage}>
                          <ArrowCircleLeftOutlinedIcon />
                          <h6 className="prevpage">Prev</h6>
                        </div>
                        <div className="nextbtnback" onClick={nextpage} >
                          <ArrowCircleRightOutlinedIcon />
                          <h6 className="nextpage">Next</h6>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="6">
                      <div className="deliverybtn_product">
                        <div className="automaticbtn">
                          <button
                            className="automatic-delivery_product"
                            onClick={automatichandle}
                          >
                            Automatic Delivery
                          </button>
                        </div>
                        <div className="automaticbtn">
                          <button
                            className="automatic-delivery_product selfcare"
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
                                <label htmlFor="title">Username</label>
                                <div className="inputsform-backend">
                                  <input
                                    type="text"
                                    id="title"
                                    className="userdetails_product usersformsumbit"
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
                                <label htmlFor="title">Register Email-Id</label>
                                <div className="inputsform-backend">
                                  <input
                                    type="email"
                                    id="title"
                                    className="userdetails_product usersformsumbit"
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
                                <label htmlFor="title">Password</label>
                                <div className="inputsform-backend">
                                  <input
                                    type="text"
                                    id="title"
                                    className="userdetails_product usersformsumbit"
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
                                <label htmlFor="title">Special Note</label>
                                <textarea
                                  name=""
                                  className="notes_product"
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

                      {/* {
                      auotmatic ? (
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
                              <div className="inputsform-backend">
                                <input
                                  type="text"
                                  id="title"
                                  className="userdetails productsdetail usersformsumbit"
                                  name="title"
                                  required
                                />
                              </div>
                            </div>
                            <div className="users productstitles">
                              <label for="title">Register Email-Id</label>
                              <div className="inputsform-backend">
                                <input
                                  type="text"
                                  id="title"
                                  className="userdetails productsdetail usersformsumbit"
                                  name="title"
                                  required
                                />
                              </div>
                            </div>
                            <div className="users productstitles">
                              <label for="title">Password</label>
                              <div className="inputsform-backend">
                                <input
                                  type="text"
                                  id="title"
                                  className="userdetails productsdetail usersformsumbit"
                                  name="title"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="rightform">
                            <div className="users productstitles">
                              <label for="title">Special Note</label>
                              <textarea name="" className="notes"></textarea>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {auotmatic2 ? (
                      <div className="ordercomplete">
                        <h2 className="deliver">Deliver thedetail product</h2>
                      </div>
                    ) : (
                      ""
                    )} */}

                      <div className="saveorderbtn backend">
                        <button
                          className="saveorderupdatebackend"
                          onClick={(e) => updateUser(e)}
                        >
                          Save
                        </button>
                      </div>
                      <div className="buttonsto">
                        <div className="prevbtnback" onClick={prevpage}>
                          <ArrowCircleLeftOutlinedIcon />
                          <h6 className="prevpage">Prev</h6>
                        </div>
                        <div className="nextbtnback"  >
                          <ArrowCircleRightOutlinedIcon />
                          <h6 className="nextpage">Next</h6>
                        </div>
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};
Editproduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Editproduct;
