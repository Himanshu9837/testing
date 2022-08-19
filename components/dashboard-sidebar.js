import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
// import { Cog as CogIcon } from '../icons/cog';
// import { Lock as LockIcon } from '../icons/lock';
// import { Selector as SelectorIcon } from '../icons/selector';
// import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
// import { User as UserIcon } from '../icons/user';
// import { UserAdd as UserAddIcon } from '../icons/user-add';
// import { Users as UsersIcon } from '../icons/users';
// import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
// import ExpandMore from '@material-ui/icons/ExpandMore'
// import ExpandLess from '@material-ui/icons/ExpandLess'
// import { Button } from 'react-bootstrap';
import Dropdown from "./dropdown";
import Subseller from "./subseller";
import Subconfig from "./subconfiguration";
import Subcatalog from "./subcatalog";
import Subtabdesign from "./subtab_design";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";

import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [restriction, setrestriction] = useState([]);
  const [validation, setvalidation] = useState(false);
  // const [restriction2,setrestriction2]=useState([])

  useEffect(() => {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    fetch(
      `${apiKey}api/admin/editadmin/${cart_data}`
    )
      .then((res) => res.json())
      .then((data) => {
        
       
        let x = data.result.restrictions;
        setrestriction(x);
        setvalidation(data.result.restrictionstatus);
      });
    }
  }, []);

  

  const items = [
    {
      href: "/E4gadmin",
      icon: <BarChartIcon fontSize="small" />,
      title: "Dashboard",
    },
    {
      href: "/E4gadmin/customers",
      icon: <PersonIcon fontSize="small" />,
      title: "customers",
    },

    {
      href: "/E4gadmin/template",
      icon: <PersonIcon fontSize="small" />,
      title: "Templates",
    },
    {
      href: "/E4gadmin",
      icon: <SettingsSystemDaydreamIcon fontSize="small" />,
      title: "System",
      dropdown: <Dropdown />,
    },
    {
      href: "/E4gadmin",
      icon: <SettingsIcon fontSize="small" />,
      title: "Configuration",
      dropdown: <Subconfig />,
    },
    {
      href: "/E4gadmin/order",
      icon: <LocalShippingIcon fontSize="small" />,
      title: "Order",
    },
    {
      href: "/E4gadmin/products",
      icon: <ShoppingBagIcon fontSize="small" />,
      title: "Products",
    },

    {
      href: "/E4gadmin/account",
      icon: <ManageAccountsIcon fontSize="small" />,
      title: "Account",
    },
    {
      href: "/E4gadmin/settings",
      icon: <ManageAccountsIcon fontSize="small" />,
      title: "Settings",
    },
    {
      href: "/E4gadmin",
      icon: <SettingsIcon fontSize="small" />,
      title: "catalog",
      dropdown: <Subcatalog />,
    },
    {
      href: "/E4gadmin",
      icon: <SettingsIcon fontSize="small" />,
      title: "Design Tab",
      dropdown: <Subtabdesign />,
    },

    {
      href: "/E4gadmin/login",
      icon: <VpnKeyIcon fontSize="small" />,
      title: "Login",
    },
    {
      href: "/E4gadmin/register",
      icon: <PersonAddAltIcon fontSize="small" />,
      title: "Register",
    },
    {
      href: "/E4gadmin",
      icon: <PersonAddAltIcon fontSize="small" />,
      title: "Seller",
      subseller: <Subseller />,
    },
    {
      href: "/e4gadmin/page",
      icon: <SettingsIcon fontSize="small" />,
      title: "Page",
    },
    {
      href: "/404",
      icon: <BuildCircleIcon fontSize="small" />,
      title: "Error",
    },
  ];

  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);
  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <img src="/images/logo_1.svg" />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <div className="sidebarss">
          {/* <Box sx={{ flexGrow: 1 }}>
            {items.map((item) => (

              <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
                dropdown={item.dropdown}
                subseller={item.subseller}
              />
            ))}
          </Box> */}

          <Box sx={{ flexGrow: 1 }}>
            {items.map((item) => {
              if (validation === true) {
                let isVisible = false;
                restriction.forEach((e) => {
                  if (Object.keys(e).includes(item.title)) isVisible = true;
                });
                return (
                  isVisible && (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                      dropdown={item.dropdown}
                      subseller={item.subseller}
                    />
                  )
                );
              } else {
                return (
                  <NavItem
                    key={item.title}
                    icon={item.icon}
                    href={item.href}
                    title={item.title}
                    dropdown={item.dropdown}
                    subseller={item.subseller}
                  />
                );
              }
            })}
          </Box>
        </div>

        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
