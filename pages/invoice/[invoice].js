import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";

const Invoice = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [order, setOrder] = useState([]);

    const printReceipt = () => {
        window.print();
    }
    useEffect(() => {
        if (router.isReady) {
            const id2 = router.query.invoice;
            console.log(id2);
        fetch(`${apiKey}api/order/editorder/${id2}`).then((result) => {
          result.json().then((resp) => {
            console.log(resp.result);
            setOrder(resp.result);
          });
        });
    }
      }, [router.isReady]);

    // const getorder = () => {
    //     fetch(apiKey + "api/order/orderlist/")
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data.orderlist);
    //       });
    //   };
    //   useEffect(() => {
    //       getorder();
    //   }, []);
    return (
        <>
            <div className="invoices">
            {order.map((ord, i)=> (
                <>
                <h2
                    className='invoice_title'
                >
                    Thanks for your order
                </h2>
                <span
                    className='invoice_msg'
                >
                    Thanks for shopping with us. We'll send you the tracking number when you item ships.
                </span>

                <div className="orderiddiv">
                    <h5 className="orderid_title">
                        Your Order ID is {ord.id}
                    </h5>
                    <h5 className="orderid_title">
                        Your Invoice ID is {ord.invoiceid}
                    </h5>
                </div>
               
                <table class="print-receipt">
                    <tr>
                        <th
                            className='tableheads'
                        >Product Name</th>
                        <th
                            className='tableheads'
                        >Quantity</th>
                        <th
                            className='tableheads'
                        >Payment Method</th>
                        <th
                            className='tableheads'
                        >Item Price</th>
                        <th
                            className='tableheads'
                        >Total Price</th>

                    </tr>
                    <tr>
                        <td
                            className='tablehead'
                        >{ord.productId.productname}</td>
                        <td
                            className='tablehead'
                        >{ord.quantity}</td>
                         <td
                            className='tablehead'
                        >{ord.paymentmode}</td>
                        <td
                            className='tablehead'
                        >{ord.productId.price}</td>
                        <td
                            className='tablehead'
                        >{ord.productId.price * ord.quantity}</td>
                    </tr>
                </table>
                <div className="pricediv">
                    <table
                        className='subtotal'
                    >

                        <tr>
                            <td>Subtotal:</td>
                            <td>{ord.productId.price * ord.quantity}</td>
                        </tr>
                        <tr>
                            <td>Paymentfee:</td>
                            <td>{ord.paymentfee}</td>
                        </tr>
                        <tr>
                            <td>Grand Total:</td>
                            <td>{ord.productId.price * ord.quantity + ord.paymentfee}</td>
                        </tr>
                    </table>
                </div>
                </>
               ))}


                <div className="printbtn">
                    <button
                        className='hide-on-print'
                        onClick={printReceipt}>
                        Download
                    </button>
                </div>
            </div>





        </>
    )
}

export default Invoice