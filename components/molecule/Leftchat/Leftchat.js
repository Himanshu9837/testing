import React, { useState, useEffect, useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import io from "socket.io-client";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../../../public/images/logo_1.svg";

import Image from 'next/image'
import Link from "next/link";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Contextapi from "../../../Context/Contextapi.js";


function TabPanel(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Leftchat = ({ changeChat, socket }) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const {chatback,setchatback}=useContext(Contextapi);

  const router = useRouter();
  const [users, setusers] = useState([]);
  const [usersnames, setusersnames] = useState("");
  const [usersid, setusersid] = useState("");
  const [activeIndex, setactiveIndex] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [alldata, setAlldata] = useState([]);
  const [online, setOnline] = useState(false);
  const [seenmsg, setunseen] = useState([]);
const [searchvalue, setSearchvalue] = useState("");
const [searchvalue1, setSearchvalue1] = useState("");
const [searchvalue2, setSearchvalue2] = useState("");
const [history, setHistory] = useState([]);
const [historyid, setHistoryid] = useState([]);

  const [admint, setAdminT] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
const [userdata, setUserdata] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const ENDPOINT = apiKey;

  function activeclass(e, index) {
  
    setactiveIndex(index);
  }

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (token) {
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;

      // socket.current.emit("setup", cart_datas);
      socket.current = io(ENDPOINT);
      socket.current.emit("add-user", cart_datas);
      // socket.current.on("connected", () => setSocketConnected(true));
      socket.current.on("online", (cart_datas) => {
        
        setOnline(true);
      });
      socket.current.on("offline", (cart_datas) => {
       
        setOnline(false);
      });
    } else {
      router.push("/chat/login");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      const arrayOfData = localStorage.getItem("user");
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.username;
      const cart_datas = d.tokenData.id;
      setusersnames(cart_data);
      setusersid(cart_datas);
      fetch(`${apiKey}api/chat/fetchmychat/${cart_datas}`)
        .then((res) => res.json())
        .then((data) => {
          setusers(data.userdetails);
        
          setunseen(data.unseenmsg);
          // let userdata = data.userdetails.map((i)=> )
        });
    }

    
  }, [
    // seenmsg
  ]);

  useEffect(() => {
    const arrayOfDatas = localStorage.getItem("UserId");
   

    const userData = localStorage.getItem("user");
   

    if (userData) {
      const d = userData !== null ? JSON.parse(userData) : [];

      const userdataid = d.tokenData.id;

      if (arrayOfDatas === userdataid) {
        localStorage.removeItem("UserId");
      } else if (arrayOfDatas) {
        fetch(`${apiKey}api/edituser/${arrayOfDatas}`)
          .then((res) => res.json())
          .then((data) => {
            const changeCurrentChats = (userss, usersId) => {
              socket.current = io(ENDPOINT);
              socket.current.emit("add-user", userdataid);
              
              socket.current.emit("join chat", userss);

             
              changeChat(usersId);
            };

            changeCurrentChats(arrayOfDatas, data.result);
          });
        localStorage.removeItem("UserId");
      }
    }
  }, []);

  const UserDatas = async () => {
    const arrayOfData = localStorage.getItem("user");
    if(arrayOfData){
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    let userId = await fetch(
        apiKey + 'api/edituser/' + cart_data
    );
    userId = await userId.json();
 
    setAdminT(userId.result.isadmin);
    }
};
const UserAllDatas = async () => {
  let userId = await fetch(
      apiKey + 'api/chat/allchatuser'
  );
  userId = await userId.json();

  setAlldata(userId)
};
const SearchDatas = async () => {
  let userId = await fetch(
      apiKey + 'api/chat/searchchatuser/'+ searchvalue
  );
  userId = await userId.json();
 
  setAlldata(userId)
};
const SearchDatas1 = async () => {
  let userId = await fetch(
      apiKey + 'api/chat/searchchatuser/'+ searchvalue1
  );
  userId = await userId.json();
 
  setusers(userId)

};
const SearchDatas2 = async () => {
  let userId = await fetch(
      apiKey + 'api/chat/searchchatuser/'+ searchvalue1
  );
  userId = await userId.json();
 
  // setHistoryid(userId[0]._id)
  setUserdata(userId)

};
const historychat = async (id) => {
  let userId = await fetch(
      apiKey + 'api/chat/fetchsearchchat/'+ id
  );
  userId = await userId.json();
 
  setHistory(userId)
};
useEffect(() => {
  
   UserDatas();
   UserAllDatas();
   historychat(historyid);

}, [
  // historyid
])

  const changeCurrentChat = (index, user) => {
    setchatback(false)
    setCurrentSelected(index);
   
    socket.current = io(ENDPOINT);
    socket.current.emit("add-user", usersid);
  
    socket.current.emit("join chat", user._id);
    
    changeChat(user);

    const data = { sender: user._id };

    fetch(`${apiKey}api/chat/updatechatnotification/${usersid}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
       
      })
      .catch((error) => {
        
      });
  };
  const getCurrentChatid = (id) => {
      
      setHistoryid(id)
  }
  return (

    <>
      <div className={`leftchat ${chatback ? 'active' : ''}`}>
        <div className="leftchatinner">
          <div className="leftlogo">
            <Link href="/">
            <Image src={Logo} />
              {/* <Logo /> */}
            </Link>
          </div>
          <div className="chat_tab_style">
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons="off"
                aria-label="full width tabs example"
              >
                {admint ? (
                <Tab label="Users" {...a11yProps(0)} />
                ) : ("")}

                <Tab label="Coversations" {...a11yProps(1)} />

                {admint ? (
                <Tab label="Chat History" {...a11yProps(2)} />
                ) : ("")}
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              {admint ? (
              <TabPanel value={value} index={0} dir={theme.direction}>
                  <div className="tab_history">
                  <div className="combain_style">
                    <div className="searchbar_style">
                      <input
                        type="text"
                        className="search_input_style"
                        placeholder="Search..."
                        onChange={(e) => setSearchvalue(e.target.value)}
                        onKeyUp={SearchDatas}
                      />
                      <div className="search_icon_style">
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                  <div className="peoplesall">
                    {alldata.length > 0 && (
                      <>
                        {alldata.map((user, index) => (
                          <div
                            key={user._id}
                            //   onClick={(e) => {
                            //     activeclass(e, "1");
                            //   }}
                            onClick={() => changeCurrentChat(index, user)}
                            className={`singlepeople ${
                              index === currentSelected ? "selected" : ""
                            } `}
                          >
                            {user.onlinestatus ? (
                              <span className="onlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            ) : (
                              <span className="offlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            )}

                            <div className=" singlepeopleimg">
                              {/* <PersonIcon /> */}
                              <img
                                src={user.image}
                                width="20px"
                                height="20px"
                              />
                            </div>
                            {/* <span className="nicksname">Conchita Colone</span> */}
                            <div className="membernames">
                              <h5 className="membernamestxt">
                                {user.fullname}
                              </h5>
                              <p className="memberposition">{user.username}</p>
                            </div>
                            {/* {seenmsg[index] === 0 ? (
                              ""
                            ) : (
                              <div className="notification">
                                <p className="notifynumber">{seenmsg[index]}</p>
                              </div>
                            )} */}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </TabPanel>
              ) : ("")}
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div className="tab_history">
                  <div className="combain_style">
                    <div className="searchbar_style">
                      <input
                        type="text"
                        className="search_input_style"
                        placeholder="Search..."
                        onChange={(e) => setSearchvalue1(e.target.value)}
                        onKeyUp={SearchDatas1}
                      />
                      <div className="search_icon_style">
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                  <div className="peoplesall">
                    {users.length > 0 && (
                      <>
                        {users.map((user, index) => (
                          <div
                            key={user._id}
                            //   onClick={(e) => {
                            //     activeclass(e, "1");
                            //   }}
                            onClick={() => changeCurrentChat(index, user)}
                            className={`singlepeople ${
                              index === currentSelected ? "selected" : ""
                            } `}
                          >
                            {user.onlinestatus ? (
                              <span className="onlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            ) : (
                              <span className="offlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            )}

                            <div className=" singlepeopleimg">
                              {/* <PersonIcon /> */}
                              <img
                                src={user.image}
                                width="20px"
                                height="20px"
                              />
                            </div>
                            {/* <span className="nicksname">Conchita Colone</span> */}
                            <div className="membernames">
                              <h5 className="membernamestxt">
                                {user.fullname}
                              </h5>
                              <p className="memberposition">{user.username}</p>
                            </div>
                            {seenmsg[index] === 0 ? (
                              ""
                            ) : (
                              <div className="notification">
                                <p className="notifynumber">{seenmsg[index]}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </TabPanel>
              {admint ? (
              <TabPanel value={value} index={2} dir={theme.direction}>
                <div className="tab_history">
                  <div className="combain_style">
                    <div className="searchbar_style">
                      <input
                        type="text"
                        className="search_input_style"
                        placeholder="Search Username..."
                        onChange={(e) => setSearchvalue1(e.target.value)}
                        onKeyUp={SearchDatas2}
                      />
                      <div className="search_icon_style">
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                  {history.length > 0 ? ("") : (
                  <div className="peoplesall">
                    {userdata.length > 0 && (
                      <>
                        {userdata.map((user, index) => (
                          <div
                            key={user._id}
                            onClick={() => getCurrentChatid(user._id)}
                            className={`singlepeople ${
                              index === currentSelected ? "selected" : ""
                            } `}
                          >
                            {/* {user.onlinestatus ? (
                              <span className="onlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            ) : (
                              <span className="offlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            )} */}

                            <div className=" singlepeopleimg">
                              <img
                                src={user.image}
                                width="20px"
                                height="20px"
                              />
                            </div>
                            <div className="membernames">
                              <h5 className="membernamestxt">
                                {user.fullname}
                              </h5>
                              <p className="memberposition">{user.username}</p>
                            </div>
                            {seenmsg[index] === 0 ? (
                              ""
                            ) : (
                              <div className="notification">
                                <p className="notifynumber">{seenmsg[index]}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  )}
                  <div className="peoplesall">
                    {history.length > 0 && (
                      <>
                        {history.map((user, index) => (
                          <div
                            key={user._id}
                            onClick={() => changeCurrentChat(index, user)}
                            className={`singlepeople ${
                              index === currentSelected ? "selected" : ""
                            } `}
                          >
                            {/* {user.onlinestatus ? (
                              <span className="onlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            ) : (
                              <span className="offlineicons">
                                <FiberManualRecordIcon />
                              </span>
                            )} */}

                            <div className=" singlepeopleimg">
                              <img
                                src={user.image}
                                width="20px"
                                height="20px"
                              />
                            </div>
                            <div className="membernames">
                              <h5 className="membernamestxt">
                                {user.fullname}
                              </h5>
                              <p className="memberposition">{user.username}</p>
                            </div>
                            {seenmsg[index] === 0 ? (
                              ""
                            ) : (
                              <div className="notification">
                                <p className="notifynumber">{seenmsg[index]}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </TabPanel>
              ) : ("")}
            </SwipeableViews>
          </div>
          {/* <div className="converstion">
            <div className="convertiontextdiv">
              <h3 className="covertiontxt">Coversation</h3>
            </div>
          </div> */}
        </div>
        {admint ? ("") : (
        <div className="peoplesall">
          {users.length > 0 && (
            <>
              {users.map((user, index) => (
                <div
                  key={user._id}

                  onClick={() => changeCurrentChat(index, user)}
                  className={`singlepeople ${
                    index === currentSelected ? "selected" : ""
                  } `}
                >
                  {user.onlinestatus ? (
                    <span className="onlineicons">
                      <FiberManualRecordIcon />
                    </span>
                  ) : (
                    <span className="offlineicons">
                      <FiberManualRecordIcon />
                    </span>
                  )}

                  <div className=" singlepeopleimg">
                    <img src={user.image} width="20px" height="20px" />
                  </div>
                  <div className="membernames">
                    <h5 className="membernamestxt">{user.fullname}</h5>
                    <p className="memberposition">{user.username}</p>
                  </div>
                  {seenmsg[index] === 0 ? (
                    ""
                  ) : (
                    <div className="notification">
                      <p className="notifynumber">{seenmsg[index]}</p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        )}
      </div>
    </>
  );
};

export default Leftchat;
