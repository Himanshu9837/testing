import { useEffect, useState, useContext } from 'react';
import { Col, Container, Form, Input, Label, Row } from 'reactstrap';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import React from "react";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../checklogin/checklogin.js";

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export const AccountProfileDetails = (props) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });
  const [view, setview] = useState([])
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [currentp, setcurrentpassword] = useState('');
  const [cpassword, setcpassword] = useState('');


  useEffect(() => {
    setloaderspage(true)
    if (Tokens === '') {

    } else {
      // text(Tokens)
      fetch(apiKey + "api/admin/editadmin/619e27004a9a17906c792397").then((result) => {
        result.json().then((resp) => {
          setview(resp.result);
          setfname(resp.result.fname);
          setlname(resp.result.lname);
          setemail(resp.result.email);
          setpassword(resp.result.password);
          setcpassword(resp.result.cpassword);
          console.log(resp)
        })
      })
    }
  }, [Tokens]);

  // async function updateProfile(e) {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('fname', fname);
  //   formData.append('lname', lname);
  //   formData.append('email', email);
  //   formData.append('password', password);
  //   formData.append('cpassword', cpassword);
  //   formData.append('currentpassword', currentpassword);
  //   const confiq = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   const url = 'http://178.62.228.242:5000/api/admin/updateadmin/61ea837e8f05388bc99edaa2';
  //   axios.post(url, formData, confiq).then((response) => {
  //     alert('Profile Updated Successfully');
  //   }).catch((e) => {
  //     alert('noo');
  //  });
  // }



  const updateProfile = async (e) => {
    e.preventDefault();
    const res = await fetch(apiKey + "api/admin/updateadmin/61ea837e8f05388bc99edaa2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname, lname, email, password, cpassword, currentp
      })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("invalid ")
      console.log("invalid ")
    } else {
      window.alert("successful")
      console.log("successful ")
    }
  }




  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      {loaderspage ? (
        <>
          <Checklogin />
          <div className="loader loader1"></div>
        </>
      ) : (
        <form
          autoComplete="off"
          noValidate
          {...props}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Label for="fname">First Name</Label>
                  <Input type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                    placeholder="First Name"
                    required=""
                    defaultValue={view.fname}
                    onChange={(e) => setfname(e.target.value)}
                    //  name="fname"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Label for="fname">Last Name</Label>
                  <Input type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    required=""
                    defaultValue={view.lname}
                    onChange={(e) => setlname(e.target.value)}
                    //  name="lname"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Label for="fname">Email</Label>
                  <Input type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    defaultValue={view.email}
                    onChange={(e) => setemail(e.target.value)}
                    //  name="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >

                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Label for="fname">Current Password</Label>
                  <Input type="password"
                    className="form-control"
                    id="currentpassword"
                    name="currentpassword"
                    placeholder="current password"

                    defaultValue=""
                    onChange={(e) => setcurrentpassword(e.target.value)}
                    //  name="currentpassword"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Label for="fname">Password</Label>
                  <Input type="password"
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
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Label for="fname">Confirm Password</Label>

                  <Input type="password"
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
                <Grid
                  item
                  md={6}
                  xs={12}
                >

                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <button className='savedetails'
              // onClick={updateAdmin}
                onClick={updateProfile}
              >
                Save Details
              </button>
              {/* <Button
                color="primary"
                variant="contained"
              >
                Save details
              </Button> */}
            </Box>
          </Card>
        </form>
      )}
    </>
  );
};
