import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
// import router from 'next/router'
import { useRouter } from "next/router";

const View = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [key, setKey] = useState("home");
  const [view, setview] = useState([]);
  const [mood, setMood] = useState([]);

  const router = useRouter();
  const vieworder = router.query.view;
  console.log(vieworder);
  useEffect(() => {
    fetch(`${apiKey}api/order/editorder/${vieworder}`).then((result) => {
      result.json().then((resp) => {
        // console.log(resp.result.orders);
        setview(resp.result);
        var data = resp.result.map((i, index) => i.paymentmode);
        console.log(data);
        setMood(data);
      });
    });
  }, [vieworder]);
  console.log(view.itemname);

  const printReceipt = () => {
    window.print();
}
  return (
    <>
      {mood == "paypal"
        && view.map((views, index) => (
            <div className="conatiner_order" key={index}>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="Information">
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>Order Number</td>
                        <td>{views.id}</td>
                      </tr>
                      <tr>
                        <td>Customer Name</td>
                        {views.orders.map((i) =>
                          i.purchase_units.map(
                            (is) => is.shipping.name.full_name
                          )
                        )}
                      </tr>
                      <tr>
                        <td>Email</td>
                        {views.orders.map((i, index) => (
                          <td key={index}>{i.payer.email_address}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Product Name</td>
                        {/* {views.orders.map((i) =>
                          i.purchase_units.map(
                            (is) => is.shipping.address.address_line_1
                          )
                        )} */}
                        {views.productId.productname}
                      </tr>
                      <tr>
                        <td>Payment</td>
                        <td>{views.paymentmode}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="profile" title="Order Total">
                  <div className="order-total">
                    <div className="order-total-wrapper">
                      <Table striped bordered hover size="sm">
                        <tbody>
                          {views.quantity ? (
                            <tr>
                              <td>Quantity</td>
                              <td>{views.quantity}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <td>Product Status</td>
                            <td>{views.order_status}</td>
                          </tr>
                          <tr>
                            <td>Price Per Unit</td>
                            <td>
                            {views.orders.map((i) =>
                              i.purchase_units.map((is) =>
                                  <td key={index}>{is.amount.value}</td>
                              )
                            )}
                            </td>
                          </tr>


                          <tr>
                            <td>Paymet Status</td>
                            {views.orders.map((i) =>
                              i.purchase_units.map((is) =>
                                is.payments.captures.map((inn, index) => (
                                  <td key={index}>{inn.status}</td>
                                ))
                              )
                            )}
                          </tr>
                          <tr>
                            <td>Transcation Id</td>
                            <td>{views.transactionId}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="totalprice">
                      <div>
                        <Table responsive="sm">
                          <thead>
                            <tr>
                              <th>Grand Total</th>
                            </tr>
                            <td>{views.productId.price * views.quantity - views.paymentfee}</td>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sub-Total</td>
                              <td>{views.productId.price * views.quantity}</td>
                            </tr>
                            {/* <tr>
                              <td>Shipping & Handling</td>
                              <td>$0.00</td>
                            </tr> */}
                            <tr>
                              <td>Payment Fee</td>
                              <td>{views.paymentfee}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="contact" title="Invoice">
                  {/* <Table responsive="sm">
                    <tbody>
                      <tr>
                        <td>Order Id:</td>
                        <td>{views._id}</td>
                      </tr>
                      <tr>
                        <td>Evidance</td>
                        <td>---</td>
                      </tr>
                    </tbody>
                  </Table> */}
                  <div className="invoices">
            {view.map((ord, i)=> (
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
                    <p className="orderid_msg">
                        A summary of your order is shown belown.To view the status of your order.
                    </p>
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
                </Tab>
              </Tabs>
            </div>
          ))
        }
        {mood == "wallet"
        && view.map((views, index) => (
            <div className="conatiner_order" key={index}>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="Information">
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>Order Number</td>
                        <td>{views.id}</td>
                      </tr>
                      <tr>
                        <td>Customer Name</td>
                        {views.fullname}
                      </tr>
                      <tr>
                        <td>Email</td>
                          <td key={index}>{views.email}</td>
                      </tr>
                      <tr>
                        <td>Product Name</td>
                        {views.productId.productname}
                      </tr>
                      <tr>
                        <td>Payment</td>
                        <td>{views.paymentmode}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="profile" title="Order Total">
                  <div className="order-total">
                    <div className="order-total-wrapper">
                      <Table striped bordered hover size="sm">
                        <tbody>
                          {views.quantity ? (
                            <tr>
                              <td>Quantity</td>
                              <td>{views.quantity}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <td>Product Status</td>
                            <td>{views.order_status}</td>
                          </tr>
                          <tr>
                            <td>Price Per Unit</td>
                            <td>
                                {views.orders}
                            </td>
                          </tr>


                          <tr>
                            <td>Paymet Status</td>
                            {views.status}
                          </tr>
                          <tr>
                            <td>Transcation Id</td>
                            <td>{views.transactionId}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="totalprice">
                      <div>
                        <Table responsive="sm">
                          <thead>
                            <tr>
                              <th>Grand Total</th>
                              <td>{views.productId.price * views.quantity - views.paymentfee}</td>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Sub-Total</td>
                              <td>{views.productId.price * views.quantity}</td>
                            </tr>
                            {/* <tr>
                              <td>Shipping & Handling</td>
                              <td>$0.00</td>
                            </tr> */}
                            <tr>
                              <td>Payment Fee</td>
                              <td>{views.paymentfee}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="contact" title="Invoice">
                <div className="invoices">
            {view.map((ord, i)=> (
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
                        Your Invoice ID is #{ord.invoiceid}
                    </h5>
                    <p className="orderid_msg">
                        A summary of your order is shown belown.To view the status of your order.
                    </p>
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
                </Tab>
              </Tabs>
            </div>
          ))
        }
    </>
  );
};

export default View;

View.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
