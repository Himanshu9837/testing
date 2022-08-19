import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import Image from "next/image";
import PhoneInput from 'react-phone-input-2'
import PasswordStrengthMeter from "../../components/common/passwordmeter";
import Select from "react-select";
import countryList from "react-select-country-list";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";
import Contextapi from "../../Context/Contextapi.js";
import Checklogin from "../../components/checklogin/checklogin.js";

const Createcustomer = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const { loaderspage, Tokens, setloaderspage } = useContext(Contextapi);
  console.log(Tokens);

  const [phone, setValue] = useState("");
  const [strength, setStrength] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [errorN, setErrorN] = useState("");
  const [errorU, setErrorU] = useState("");
  const [errorL, setErrorL] = useState("");
  const [errorS, setErrorS] = useState("");
  const [allerror, setallErros] = useState("");
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    dateofbirth: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleCountry = (value) => {
    setCountry(value.label);
  };

  const handleValid = (e) => {
    let value = e.target.value;
    let number = /[0-9]/g;
    let upperCaseLetters = /[A-Z]/g;
    let lowerCaseLetters = /[a-z]/g;
    let sepcialCharacters = /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/;
    setDisable(true);
    setStrength(e.target.value);
    if (value.length >= 8) {
      setError("");
    } else {
      setError(`Password must be 0-8 Characters long`);
    }
    if (!value.match(number)) {
      setErrorN(`Passoword must contain one Number`);
    } else {
      setErrorN("");
    }
    if (!value.match(upperCaseLetters)) {
      setErrorU(`Passoword must contain one Uppercase`);
    } else {
      setErrorU("");
    }
    if (!value.match(lowerCaseLetters)) {
      setErrorL(`Passoword must contain one Lowercase`);
    } else {
      setErrorL("");
    }
    if (!value.match(sepcialCharacters)) {
      setErrorS(`Passoword must contain one Special character`);
    } else {
      setErrorS("");
    }
    if (
      value.length >= 8 &&
      value.match(upperCaseLetters) &&
      value.match(number) &&
      value.match(lowerCaseLetters) &&
      value.match(sepcialCharacters)
    ) {
      setallErros("");
    } else {
      setallErros("leas fill all");
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    setCountry();
    setValue();

    country;
    console.log(country);
    const {
      fname,
      lname,
      dateofbirth,
      address,
      zipcode,
      city,
      email,
      password,
      cpassword,
    } = user;

    const res = await fetch(apiKey + "api/userregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        dateofbirth,
        address,
        zipcode,
        city,
        country,
        phone,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("invalid ");
      console.log("invalid ");
    } else {
      window.alert("successful");
      console.log("successful ");
    }
  };

  const [key, setKey] = useState("profile");

  useEffect(() => {
    setloaderspage(true);
    if (Tokens == "") {
    } else {
      text(Tokens);
    }
  }, [Tokens]);

  return (
    <>
      {loaderspage ? (
        <>
          <Checklogin />
          <div className="loader loader1"></div>
        </>
      ) : (
        <>
          <section className="main">
            <div
              style={{ textAlign: "right", marginTop: "50px", padding: "10px" }}
            >
              <button type="button" className={"update_btn"} onClick={PostData}>
                Save
              </button>
            </div>
            <Container>
              <Row>
                <Col lg="12">
                  <div>
                    <Form method="POST">
                      <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                      >
                        <Tab eventKey="profile" title="Profile">
                          <div className={"row_top"}>
                            <Row>
                              <Col md="4">
                                <Label for="fname">First Name</Label>
                                <Input
                                  type="text"
                                  className="form-control1"
                                  id="fname"
                                  name="fname"
                                  placeholder="First Name"
                                  required=""
                                  value={user.fname}
                                  onChange={handleInputs}
                                />
                              </Col>
                              <Col md="4">
                                <Label for="lname">Last Name</Label>
                                <Input
                                  type="text"
                                  className="form-control1"
                                  id="lname"
                                  placeholder="Last Name"
                                  name="lname"
                                  value={user.lname}
                                  onChange={handleInputs}
                                  required=""
                                />
                              </Col>
                              <Col md="4">
                                <Label for="dateofbirth">Date of Birth</Label>
                                <Input
                                  type="date"
                                  className="form-control1"
                                  id="dateofbirth"
                                  placeholder="Date of Birth"
                                  value={user.dateofbirth}
                                  onChange={handleInputs}
                                  name="dateofbirth"
                                  required=""
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className={"row_top"}>
                            <row>
                              <Col md="12">
                                <Label for="address">Address</Label>
                                <Input
                                  type="text"
                                  className="form-control1"
                                  id="address"
                                  placeholder="address"
                                  value={user.address}
                                  onChange={handleInputs}
                                  name="address"
                                  required=""
                                />
                              </Col>
                            </row>
                          </div>
                          <div className={"row_top"}>
                            <Row>
                              <Col md="4">
                                <Label for="city">City</Label>
                                <Input
                                  type="text"
                                  className="form-control1"
                                  id="city"
                                  placeholder="Enter your city"
                                  value={user.city}
                                  onChange={handleInputs}
                                  name="city"
                                  required=""
                                />
                              </Col>
                              <Col md="4">
                                <Label for="country">Country</Label>
                                <Select
                                  className="country_select"
                                  value={value}
                                  onChange={handleCountry}
                                  options={options}
                                  name="country"
                                  required=""
                                />
                              </Col>
                              <Col md="4">
                                <Label for="zipcode">Zipcode</Label>
                                <Input
                                  type="number"
                                  className="form-control1"
                                  id="zipcode"
                                  placeholder="Enter your Zipcode"
                                  value={user.zipcode}
                                  onChange={handleInputs}
                                  name="zipcode"
                                  required=""
                                />
                              </Col>
                            </Row>
                          </div>
                          {/*<a href="#" className="btn_update" onClick={updateProfile}>Update Account</a>*/}
                        </Tab>
                        <Tab eventKey="password" title="Security">
                          <div className={"row_top"}>
                            <Row>
                              <Col md="6">
                                <Label for="email">email</Label>
                                <Input
                                  type="text"
                                  className="form-control1"
                                  id="email"
                                  placeholder="Email"
                                  value={user.email}
                                  onChange={handleInputs}
                                  name="email"
                                  required=""
                                />
                              </Col>
                              <Col md="6">
                                <Label for="phone">Phone</Label>
                                <PhoneInput
                                  id="phone"
                                  placeholder="Enter your number"
                                  value={user.valuePhone}
                                  onChange={setValue}
                                  name="valuePhone"
                                  required=""
                                />

                              </Col>
                            </Row>
                          </div>
                          <div className={"row_top"}>
                            <Row>
                              <Col md="4">
                                <Label for="password">Password</Label>
                                <Input
                                  type="password"
                                  className="form-control1"
                                  id="password"
                                  placeholder="Enter your password"
                                  name="password"
                                  value={user.password}
                                  onChange={handleInputs}
                                  onKeyUp={handleValid}
                                  required=""
                                />
                                <PasswordStrengthMeter password={strength} />
                                {allerror == "" ? null : (
                                  <div>
                                    {disable && (
                                      <ul className="register_passowrd_validation">
                                        {allerror ? (
                                          <h5>
                                            Suggestions for Strong Password 🔑
                                          </h5>
                                        ) : null}
                                        <div>{error}</div>
                                        <div>{errorU}</div>
                                        <div>{errorL}</div>
                                        <div>{errorS}</div>
                                        <div>{errorN}</div>
                                      </ul>
                                    )}
                                  </div>
                                )}
                              </Col>
                              <Col md="4">
                                <span className="valid">*</span>{" "}
                                <Label for="cpassword">Confirm Password</Label>
                                <Input
                                  type="password"
                                  style={{ marginBottom: "10px" }}
                                  className="form-control1"
                                  id="cpasword"
                                  placeholder="confirm password"
                                  value={user.cpassword}
                                  onChange={handleInputs}
                                  name="cpassword"
                                  required=""
                                />
                              </Col>
                            </Row>
                          </div>
                        </Tab>
                      </Tabs>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
    </>
  );
};

const text = (token) => {
  if (!token) {
  } else {
    Createcustomer.getLayout = (page) => (
      <DashboardLayout>{page}</DashboardLayout>
    );
  }
};
export default Createcustomer;
