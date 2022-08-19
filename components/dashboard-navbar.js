import PropTypes from "prop-types";
import styled from "@emotion/styled";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const { onSidebarOpen, ...other } = props;
  const [showlogouts, setshowlogouts] = useState(false);
  const [userinfo, setuserinfo] = useState([]);
  const router = useRouter();

  const showlogout = () => {
    setshowlogouts(!showlogouts);
  };

  const removestorage = () => {
    localStorage.removeItem("userInfo");
    router.replace("/E4gadmin/login");
  };

  useEffect(() => {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.tokenData.id;
     
      fetch(`${apiKey}api/admin/editadmin/${cart_data}`)
        .then((res) => res.json())
        .then((data) => {
         
          setuserinfo(data.result);
        });
    } else {
      router.push("/E4gadmin/login");
    }
  }, []);
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}></IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}></IconButton>
          </Tooltip>
          <div className="adminprofiles" onClick={showlogout}>
            <Avatar
              sx={{
                height: 40,
                width: 40,
                ml: 1,
              }}
              src={userinfo.image}
            >
              <p>{userinfo.fname}</p>
            </Avatar>
            <div className={`logoutbox ${showlogouts ? "active" : ""}`}>
              <div className="innerlogout" onClick={removestorage}>
                <div className="logoutimg">
                  <LogoutIcon />
                </div>
                <div className="logname">
                  <span className="logoutname">Logout</span>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
