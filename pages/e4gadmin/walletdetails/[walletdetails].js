import React, { useContext, useEffect, useState } from 'react';
import { DashboardLayout } from "../../../components/dashboard-layout";
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
const user = {
    avatar: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',
};
import { Col, Container, Form, Input, Label, Row } from 'reactstrap';
import Contextapi from "../../../Context/Contextapi.js";
import Checklogin from '../../../components/checklogin/checklogin.js';
import { useRouter } from "next/router";




const Walletdetails = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

    const router = useRouter();
    const edit_id = router.query.walletdetails;
    const [userdata, setuserdata] = useState([]);

    useEffect(async () => {
        setloaderspage(true)
        if (Tokens === '') {

        } else {
            text(Tokens)
            fetch(apiKey + "api/withdrawal_wallet/withdrawaldatadetails/" + edit_id)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setuserdata(data)
                })
        }
    }, [router.isReady, Tokens]);
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
                >
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >

                        </Box>
                    </CardContent>
                    <Card>
                        <CardHeader
                            subheader="You can see wallet details"
                            title="Wallet Details"
                        />
                        <Divider />
                        <CardContent>

                            {
                                userdata.paymethod == 'bank' ? (

                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <Label for="fname">Amount</Label>
                                            <Input type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                placeholder="Amount"
                                                required=""
                                                defaultValue={userdata.amount}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <Label for="fname">Account Holdername</Label>
                                            <Input type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                placeholder="Accont holdername"
                                                required=""
                                                defaultValue={userdata.paydetails.accountholdername}

                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <Label for="fname">Bank</Label>
                                            <Input type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                placeholder="bank"
                                                required=""
                                                defaultValue={userdata.paydetails.bank}

                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <Label for="fname">IFSC</Label>
                                            <Input type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                placeholder="ifsc code"
                                                required=""
                                                defaultValue={userdata.paydetails.ifsc}
                                                disabled
                                                variant="outlined"
                                                readonly
                                            />
                                        </Grid>








                                    </Grid>
                                ) : (
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <Label for="fname">Amount</Label>
                                            <Input type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                placeholder="Amount"
                                                required=""
                                                defaultValue={userdata.amount}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <Label for="fname">Payment Details</Label>
                                            <Input type="text"
                                                className="form-control"
                                                id="fname"
                                                name="fname"
                                                placeholder="Payment details"
                                                required=""
                                                defaultValue={userdata.paydetails}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>

                                    </Grid>
                                )
                            }

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
                            {/* <button className='savedetails'
                                    // onClick={updateAdmin}
                                >
                                    Save details
                                </button> */}
                            {/* </Button> */}
                        </Box>
                    </Card>
                </form>
            )
            }
        </>
    )
}

export default Walletdetails

const text = (token) => {
    if (!token) {

    }
    else {

        Walletdetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
    }
}