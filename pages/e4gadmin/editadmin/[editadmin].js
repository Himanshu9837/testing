import React, { useContext } from "react";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import Checklogin from "../../../components/checklogin/checklogin.js";
// import CheckboxTree from "react-checkbox-tree";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
const user = {
  avatar:
    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png",
};
import Contextapi from "../../../Context/Contextapi.js";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";
// import "react-checkbox-tree/lib/react-checkbox-tree.css";
import * as ReactDOM from "react-dom";
import {
  TreeView,
  processTreeViewItems,
  handleTreeViewCheckChange,
} from "@progress/kendo-react-treeview";
import { CheckTree } from "rsuite";

const options = [
  {
    label: "Madhya Pradesh",
    value: 1,
    children: [
      {
        label: "Mhow",
        value: 2,
      },
      {
        label: "Indore",
        value: 3,
        children: [
          {
            label: "Vijay Nagar",
            value: 4,
          },
          {
            label: "Rajiv Gandhi Square",
            value: 5,
          },
          {
            label: "MR 10",
            value: 6,
          },
        ],
      },
    ],
  },
];

const EditAdmin = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

  //all usestate
  const [adminview, setadminview] = useState([]);
  const [lname, setlname] = useState("");
  const [fname, setfname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [currentp, setcurrentpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [key, setKey] = useState("profile");
  const [admin, setadmin] = useState(false);
  const [author, setauthor] = useState(false);
  const [publisher, setpublisher] = useState(false);
  const [modifier, setmodifier] = useState(false);

  const [adminimage, setaddimage] = useState("");
  const [checked, setchecked] = useState([]);
  const [expanded, setexpanded] = useState(false);
  const [expanded1, setexpanded1] = useState(false);

  const [dataview, setDataview] = useState([]);
  // const [category_check_list, setCategoryCheckList] = useState([]);

  const [ischeck, setischeck] = useState([]);

  const router = useRouter();
  const adminid = router.query.editadmin;
  console.log(adminid);

  // const [items] = React.useState(tree);
  const [singleMode, setSingleMode] = React.useState(false);
  const [checkChildren, setCheckChildren] = React.useState(false);
  const [checkParents, setCheckParents] = React.useState(false);
  const [check, setCheck] = React.useState({
    ids: [],
    applyCheckIndeterminate: true,
  });

  const [value, setValue] = useState([]);
  const [data, setData] = useState([
    {
      label: "Parent Node",
      value: "0",
      children: [],
    },
  ]);
  const onCheckChange = (event) => {
    const settings = {
      singleMode,
      checkChildren,
      checkParents,
    };
    setCheck(handleTreeViewCheckChange(event, check, items, settings));
  };

  const onSingleModeChange = ({ target: { checked } }) => {
    setSingleMode(checked);
    setCheckChildren(false);
    setCheckParents(false);
  };

  const onCheckChildrenChange = ({ target: { checked } }) => {
    setSingleMode(false);
    setCheckChildren(checked);
  };

  const onCheckParentsChange = ({ target: { checked } }) => {
    if (checked) {
      setSingleMode(false);
    }

    setCheckParents(checked);
  };

  const restriction = () => {
    setexpanded(!expanded);
  };
  toast.configure();

  useEffect(
    () => {
      setloaderspage(true);
      if (Tokens === "") {
      } else {
        text(Tokens);

        fetch(`${apiKey}api/admin/editadmin/${adminid}`).then((result) => {
          result.json().then((resp) => {
            setadminview(resp.result);
            console.log(resp);
            setfname(resp.result.fname);
            setlname(resp.result.lname);
            setemail(resp.result.email);
            setadmin(resp.result.admin);
            setauthor(resp.result.author);
            setpublisher(resp.result.publisher);
            setmodifier(resp.result.modifier);
            setexpanded(resp.result.restrictionstatus);
          });
        });
      }
    },
    adminid,
    Tokens
  );

  const handlecheck = (e) => {
    console.log("click");
    const { id, checked } = e.target;
    console.log(id);
    console.log(checked);
    setischeck([...ischeck, id]);
    if (!checked) {
      setischeck(ischeck.filter((item) => item !== id));
    }
  };
  console.log(ischeck);
  useEffect(() => {
    fetch(`${apiKey}api/admin/allrestrictions`).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        setDataview(resp);
      });
    });
  }, []);

  const updateAdmin = (e) => {
    e.preventDefault();
    let data = new FormData();
    const userids = JSON.stringify(ischeck);
    // const image = e.target.files[0];
    data.append("fname", fname);
    data.append("lname", lname);
    data.append("email", email);
    data.append("password", password);
    data.append("cpassword", cpassword);
    data.append("currentp", currentp);
    data.append("admin", admin);
    data.append("author", author);
    data.append("modifier", modifier);
    data.append("publisher", publisher);
    data.append("adminimage", adminimage);
    data.append("restriction", userids);
    data.append("restrictionstatus", expanded);
    fetch(`${apiKey}api/admin/updateadmin/${adminid}`, {
      method: "POST",
      body: data,
    }).then(async (_res) => {
      // const result = await _res.json();
      toast("Profile Updated Successfully");
      router.push("/E4gadmin/admin");
    });
  };

  const checkfiltered = () => {
    setadmin(!admin);
  };
  const checkfiltered2 = () => {
    setauthor(!author);
  };
  const checkfiltered3 = () => {
    setpublisher(!publisher);
  };
  const checkfiltered4 = () => {
    setmodifier(!modifier);
  };

  // console.log(adminview);
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <button className="savedetails" onClick={updateAdmin}>
            Save details
          </button>
        </Box>
      </div>
      <Form method="POST">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="profile" title="Profile">
            <>
              {loaderspage ? (
                <>
                  <Checklogin />
                  <div className="loader loader1"></div>
                </>
              ) : (
                <form autoComplete="off" noValidate>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={user.avatar}
                        sx={{
                          height: 64,
                          mb: 2,
                          width: 64,
                        }}
                      />
                    </Box>
                  </CardContent>
                  <Card>
                    <CardHeader
                      subheader="The information can be edited"
                      title="Profile"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <Label for="fname">First Name</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="fname"
                            name="fname"
                            placeholder="First Name"
                            required=""
                            defaultValue={adminview.fname}
                            onChange={(e) => setfname(e.target.value)}
                            // name="fname"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Label for="fname">Last Name</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lname"
                            name="lname"
                            placeholder="Last Name"
                            required=""
                            defaultValue={adminview.lname}
                            onChange={(e) => setlname(e.target.value)}
                            // name="lname"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Label for="fname">Email</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required=""
                            defaultValue={adminview.email}
                            onChange={(e) => setemail(e.target.value)}
                            // name="email"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}></Grid>
                        <Grid item md={6} xs={12}>
                          <Label for="fname">Current Password</Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="currentpassword"
                            name="currentpassword"
                            placeholder="current password"
                            defaultValue=""
                            onChange={(e) => setcurrentpassword(e.target.value)}
                            // name="currentpassword"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Label for="fname">Password</Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="password"
                            required=""
                            defaultValue=""
                            onChange={(e) => setpassword(e.target.value)}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Label for="fname">Confirm Password</Label>

                          <Input
                            type="password"
                            className="form-control"
                            id="confirm password"
                            name="confirm password"
                            placeholder="confirm password"
                            required=""
                            defaultValue=""
                            onChange={(e) => setcpassword(e.target.value)}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}></Grid>
                        <Grid item md={6} xs={12}>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              <span>*</span>Admin
                            </Label>
                            <div className="categoryforminput">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={checkfiltered}
                                  checked={admin}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              <span>*</span>Author
                            </Label>
                            <div className="categoryforminput">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={checkfiltered2}
                                  checked={author}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              <span>*</span>Publisher
                            </Label>
                            <div className="categoryforminput">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={checkfiltered3}
                                  checked={publisher}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <div className="right_input new_category">
                            <Label className="col-xl-3 col-md-4">
                              <span>*</span>Modifier
                            </Label>
                            <div className="categoryforminput">
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  onChange={checkfiltered4}
                                  checked={modifier}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Input
                            type="file"
                            className="form-control"
                            id="coverimage"
                            name="coverimage"
                            onChange={(e) => setaddimage(e.target.files[0])}
                            required=""
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                  </Card>
                </form>
              )}
            </>
          </Tab>
          <Tab eventKey="view" title="View">
            <div style={{ textAlign: "center" }}>
              <div className="right_input new_category">
                <Label className="col-xl-3 col-md-4">
                  <span>*</span>Enable View
                </Label>
                <div className="categoryforminput">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={expanded}
                      onChange={restriction}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              {dataview.map((i, index) => (
                <>
                  {/* {expanded ? (
                    <div>
                      <input
                        type="checkbox"
                        id={i.restriction}
                        key={i.restriction}
                        checked={ischeck.includes(i.restriction)}
                        onClick={handlecheck}
                      />
                      <label for="vehicle1">{i.restriction}</label>
                    </div>
                  ) : (
                    ""
                  )} */}
                </>
              ))}
              {/* <div className="example-config">
                        <input
                          id="checkParents"
                          type="checkbox"
                          checked={checkParents}
                          onChange={onCheckParentsChange}
                          className="k-checkbox k-checkbox-md k-rounded-md"
                        />
                        <label
                          htmlFor="checkParents"
                          className="k-checkbox-label"
                          style={{
                            marginRight: 5,
                          }}
                        >
                          Check all parents when children are checked
                        </label>
                      </div>
                      <TreeView
                        data={processTreeViewItems(items, {
                          check: check,
                        })}
                        checkboxes={true}
                        onCheckChange={onCheckChange}
                      /> */}
              {/* <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded1}
                onCheck={(checked) => setchecked({ checked })}
                onExpand={(expanded) => setexpanded1({ expanded })}
              /> */}
              <CheckTree
                data={data}
                value={value}
                style={{ width: 280 }}
                onChange={(value) => setValue(value)}
                getChildren={(activeNode) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve([
                        {
                          label: "Child Node",
                          value: `${activeNode.refKey}-0`,
                          children: [],
                        },
                        {
                          label: "Child Node",
                          value: `${activeNode.refKey}-1`,
                          children: [],
                        },
                      ]);
                    }, 1000);
                  })
                }
              />
            </div>
          </Tab>
        </Tabs>
      </Form>
    </div>
  );
};

export default EditAdmin;

const text = (token) => {
  if (!token) {
  } else {
    EditAdmin.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  }
};
