import React, { useEffect, useState, useContext } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
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
import dynamic from "next/dynamic";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../../components/checklogin/checklogin.js";
// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//   { ssr: false }
// )
import Editor from "./edit_manageseller/Editor.js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import axios from "axios";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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

const Backendhomepage = () => {
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
  const [thumbnail, setthumbnail] = useState("");

  const [Color, Setcolor] = useState("");
  const [uploadcategoryimg, setcategoryimg] = useState([]);
  const [uploadcoverimag, setcoverimage] = useState([]);
  const [uploadthumbnail, setthumbnailimage] = useState([]);

  const [uploadlogo, setlogoimage] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setloaderspage(true);
    if (Tokens === "") {
      // alert('kk')
    } else {
      text(Tokens);
    }
  }, [Tokens]);

  console.log(bottomcontent);

  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });

  const [{ alt1, src1 }, setImg1] = useState({
    src1: "",
    alt1: "Upload an Image",
  });
  const [{ alt2, src2 }, setImg2] = useState({
    src2: "",
    alt2: "Upload an Image",
  });
  const [{ alt3, src3 }, setImg3] = useState({
    src3: "",
    alt3: "Upload an Image",
  });

  function toggle() {
    setIsOpened(!isOpened);
  }
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
  const handleImage1 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setcoverimage(file);
    setcoverimg(e.target.files[0]);
    if (e.target.files[0]) {
      setImg1({
        src1: URL.createObjectURL(e.target.files[0]),
        alt1: e.target.files[0].name,
      });
    }
  };
  const handleImage2 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setlogoimage(file);
    setlogos(e.target.files[0]);
    if (e.target.files[0]) {
      setImg2({
        src2: URL.createObjectURL(e.target.files[0]),
        alt2: e.target.files[0].name,
      });
    }
  };
  const handleImage3 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setthumbnailimage(file);
    setthumbnail(e.target.files[0]);
    if (e.target.files[0]) {
      setImg3({
        src3: URL.createObjectURL(e.target.files[0]),
        alt3: e.target.files[0].name,
      });
    }
  };

  useEffect(() => {
    fetch("http://206.189.136.28:5000/api/admin/homedatafetch/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setbannerhead(data.bannerheading);
        setmarketcontent(data.aboutmarketpalce);
        setbottomcontent(data.bottomcontaint);
        setImage(data.bannerimage);
        setcoverimg(data.aboutimage);
        setlogos(data.bottomimage);
        setthumbnail(data.howitsworkimage);
      });
  }, []);

  async function Datesend() {
    const formData = new FormData();
    formData.append("bannerheading", bannerhead);
    formData.append("aboutmarketpalce", marketcontent);
    formData.append("bottomcontaint", bottomcontent);
    formData.append("bannerimage", categoryimage);
    formData.append("aboutimage", coverimg);
    formData.append("bottomimage", logos);
    formData.append("howitsworkimage", thumbnail);

    const confiq = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = `${apiKey}api/admin/updatehome/6222e6ba1b83345a1ca0b71a`;
    axios
      .post(url, formData, confiq)
      .then((response) => {
        notify(response.data.message);
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e.response.data.error)
      });
    // fetch(`${apiKey}api/admin/updatehome`, {
    //   method: "post",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  return (
    <>
      {loaderspage ? (
        <>
          <Checklogin />
          <div className="loader loader1"></div>
        </>
      ) : (
        <div className="backendpageStyle">
          {showdesign && (
            <>
              <div className="toogles" onClick={toggle}>
                <div className="alerts">
                  <ToastContainer autoClose={2000} />
                </div>
                <h2 className="showinputss">Main Homepage</h2>
                <KeyboardArrowDownIcon />
              </div>
              <div className={`mainheader_style ${isOpened ? "active" : ""}`}>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Enable Heading
                  </Label>
                  <div className="categoryforminput">
                    <label className="switch">
                      <input type="checkbox" />
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
                      value={bannerhead}
                      onChange={(c) => {
                        setbannerhead(c);
                      }}
                    />
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Enable Banner Image
                  </Label>
                  <div className="categoryforminput">
                    <label className="switch">
                      <input type="checkbox" />
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
                  <div className="profileimage">
                    <img src={categoryimage} height={150} width={150} />
                  </div>
                )}
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Enable Marketplace Content
                  </Label>
                  <div className="categoryforminput">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>About Marketplace Content
                  </Label>
                  <div className="categoryforminput">
                    <Editor
                      config={config2}
                      value={marketcontent}
                      onChange={(c) => {
                        setmarketcontent(c);
                      }}
                    />
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Enable Marketplace Image
                  </Label>
                  <div className="categoryforminput">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Marketplace Image
                  </Label>
                  <div className="uploadbtn">
                    <label className="custom-file-upload">
                      <div className="thumbnailbtn">Upload</div>
                      <input
                        type="file"
                        onChange={handleImage1}
                        className="inputdisplay"
                      />
                    </label>
                  </div>
                </div>

                {uploadcoverimag.length > 0 ? (
                  <div className="profileimage">
                    <img src={uploadcoverimag} alt="noss" />
                  </div>
                ) : (
                  <div className="profileimage">
                    <img src={coverimg} height={150} width={150} />
                  </div>
                )}
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Enable Bottom Content
                  </Label>
                  <div className="categoryforminput">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Bottom Content
                  </Label>
                  <div className="categoryforminput">
                    <Editor
                      config={config2}
                      value={bottomcontent}
                      onChange={(c) => {
                        setbottomcontent(c);
                      }}
                    />
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Enable Bottom Content Image
                  </Label>
                  <div className="categoryforminput">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Bottom Content Image
                  </Label>
                  <div className="uploadbtn">
                    <label className="custom-file-upload">
                      <div className="thumbnailbtn">Upload</div>
                      <input
                        type="file"
                        onChange={handleImage2}
                        className="inputdisplay"
                      />
                    </label>
                  </div>
                </div>
                {uploadlogo.length > 0 ? (
                  <div className="profileimage">
                    <img src={uploadlogo} alt="noss" />
                  </div>
                ) : (
                  <div className="profileimage">
                    <img src={logos} height={150} width={150} />
                  </div>
                )}
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>Enable How it work Image
                  </Label>
                  <div className="categoryforminput">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="right_input new_category">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span>How its Work
                  </Label>
                  <div className="uploadbtn">
                    <label className="custom-file-upload">
                      <div className="thumbnailbtn">Upload</div>
                      <input
                        type="file"
                        onChange={handleImage3}
                        className="inputdisplay"
                      />
                    </label>
                  </div>
                </div>

                {uploadthumbnail.length > 0 ? (
                  <div className="profileimage">
                    <img src={uploadthumbnail} alt="noss" />
                  </div>
                ) : (
                  <div className="profileimage">
                    <img src={thumbnail} height={150} width={150} />
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
            </>
          )}
        </div>
      )}
    </>
  );
};

const text = (token) => {
  if (!token) {
  } else {
    Backendhomepage.getLayout = (page) => (
      <DashboardLayout>{page}</DashboardLayout>
    );
  }
};

export default Backendhomepage;
