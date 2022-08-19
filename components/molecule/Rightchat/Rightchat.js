import React, { useContext, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import io from "socket.io-client";
import { useRouter } from 'next/router'
import Contextapi from "../../../Context/Contextapi.js";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
const Rightchat = ({changeChat,socket}) => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const {rightchatback,setrightchatback}=useContext(Contextapi);
   

    const router = useRouter();
    const [users, setusers] = useState("")
    const [fullname, setFullName] = useState('')
    const [userimage, setuserImages] = useState('')
    // const [currentUserName, setCurrentUserName] = useState(undefined);
    // const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const ENDPOINT = apiKey;
    const UserDatas = async () => {
        const arrayOfData = localStorage.getItem("user");
        if (arrayOfData) {
        const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
        const cart_data = d.tokenData.id;
        let userId = await fetch(
            apiKey + 'api/edituser/' + cart_data
        );
        userId = await userId.json();
       
        setuserImages(userId.result.image);
        setFullName(userId.result.fullname);
        setusers(userId.result.username);
        }else{
            router.push("/chat/login");
        }
    };
    useEffect(() => {
       UserDatas();
    }, [])

    // const changeCurrentChat = (index, user) => {
    //     setCurrentSelected(index);
    //    
    //     socket.current = io(ENDPOINT);
    //     socket.current.emit("add-user", usersid);
    //     socket.current.emit("join chat", user._id);
    //    
    //     changeChat(user);
    // };
    const hiderightchat=()=>{
        setrightchatback(false);
    }
    return (
        <>
            <div className={`rightchat ${rightchatback ? 'active' : ''}`}>
                <div className="rightchathead">
                    <div className="leftchathead">
                        <div className="leftchatheadinner">
                            <div className="userimg">
                                <img src={userimage} />
                            </div>
                            <div className="userdetailsinfo">
                                <div className="usernameinfo">
                                    <h2 className="infonames">
                                        {fullname}
                                    </h2>
                                </div>
                                <div className="usernickname">
                                    <span className="nicksname">
                                        {users}
                                    </span>
                                    <div className="dotimg">
                                        <FiberManualRecordIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="rightchatclose" onClick={hiderightchat}>
                                <CloseTwoToneIcon/>
                            </div>
                        </div>
                    </div>
                    <div className="members">
                        {/* <h3 className="membertxt">
                            Members
                        </h3> */}
                    </div>
                </div>
                {/* <hr/> */}
                {/* <div className="rightbottom">
                    {
                        users.map((user, index) => (
                            <div className={`memberpeople ${index === currentSelected ? "selected" : ""}`}
                                key={user._id}
                                onClick={() => changeCurrentChat(index, user)}
                            >
                                <div className="peopleicons">
                                    <img src={user.image} width='20px' height='20px' />
                                </div>
                                <div className="membernames">
                                    <h3 className="membernamestxt">
                                        {user.fullname}
                                    </h3>
                                    <p className="memberposition">
                                        {user.username}
                                    </p>
                                </div>

                            </div>
                        ))
                    }

                </div> */}




            </div>



        </>
    )
}

export default Rightchat