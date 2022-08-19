import React, { useEffect, useState } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Tooltip from "@mui/material/Tooltip";

export default function Dashboardheader() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [userImage, setUserImage] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const d = token !== null ? JSON.parse(token) : [];
      const cart_datas = d.tokenData.id;
      fetch(`${apiKey}api/edituser/${cart_datas}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserImage(data.result.image);
          setFullname(data.result.fullname);
          if (data.result == false) {
            Logout();
          }
        });
    }
  }, []);
  return (
    <div className="dashboardheader">
      <div className="seller_style_circle">
        <Tooltip title={fullname}>
          <img src={userImage} className="img_circle" />
        </Tooltip>
      </div>
      <div className="menu_img_style">
        <ListOutlinedIcon />
      </div>
    </div>
  );
}
