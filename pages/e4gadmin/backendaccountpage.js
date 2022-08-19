import React, { useState, useEffect, useContext } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import {
  Label
} from "reactstrap";
import dynamic from "next/dynamic";
// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//   { ssr: false }
// )
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import axios from "axios";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../../components/checklogin/checklogin.js";
import Editor from "./edit_manageseller/Editor.js";
import { ToastContainer, toast } from "react-toastify";

toast.configure();
const notify = (message) => toast(message);

const config2 = {
  useSearch: false,
  spellcheck: false,
  enter: "P",
  defaultMode: "1",
  toolbarAdaptive: false,
  toolbarSticky: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  minHeight: 200,
  maxHeight: 500,
  minWidth: null,
  buttons:
    "paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,fontsize,brush,,link,|,align,undo,redo",
  editorCssClass: "alic",
  placeHolder: "",
  controls: {
    fontsize: {
      list: [
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "18",
        "24",
        "30",
        "36",
        "48",
        "60",
        "72",
        "96",
        "100",
      ],
    },
    font: {
      command: "fontname",
      list: {
        "": "Default",
        "'Open Sans',sans-serif": "Open Sans",
        "Helvetica,sans-serif": "Helvetica",
        "Arial,Helvetica,sans-serif": "Arial",
        "Georgia,serif": "Georgia",
        "Impact,Charcoal,sans-serif": "Impact",
        "Tahoma,Geneva,sans-serif": "Tahoma",
        "'Times New Roman',Times,serif": "Times New Roman",
        "Verdana,Geneva,sans-serif": "Verdana",
      },
    },
  },
};

