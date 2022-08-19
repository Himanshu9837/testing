import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
toast.configure();
const notify = (message) => toast(message);
function Page() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const [isOpened3, setIsOpened3] = useState(false);
  const [pagename, setPagename] = useState("");
  const [metadescription, setmetadescription] = useState("");
  const [metatitle, setmetatitle] = useState("");
  const [metakeyword, setmetakeyowrd] = useState("");
  const [pagedata, setPagedata] = useState([]);
  const [pageid, setPageid] = useState("");
  const [activeIndex, setActiveIndex] = React.useState("");

  function toggle3() {
    setIsOpened3(!isOpened3);
  }

  useEffect(() => {
    fetch(`${apiKey}api/admin/listmetapages/`).then((res) => {
      res.json().then((data) => {
        setPagedata(data);
      });
    });
  }, []);
  const editpage = (id) => {
    setPageid(id);
    fetch(`${apiKey}api/admin/editmetapages/${id}`).then((res) => {
      res.json().then((data) => {
        setmetadescription(data.metadescription);
        setmetakeyowrd(data.metakeyword);
        setmetatitle(data.metatitle);
        setPagename(data.pagename);
      });
    });
  };
  const changecolor = (i) => {
    setActiveIndex(i);
  };
  async function updatepagedata(e) {
    e.preventDefault();
    const data = {
      metatitle: metatitle,
      metakeyword: metakeyword,
      metadescription: metadescription,
      pagename: pagename,
    };

    fetch(`${apiKey}api/admin/updatemetapages/${pageid}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        notify("Update successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Row>
      <Col sm="12">
        <Card>
          <CardHeader>
            <h5>Page</h5>
          </CardHeader>
          <CardBody>
            <div className="page_style">
              <div className="alerts">
                <ToastContainer autoClose={2000} />
              </div>
              <div className="page_main_style">
                <div className="page_first_part">
                  <ul className="page_codition">
                    {pagedata.map((con, index) => (
                      <li
                        key={index}
                        className={`page_conditionlist ${
                          activeIndex === index ? "active" : ""
                        }`}
                        onClick={() => {
                          editpage(con._id), changecolor(index);
                        }}
                      >
                        {con.pagename}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="page_line_style"></div>
                <div className="page_second_parth">
                  <div className="toogles" onClick={toggle3}>
                    <h2 className="showinputss">SEO</h2>
                    <KeyboardArrowDownIcon />
                  </div>
                  <div className={`flexdiv ${isOpened3 ? "active" : ""}`}>
                    <div className="right_input new_category">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span>Meta Description
                      </Label>
                      <div className="categoryforminput">
                        <Input
                          className="form-control col-md-12"
                          id="validationCustom0"
                          type="text"
                          required=""
                          onChange={(e) => setmetadescription(e.target.value)}
                          defaultValue={metadescription}
                          name="name"
                        />
                      </div>
                    </div>
                    <div className="right_input new_category">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span>Meta Keyword
                      </Label>
                      <div className="categoryforminput">
                        <Input
                          className="form-control col-md-12"
                          id="validationCustom0"
                          type="text"
                          required=""
                          onChange={(e) => setmetakeyowrd(e.target.value)}
                          defaultValue={metakeyword}
                          name="name"
                        />
                      </div>
                    </div>
                    <div className="right_input new_category">
                      <Label className="col-xl-3 col-md-4">
                        <span>*</span>Meta Title
                      </Label>
                      <div className="categoryforminput">
                        <Input
                          className="form-control col-md-12"
                          id="validationCustom0"
                          type="text"
                          required=""
                          onChange={(e) => setmetatitle(e.target.value)}
                          defaultValue={metatitle}
                          name="name"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      style={{ marginLeft: "1rem" }}
                      color="primary"
                      onClick={(e) => updatepagedata(e)}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
