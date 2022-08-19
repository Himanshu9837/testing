import React from "react";
import {DashboardLayout} from '../../components/dashboard-layout';
import Seller from './seller';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';


const Global =() =>{
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    function sellervarification(e) {
        alert(e)
        fetch(`http://178.62.228.242:5000/api/seller/verification/${e}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json()).then((data) => {
            console.log(data)
        })
    }
    return(
        <div className="flex_div">
            <div className="partition3">
        <Seller />
            </div>
            {/* <div className="partition2">
                <h6>Global</h6>
                <div className="seller_approval">
                    <p>Seller approval</p>
                   <div className="div_error">
                       <select className="form-select" aria-label="Default select example"  onChange={(e) => sellervarification( e.target.value)}>
                           <option value={true}>Enabal</option>
                           <option value={false}>Disabal</option>
                       </select>
                       <div className="para_div_style">
                           <p className="para_style">Need seller approval at starting</p>
                       </div>
                   </div>
                </div>
            </div> */}
        </div>
    )
}
Global.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Global;