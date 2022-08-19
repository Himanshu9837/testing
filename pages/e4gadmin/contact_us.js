import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Label } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

toast.configure();
const notify = (message) => toast(message);
const Contact_us = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [heading, setHeading] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetch(`${apiKey}api/pages/editcmpnydetails/`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setHeading(data.contactusheading);
        setEmail(data.esportsemail);
        setPhone(data.mobile);
        setaddress(data.address);
        setId(data._id);
      });
    });
  }, []);
  async function updateUser(e) {
    e.preventDefault();
    const data = {
      contactusheading: heading,
      esportsemail: email,
      mobile: phone,
      address: address,
    };

    fetch(`${apiKey}api/pages/updatecmpnydetails/${id}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        notify("Update succesfully");

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="contact_main_style">
        <div className="alerts">
          <ToastContainer autoClose={2000} />
        </div>
      <div>
        <h1>Contact Us</h1>
      </div>
      <div className="contact_input_style">
        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">
            <span>*</span>Contact Us Heading
          </Label>
          <div className="categoryforminput">
            <textarea
              type="text"
              className="contact_textarea"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
        </div>
        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">
            <span>*</span>Mobile Number
          </Label>
          <div className="categoryforminput">
            <input
              type="number"
              className="contact_textarea2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">
            <span>*</span>Address
          </Label>
          <div className="categoryforminput">
            <textarea
              type="text"
              className="contact_textarea"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
        </div>
        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">
            <span>*</span>Email
          </Label>
          <div className="categoryforminput">
            <input
              type="email"
              className="contact_textarea2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">
            <span>*</span>Select Email
          </Label>
          <div className="categoryforminput">
            <select type="email" className="contact_textarea_select">
              <option>email1</option>
              <option>email2</option>
              <option>email3</option>
            </select>
          </div>
        </div>
        <div className="contact_button">
          <button
            type="button"
            className="contact_backend_button"
            onClick={(e) => updateUser(e)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
Contact_us.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Contact_us;
