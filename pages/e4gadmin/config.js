import React, { Fragment, useState, useEffect } from "react";
import noImage from "../../public/images/noimage.jpg";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Checklogin from "../../components/checklogin/checklogin.js";
import Editor from "./edit_manageseller/Editor.js";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// const Editor = dynamic(
//   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//   { ssr: false }
// );

// import Breadcrumb from "../common/breadcrumb";
import { toast } from "react-toastify";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import axios from "axios";
import { DashboardLayout } from "../../components/dashboard-layout";
import Image from "next/image";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Contextapi from "../../Context/Contextapi.js";
import { useContext } from "react";
// import { json } from "stream/consumers";
// import KeyboardArrowDownIcon from "@mui/icons-material/ArrowDropDownCircle";
// import { ToastContainer, toast } from 'react-toastify';

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

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

const Create_menu = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);
  console.log(apiKey);
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const [data, setData] = useState([]);
  const [dataValue, setDataValue] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [storedata, setStore] = useState(false);
  const [innerdata, setinnerdata] = useState([]);
  const [count, setCount] = useState(0);

  // edit category
  const [cateId, setCateId] = useState([]);
  const [dataEdit, setEditData] = useState([]);
  const [names, setEditName] = useState("");
  const [name, setName] = useState("");
  const [nameheading, setNameheading] = useState("");
  const [nameheading1, setNameheading1] = useState("");

  const [categoryimage, setImage] = useState("");
  const [categoryimage1, setImage1] = useState("");
  const [coverimg, setcoverimg] = useState("");
  const [coverimg1, setcoverimg1] = useState("");
  const [logos, setlogos] = useState("");
  const [logos1, setlogos1] = useState("");
  const [thumbnail, setthumbnail] = useState("");
  const [thumbnail1, setthumbnail1] = useState("");
  const [Color, Setcolor] = useState("");
  const [uploadcategoryimg, setcategoryimg] = useState([]);
  const [uploadcoverimag, setcoverimage] = useState([]);
  const [uploadthumbnail, setthumbnailimage] = useState([]);
  const [uploadlogo, setlogoimage] = useState([]);

  const [metatitle, setmetatitle] = useState("");
  const [metatitle1, setmetatitle1] = useState("");
  const [metakeyword, setmetakeyowrd] = useState("");
  const [metakeyword1, setmetakeyowrd1] = useState("");
  const [metaurl, setmetaurl] = useState("");
  const [metaurl1, setmetaurl1] = useState("");
  const [metadescription, setmetadescription] = useState("");
  const [metadescription1, setmetadescription1] = useState("");

  const [isOpened, setIsOpened] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);
  const [isOpened4, setIsOpened4] = useState(false);
  const [isOpened5, setIsOpened5] = useState(false);
  const [isOpened6, setIsOpened6] = useState(false);

  const [bannerhead, setbannerhead] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isCheckedFilter, setcheckfilter] = useState(false);
  const [isCheckedFilter1, setcheckfilter1] = useState(false);
  const [iscetegary1, setiscetegary1] = useState(false);
  const [iscetegary, setiscetegary] = useState(false);

  const [showdesign, setshowdesign] = useState(false);

  const [showsubmenu, setshowsubmenu] = useState(false);

  const [loader, setloader] = useState(true);
  const [namecategorytoggle, setnamecategorytoggle] = useState(true);

  const [showparent, setshowparent] = useState(false);
  // const [list, setList] = React.useState(items);
  const [faqquestion, setFaqquestion] = useState("");
  const [faqanswer, setFaqanswer] = useState("");
  const [faqquestion1, setFaqquestion1] = useState("");
  const [questions, setquestions] = useState([]);
  const [res2, setres2] = useState([]);

  const [questions2, setquestions2] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [answer2, setAnswer2] = useState([]);

  const [faqanswer1, setFaqanswer1] = useState("");

  const [showroot, setshowroot] = useState(true);

  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);

  const [imagefields, setimageFields] = useState([]);

  const [activeIndex, setActiveIndex] = React.useState("");
  const [activeIndex2, setActiveIndex2] = React.useState("");
  const [activeIndex3, setActiveIndex3] = React.useState("");
  const [activeIndex4, setActiveIndex4] = React.useState("");

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: data,
    });
  };

  const [editorStatedatas, setEditorStateDatas] = useState("");
  const [editorStatedatas1, setEditorStateDatas1] = useState("");

  const onDragOver = (event) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder[0].nodes;
    const draggedFrom = dragAndDrop.draggedFrom;
    console.log(draggedFrom);

    const draggedTo = Number(event.currentTarget.dataset.position);
    console.log(draggedTo);

    const itemDragged = innerdata[draggedFrom];
    console.log(itemDragged);
    const remainingItems = innerdata.filter((data, i) => i !== draggedFrom);

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  console.log(editorStatedatas);

  const onDrop = (event) => {
    console.log(event);
    console.log(dragAndDrop.updatedOrder);
    setinnerdata(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  React.useEffect(() => {
    console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
    console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
  }, [dragAndDrop]);

  React.useEffect(() => {
    console.log("List updated!");
    console.log(innerdata);
  }, [innerdata]);

  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });
  const [{ altstart, srcstart }, setImgstart] = useState({
    srcstart: "",
    altstart: "Upload an Image",
  });
  const [{ alt1start, src1start }, setImg1start] = useState({
    src1start: "",
    alt1start: "Upload an Image",
  });
  const [{ alt2start, src2start }, setImg2start] = useState({
    src2start: "",
    alt2start: "Upload an Image",
  });
  const [{ alt3start, src3start }, setImg3start] = useState({
    src3start: "",
    alt3start: "Upload an Image",
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
  const [loading, setLoading] = useState(false);
  const handleEdit = (ids) => {
    // setshowparent(true);
    setShowInput(true);
    setCateId(ids);
    console.log(cateId);
    setDisabled(true);
    setshowdesign(false);
    setshowsubmenu(true);
    setshowparent(false);
  };
  const handleEdit2 = (ids) => {
    getlist2(ids);
    setShowInput(true);
    setshowsubmenu(true);
    setshowroot(true);
    setnamecategorytoggle(true);
    setshowparent(false);
    setshowdesign(false);
  };

  const changecolor = (i) => {
    setActiveIndex(i);
    setActiveIndex2("");
    setActiveIndex3("");
    setActiveIndex4("");
  };
  const changecolor2 = (i) => {
    setActiveIndex2(i);
    setActiveIndex("");
    setActiveIndex3("");
    setActiveIndex4("");
  };
  const changecolor3 = (i) => {
    setActiveIndex3(i);
    setActiveIndex4("");
    setActiveIndex("");
    setActiveIndex2("");
  };
  const changecolor4 = (i) => {
    setActiveIndex4(i);
    setActiveIndex3("");
    setActiveIndex("");
    setActiveIndex2("");
  };

  const getlist2 = (id) => {
    fetch(`${apiKey}api/category/editcategorylist/${id}`)
      .then((res) => res.json())
      .then((userId) => {
        setEditData(userId.result);
        console.log(userId.result);
        setEditName(userId.result.name);
        setmetatitle(userId.result.metatitle);
        setmetaurl(userId.result.metaurl);
        setmetakeyowrd(userId.result.metakeyword);
        Setcolor(userId.result.imagebackgroundcolor);
        // setImage(userId.result.categoryimage);
        // setcoverimg(userId.result.coverimage);
        // setlogos(userId.result.categorylogo);
        // setthumbnail(userId.result.categorythumblinimage);
        setIsChecked2(userId.result.isfeatured);
        setIsChecked(userId.result.isnewArrivalfeatured);
        setcheckfilter(userId.result.isfilterd);
        setEditorStateDatas(userId.result.categorycontent);
        setmetadescription(userId.result.metadescription);
        setImg({
          src: "",
          alt: "",
        });
        setImg1({
          src1: "",
          alt1: "",
        });
        setImg2({
          src2: "",
          alt2: "",
        });
        setImg3({
          src3: "",
          src3: "",
        });
        setImgstart({
          src: "",
          alt: "",
        });
        setImg1start({
          src1: "",
          alt1: "",
        });
        setImg2start({
          src2: "",
          alt2: "",
        });
        setImg3start({
          src3: "",
          src3: "",
        });
      });
  };

  const Addroots = () => {
    setshowparent(true);
    setShowInput(false);
    setshowdesign(true);
    setnamecategorytoggle(false);
  };
  const handleImage = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    // setcategoryimg(file);
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };
  const handleImagestart = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setcategoryimg(file);
    setImage1(e.target.files[0]);
    if (e.target.files[0]) {
      setImgstart({
        srcstart: URL.createObjectURL(e.target.files[0]),
        altstart: e.target.files[0].name,
      });
    }
  };

  const handleImage1start = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setcoverimage(file);
    setcoverimg1(e.target.files[0]);
    if (e.target.files[0]) {
      setImg1start({
        src1start: URL.createObjectURL(e.target.files[0]),
        alt1start: e.target.files[0].name,
      });
    }
  };

  const handleImage2start = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setlogoimage(file);
    setlogos1(e.target.files[0]);
    if (e.target.files[0]) {
      setImg2start({
        src2start: URL.createObjectURL(e.target.files[0]),
        alt2start: e.target.files[0].name,
      });
    }
  };

  const handleImage3start = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setthumbnailimage(file);
    setthumbnail1(e.target.files[0]);
    if (e.target.files[0]) {
      setImg3start({
        src3start: URL.createObjectURL(e.target.files[0]),
        alt3start: e.target.files[0].name,
      });
    }
  };

  const handleImage1 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    // setcoverimage(file);
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
    // setlogoimage(file);
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
    // setthumbnailimage(file);
    setthumbnail(e.target.files[0]);
    if (e.target.files[0]) {
      setImg3({
        src3: URL.createObjectURL(e.target.files[0]),
        alt3: e.target.files[0].name,
      });
    }
  };

  useEffect(async () => {
    let userId = await fetch(
      `${apiKey}api/category/editcategorylist/` + cateId,
      {
        method: "GET",
      }
    );
    userId = await userId.json();
    setEditData(userId.result);
    // console.log(userId.result);
    setEditName(userId.result.name);
    setmetatitle(userId.result.metatitle);
    setmetaurl(userId.result.metaurl);
    setmetakeyowrd(userId.result.metakeyword);
    Setcolor(userId.result.imagebackgroundcolor);
    setImage(userId.result.categoryimage);
    setcoverimg(userId.result.coverimage);
    setlogos(userId.result.categorylogo);
    setthumbnail(userId.result.categorythumblinimage);
    setIsChecked2(userId.result.isfeatured);
    setIsChecked(userId.result.isnewArrivalfeatured);
    setcheckfilter(userId.result.isfilterd);
    setEditorStateDatas1(userId.result.categorycontent);
    setmetadescription(userId.result.metadescription);
    setquestions(userId.result.questions);
    setquestions2(userId.result.questions);
    setAnswer(userId.result.answers);
    setAnswer2(userId.result.answers);
    setiscetegary(userId.result.isenable);

    setImg({
      src: "",
      alt: "",
    });
    setImg1({
      src1: "",
      alt1: "",
    });
    setImg2({
      src2: "",
      alt2: "",
    });
    setImg3({
      src3: "",
      src3: "",
    });
  }, [cateId]);
  console.log(iscetegary);

  console.log(iscetegary1);
  //  edit category end
  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 1000);
  }, []);

  // const sendsquestion = (e, i) => {
  //   alert("hhh");
  //   e.preventDefault();
  //   console.log(i);
  //   const data2 = faqquestion1;
  //   const res = questions.concat(data2);
  //   setquestions(res);
  //   const data3 = faqanswer1;
  //   const res1 = answer.concat(data3);
  //   setAnswer(res1);
  // };

  // update end
  async function updateUser(cateId) {
    console.log(editorStatedatas);
    const arrayOfData = localStorage.getItem("userInfo");
    const ques = JSON.stringify(questions);
    const ans = JSON.stringify(answer);

    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      const formData = new FormData();
      formData.append("names", names);
      // formData.append('images', image);
      formData.append("categoryimage", categoryimage);
      formData.append("coverimage", coverimg);
      formData.append("categorylogo", logos);
      formData.append("categorythumblinimage", thumbnail);
      formData.append("imagebackgroundcolor", Color);
      formData.append("metatitle", metatitle);
      formData.append("metadescription", metadescription);
      formData.append("metakeyword", metakeyword);
      formData.append("metaurl", metaurl);
      formData.append("isfeatured", isChecked2);
      formData.append("isnewArrivalfeatured", isChecked);
      formData.append("isfilterd", isCheckedFilter);
      formData.append("categorycontent", editorStatedatas1);
      formData.append("questions", ques);
      formData.append("answers", ans);
      formData.append("isenable", iscetegary);

      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
          Token: `${BearerToken}`,
        },
      };
      const url = `${apiKey}api/category/updatecategorylist/` + cateId;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          toast.success("Category Updated Successfully");
          getList();
        })
        .catch((e) => {
          toast.error("Must be contain 6 product ");
        });
    }
  }
  //  update end

  // get category list
  useEffect(() => {
    setloaderspage(true);
    if (Tokens === "") {
    } else {
      text(Tokens);
      // getadmin()
      getList();
    }
  }, [Tokens]);
  function getList() {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;

      console.log(cart_data);
      const BearerToken = cart_data;
      fetch(`${apiKey}api/category/categorylist`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Token: `${BearerToken}`,
        },
      }).then((result) => {
        result.json().then((resp) => {
          setData(resp.data);
          let x = resp.data[0].nodes;
          console.log(x);
          setinnerdata(x);
          setLoading(true);
        });
      });
    }
  }
  // get category list end

  function toggle() {
    setIsOpened(!isOpened);
  }
  function toggle2() {
    setIsOpened2(!isOpened2);
  }
  function toggle3() {
    setIsOpened3(!isOpened3);
  }
  function toggle4() {
    setIsOpened4(!isOpened4);
  }
  function toggle5() {
    setIsOpened5(!isOpened5);
  }
  function toggle6() {
    setIsOpened6(!isOpened6);
  }
  // post data
  const PostData = async (e) => {
    e.preventDefault();
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("categoryimage", categoryimage1);
      formData.append("coverimage", coverimg1);
      formData.append("categorylogo", logos1);
      formData.append("categorythumblinimage", thumbnail1);
      formData.append("imagebackgroundcolor", Color);
      formData.append("metatitle", metatitle1);
      formData.append("metadescription", metadescription1);
      formData.append("metakeyword", metakeyword1);
      formData.append("metaurl", metaurl1);
      formData.append("categorycontent", editorStatedatas);
      formData.append("isfilterd", isCheckedFilter1);
      formData.append("isenable", iscetegary1);

      const confiq = {
        headers: {
          "content-type": "multipart/form-data",
          Token: `${BearerToken}`,
        },
      };
      const url = `${apiKey}api/category/addcategory/${dataValue}`;
      axios
        .post(url, formData, confiq)
        .then((response) => {
          toast.success("Category Add Successfully");
          getList();
        })
        .catch((e) => {
          toast.error(e.response.data.error);
        });
    }

    setImgstart({
      src: "",
      alt: "",
    });
    setImg1start({
      src1: "",
      alt1: "",
    });
    setImg2start({
      src2: "",
      alt2: "",
    });
    setImg3start({
      src3: "",
      src3: "",
    });
  };
  console.log(dataValue);
  // post data
  // delete
  function deleteUser(id) {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      fetch(`${apiKey}api/category/deletecategorylist/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Token: `${BearerToken}`,
        },
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp.result);
          toast.success("Delete Successful");
        });
      });
      getList();
    }
  }

  function deleteUsers() {
    console.log(dataValue);
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
      fetch(`${apiKey}api/category/deletecategorylist/${dataValue}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Token: `${BearerToken}`,
        },
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp.result);
          toast.success("Delete Successful");
        });
      });
      getList();
    }
  }
  // delete end

  toast.configure();

  const handleDeleteImage = (id) => {
    fetch(`${apiKey}api/category/removeimage/${id}`, {
      method: "POST",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp.result);
        toast.success("Delete Successful");
      });
    });
    getList();
  };

  const checktopsell = () => {
    setIsChecked2(!isChecked2);
  };
  const checkfiltered = () => {
    setcheckfilter(!isCheckedFilter);
  };
  const checkfiltered1 = () => {
    setcheckfilter1(!isCheckedFilter1);
  };
  const checkcontentenable = () => {
    setiscetegary(!iscetegary);
  };
  const checkcontentenable1 = () => {
    setiscetegary1(!iscetegary1);
  };
  console.log(isChecked2);

  const checknewarrival = () => {
    setIsChecked(!isChecked);
  };
  console.log(isChecked);

  // const answerscheck = (e, ind) => {
  //   // e.preventDefault();
  //   console.log(e);
  //   for (let index = 0; index < questions.length; index++) {
  //     if (index === ind) {
  //       questions[index] = e;
  //     } else {
  //       const data2 = e;
  //       const res = questions.concat(data2);
  //       setquestions(res);
  //     }
  //   }
  // }

  function answerscheck(e, ind) {
    console.log(ind);
    console.log(e);
    for (let index = 0; index < questions.length; index++) {
      if (index === ind) {
        questions[index] = e;
      } else {
        // alert('hlo')
        // const data2 = e.target.value;
        // const res = questions.concat(data2);
        // setquestions(res);
      }
    }
  }

  function answerschecksecond(e, ind) {
    console.log(ind);
    for (let index = 0; index < answer.length; index++) {
      if (index === ind) {
        answer[index] = e;
      } else {
      }
    }
  }
  // var res2 = []
  const storedatafun = () => {
    console.log(count);
    if (count >= 0) {
      setStore(true);
    }
  };
  const checkdata = () => {
    console.log(questions);
    console.log(answer);
  };

  const answerscheck2 = (e, ind) => {
    console.log(ind);
    if (questions.length == 0) {
      const clone = [...questions];
      let obj = clone[0];
      obj = e;
      clone[0] = obj;
      setquestions(clone);
    } else {
      
      const d = ind+questions2.length
      console.log(d);
      const clone = [...questions];
      console.log(clone)
      console.log(ind+questions2.length)
      let obj = clone[d];
      obj = e;
      clone[d] = obj;
      if (storedata == true) {
        console.log(clone)
        setquestions(clone);
      }
    }
  };

  const answerscheck2second = (e, ind) => {
    if (answer.length == 0) {
      const clone = [...answer];
      let obj = clone[0];
      obj = e;
      clone[0] = obj;
      setAnswer(clone);
    } else {
      const d = ind+answer2.length
      const clone = [...answer];
      let obj = clone[d];
      obj = e;
      clone[d] = obj;
      if (storedata == true) {
        setAnswer(clone);
      }
    }
  };

  const deletefaq = (e, qus, ans, index) => {
    e.preventDefault();
    console.log(qus);
    console.log(index);
    const id = questions.indexOf(qus);
    const id2 = answer.indexOf(ans);
    const selecteditem = questions.splice(id, 1);
    const selecteditem2 = answer.splice(id2, 1);
    console.log("question select", selecteditem);
    console.log("answer select", selecteditem2);
    setquestions(questions);
    setAnswer(answer);
    console.log("question final", questions);
    console.log("answer", answer);
    getList();
  };

  // const deletefaqsecond = (e, ans, indexs) => {
  //   e.preventDefault();
  //   console.log(ans);
  //   console.log(indexs);
  //   const id = answer.indexOf(ans);
  //   const selecteditem = answer.splice(id, 1);
  //   console.log(selecteditem);
  //   setAnswer(answer)
  //   console.log(answer);
  // }
  const showquestion = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  const Addsubcategory = () => {
    setshowparent(true);
    // setshowsubmenu(false)
    setshowdesign(true);
    setDisabled(false);
    setShowInput(false);
    setshowroot(false);
    setcategoryimg([]);
    setcoverimage([]);
    setthumbnailimage([]);
    setlogoimage([]);
  };

  const countcheck = (e) => {
    e.preventDefault();
    setCount(count + 1);
    // setimageFields([]);
  };

  return (
    <Fragment>
      {/*<Breadcrumb title="Create Menu" parent="Menus" />*/}
      {/*<Container fluid={true}>*/}
      {loaderspage ? (
        <>
          <Checklogin />
          <div className="loader loader1"></div>
        </>
      ) : (
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Add Menu</h5>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation cate_tree" method="POST">
                  <div className="allbtns">
                    {showsubmenu && (
                      <Button
                        type="button"
                        className="pull-right btnsave addbtn"
                        onClick={Addsubcategory}
                        color="primary"
                        style={{ marginRight: "20px" }}
                      >
                        Add Sub-Category
                      </Button>
                    )}

                    <Button
                      type="submit"
                      onClick={PostData}
                      color="primary"
                      className="btnsave"
                    >
                      Save
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        deleteUsers();
                      }}
                      color="primary"
                      className="btnsave"
                    >
                      Delete
                    </Button>
                    {showroot && (
                      <Button
                        type="button"
                        className="pull-right btnsave addbtn"
                        onClick={() => {
                          setDataValue(0), Addroots();
                        }}
                        color="primary"
                      >
                        Add Root
                      </Button>
                    )}
                    <Button
                      type="button"
                      className="pull-right btnsave addbtn"
                      onClick={() => {
                        checkdata();
                      }}
                      color="primary"
                    >
                      test
                    </Button>
                  </div>

                  <div className="row g-3 cate_treeview">
                    {/* <p>
                                        {names}
                                    </p> */}
                    {loading ? (
                      <div className="col-md-3 cate_left">
                        <Col className="treeview_category">
                          <i className="fas fa-pen"></i>
                          {data.map((node, i) => {
                            const type = node.category;
                            const id = 0;
                            const label = (
                              <span
                                onClick={() => {
                                  setDataValue(node.objectID),
                                    handleEdit2(node.objectID);
                                }}
                                style={{ cursor: "pointer" }}
                                className="node"
                              >
                                <span
                                  key={i}
                                  onClick={() => changecolor(i)}
                                  className={`cate_parent_name ${
                                    activeIndex === i ? "active" : ""
                                  }`}
                                >
                                  {type}
                                </span>{" "}
                                <span className="category_icon">
                                  {/* <FiEdit3 onClick={() => handleEdit(node.objectID)} className="edit_icon" /> */}
                                  {/* <MdDeleteOutline className="delete_icon" onClick={() => { if (window.confirm('Are you Sure?')) deleteUser(node.objectID) }} /> */}
                                </span>
                              </span>
                            );
                            return (
                              <TreeView
                                key={type + "|" + i}
                                nodeLabel={label}
                                defaultCollapsed={true}
                              >
                                {node.nodes.map((person, index) => {
                                  const types = person.category;
                                  const label2 = (
                                    <span
                                      onClick={() => {
                                        setDataValue(person.objectID),
                                          handleEdit(person.objectID);
                                      }}
                                      style={{ cursor: "pointer" }}
                                      // className="node"
                                      className={`  ${
                                        dragAndDrop &&
                                        dragAndDrop.draggedTo === Number(index)
                                          ? "dropArea"
                                          : " "
                                      }`}
                                      data-position={index}
                                      key={index}
                                      draggable
                                      onDragStart={onDragStart}
                                      onDragOver={onDragOver}
                                      onDrop={onDrop}
                                      onDragLeave={onDragLeave}
                                    >
                                      <span
                                        key={index}
                                        onClick={() => changecolor2(index)}
                                        className={`cate_sub_name ${
                                          activeIndex2 === index ? "active" : ""
                                        }`}
                                      >
                                        {person.category}
                                      </span>
                                      <span className="category_icon">
                                        {/* <FiEdit3 onClick={() => handleEdit(person.objectID)} className="edit_icon" /> */}
                                        {/* <MdDeleteOutline className="delete_icon" onClick={() => { if (window.confirm('Are you Sure?')) deleteUser(person.objectID) }} /> */}
                                      </span>
                                    </span>
                                  );
                                  return (
                                    <TreeView
                                      nodeLabel={label2}
                                      key={person.category}
                                      defaultCollapsed={true}
                                    >
                                      {person.nodes.map((personss, index) => {
                                        const label3 = (
                                          <span
                                            onClick={() => {
                                              setDataValue(personss.objectID),
                                                handleEdit(personss.objectID);
                                            }}
                                            style={{ cursor: "pointer" }}
                                            className="node"
                                          >
                                            <span
                                              key={index}
                                              onClick={() =>
                                                changecolor3(index)
                                              }
                                              className={`cate_sub_name ${
                                                activeIndex3 === index
                                                  ? "active"
                                                  : ""
                                              }`}
                                            >
                                              {personss.category}
                                            </span>{" "}
                                            <span className="category_icon">
                                              {/* <FiEdit3 onClick={() => handleEdit(personss.objectID)} className="edit_icon" /> */}
                                              {/* <MdDeleteOutline className="delete_icon" onClick={() => { if (window.confirm('Are you Sure?')) deleteUser(personss.objectID) }} /> */}
                                            </span>
                                          </span>
                                        );

                                        return (
                                          <TreeView
                                            nodeLabel={label3}
                                            key={personss.category}
                                            defaultCollapsed={true}
                                          >
                                            {personss.nodes.map(
                                              (personsss, index) => {
                                                const label4 = (
                                                  <span
                                                    onClick={() => {
                                                      setDataValue(
                                                        personsss.objectID
                                                      ),
                                                        handleEdit(
                                                          personsss.objectID
                                                        );
                                                    }}
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                    className="node"
                                                  >
                                                    <span
                                                      key={index}
                                                      onClick={() =>
                                                        changecolor4(index)
                                                      }
                                                      className={`cate_sub_name ${
                                                        activeIndex4 === index
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                    >
                                                      {personsss.category}
                                                    </span>{" "}
                                                    <span className="category_icon">
                                                      {/* <FiEdit3 onClick={() => handleEdit(personsss.objectID)} className="edit_icon" /> */}
                                                      {/* <MdDeleteOutline className="delete_icon" onClick={() => { if (window.confirm('Are you Sure?')) deleteUser(personsss.objectID) }} /> */}
                                                    </span>
                                                  </span>
                                                );

                                                return (
                                                  <TreeView
                                                    nodeLabel={label4}
                                                    key={personsss.category}
                                                    defaultCollapsed={true}
                                                  >
                                                    {personsss.nodes.map(
                                                      (personsss4) => {
                                                        const label5 = (
                                                          <span
                                                            onClick={() =>
                                                              setDataValue(
                                                                personsss4.objectID
                                                              )
                                                            }
                                                            className="node"
                                                          >
                                                            <span className="cate_sub_name">
                                                              {
                                                                personsss4.category
                                                              }
                                                            </span>{" "}
                                                            <span className="category_icon">
                                                              {/* <FiEdit3 onClick={() => handleEdit(personsss4.objectID)} className="edit_icon" /> */}
                                                              {/* <MdDeleteOutline className="delete_icon" onClick={() => { if (window.confirm('Are you Sure?')) deleteUser(personsss4.objectID) }} /> */}
                                                            </span>
                                                          </span>
                                                        );

                                                        return (
                                                          <TreeView
                                                            nodeLabel={label5}
                                                            key={
                                                              personsss4.category
                                                            }
                                                            defaultCollapsed={
                                                              true
                                                            }
                                                          >
                                                            {personsss4.nodes.map(
                                                              (personsss5) => {
                                                                const label6 = (
                                                                  <span
                                                                    onClick={() =>
                                                                      setDataValue(
                                                                        personsss5.objectID
                                                                      )
                                                                    }
                                                                    className="node"
                                                                  >
                                                                    <span className="cate_sub_name">
                                                                      {
                                                                        personsss5.category
                                                                      }
                                                                    </span>{" "}
                                                                    <span className="category_icon">
                                                                      {/* <FiEdit3 onClick={() => handleEdit(personsss5.objectID)} className="edit_icon" /> */}
                                                                      {/* <MdDeleteOutline className="delete_icon" onClick={() => { if (window.confirm('Are you Sure?')) deleteUser(personsss5.objectID) }} /> */}
                                                                    </span>
                                                                  </span>
                                                                );

                                                                return (
                                                                  <TreeView
                                                                    nodeLabel={
                                                                      label6
                                                                    }
                                                                    key={
                                                                      personsss5.category
                                                                    }
                                                                    defaultCollapsed={
                                                                      true
                                                                    }
                                                                  >
                                                                    {personsss5.nodes.map(
                                                                      (
                                                                        personsss6
                                                                      ) => {
                                                                        const label7 =
                                                                          (
                                                                            <span
                                                                              onClick={() =>
                                                                                setDataValue(
                                                                                  personsss6.objectID
                                                                                )
                                                                              }
                                                                              className="node"
                                                                            >
                                                                              <span className="cate_sub_name">
                                                                                {
                                                                                  personsss6.category
                                                                                }
                                                                              </span>{" "}
                                                                              <span className="category_icon">
                                                                                <FiEdit3
                                                                                  onClick={() =>
                                                                                    handleEdit(
                                                                                      personsss6.objectID
                                                                                    )
                                                                                  }
                                                                                  className="edit_icon"
                                                                                />{" "}
                                                                                <MdDeleteOutline
                                                                                  className="delete_icon"
                                                                                  onClick={() => {
                                                                                    if (
                                                                                      window.confirm(
                                                                                        "Are you Sure?"
                                                                                      )
                                                                                    )
                                                                                      deleteUser(
                                                                                        person.objectID
                                                                                      );
                                                                                  }}
                                                                                />
                                                                              </span>
                                                                            </span>
                                                                          );

                                                                        return (
                                                                          <TreeView
                                                                            nodeLabel={
                                                                              label7
                                                                            }
                                                                            key={
                                                                              personsss6.category
                                                                            }
                                                                            defaultCollapsed={
                                                                              true
                                                                            }
                                                                          >
                                                                            {personsss6.nodes.map(
                                                                              (
                                                                                personsss7
                                                                              ) => {
                                                                                const label8 =
                                                                                  (
                                                                                    <span
                                                                                      onClick={() =>
                                                                                        setDataValue(
                                                                                          personsss7.objectID
                                                                                        )
                                                                                      }
                                                                                      className="node"
                                                                                    >
                                                                                      <span className="cate_sub_name">
                                                                                        {
                                                                                          personsss7.category
                                                                                        }
                                                                                      </span>{" "}
                                                                                      <span className="category_icon">
                                                                                        <FiEdit3
                                                                                          onClick={() =>
                                                                                            handleEdit(
                                                                                              personsss7.objectID
                                                                                            )
                                                                                          }
                                                                                          className="edit_icon"
                                                                                        />{" "}
                                                                                        <MdDeleteOutline
                                                                                          className="delete_icon"
                                                                                          onClick={() => {
                                                                                            if (
                                                                                              window.confirm(
                                                                                                "Are you Sure?"
                                                                                              )
                                                                                            )
                                                                                              deleteUser(
                                                                                                personsss7.objectID
                                                                                              );
                                                                                          }}
                                                                                        />
                                                                                      </span>
                                                                                    </span>
                                                                                  );

                                                                                return (
                                                                                  <TreeView
                                                                                    nodeLabel={
                                                                                      label8
                                                                                    }
                                                                                    key={
                                                                                      personsss7.category
                                                                                    }
                                                                                    defaultCollapsed={
                                                                                      true
                                                                                    }
                                                                                  >
                                                                                    {personsss7.nodes.map(
                                                                                      (
                                                                                        personsss8
                                                                                      ) => {
                                                                                        const label9 =
                                                                                          (
                                                                                            <span
                                                                                              onClick={() =>
                                                                                                setDataValue(
                                                                                                  personsss8.objectID
                                                                                                )
                                                                                              }
                                                                                              className="node"
                                                                                            >
                                                                                              <span className="cate_sub_name">
                                                                                                {
                                                                                                  personsss8.category
                                                                                                }
                                                                                              </span>{" "}
                                                                                              <span className="category_icon">
                                                                                                <FiEdit3
                                                                                                  onClick={() =>
                                                                                                    handleEdit(
                                                                                                      personsss8.objectID
                                                                                                    )
                                                                                                  }
                                                                                                  className="edit_icon"
                                                                                                />{" "}
                                                                                                <MdDeleteOutline
                                                                                                  className="delete_icon"
                                                                                                  onClick={() => {
                                                                                                    if (
                                                                                                      window.confirm(
                                                                                                        "Are you Sure?"
                                                                                                      )
                                                                                                    )
                                                                                                      deleteUser(
                                                                                                        personsss8.objectID
                                                                                                      );
                                                                                                  }}
                                                                                                />
                                                                                              </span>
                                                                                            </span>
                                                                                          );

                                                                                        return (
                                                                                          <TreeView
                                                                                            nodeLabel={
                                                                                              label9
                                                                                            }
                                                                                            key={
                                                                                              personsss8.category
                                                                                            }
                                                                                            defaultCollapsed={
                                                                                              true
                                                                                            }
                                                                                          >
                                                                                            {personsss8.nodes.map(
                                                                                              (
                                                                                                personsss9
                                                                                              ) => {
                                                                                                const label10 =
                                                                                                  (
                                                                                                    <span
                                                                                                      onClick={() =>
                                                                                                        setDataValue(
                                                                                                          personsss9.objectID
                                                                                                        )
                                                                                                      }
                                                                                                      className="node"
                                                                                                    >
                                                                                                      <span className="cate_sub_name">
                                                                                                        {
                                                                                                          personsss9.category
                                                                                                        }
                                                                                                      </span>{" "}
                                                                                                      <span className="category_icon">
                                                                                                        <FiEdit3
                                                                                                          onClick={() =>
                                                                                                            handleEdit(
                                                                                                              personsss9.objectID
                                                                                                            )
                                                                                                          }
                                                                                                          className="edit_icon"
                                                                                                        />{" "}
                                                                                                        <MdDeleteOutline
                                                                                                          className="delete_icon"
                                                                                                          onClick={() => {
                                                                                                            if (
                                                                                                              window.confirm(
                                                                                                                "Are you Sure?"
                                                                                                              )
                                                                                                            )
                                                                                                              deleteUser(
                                                                                                                personsss9.objectID
                                                                                                              );
                                                                                                          }}
                                                                                                        />
                                                                                                      </span>
                                                                                                    </span>
                                                                                                  );

                                                                                                return (
                                                                                                  <TreeView
                                                                                                    nodeLabel={
                                                                                                      label10
                                                                                                    }
                                                                                                    key={
                                                                                                      personsss9.category
                                                                                                    }
                                                                                                    defaultCollapsed={
                                                                                                      true
                                                                                                    }
                                                                                                  ></TreeView>
                                                                                                );
                                                                                              }
                                                                                            )}
                                                                                          </TreeView>
                                                                                        );
                                                                                      }
                                                                                    )}
                                                                                  </TreeView>
                                                                                );
                                                                              }
                                                                            )}
                                                                          </TreeView>
                                                                        );
                                                                      }
                                                                    )}
                                                                  </TreeView>
                                                                );
                                                              }
                                                            )}
                                                          </TreeView>
                                                        );
                                                      }
                                                    )}
                                                  </TreeView>
                                                );
                                              }
                                            )}
                                          </TreeView>
                                        );
                                      })}
                                    </TreeView>
                                  );
                                })}
                              </TreeView>
                            );
                          })}
                        </Col>
                      </div>
                    ) : (
                      <h6>Loading...</h6>
                    )}

                    <div className="col-md-9 cate_right ">
                      <div className="vl"></div>
                      {namecategorytoggle && (
                        <h3 className="namecategory">{names}</h3>
                      )}

                      {showparent && (
                        <>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              Enable Category
                            </Label>
                            <div className="categoryforminput">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={checkcontentenable1}
                                  checked={iscetegary1}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>

                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              <span>*</span>Category Name
                            </Label>
                            <div className="categoryforminput">
                              <Input
                                className="form-control col-md-12"
                                id="validationCustom0"
                                type="text"
                                required=""
                                onChange={(e) => setName(e.target.value)}
                                defaultValue=""
                                name="name"
                                // disabled={disabled}
                              />
                            </div>
                          </div>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              Is Filters?
                            </Label>
                            <div className="categoryforminput">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={checkfiltered1}
                                  checked={isCheckedFilter1}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </>
                      )}

                      {showdesign && (
                        <>
                          {isCheckedFilter1 ? (
                            ""
                          ) : (
                            <>
                              <div className="toogles" onClick={toggle}>
                                <h2 className="showinputss">Design</h2>
                                <KeyboardArrowDownIcon />
                              </div>

                              <div
                                className={`flexdiv ${
                                  isOpened ? "active" : ""
                                }`}
                              >
                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Category Image
                                  </Label>
                                  <div className="uploadbtn">
                                    <label className="custom-file-upload">
                                      {/* <CameraAltIcon /> */}
                                      {/* <input type="file" onChange={uploadfiles} /> */}
                                      {/* <button className="thumbnailbtn"> */}
                                      <div className="thumbnailbtn">Upload</div>
                                      {/* </button> */}
                                      {/* Upload Category Thumblinimage */}
                                      <input
                                        type="file"
                                        onChange={handleImagestart}
                                        className="inputdisplay"
                                      />
                                    </label>
                                  </div>
                                  {/* <Button color="primary" className="cate_image_upload" >
                                                <input type="file" onChange={handleImage} />
                                            </Button> */}
                                  {uploadcategoryimg.length > 0 ? (
                                    <div className="profileimage">
                                      {/* <Image
                                                src={uploadcategoryimg}
                                                alt="Not-Found"
                                                width={1000}
                                                height={400}
                                            /> */}
                                      <img src={uploadcategoryimg} alt="noss" />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Cover Image
                                  </Label>

                                  <div className="uploadbtn">
                                    <label className="custom-file-upload">
                                      {/* <CameraAltIcon /> */}
                                      {/* <input type="file" onChange={uploadfiles} /> */}
                                      {/* <button className="thumbnailbtn"> */}
                                      <div className="thumbnailbtn">Upload</div>
                                      {/* </button> */}
                                      {/* Upload Category Thumblinimage */}
                                      <input
                                        type="file"
                                        onChange={handleImage1start}
                                        className="inputdisplay"
                                      />
                                    </label>
                                  </div>
                                  {/* <Button color="primary" className="cate_image_upload" >
                                                Upload Cover Image
                                                <input type="file" onChange={handleImage1} />
                                            </Button> */}
                                  {uploadcoverimag.length > 0 ? (
                                    <div className="profileimage">
                                      {/* <Image
                                                src={uploadcategoryimg}
                                                alt="Not-Found"
                                                width={1000}
                                                height={400}
                                            /> */}
                                      <img src={uploadcoverimag} alt="noss" />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Category Logo
                                  </Label>
                                  <div className="uploadbtn">
                                    <label className="custom-file-upload">
                                      {/* <CameraAltIcon /> */}
                                      {/* <input type="file" onChange={uploadfiles} /> */}
                                      {/* <button className="thumbnailbtn"> */}
                                      <div className="thumbnailbtn">Upload</div>
                                      {/* </button> */}
                                      {/* Upload Category Thumblinimage */}
                                      <input
                                        type="file"
                                        onChange={handleImage2start}
                                        className="inputdisplay"
                                      />
                                    </label>
                                  </div>
                                  {/* <Button color="primary" className="cate_image_upload" >
                                                Upload Category Logo
                                                <input type="file" onChange={handleImage2} />
                                            </Button> */}
                                  {uploadlogo.length > 0 ? (
                                    <div className="profileimage">
                                      {/* <Image
                                                src={uploadcategoryimg}
                                                alt="Not-Found"
                                                width={1000}
                                                height={400}
                                            /> */}
                                      <img src={uploadlogo} alt="noss" />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Admin Thumbnail Image
                                  </Label>
                                  {/* <Button color="primary" className="cate_image_upload" > */}
                                  <div className="uploadbtn">
                                    <label className="custom-file-upload">
                                      {/* <CameraAltIcon /> */}
                                      {/* <input type="file" onChange={uploadfiles} /> */}
                                      {/* <button className="thumbnailbtn"> */}
                                      <div className="thumbnailbtn">Upload</div>
                                      {/* </button> */}
                                      {/* Upload Category Thumblinimage */}
                                      <input
                                        type="file"
                                        onChange={handleImage3start}
                                        className="inputdisplay"
                                      />
                                    </label>
                                  </div>
                                  {/* </Button> */}
                                  {uploadthumbnail.length > 0 ? (
                                    <div className="profileimage">
                                      {/* <Image
                                                src={uploadcategoryimg}
                                                alt="Not-Found"
                                                width={1000}
                                                height={400}
                                            /> */}
                                      <img src={uploadthumbnail} alt="noss" />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Image Background Color
                                  </Label>
                                  <div className="categoryforminput">
                                    <Input
                                      className="form-control col-md-12"
                                      id="validationCustom0"
                                      type="text"
                                      required=""
                                      onChange={(e) => Setcolor(e.target.value)}
                                      defaultValue=""
                                      name="name"
                                      // disabled={disabled}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="toogles" onClick={toggle3}>
                                <h2 className="showinputss">SEO</h2>
                                <KeyboardArrowDownIcon />
                              </div>
                              <div
                                className={`flexdiv ${
                                  isOpened3 ? "active" : ""
                                }`}
                              >
                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Meta Url
                                  </Label>
                                  <div className="categoryforminput">
                                    <input
                                      className="form-control col-md-12"
                                      id="validationCustom0"
                                      type="text"
                                      required=""
                                      onChange={(e) =>
                                        setmetaurl1(e.target.value)
                                      }
                                      defaultValue=""
                                      name="name"
                                      // disabled={disabled}
                                    />
                                  </div>
                                </div>
                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Meta Description
                                  </Label>
                                  <div className="categoryforminput">
                                    <Input
                                      className="form-control col-md-12"
                                      id="validationCustom0"
                                      type="text"
                                      required=""
                                      onChange={(e) =>
                                        setmetadescription1(e.target.value)
                                      }
                                      defaultValue=""
                                      name="name"
                                      // disabled={disabled}
                                    />
                                  </div>
                                </div>
                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Meta Keyword
                                  </Label>
                                  <div className="categoryforminput">
                                    <Input
                                      className="form-control col-md-12"
                                      id="validationCustom0"
                                      type="text"
                                      required=""
                                      onChange={(e) =>
                                        setmetakeyowrd1(e.target.value)
                                      }
                                      defaultValue=""
                                      name="name"
                                      // disabled={disabled}
                                    />
                                  </div>
                                </div>
                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Meta Title
                                  </Label>
                                  <div className="categoryforminput">
                                    <Input
                                      className="form-control col-md-12"
                                      id="validationCustom0"
                                      type="text"
                                      required=""
                                      onChange={(e) =>
                                        setmetatitle1(e.target.value)
                                      }
                                      defaultValue=""
                                      name="name"
                                      // disabled={disabled}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="toogles" onClick={toggle6}>
                                <h2 className="showinputss">
                                  Category Content
                                </h2>
                                <KeyboardArrowDownIcon />
                              </div>
                              <div
                                className={`flexdiv ${
                                  isOpened6 ? "active" : ""
                                }`}
                              >
                                <div className="right_input new_category">
                                  <Label className="col-xl-3 col-md-4">
                                    <span>*</span>Category Contents
                                  </Label>
                                  <div className="categoryforminput_text">
                                    <Editor
                                      config={config2}
                                      value={editorStatedatas}
                                      onChange={(c) => {
                                        setEditorStateDatas(c);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                      {showInput && (
                        <>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              Enable Category
                            </Label>
                            <div className="categoryforminput">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={checkcontentenable}
                                  checked={iscetegary}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              Is Filter?
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
                          <div className="right_input">
                            <Label className="col-xl-2 col-md-4">
                              <span>*</span>Category Names
                            </Label>
                            <input
                              className="form-control col-md-12"
                              id="validationCustom0"
                              type="text"
                              required=""
                              value={names}
                              onChange={(e) => setEditName(e.target.value)}
                              name="name"
                            />
                          </div>
                          <>
                            {isCheckedFilter ? (
                              ""
                            ) : (
                              <>
                                <div className="toogles" onClick={toggle2}>
                                  <h2 className="showinputss">Designs</h2>
                                  <div>
                                    <KeyboardArrowDownIcon />
                                  </div>
                                </div>

                                <div
                                  className={`flexdiv ${
                                    isOpened2 ? "active" : ""
                                  }`}
                                >
                                  <div
                                    className="cate_edit cate_right_container"
                                    style={{ marginTop: "1rem" }}
                                  >
                                    <div className="right_input new_category">
                                      <Label className="col-xl-3 col-md-4">
                                        <span>*</span>Top Selling
                                      </Label>
                                      <div className="categoryforminput">
                                        <label className="switch">
                                          <input
                                            type="checkbox"
                                            onChange={checktopsell}
                                            checked={isChecked2}
                                          />
                                          <span className="slider round"></span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="right_input new_category">
                                      <Label className="col-xl-3 col-md-4">
                                        <span>*</span>New Arrival
                                      </Label>
                                      <div className="categoryforminput">
                                        <label className="switch">
                                          <input
                                            type="checkbox"
                                            onChange={checknewarrival}
                                            checked={isChecked}
                                          />
                                          <span className="slider round"></span>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="right_input">
                                      <Label className="col-xl-6 col-md-4">
                                        <span>*</span>Category Thumbnail Image
                                      </Label>
                                      <div className="image_container">
                                        <div className="category_images">
                                          {/* {dataEdit.image ? (
                                      <img src={noImage} alt="default Image" />
                                    ) : ( */}
                                          <div className="defaultimg">
                                            {src ? (
                                              <img src={src} alt="bhiii" />
                                            ) : (
                                              <img
                                                src={
                                                  dataEdit.categoryimage
                                                    ? dataEdit.categoryimage
                                                    : null
                                                }
                                                alt="sdwd"
                                              />
                                            )}
                                          </div>
                                          {/* )} */}
                                          <p>Update Category Thumbnail Image</p>
                                          <p>200X200</p>

                                          {/* <input type="file" onChange={handleImage} /> */}
                                          <div className="uploadbtn">
                                            <label className="custom-file-upload">
                                              {/* <CameraAltIcon /> */}
                                              {/* <input type="file" onChange={uploadfiles} /> */}
                                              {/* <button className="thumbnailbtn"> */}
                                              <div className="thumbnailbtn btn2">
                                                Upload
                                              </div>
                                              {/* </button> */}
                                              {/* Upload Category Thumblinimage */}
                                              <input
                                                type="file"
                                                onChange={handleImage}
                                                className="inputdisplay"
                                              />
                                            </label>
                                          </div>
                                          <div className="linebreak"></div>
                                          <Label className="col-xl-2 col-md-4">
                                            <span>*</span>Cover Image
                                          </Label>
                                          {dataEdit.image ? (
                                            <img
                                              src={noImage}
                                              alt="default Image"
                                            />
                                          ) : (
                                            <div className=" coverdefault">
                                              {src1 ? (
                                                <img src={src1} alt={alt1} />
                                              ) : (
                                                <img
                                                  src={
                                                    dataEdit.coverimage
                                                      ? dataEdit.coverimage
                                                      : null
                                                  }
                                                  alt=""
                                                />
                                              )}
                                            </div>
                                          )}
                                          <p>Update Cover Image</p>
                                          <p>200X200</p>

                                          {/* <input type="file" onChange={handleImage1} /> */}
                                          <div className="uploadbtn">
                                            <label className="custom-file-upload">
                                              {/* <CameraAltIcon /> */}
                                              {/* <input type="file" onChange={uploadfiles} /> */}
                                              {/* <button className="thumbnailbtn"> */}
                                              <div className="thumbnailbtn btn2">
                                                Upload
                                              </div>
                                              {/* </button> */}
                                              {/* Upload Category Thumblinimage */}
                                              <input
                                                type="file"
                                                onChange={handleImage1}
                                                className="inputdisplay"
                                              />
                                            </label>
                                          </div>
                                          <div className="linebreak"></div>
                                          <Label className="col-xl-2 col-md-4">
                                            <span>*</span>Category Logo
                                          </Label>

                                          {dataEdit.image ? (
                                            <img
                                              src={noImage}
                                              alt="default Image"
                                            />
                                          ) : (
                                            <div className="defaultimg">
                                              {src2 ? (
                                                <img src={src2} alt={alt2} />
                                              ) : (
                                                <img
                                                  src={
                                                    dataEdit.categorylogo
                                                      ? dataEdit.categorylogo
                                                      : null
                                                  }
                                                  alt=""
                                                />
                                              )}
                                            </div>
                                          )}
                                          <p>Udate Category Logo</p>
                                          <p>200X200</p>

                                          {/* <input type="file" onChange={handleImage2} /> */}
                                          <div className="uploadbtn">
                                            <label className="custom-file-upload">
                                              {/* <CameraAltIcon /> */}
                                              {/* <input type="file" onChange={uploadfiles} /> */}
                                              {/* <button className="thumbnailbtn"> */}
                                              <div className="thumbnailbtn btn2">
                                                Upload
                                              </div>
                                              {/* </button> */}
                                              {/* Upload Category Thumblinimage */}
                                              <input
                                                type="file"
                                                onChange={handleImage2}
                                                className="inputdisplay"
                                              />
                                            </label>
                                          </div>
                                          <div className="linebreak"></div>
                                          <Label className="col-xl-6 col-md-4">
                                            <span>*</span>Category Thumbnail
                                          </Label>

                                          {dataEdit.image ? (
                                            <img
                                              src={noImage}
                                              alt="default Image"
                                            />
                                          ) : (
                                            <div className="defaultimg">
                                              {src3 ? (
                                                <img src={src3} alt={alt3} />
                                              ) : (
                                                <img
                                                  src={
                                                    dataEdit.categorythumblinimage
                                                      ? dataEdit.categorythumblinimage
                                                      : null
                                                  }
                                                  alt=""
                                                />
                                              )}
                                            </div>
                                          )}
                                          <p>Udate Category Thumbnails</p>
                                          <p>200X200</p>

                                          {/* <input type="file" onChange={handleImage3} /> */}
                                          <div className="uploadbtn">
                                            <label className="custom-file-upload">
                                              {/* <CameraAltIcon /> */}
                                              {/* <input type="file" onChange={uploadfiles} /> */}
                                              {/* <button className="thumbnailbtn"> */}
                                              <div className="thumbnailbtn btn2">
                                                Upload
                                              </div>
                                              {/* </button> */}
                                              {/* Upload Category Thumblinimage */}
                                              <input
                                                type="file"
                                                onChange={handleImage3}
                                                className="inputdisplay"
                                              />
                                            </label>
                                          </div>
                                          <div className="linebreak"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="toogles" onClick={toggle4}>
                                  <h2 className="showinputss"> SEO</h2>
                                  <KeyboardArrowDownIcon />
                                </div>

                                <div
                                  className={`flexdiv ${
                                    isOpened4 ? "active" : ""
                                  }`}
                                >
                                  <div className="right_input new_category">
                                    <Label className="col-xl-3 col-md-4">
                                      <span>*</span>Meta Urls
                                    </Label>
                                    <div className="categoryforminput">
                                      <input
                                        className="form-control col-md-12"
                                        id="validationCustom0"
                                        type="text"
                                        required=""
                                        onChange={(e) =>
                                          setmetaurl(e.target.value)
                                        }
                                        value={metaurl}
                                        name="metaurl"
                                        // disabled={disabled}
                                      />
                                    </div>
                                  </div>
                                  <div className="right_input new_category">
                                    <Label className="col-xl-3 col-md-4">
                                      <span>*</span>Meta Descriptions
                                    </Label>
                                    <div className="categoryforminput">
                                      <input
                                        className="form-control col-md-12"
                                        id="validationCustom0"
                                        type="text"
                                        required=""
                                        onChange={(e) =>
                                          setmetadescription(e.target.value)
                                        }
                                        value={metadescription}
                                        name="description"
                                        // disabled={disabled}
                                      />
                                    </div>
                                  </div>
                                  <div className="right_input new_category">
                                    <Label className="col-xl-3 col-md-4">
                                      <span>*</span>Meta Keywords
                                    </Label>
                                    <div className="categoryforminput">
                                      <input
                                        className="form-control col-md-12"
                                        id="validationCustom0"
                                        type="text"
                                        required=""
                                        onChange={(e) =>
                                          setmetakeyowrd(e.target.value)
                                        }
                                        value={metakeyword}
                                        name="keyword"
                                        // disabled={disabled}
                                      />
                                    </div>
                                  </div>
                                  <div className="right_input new_category">
                                    <Label className="col-xl-3 col-md-4">
                                      <span>*</span>Meta Titles
                                    </Label>
                                    <div className="categoryforminput">
                                      <input
                                        className="form-control col-md-12"
                                        id="validationCustom0"
                                        type="text"
                                        required=""
                                        onChange={(e) =>
                                          setmetatitle(e.target.value)
                                        }
                                        value={metatitle}
                                        name="metatitle"
                                        // disabled={disabled}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="toogles" onClick={toggle5}>
                                  <h2 className="showinputss">FAQ</h2>
                                  <KeyboardArrowDownIcon />
                                </div>
                                <div
                                  className={`flexdiv ${
                                    isOpened5 ? "active" : ""
                                  }`}
                                >
                                  {questions2.length > 0
                                    ? questions2.map((qus, index) => (
                                        <>
                                          {answer2.map((ans, indexs) => (
                                            <>
                                              {index === indexs ? (
                                                <>
                                                  <div className="outerfaqdiv">
                                                    <p className="faq_para_style">
                                                      Questions :
                                                    </p>
                                                    <div
                                                      style={{ width: "65%" }}
                                                    >
                                                      <Editor
                                                        config={config2}
                                                        value={qus}
                                                        onChange={(e) => {
                                                          answerscheck(
                                                            e,
                                                            index
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                    <div
                                                      className="deletefaqbtn"
                                                      onClick={(e) => {
                                                        deletefaq(
                                                          e,
                                                          qus,
                                                          ans,
                                                          index
                                                        );
                                                      }}
                                                    >
                                                      <DeleteForeverIcon />
                                                    </div>
                                                  </div>
                                                  {/* <button >Delete</button> */}
                                                  <div className="outerfaqdiv">
                                                    <p className="faq_para_style">
                                                      Anwser :
                                                    </p>
                                                    <div
                                                      style={{ width: "65%" }}
                                                    >
                                                      <Editor
                                                        config={config2}
                                                        value={ans}
                                                        onChange={(e) => {
                                                          answerschecksecond(
                                                            e,
                                                            indexs
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="linebreak">
                                                    <hr />
                                                  </div>
                                                  {/* <button onClick={(e) => { deletefaqsecond(e, ans, indexs) }}>Delete</button> */}
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          ))}
                                        </>
                                      ))
                                    : ""}

                                  {[...Array(count)].map((_, index) => (
                                    <div key={index}>
                                      <div className="outerfaqdiv">
                                        <p className="faq_para_style">
                                          Questionsss:
                                        </p>
                                        <div style={{ width: "65%" }}>
                                          <Editor
                                            config={config2}
                                            value=""
                                            onChange={(e) => {
                                              answerscheck2(e, index);
                                            }}
                                          />
                                        </div>
                                      </div>

                                      <div className="outerfaqdiv">
                                        <p className="faq_para_style">
                                          Answer :
                                        </p>
                                        <div style={{ width: "65%" }}>
                                          <Editor
                                            config={config2}
                                            value=""
                                            onChange={(e) => {
                                              answerscheck2second(e, index);
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="linebreak">
                                        <hr />
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    className="addfeesbtn"
                                    onClick={(e) => {
                                      storedatafun(), showquestion(e);
                                    }}
                                  >
                                    Add FAQ
                                  </button>
                                </div>

                                <div className="toogles" onClick={toggle6}>
                                  <h2 className="showinputss">
                                    Category Content
                                  </h2>
                                  <KeyboardArrowDownIcon />
                                </div>
                                <div
                                  className={`flexdiv ${
                                    isOpened6 ? "active" : ""
                                  }`}
                                >
                                  <div className="right_input new_category">
                                    <Label className="col-xl-3 col-md-4">
                                      <span>*</span>Category Content
                                    </Label>
                                    <div className="categoryforminput_text">
                                      <Editor
                                        config={config2}
                                        value={editorStatedatas1}
                                        onChange={(c) => {
                                          setEditorStateDatas1(c);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            <div className="delete_button">
                              <Button
                                type="button"
                                color="primary"
                                onClick={() => handleDeleteImage(dataEdit._id)}
                              >
                                Delete Image
                              </Button>

                              <Button
                                type="button"
                                style={{ marginLeft: "1rem" }}
                                color="primary"
                                onClick={() => updateUser(dataEdit._id)}
                              >
                                Update
                              </Button>
                            </div>
                          </>
                        </>
                      )}
                    </div>
                  </div>
                  {/* <div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Parent ID
										</Label>
										<Input
											className="form-control col-md-8"
											id="validationCustom0"
											type="text"
											required=""
											onChange={handleInputs}
											value={user.pid}
											name="pid"
										/>
									</div> */}
                  {/* <div className="form-group row">
										<Label className="col-xl-3 col-md-4">Status</Label>
										<div className=" col-xl-9 col-md-8 checkbox-space">
											<Label className="d-block">
												<Input
													className="checkbox_animated"
													id="chk-ani2"
													type="checkbox"
													onChange={handleInputs}
													value="checked"
													name="checkbox"
												/>
												Enable the Coupon
											</Label>
										</div>
									</div> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {/*</Container>*/}
    </Fragment>
  );
};

const text = (token) => {
  if (!token) {
  } else {
    Create_menu.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  }
};

export default Create_menu;
