import React from "react";
import {DashboardLayout} from '../components/dashboard-layout';
import Seller from './seller';

const Withdrawls =() =>{
    return(
        <div className="flex_div">
            <div className="partition3">
                <Seller />
            </div>
            <div className="partition2">
                <h6>Withdrawals</h6>
                <div className="seller_approval">
                    <p>Verification</p>
                    <div className="div_error">
                        <select
                        className="form-select"
                         aria-label="Default select example"
                          onChange={(e) => sellervarification( e.target.value)}>
                            <option value={true}>Enable</option>
                            <option value={false}>Disable</option>
                        </select>
                        <div className="para_div_style">
                            <p className="para_style">Need verification before withdrawals request</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
Withdrawls.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Withdrawls;