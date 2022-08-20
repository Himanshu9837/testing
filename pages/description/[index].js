import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Footer from "../../components/molecule/Footer/footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import PersonIcon from "@mui/icons-material/Person";
// import dynamic from "next/dynamic";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import Contextapi from "../../Context/Contextapi.js";


import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// const Header = dynamic(() =>
//   import("../../components/molecule/Navbar2/Navbarhome")
// );
import Header from "../../components/molecule/Navbar2/Navbarhome";
import Rightdescription from "../../components/molecule/Rightdescription/Rightdescription.js";
import Leftdescription from "../../components/molecule/Leftdescription/index.js";

export const config = {
  unstable_runtimeJS: false,
};

toast.configure();
const notify = (message) => toast(message);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserDescription({ postData }) {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [outerdata, setOuterdata] = useState([]);
  const [innerdata, setInnerdata] = useState([]);
  const [game, setGame] = useState('');
  const [loadercategory, setloadercategory] = useState(true);


  const tabChange = (event, newValue) => {
    setValue(newValue);
  };

  const seodata = [];
  const UserDescriptions = async (metaurl) => {
    let userId = await fetch(`${apiKey}api/product/productdetails/${metaurl}`);
    userId = await userId.json();
    seodata.push(userId);
    setData(userId.productdetail);
    setOuterdata(userId.outerdata);
    setInnerdata(userId.inner);
    setGame(userId.maincategory);
    setloadercategory(false)
  };


  useEffect(async () => {
    if (router.isReady) {
      const metaurl = router.query.index;
      UserDescriptions(metaurl);
      postData.productdetail.map((is) => localStorage.setItem("UserId", is.userId._id));
    }
  }, [router.isReady]);

  return (
    <div className="main_style">
      {postData.productdetail.map((alldata1, i) => (
        <Head>
          <meta name="viewport" content={alldata1.metadescription} />
          <meta name="viewport" content="width=device-width" />
          <meta charSet="utf-8" />
          <meta name="description" content={alldata1.metadescription}></meta>
          <meta name="keywords" content={alldata1.metakeyword}></meta>
          <meta name="title" content={alldata1.metatitle} />
          <meta name="robots" content="index, follow" />
          <title>{alldata1.metatitle}</title>
        </Head>
      ))}

      <div className="alerts">
        <ToastContainer />
      </div>
      <div className="main_div_style">
        <div className={"header_style"}>
          <Header inputs={true} />
        </div>
        <div className={"header_div_style"}>
          {loadercategory ? (
            <div className="outerdescloader">

            <div class="loaderdesc"></div>
            </div>
          ) : (
            <>
              <div className={"flex_style"}>
                <Leftdescription data={data} />
                <div className={"image_div_style2"}>
                  <Rightdescription data={data} outerdata={outerdata} innerdata={innerdata} game={game} />
                </div>
              </div>
              <div className={"description_style"}>
                {data.map((alldata, i) => (
                  <div>
                    <div style={{ marginTop: "-10px", width: "100%" }}>
                      <Box sx={{ width: "100%" }}>
                        <Box
                          sx={{
                            borderBottom: 1,
                            borderColor: "#7D7B81",
                            width: "100%",
                          }}
                        >
                          <Tabs
                            value={value}
                            onChange={tabChange}
                            aria-label="basic tabs example"
                          >
                            <Tab
                              icon={<BorderColorIcon />}
                              iconPosition="start"
                              label="Description"
                              {...a11yProps(0)}
                            />
                            <Tab
                              icon={<PersonIcon />}
                              iconPosition="start"
                              label="Reviews"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                          <div>
                            <div>
                              <h4 className={"para_style2"}>
                                {alldata.sortdescription}
                              </h4>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <div style={{ color: "#ffffff" }}>Item Two</div>
                        </TabPanel>
                      </Box>
                    </div>
                  </div>
                ))}
              </div>
            </>

          )
          }
        </div>

        <div className={"footer_style"}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const pageRequest = `${apiKey}api/product/productdetails/${query.index}`;
  const res = await fetch(pageRequest);
  const postData = await res.json();

  return {
    props: {
      postData,
    },
  };
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



