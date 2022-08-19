import React, { useState ,useContext, useEffect} from "react";
import { DashboardLayout } from '../../components/dashboard-layout';
import Divider from '@material-ui/core/Divider'
import Link from "next/link";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from '../../components/checklogin/checklogin.js';


const SellerConfig = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);

    const [isOpened, setIsOpened] = useState(false);
    const [isOpeneds, setIsOpeneds] = useState(false);

    function sellervarification(e) {
        alert(e)
        fetch(`${apiKey}api/seller/verification/${e}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json()).then((data) => {
            console.log(data)
        })
    }
    function toggle() {
        setIsOpened(wasOpened => !wasOpened);
    }
    function toggles() {
        setIsOpeneds(wasOpened => !wasOpened);
    }

    useEffect(() => {
        setloaderspage(true);
        if (Tokens == '') {

        }else{
            text(Tokens)
        }
    }, [Tokens])
    return (
        <>

            {
                loaderspage ? (
                    <>
                        <Checklogin />
                        <div className="loader loader1"></div>
                    </>
                ) : (
                    <div className="div">
                        <h3>Config</h3>
                        <div className="divided">
                            <div className="partition">
                                <div className="globalstyle">
                                    <div className="globalstyle2">

                                        <div onClick={toggle}
                                            className='globalbtn'>
                                            <p className="text_color">Global</p>
                                        </div>
                                        {/* <div className="divider"></div> */}
                                        <div onClick={toggles}
                                            className='globalbtn'>
                                            <p className="text_color">Withdrawals</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="divider2">
                            </div>
                            <div style={{ width: "70%", marginLeft: "10px" }}
                                className='toggledivs'>
                                {isOpened &&
                                    <div className="partition2">
                                        <h6>Global</h6>
                                        <div className="seller_approval">
                                            <p>Seller approval</p>
                                            <div className="div_error">
                                                <div className="formselectbackend">
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    onChange={(e) => sellervarification(e.target.value)}>
                                                    <option value={true}>Enable</option>
                                                    <option value={false}>Disable</option>
                                                </select>
                                            </div>
                                                <div className="para_div_style">
                                                    <p className="para_style">Need seller approval at starting</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {isOpeneds &&
                                    <div className="partition2">
                                        <h6>Withdrawals</h6>
                                        <div className="seller_approval">
                                            <p>Verification</p>
                                            <div className="div_error">
                                                <div className="formselectbackend1">
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    onChange={(e) => sellervarification(e.target.value)}>
                                                    <option value={true}>Enable</option>
                                                    <option value={false}>Disable</option>
                                                </select>
                                            </div>
                                                <div className="para_div_style">
                                                    <p className="para_style">Need verification before withdrawals request</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

const text = (token) => {
    if (!token) {

    }
    else {

        SellerConfig.getLayout = (page) => (
            <DashboardLayout>
                {page}
            </DashboardLayout>
        );
    }
}
export default SellerConfig;