import React, { useContext } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Input, Label, Row } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/router'
import Checklogin from '../../components/checklogin/checklogin.js';
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

} from '@mui/material';
import Contextapi from "../../Context/Contextapi.js";

const user = {
    avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',
};






const Addadmin = () => {

    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

    //all usestate
    const [adminview, setadminview] = useState([])
    const [lname, setlname] = useState('');
    const [fname, setfname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [cpassword, setcpassword] = useState('');

    const [admin,setadmin]=useState(false)
    const [author,setauthor]=useState(false)
    const [publisher,setpublisher]=useState(false)
    const [modifier,setmodifier]=useState(false)

    const router = useRouter()
    // const adminid = router.query.editadmin
    // console.log(adminid);

    toast.configure();


    useEffect(() => {


        setloaderspage(true)
        if (Tokens === '') {

        } else {
            text(Tokens)
            // getadmin()
        }

    }, [Tokens])


    // update admin user
    const updateAdmin = async (e) => {
        // alert('update')
        e.preventDefault();

        const res = await fetch(`${apiKey}api/admin/adminregister/`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, lname, email, password, cpassword,admin,author,publisher,modifier
            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            toast.error("Invalid");
        } else {
            toast.success("Successfully Create Admin");

            router.push('/E4gadmin/admin')
        }
    }
    const checkfiltered=()=>{
        setadmin(!admin)
    }
    const checkfiltered2=()=>{
        setauthor(!author)
    }
    const checkfiltered3=()=>{
        setpublisher(!publisher)
    }
    const checkfiltered4=()=>{
        setmodifier(!modifier)
    }




    // console.log(adminview);
    return (
        <>

            {
                loaderspage ? (
                    <>
                        <Checklogin />
                        <div className="loader loader1"></div>
                    </>
                ) : (
                    <form
                        autoComplete="off"
                        noValidate
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Avatar
                                    src={user.avatar}
                                    sx={{
                                        height: 64,
                                        mb: 2,
                                        width: 64
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
                                            defaultValue={adminview.fname}
                                            onChange={(e) => setfname(e.target.value)}
                                            // name="fname"
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
                                            defaultValue={adminview.lname}
                                            onChange={(e) => setlname(e.target.value)}
                                            // name="lname"
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
                                            defaultValue={adminview.email}
                                            onChange={(e) => setemail(e.target.value)}
                                            // name="email"
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

                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
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

                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
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

                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
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
                                {/* <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={updateAdmin}
                                > */}
                                <button className='savedetails'
                                    onClick={updateAdmin}
                                >
                                    Save details
                                </button>
                                {/* </Button> */}
                            </Box>
                        </Card>
                    </form>
                )
            }
        </>
    )
};

export default Addadmin;



const text = (token) => {
    if (!token) {

    }
    else {
        Addadmin.getLayout = (page) => (
            <DashboardLayout>
                {page}
            </DashboardLayout>
        )
    }

}