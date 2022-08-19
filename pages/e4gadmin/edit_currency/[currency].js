import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useRouter } from 'next/router'
import {
    Label,
} from "reactstrap";
import { toast } from "react-toastify";

const Currencys = () => {
    const router = useRouter()
    const pid = router.query

    const [currencyname, setcurrencyname] = useState('');
    const [countryname, setcountryname] = useState('');

    const [isCheckedFilter, setcheckfilter] = useState(false);


    toast.configure();

    const checkfiltered = () => {
        setcheckfilter(!isCheckedFilter);
    };
    console.log(isCheckedFilter);


    useEffect(() => {

        if (router.isReady) {
            fetch(`http://178.62.228.242:5000/api/currency/editcurrency/${pid.currency}`)
                .then((res) => res.json())
                .then((data) => {
                    setcurrencyname(data.currencyname)
                    setcountryname(data.countryname)
                    setcheckfilter(data.isenable)
                })

        }

    }, [router.isReady])

    const Updatecurrency = (e) => {
        e.preventDefault();
        const data = { currencyname: currencyname, countryname: countryname, isenable: isCheckedFilter };
        fetch(`http://178.62.228.242:5000/api/currency/updatefetchcurrency/${pid.currency}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                toast.success(' Price Update  Successfully');
            })
            .catch((error) => {
                toast.error('Something Went Wrong');
            });

    }
    return (
        <>
            <div className="currency">
                <div className="currheading">
                    <h1 className="editcurrency">Edit Currency</h1>
                </div>




                <div className="currencyinner">
                    <div className="right_input new_category">
                        <Label className="col-xl-3 col-md-4">
                            <span>*</span>Global Enable
                        </Label>
                        <div className="categoryforminput">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    onChange={checkfiltered}
                                    checked={isCheckedFilter}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="right_input new_category">
                        <Label className="col-xl-3 col-md-4">
                            Currency Name
                        </Label>
                        <div className="categoryforminput">
                            <input type="text"
                                name=''
                                onChange={(e) => setcurrencyname(e.target.value)}
                                placeholder="currency name"
                                className='changecurr'
                                defaultValue={currencyname} />
                        </div>
                    </div>

                    <div className="right_input new_category">
                        <Label className="col-xl-3 col-md-4">
                            Country Name
                        </Label>
                        <div className="categoryforminput">
                            <input
                                type="text"
                                name=''
                                onChange={(e) => setcountryname(e.target.value)}
                                placeholder="country name"
                                className='changecurr'
                                defaultValue={countryname} />
                        </div>
                    </div>
                    <div className="right_input new_category">
                        <div className="categoryforminput">
                            <button className="priceupdates"
                            onClick={(e) => Updatecurrency(e)}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}

Currencys.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Currencys