const Backendaccountpage = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

  const [bannerhead, setbannerhead] = useState("");
  const [marketcontent, setmarketcontent] = useState("");
  const [bottomcontent, setbottomcontent] = useState("");
  // const [uploadcategoryimg, setcategoryimg] = useState([])
  const [showdesign, setshowdesign] = useState(true);

  const [categoryimage, setImage] = useState("");
  const [coverimg, setcoverimg] = useState("");
  const [logos, setlogos] = useState("");
  const [thumbnail1, setthumbnail1] = useState("");
  const [thumbnail2, setthumbnail2] = useState("");
  const [thumbnail3, setthumbnail3] = useState("");


  const [Color, Setcolor] = useState("");
  const [uploadthumbnail1, setthumbnailimage1] = useState([]);
  const [uploadthumbnail2, setthumbnailimage2] = useState([]);
  const [uploadthumbnail3, setthumbnailimage3] = useState([]);


  const [uploadlogo, setlogoimage] = useState([]);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);
  const [isOpened4, setIsOpened4] = useState(false);
  const [bannerheading, setBannerheading] = useState("");
  const [bannerimage, setBannerimage] = useState("");
  const [bannertopimage, setBannertopimage] = useState("");
  const [bannertopimage1, setBannertopimage1] = useState("");
  const [bannerid, setBannerid] = useState("");
  const [bannertrue, setBannertrue] = useState(false);
  const [bannerimgtrue, setBannerimgtrue] = useState(false);
  const [bannerlayout, setBannerlayout] = useState("");
  const [bannertopheading, setBannertopheading] = useState("");
  const [offerheading, setOfferheading] = useState("");
  const [offerpercent, setOfferpercent] = useState("");

  const [seotopheading, setSeotopheading] = useState("");
  const [bannerimglayout, setBannerimglayout] = useState("");
  const [bannerparagraph, setBannerparagraph] = useState("");
  const [divtrue, setDivtrue] = useState(false);
  const [offer, setOffer] = useState(false);


  const [{ alt4, src4 }, setImg4] = useState({
    src4: "",
    alt4: "Upload an Image",
  });
  const [{ alt5, src5 }, setImg5] = useState({
    src5: "",
    alt5: "Upload an Image",
  });
  const [{ alt6, src6 }, setImg6] = useState({
    src5: "",
    alt5: "Upload an Image",
  });
  function toggle2() {
    setIsOpened2(!isOpened2);
  }
  function toggle3() {
    setIsOpened3(!isOpened3);
  }
  function toggle4() {
    setIsOpened4(!isOpened4);
  }

  const handleImage4 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setthumbnailimage1(file);
    setthumbnail1(e.target.files[0]);
    if (e.target.files[0]) {
      setImg4({
        src3: URL.createObjectURL(e.target.files[0]),
        alt3: e.target.files[0].name,
      });
    }
  };
  const handleImage5 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setthumbnailimage2(file);
    setthumbnail2(e.target.files[0]);
    if (e.target.files[0]) {
      setImg5({
        src5: URL.createObjectURL(e.target.files[0]),
        alt5: e.target.files[0].name,
      });
    }
  };
  const handleImage6 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setthumbnailimage3(file);
    setthumbnail3(e.target.files[0]);
    if (e.target.files[0]) {
      setImg6({
        src5: URL.createObjectURL(e.target.files[0]),
        alt5: e.target.files[0].name,
      });
    }
  };
  useEffect(() => {
    setloaderspage(true);
    if (Tokens === "") {
    } else {
      text(Tokens);
    }
  }, [Tokens]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiKey}api/admin/fetchladingpage`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setBannerheading(data.bannerheading);
        setBannerimage(data.bannerimage);
        setBannertopimage(data.topimage);
        setBannerid(data._id);
        setBannertrue(data.bannerheadingenable);
        setBannerimgtrue(data.bannerimageenable);
        setBannerlayout(data.bannerheadinglayout);
        setBannerimglayout(data.bannerimagelayout);
        setBannerparagraph(data.bannerparalayout);
        setDivtrue(data.divenable);
        setBannertopheading(data.topheading);
        setSeotopheading(data.seotopheading);
        setOffer(data.offerbannerenable);
        setOfferpercent(data.percentagenumber);
        setOfferheading(data.offerheading)
        setBannertopimage1(data.bannerbackgroundimage)
      });
    });
  }, []);

  async function Datesend() {
    const formData = new FormData();
    formData.append("bannerheading", bannerheading);
    formData.append("bannerheadinglayout", bannerlayout);
    formData.append("bannerimagelayout", bannerimglayout);
    formData.append("bannerimageenable", bannerimgtrue);
    formData.append("bannerheadingenable", bannertrue);
    formData.append("bannerimage", thumbnail1);
    formData.append("bannerparalayout", bannerparagraph);
    formData.append("topimage", thumbnail2);
    formData.append("topheading", bannertopheading);
    formData.append("seotopheading", seotopheading);
    formData.append("divenable", divtrue);
    formData.append("bannerbackgroundimage", thumbnail3);
    formData.append("percentagenumber", offerpercent);
    formData.append("offerheading", offerheading);
    formData.append("offerbannerenable", offer);

    const confiq = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = `${apiKey}api/admin/updatelanding/${bannerid}`;
    axios
      .post(url, formData, confiq)
      .then((response) => {
        notify(response.data.message);
        // getList();
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e.response.data.error)
      });
  }
  const checkfiltered2 = () => {
    setBannertrue(!bannertrue);
  };
  const checkfiltered = () => {
    setBannerimgtrue(!bannerimgtrue);
  };
  const changeids = (e) => {
    console.log(e.target.value);
    setBannerlayout(e.target.value);
  };
  const changeids1 = (e) => {
    console.log(e.target.value);
    setBannerimglayout(e.target.value);
  };
  const checkdiv = () => {
    setDivtrue(!divtrue);
  };
  const checkdivoffer = () => {
    setOffer(!offer);
  };
  return (
    <>
      {loaderspage ? (
        <>
          <Checklogin />
          <div className="loader loader1"></div>
        </>
      ) : (
        <div className="backendpageStyle">
          <div className="alerts">
          <ToastContainer autoClose={2000} />
        </div>
          <div className="toogles" onClick={toggle2}>
            <h2 className="showinputss">Account Homepage</h2>
            <KeyboardArrowDownIcon />
          </div>
          <div className={`mainheader_style ${isOpened2 ? "active" : ""}`}>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Enable Div
              </Label>
              <div className="categoryforminput">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={divtrue}
                    onChange={checkdiv}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Enable Heading
              </Label>
              <div className="categoryforminput">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={bannertrue}
                    onChange={checkfiltered2}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner Heading
              </Label>
              <div className="categoryforminput">
                <Editor
                  config={config2}
                  value={bannerheading}
                  onChange={(c) => {
                    setBannerheading(c);
                  }}
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner Paragraph
              </Label>
              <div className="categoryforminput">
                <Editor
                  config={config2}
                  value={bannerparagraph}
                  onChange={(c) => {
                    setBannerparagraph(c);
                  }}
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Heading Position
              </Label>
              <div className="categoryforminput">
                <select
                  name=""
                  id=""
                  className="position"
                  onChange={(e) => {
                    changeids(e);
                  }}
                  style={{ padding: "0.5rem", width: "60%" }}
                >
                  <option>{bannerlayout}</option>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                </select>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Image Position
              </Label>
              <div className="categoryforminput">
                <select
                  name=""
                  id=""
                  className="position"
                  style={{ padding: "0.5rem", width: "60%" }}
                  onChange={(e) => {
                    changeids1(e);
                  }}
                >
                  <option>{bannerimglayout}</option>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                </select>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Enable Image
              </Label>
              <div className="categoryforminput">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={bannerimgtrue}
                    onChange={checkfiltered}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner Image
              </Label>
              <div className="uploadbtn">
                <label className="custom-file-upload">
                  <div className="thumbnailbtn">Upload</div>
                  <input
                    type="file"
                    onChange={handleImage4}
                    className="inputdisplay"
                  />
                </label>
              </div>
            </div>
            {uploadthumbnail1.length > 0 ? (
              <div className="profileimage">
                <img src={uploadthumbnail1} alt="noss" />
              </div>
            ) : (
              <div className="profileimage">
                <img src={bannerimage} height={150} width={150} />
              </div>
            )}
            <div className="div">
              <button
                type="button"
                onClick={Datesend}
                className="backend_button"
              >
                Save
              </button>
            </div>
          </div>
          <div className="toogles" onClick={toggle3}>
            <h2 className="showinputss">Homepage Banner</h2>
            <KeyboardArrowDownIcon />
          </div>
          <div className={`mainheader_style ${isOpened3 ? "active" : ""}`}>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner Top Heading
              </Label>
              <div className="categoryforminput">
                <Editor
                  config={config2}
                  value={bannertopheading}
                  onChange={(c) => {
                    setBannertopheading(c);
                  }}
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner H1 Top Heading
              </Label>
              <div className="categoryforminput">
                <Editor
                  config={config2}
                  value={seotopheading}
                  onChange={(c) => {
                    setSeotopheading(c);
                  }}
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner Top Image
              </Label>
              <div className="uploadbtn">
                <label className="custom-file-upload">
                  <div className="thumbnailbtn">Upload</div>
                  <input
                    type="file"
                    onChange={handleImage5}
                    className="inputdisplay"
                  />
                </label>
              </div>
            </div>
            {uploadthumbnail2.length > 0 ? (
              <div className="profileimage">
                <img src={uploadthumbnail2} alt="noss" />
              </div>
            ) : (
              <div className="profileimage">
                <img src={bannertopimage} height={150} width={150} />
              </div>
            )}
            <div className="div">
              <button
                type="button"
                onClick={Datesend}
                className="backend_button"
              >
                Save
              </button>
            </div>
          </div>
          <div className="toogles" onClick={toggle4}>
            <h2 className="showinputss">Add Banner One</h2>
            <KeyboardArrowDownIcon />
          </div>
          <div className={`mainheader_style ${isOpened4 ? "active" : ""}`}>
          <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Enable Offer Banner
              </Label>
              <div className="categoryforminput">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={offer}
                    onChange={checkdivoffer}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner Heading
              </Label>
              <div className="categoryforminput">
                <Editor
                  config={config2}
                  value={offerheading}
                  onChange={(c) => {
                    setOfferheading(c);
                  }}
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Parcentage Number
              </Label>
              <div className="categoryforminput">
                <Editor
                  config={config2}
                  value={offerpercent}
                  onChange={(c) => {
                    setOfferpercent(c);
                  }}
                />
              </div>
            </div>
            <div className="right_input new_category">
              <Label className="col-xl-3 col-md-4">
                <span>*</span>Banner Background Image
              </Label>
              <div className="uploadbtn">
                <label className="custom-file-upload">
                  <div className="thumbnailbtn">Upload</div>
                  <input
                    type="file"
                    onChange={handleImage6}
                    className="inputdisplay"
                  />
                </label>
              </div>
            </div>
            {uploadthumbnail3.length > 0 ? (
              <div className="banner_accountpage">
                <img src={uploadthumbnail3} alt="noss" className="banner_background_image" />
              </div>
            ) : (
              <div className=" banner_accountpage">
                <img src={bannertopimage1} className="banner_background_image" />
              </div>
            )}
            <div className="div">
              <button
                type="button"
                onClick={Datesend}
                className="backend_button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const text = (token) => {
  if (token) {
    Backendaccountpage.getLayout = (page) => (
      <DashboardLayout>{page}</DashboardLayout>
    );
  } else {
    alert("hlo");
  }
};

export default Backendaccountpage;
