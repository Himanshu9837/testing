import React, { useEffect, useState, useContext } from 'react'
import { DashboardLayout } from '../../components/dashboard-layout';
import DeleteIcon from '@mui/icons-material/Delete';
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from '../../components/checklogin/checklogin.js';






const Configuration = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);
    const [count, setCount] = useState(0);
    const [data, setdata] = useState([]);
    const [paymentfee, setpaymentfee] = useState('');

    useEffect(() => {
        setloaderspage(true)
        if (Tokens === '') {
            // alert('kk')
        } else {
            // alert('kll')
            text(Tokens)
            fetch(`${apiKey}api/withdrawal_wallet/enablepaymentmethode/`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setdata(data)
                })
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

                    <div className="configuration">
                        <h2 className="paymentfeessetting">
                            Payment Fee Setting
                        </h2>
                        <div className="paymentdetailsoption">
                            <div className="singledetailoption">
                                <h5 className="detailshead">
                                    Price Type
                                </h5>
                                <div className="detailsdropdown">
                                    <select
                                        name=""
                                        id=""
                                        className='selecteddropdowns' >
                                        <option
                                            value=""
                                            selected>
                                            Percentage + fixed price
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="singledetailoption">
                                <h5 className="detailshead">
                                    Refund fees
                                </h5>
                                <div className="detailsdropdown">
                                    <select
                                        name=""
                                        id=""
                                        className='selecteddropdowns' >
                                        <option
                                            value=""
                                            selected>
                                            Yes
                                        </option>
                                        <option
                                            value="" >
                                            No
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="singledetailoption">
                                <h5 className="detailshead">
                                    Refund fees
                                </h5>
                                <div className="rightsidediv">
                                    <div className="rightsidehead">
                                        <h5 className="paymentcode">
                                            Payment
                                            <br />
                                            Method - Code
                                        </h5>
                                        <h5 className="paymentcode">
                                            Percent Amount
                                        </h5>
                                        <h5 className="paymentcode">
                                            %
                                            <br />
                                            Amount
                                        </h5>
                                        <h5 className="paymentcode">
                                            Fix
                                            Amount
                                        </h5>
                                        <h5 className="paymentcode">
                                            %
                                            <br />
                                            Amount
                                        </h5>
                                        <h5 className="paymentcode">
                                            <br />
                                            Action
                                        </h5>
                                    </div>
                                    <hr />





                                    {

                                        data.map((datas, index) => (
                                            <div
                                                className="rightsidedetailss"
                                                key={index}
                                            >
                                                <select
                                                    name=""
                                                    id="">
                                                    <option
                                                        value="">
                                                        {datas.paymentgateway}
                                                    </option>
                                                </select>

                                                <div className="inputone">

                                                    <input
                                                        type="number"
                                                        value={datas.payementfee} />
                                                </div>
                                                <div className="inputone">
                                                    <input
                                                        type="number"
                                                        value={datas.payementfeegst} />
                                                </div>
                                                <div className="inputone">
                                                    <input
                                                        type="number"
                                                        value={datas.payementfixamountfee} />
                                                </div>
                                                <div className="inputone">
                                                    <input
                                                        type="number"
                                                        value={datas.payementfixamountfeegst} />
                                                </div>


                                                <div className="inputone">
                                                    <DeleteIcon />
                                                </div>
                                            </div>
                                        ))
                                    }



                                    <hr />
                                    {[...Array(count)].map((_, index) =>
                                        <div
                                            key={index}
                                        >
                                            <div
                                                className="rightsidedetailss">
                                                <select
                                                    name=""
                                                    id="">
                                                    {
                                                        data.map((datass, index) => (
                                                            <option
                                                                value=""
                                                                key={index}
                                                            >
                                                                {datass.paymentgateway}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                <div className="inputone">
                                                    <input type="text" />
                                                </div>
                                                <div className="inputone">
                                                    <input type="text" />
                                                </div>
                                                <div className="inputone">
                                                    <input type="text" />
                                                </div>
                                                <div className="inputone">
                                                    <input type="text" />
                                                </div>
                                                <div className="inputone">
                                                    <DeleteIcon />
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )}
                                    <div className="addfees">
                                        <button className="addfeesbtn"
                                            onClick={() => setCount(count + 1)}>
                                            Add Fees
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

const text = (token) => {
    if (!token) {

    }
    else {
        Configuration.getLayout = (page) => (
            <DashboardLayout>
                {page}
            </DashboardLayout>
        );
    }
}
export default Configuration;