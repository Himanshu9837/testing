import { React, useEffect, useRef, useState } from 'react'
import Leftchat from '../../components/molecule/Leftchat/Leftchat.js';
import Centerchat from '../../components/molecule/Centerchat/Centerchat.js';
import Rightchat from '../../components/molecule/Rightchat/Rightchat.js';
import Welcome from '../../components/molecule/Welcome/Welcome.js';
import { allUsersRoute, host } from '../../components/molecule/Chattest/APIRoutes';
import { io } from "socket.io-client";
import { useRouter } from 'next/router'
import Navbar from '../../components/molecule/Navbar2/Navbarhome.js'

export default function chat ()  {

  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter()
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [usersnames, setusersnames] = useState('')
  const [loadings, setloadings] = useState(false)

  const [users, setusers] = useState([])
  useEffect(() => {


    const token = localStorage.getItem("user");
    if (!token) {

      setloadings(true)

      router.push("/chat/login");

    } else {

      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;

      setCurrentUser(cart_datas)

    }
  }, []);

  useEffect(() => {

    const token = localStorage.getItem("user");

    if (!token) {
      setloadings(true)

      router.push("/chat/login");
    } else {
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
      const cart_data = d.tokenData.username;
      setusersnames(cart_data);

      if (cart_datas) {
        socket.current = io(apiKey);
        socket.current.emit("add-user", cart_datas);


      }
    }
  }, [currentUser]);







  // useEffect(async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);


  };
  return (
    <>
      {
        loadings ? (
          <div className="outerloading">
            <div class="loader"></div>
          </div>
        ) : (
          <>
          <div className="navbars" style={{display:'none'}}>
           <Navbar socket={socket} changeChat={currentChat}/>
          </div>

            <div className="chatcontainer">
              <div className="chatinnercontainer">
                <Leftchat changeChat={handleChatChange} socket={socket} />
                {currentChat === undefined ? (
                  <Welcome />
                ) : (
                  <Centerchat currentChat={currentChat} socket={socket} />
                )}
                {/* <ChatContainer currentChat={currentChat} socket={socket} /> */}
                <Rightchat />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}



export async function getInitialProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}