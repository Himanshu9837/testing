// import React from 'react'
import React, { useEffect, useState, useRef, useContext } from "react";
import GroupIcon from "@mui/icons-material/Group";
import InputEmoji from "react-input-emoji";
import Meassage from "./Messages.js";

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import Leftchat from "../Leftchat/Leftchat.js";
import DoneIcon from "@mui/icons-material/Done";
import Navbar from "../Navbar2/Navbarhome.js";
import testing from "../Navbar2/Navbarhome";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Contextapi from "../../../Context/Contextapi.js";
import {
  sendMessageRoute,
  recieveMessageRoute,
  addmychat,
} from "../Chattest/APIRoutes.js";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import animationData from "./typing.json";
import io from "socket.io-client";
import axios from "axios";
import Lottie from "react-lottie";

// var EmojiMartPicker = require('emoji-mart-picker');

const Centerchat = ({ currentChat, socket, changeChat }) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { setcheckfalse, checkfalse, setnotify, notify, setchatback, setrightchatback } = useContext(Contextapi);
  
  

  
  const scrollRef = useRef(null);
  const [text, setText] = useState("");
  const [buttonclicked, setbuttonclicked] = useState(false)
  const [show, setshow] = useState(false)
  const [showmsg, setshowmsg] = useState([]);
  // const [showdiv, setshowdiv] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [count, setCount] = useState(false);
  const [count1, setCount1] = useState(0);
  const [uploads, setupload] = useState([]);
  const [notification, setNotification] = useState([]);
  const [coverimage, setCoverimage] = useState([]);
  const [showuploadbox, setshowuploadbox] = useState(false);

  const [notifications, setnotifications] = useState([]);

  const [userid, setuserid] = useState("");


  const [showsimages, setshowsimages] = useState([])

  const [userImages, setuserImages] = useState("");
  const ENDPOINT = apiKey;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(async () => {
    const token = localStorage.getItem("user");
    const d = token !== null ? JSON.parse(token) : [];
    const cart_datas = d.tokenData.id;
    const response = await axios.post(recieveMessageRoute, {
      from: cart_datas,
      to: currentChat._id,
    });
   
    setshowmsg(response.data);
    setuserid(cart_datas);
    scrollToBottom();
  }, [currentChat]);
  
  useEffect(() => {
    const token = localStorage.getItem("user");
    const d = token !== null ? JSON.parse(token) : [];
    const cart_datas = d.tokenData.id;

    // socket.current.emit("setup", cart_datas);
    socket.current = io(ENDPOINT);
    socket.current.emit("add-user", cart_datas);
    socket.current.on("connected", () => setSocketConnected(true));
    socket.current.emit("join chat", currentChat._id);
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));
    scrollToBottom();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("user")).id;
      }
    };
    getCurrentChat();
    scrollToBottom();
  }, [currentChat]);

  const handleChange = (e) => {
    
    setText(e.target.value)
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleOnEnter(text)
    setText("");
  }
  const handleOnSend = async (event) => {
   
    if (coverimage.length === 0) {
      // if (text.length > 0) {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: userid,
        text,
      });
      socket.current.emit("stop typing", userid);
      const data = {
        from: userid,
        to: currentChat._id,
        message: text,
      };
      const formData = new FormData();
      for (let j = 0; j < coverimage.length; j++) {
        formData.append("chatimage", coverimage[j]);
        // formData.append("chatimage", coverimage);
      }
      // formData.append("chatimage", coverimage);
      formData.append("from", userid);
      formData.append("to", currentChat._id);
      formData.append("message", text);
      // await axios.post(sendMessageRoute, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Content-Type": "multipart/form-data",
      //     Authorization: "JWT fefege...",
      //   },
      //   from: userid,
      //   to: currentChat._id,
      //   message: text,
      //   // chatimage: coverimage,
      //   formData
      // });
      const response = await axios({
        method: "post",
        url: sendMessageRoute,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await axios.post(addmychat, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT fefege...",
        },
        from: userid,
        to: currentChat._id,
      });

      const msgs = [...showmsg];
      msgs.push({ fromSelf: true, message: text });
      setshowmsg(msgs);
      scrollToBottom();
      // hello();

      setCoverimage([])
      setshowsimages([])
      setshowuploadbox(false);
      // notificationss()
      // }
      setText("");
    }

    else {

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: userid,
        // text,
      });
      socket.current.emit("stop typing", userid);
      const data = {
        from: userid,
        to: currentChat._id,
        // message: coverimage,
      };
      const formData = new FormData();
      for (let j = 0; j < coverimage.length; j++) {
        formData.append("chatimage", coverimage[j]);
        // formData.append("chatimage", coverimage);
      }
      // formData.append("chatimage", coverimage);
      formData.append("from", userid);
      formData.append("to", currentChat._id);
      formData.append("message", text);
      // await axios.post(sendMessageRoute, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Content-Type": "multipart/form-data",
      //     Authorization: "JWT fefege...",
      //   },
      //   from: userid,
      //   to: currentChat._id,
      //   message: text,
      //   // chatimage: coverimage,
      //   formData
      // });
      const response = await axios({
        method: "post",
        url: sendMessageRoute,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await axios.post(addmychat, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT fefege...",
        },
        from: userid,
        to: currentChat._id,
      });

      const msgs = [...showmsg];
      msgs.push({ fromSelf: true, message: text });
      setshowmsg(msgs);
      scrollToBottom();
      // hello();

      setCoverimage([])
      setshowsimages([])
      setshowuploadbox(false);
      const token = localStorage.getItem("user");
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
      const responses = await axios.post(recieveMessageRoute, {
        from: cart_datas,
        to: currentChat._id,
      });
   
      setshowmsg(responses.data);
    }
  }


  const handleOnEnter2 = async (text) => {
  
    if (coverimage.length === 0) {
      // if (text.length > 0) {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: userid,
        text,
      });
      socket.current.emit("stop typing", userid);
      const data = {
        from: userid,
        to: currentChat._id,
        message: text,
      };
      const formData = new FormData();
      for (let j = 0; j < coverimage.length; j++) {
        formData.append("chatimage", coverimage[j]);
      }
      // formData.append("chatimage", coverimage);
      formData.append("from", userid);
      formData.append("to", currentChat._id);
      formData.append("message", text);
      // await axios.post(sendMessageRoute, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Content-Type": "multipart/form-data",
      //     Authorization: "JWT fefege...",
      //   },
      //   from: userid,
      //   to: currentChat._id,
      //   message: text,
      //   // chatimage: coverimage,
      //   formData
      // });
      const response = await axios({
        method: "post",
        url: sendMessageRoute,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await axios.post(addmychat, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT fefege...",
        },
        from: userid,
        to: currentChat._id,
      });

      const msgs = [...showmsg];
      msgs.push({ fromSelf: true, message: text });
      setshowmsg(msgs);
      scrollToBottom();
      // hello();
      setCoverimage([])
      setshowsimages([])
      setshowuploadbox(false);
      // notificationss()
      // }
    }

    else {
    
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: userid,
        // text,
      });
      socket.current.emit("stop typing", userid);
      const data = {
        from: userid,
        to: currentChat._id,
        // message: coverimage,
      };
      const formData = new FormData();
      // for (let j = 0; j < coverimage.length; j++) {
      formData.append("chatimage", coverimage[0]);
      // }
      // formData.append("chatimage", coverimage);
      formData.append("from", userid);
      formData.append("to", currentChat._id);
      formData.append("message", text);
      // await axios.post(sendMessageRoute, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Content-Type": "multipart/form-data",
      //     Authorization: "JWT fefege...",
      //   },
      //   from: userid,
      //   to: currentChat._id,
      //   message: text,
      //   // chatimage: coverimage,
      //   formData
      // });
      const response = await axios({
        method: "post",
        url: sendMessageRoute,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await axios.post(addmychat, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT fefege...",
        },
        from: userid,
        to: currentChat._id,
      });

      const msgs = [...showmsg];
      msgs.push({ fromSelf: true, message: text });
      setshowmsg(msgs);
      scrollToBottom();
      // hello();
      setCoverimage([])

      setshowsimages([])
      setshowuploadbox(false);
      const token = localStorage.getItem("user");
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
      const responses = await axios.post(recieveMessageRoute, {
        from: cart_datas,
        to: currentChat._id,
      });
    
      setshowmsg(responses.data);

    }
    // }
  };


  // const handleOnEnter = async (event) => {
  //   if (event.key === 'Enter') {
  //     
  //     if (coverimage.length === 0) {
  //       // if (text.length > 0) {
  //       socket.current.emit("send-msg", {
  //         to: currentChat._id,
  //         from: userid,
  //         text,
  //       });
  //       socket.current.emit("stop typing", userid);
  //       const data = {
  //         from: userid,
  //         to: currentChat._id,
  //         message: text,
  //       };
  //       const formData = new FormData();
  //       for (let j = 0; j < coverimage.length; j++) {
  //         formData.append("chatimage", coverimage[j]);
  //       }
  //       // formData.append("chatimage", coverimage);
  //       formData.append("from", userid);
  //       formData.append("to", currentChat._id);
  //       formData.append("message", text);
  //       // await axios.post(sendMessageRoute, {
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     "Content-Type": "multipart/form-data",
  //       //     Authorization: "JWT fefege...",
  //       //   },
  //       //   from: userid,
  //       //   to: currentChat._id,
  //       //   message: text,
  //       //   // chatimage: coverimage,
  //       //   formData
  //       // });
  //       const response = await axios({
  //         method: "post",
  //         url: sendMessageRoute,
  //         data: formData,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });

  //       await axios.post(addmychat, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "JWT fefege...",
  //         },
  //         from: userid,
  //         to: currentChat._id,
  //       });

  //       const msgs = [...showmsg];
  //       msgs.push({ fromSelf: true, message: text });
  //       setshowmsg(msgs);
  //       scrollToBottom();
  //       // hello();
  //       setCoverimage([])
  //       setshowuploadbox(false);
  //       // notificationss()
  //       // }
  //     }

  //     else {
  //      
  //       socket.current.emit("send-msg", {
  //         to: currentChat._id,
  //         from: userid,
  //         // text,
  //       });
  //       socket.current.emit("stop typing", userid);
  //       const data = {
  //         from: userid,
  //         to: currentChat._id,
  //         // message: coverimage,
  //       };
  //       const formData = new FormData();
  //       for (let j = 0; j < coverimage.length; j++) {
  //         formData.append("chatimage", coverimage[j]);
  //       }
  //       // formData.append("chatimage", coverimage);
  //       formData.append("from", userid);
  //       formData.append("to", currentChat._id);
  //       formData.append("message", text);
  //       // await axios.post(sendMessageRoute, {
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     "Content-Type": "multipart/form-data",
  //       //     Authorization: "JWT fefege...",
  //       //   },
  //       //   from: userid,
  //       //   to: currentChat._id,
  //       //   message: text,
  //       //   // chatimage: coverimage,
  //       //   formData
  //       // });
  //       const response = await axios({
  //         method: "post",
  //         url: sendMessageRoute,
  //         data: formData,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });

  //       await axios.post(addmychat, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "JWT fefege...",
  //         },
  //         from: userid,
  //         to: currentChat._id,
  //       });

  //       const msgs = [...showmsg];
  //       msgs.push({ fromSelf: true, message: text });
  //       setshowmsg(msgs);
  //       scrollToBottom();
  //       // hello();
  //       setCoverimage([])
  //       setshowuploadbox(false);
  //       const token = localStorage.getItem("user");
  //       const d = token !== null ? JSON.parse(token) : [];
  //       const cart_datas = d.tokenData.id;
  //       const responses = await axios.post(recieveMessageRoute, {
  //         from: cart_datas,
  //         to: currentChat._id,
  //       });
  //     
  //       setshowmsg(responses.data);

  //     }
  //   }
  // };

  // const notificationss = () => {
  //   if (localStorage.getItem("user") != null) {
  //     const arrayOfData = localStorage.getItem("user");
  //     const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
  //     const cart_data = d.tokenData.id;
  //     fetch(
  //       `http://178.62.228.242:5000/api/chat/chatnotification/${cart_data}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //     
  //         setnotify(data);
  //       });
  //   }
  // }

  useEffect(() => {
    // if (socket.current) {
    socket.current.on("msg-recieve", (msg, to, from) => {
      // if(currentChat._id != to){
   
      fetch(
        `${apiKey}api/chat/chatnotification/${to}`
      )
        .then((res) => res.json())
        .then((data) => {
        
          setnotify(data);

        });
      setArrivalMessage({ fromSelf: false, message: msg });
      scrollToBottom();
    });
    // }
  }, []);

  useEffect(() => {
    arrivalMessage && setshowmsg((prev) => [...prev, arrivalMessage]);
    scrollToBottom();
  }, [arrivalMessage]);

  const UserDatas = async () => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;

    let userId = await fetch(apiKey + "api/edituser/" + cart_data);
    userId = await userId.json();
    setuserImages(userId.result.image);
    // setFullName(userId.result.fullname);
  };
  useEffect(() => {
    UserDatas();
  }, []);

  // const Images = (is) => (

  //   <>
  //     {
  //       showsimages.map((i, index) => (
  //         <>
  //           <div className="uploadimgbox"
  //           // onEnter={handleOnEnter}
  //           >
  //             <div className="innerimgbox">

  //               <img src={i} alt="jj" width={100} height={100} />

  //               {/* {src ? (
  //         <img src={src} alt="jj" width={100} height={100} />
  //       ) : (
  //         <img
  //           src={coverimage ? coverimage : null}
  //           alt="ss"
  //         // width={100}
  //         // height={100}
  //         />
  //       )} */}
  //               {/* { */}
  //               {/* coverimage.map((i) => ( */}
  //               {/* <img src={src} alt="jj" width={100} height={100} /> */}
  //               {/* )) */}
  //               {/* } */}
  //             </div>
  //             <div className="deletebox">
  //               <div className="deletsvg" onClick={deletediv}>
  //                 <DeleteIcon />
  //               </div>
  //             </div>
  //           </div>

  //         </>
  //       ))
  //     }
  //   </>

  // );

  // const hadnlechange = (e) => {
  //  
  //   // setText(e.target);
  //  
  // };
 
  const keypress = (e) => {
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", userid);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.current.emit("stop typing", userid);
        setTyping(false);
      }
    }, timerLength);
 
  };

  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });





  const onchangepicture = (e) => {
 

    // const file = URL.createObjectURL(e.target.files[0]);

    // setupload(file);
    // setCoverimage(e.target.files[0]);
    // if (e.target.files[0]) {
    //   setImg({
    //     alt: e.target.files[0].name,
    //     src: URL.createObjectURL(e.target.files[0]),
    //   });
    // }

    e.preventDefault()
    setCount1(count1 + 1);
    // let output = [];
    // for (var i = 0; i < e.target.files.length; i++) {
    setshowuploadbox(true);
    // if (e.target.files[0]) {

    setImg({
      alt: e.target.files[0].name,
      src: URL.createObjectURL(e.target.files[0]),
    });

    const data2 = URL.createObjectURL(e.target.files[0])
    const res = showsimages.concat(data2);
 
    setshowsimages(res)
    // }
    let filedata = e.target.files[0];
    const data = filedata
    const dataf = coverimage.concat(data);
   
    // let output=[]
    // let x=output.push(dataf)

    // for (let index = 0; index < dataf.length; index++) {
    // for (let index = 0; index < dataf.length; index++) {
    //   const element = dataf[index];
 
    setCoverimage(dataf)
    // }
    // }
    // let x=[{...filedata[i]}]
    
    // output.push(filedata[i])
 
    // setCoverimage(filedata)
    // e.target.value = null;
    // }


    // let output = [];
    // e.preventDefault()
    // setCount1(count1 + 1);
    // setshowuploadbox(true);

    // let filedata = e.target.files;
    // const file = URL.createObjectURL(e.target.files[0]);
    // setupload(file);
   
    // setCoverimage(e.target.files[0]);
    // if (e.target.files[0]) {
    //   setImg({
    //     alt: e.target.files[0].name,
    //     src: URL.createObjectURL(e.target.files[0]),
    //   });
    //   e.target.value = null;
    // }
    // e.target.value = null;
    // output.push(filedata[i]);
    
    // setCoverimage(filedata)
  };

  const changechat = () => {
    setCount(true)
    setchatback(true)
  }



  const deletediv = (e, i, images) => {

    e.preventDefault();
    
    let c = showsimages.indexOf(images);
    let d = coverimage.indexOf(i);
 
    let remove1 = showsimages.splice(c,1);
    let remove2 = coverimage.splice(d,1);
    if (showsimages.length-1 < 0) {
      setshowsimages([]);
      setCoverimage([]);
      setshowuploadbox(false);
    } 
    else 
     {
      setshowsimages(remove1);
      setCoverimage(remove2);
    }
 

    

 
 
    // const id = showsimages.indexOf(images);
    // const id2 = coverimage.indexOf(i);

    // const removedDrink = showsimages.splice(id, 1);
    // const removedDrink2 = coverimage.splice(id2, 1);



    // setshowsimages(showsimages);
    // setCoverimage(coverimage);
 

    // 
    // {
    //   showsimages.map((images, i) => (
    //     <div className="uploadimgbox"
    //       // key={i}
    //     // onEnter={handleOnEnter}
    //     >
    //       <div className="innerimgbox">
    //         <img src={images} alt="jj" width={100} height={100} />
    //       </div>
    //     </div>
    //   ))
    // }
    // 
    // onchangepicture(e);

    // setshowuploadbox(false);
  };


  const showrightchat = () => {
    setrightchatback(true)

  }



  return (
    <>
      <div className={`centerchat ${count ? "active" : ""}`}>
        <div className="navbars" style={{ display: "none" }}>
          <Navbar notify={notifications} />
        </div>
        <div className="centerinnerchat">
          <div className="centerhead">
            <div className="introduction">
              <div className="backicon">
                <MoreVertTwoToneIcon onClick={changechat} />
              </div>
              <div className="introtitle">
                <div className="allnamess">
                  <h3 className="titleintro">{currentChat.fullname}</h3>
                  <span className="currentusername">
                    ({currentChat.username})
                  </span>
                </div>
                {currentChat.onlinestatus ? (
                  <div className="alldesccheck">
                    <span className="onlineicons">
                      <FiberManualRecordIcon />
                    </span>
                    <span className="introdesc">Online</span>
                  </div>
                ) : (
                  <div className="alldesccheck">
                    <span className="offlineicons">
                      <FiberManualRecordIcon />
                    </span>
                    <span className="introdesc">Offline</span>
                  </div>
                )}
              </div>
              <div className="introicons" onClick={showrightchat}>
                <GroupIcon />
              </div>
            </div>
          </div>
          <hr className="break" />
          <div className="chatsmessage">
            <div className="cahtmsginner">
              {/* {[...Array(count)].map((_, i) => <Messages key={i} />)} */}

              {showmsg.map((chat, i) => (
                <div ref={scrollRef} key={uuidv4()}>
                  {
                    chat.message ? (
                      <div
                        className={`${chat.fromSelf ? "meassagebox1" : "meassagebox"
                          }`}
                      >
                        <div className="msginner">
                          <div
                            className={`msgnamesicon ${chat.fromSelf ? " active" : "msgnamesicon"
                              }`}
                          >
                            <span
                              className={`iconname ${chat.fromSelf ? " active" : "iconname"
                                }`}
                            >
                              <img src={currentChat.image} />
                            </span>
                          </div>
                          <div className="msgdetails">
                            <div className="msgnames">
                              <h5 className="namesinner">
                                {chat.fromSelf ? "" : ""}
                              </h5>
                            </div>
                            <div className="msgboxes">
                              <div className="msgbox tri-right left-in">
                                <div className="msgboxinner">
                                  <p className="msgtext">{chat.message}</p>
                                </div>
                              </div>
                              {chat.fromSelf ? (
                                <div className="tickicon">
                                  <DoneIcon />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div
                            className={`msgnamesicon ${chat.fromSelf ? " msgnamesicon" : "active"
                              }`}
                          >
                            <span
                              className={`iconname ${chat.fromSelf ? " iconname" : "active"
                                }`}
                            >
                              <img src={userImages} alt="notfound" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : ('')
                  }

                  {chat.messages ? (
                    <div className="meassagebox1">
                      {
                        chat.messages.map((i) => (
                          <img src={i} style={{ width: '100px', height: '100px' }} />
                        ))
                      }
                    </div>
                  ) : (
                    ''
                  )}
                </div>

              ))}

          

              {istyping ? (
                <div
                  className="istyping"
                // style={{position:'absolute',bottom:'15%'}}
                >
                  <div
                    className="istypinginner"
                    style={{
                      width: "35px",
                      height: "50px",
                      marginLeft: "3rem",
                    }}
                  >
                    <Lottie options={defaultOptions} height={20} width={50} />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="textbox">
            <div className="innertextbox">
              <div
                className={`uploadimageshow ${showuploadbox ? "active" : ""}`}
              >
                <div className="uploadimginner">
                  {/* {[...Array(coverimage.length)].map((_, i) => ( */}
                  {/* <Images key={i} */}
                  {/* // onEnter={handleOnEnter} */}
                  {/* /> */}
                  {/* ))} */}

                  {
                    showsimages.length > 0 ? (
                    <>
                      {
                        showsimages.map((images, i) => (
                          <div className="uploadimgbox"
                            // key={i}
                          // onEnter={handleOnEnter}
                          >
                            <div className="innerimgbox">
                              <img src={images} alt="jj" width={100} height={100} />
                            </div>
                            <div className="deletebox">
                              <div className="deletsvg"
                                // key={i}
                                onClick={(e) => deletediv(e, i, images)}>
                                <DeleteIcon />
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </>
                  ) : ('')
                  }
                </div>
              </div>
              <div className="inputtextbox">
                <div className="uploadbtnss">
                  <label className="customupload">
                    {/* <CameraAltIcon /> */}
                    <AddIcon />
                    <input
                      type="file"
                      // onChange={(e)=>{setCoverimage(e.target.files[0])}}
                      // onChange={uploadfiles}
                      onChange={onchangepicture}
                      multiple
                    // defaultValue={uploadfiles}
                    />
                    {/* Edit Cover Photo */}
                  </label>
                </div>
                {/* <input type="text" placeholder='Type Message' className='inputtextssmsg' /> */}
                {/* {istyping ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      // height={50}
                      // width={70}
                      // style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )} */}
                {/* <InputEmoji
                  value={text}
                  onKeyDown={keypress}
                  onChange={(e) => setText(e.target.value)}
                  cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Type a message"
                // className='inputtextssmsg'
                /> */}
                {/* <form onSubmit={handleSubmit} className="submitform">
                  <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onKeyPress={handleOnEnter}
                    placeholder="Type a message here"
                    style={{ border: "2px solid red", width: "35vw", height: "7.2vh" }}
                  />
                  <div>
                    <button>Emoji</button>
                  </div>
                </form> */}
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={handleOnEnter2}
                  placeholder="Type a message"
                />

                {/* <EmojiMartPicker onChange={onChange}>
                  <button>click me</button>
                </EmojiMartPicker> */}

                <div className="sendbtn" onClick={handleOnSend} >
                  <SendIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Centerchat;
