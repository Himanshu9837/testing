import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { Button, Label } from "reactstrap";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Editbadge() {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const badge = router.query.editbadge;
  const [badgedesc, setbadgedesc] = useState("");
  const [badgename, setbadgename] = useState("");
  const [uploadcategoryimg, setcategoryimg] = useState("");
  const [conditionId, setConditionId] = useState("");
  const [conditionss, setconditionss] = useState("");
  const [conditionsss, setconditionsss] = useState("");


  const [categoryimage, setImage] = useState("");
  const [conditions, setconditions] = useState([]);
  const [isCheckedFilter, setcheckfilter] = useState(false);

  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "Upload an Image",
  });
  toast.configure();

  useEffect(() => {
    fetch( apiKey +"api/badges/fetchcondition")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setconditions(data);
      });
  }, []);
  const badgeedit = async () => {
    if (router.isReady) {
      const edit_id = router.query.editbadge;
      let userId = await fetch(
        apiKey +"api/badges/editbadges/" + edit_id
      );
      userId = await userId.json();
      console.log(userId);
      setbadgename(userId.badgename);
      setbadgedesc(userId.badgediscription);
      setcategoryimg(userId.badgesicon);
      setconditionsss(userId.conditionId.conditionname);
      setcheckfilter(userId.badgesenable);
      setconditionss(userId.conditionId._id)
    }
  };
  //   const user_Info=localStorage.getItem('userInfo')
  //   console.log(user_Info);
  useEffect(async () => {
    badgeedit();
  }, [router.isReady]);

  async function updatebadge(e) {
    const arrayOfData = localStorage.getItem("userInfo");
    if (arrayOfData) {
      const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      const cart_data = d.accesstoken;
      console.log(cart_data);
      const BearerToken = cart_data;
    e.preventDefault();
    console.log(conditionss);
    const formData = new FormData();
    formData.append("badgename", badgename);
    formData.append("badgediscription", badgedesc);
    formData.append("badgesenable", isCheckedFilter);
    formData.append("conditionid", conditionss);
    formData.append("badgesicon", categoryimage);

    const confiq = {
        headers: {
            "content-type": "multipart/form-data",
            Token : `${BearerToken}`,

        },
    };
    const url = apiKey +"api/badges/updatebadges/" + badge
    axios
        .post(url, formData, confiq)
        .then((response) => {
            console.log(response.data.message);
            toast.success('Badge Add Successfully');

        })
        .catch((e) => {
            // console.log(e.response.data.error);
            toast.error('Something Wrong');

        });
}
  }
  const handleImage = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setcategoryimg(file);
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };
  const changeids = (e) => {
    console.log(e.target.value);
    setconditionss(e.target.value);
  };
  const checkfiltered = () => {
    setcheckfilter(!isCheckedFilter);
  };
  return (
    <div className="mainbadge_style">
      <h4>Edit Badge</h4>
      <div className="badges_style">
      <div className="right_input new_category">
                <Label className="col-xl-3 col-md-4">
                    Global Enable
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
          <Label className="col-xl-3 col-md-4">Badge Name</Label>
          <div className="badgename">
            <input
              type="text"
              className="badgenameinput"
              onChange={(e) => setbadgename(e.target.value)}
              value={badgename}
            />
          </div>
        </div>
        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">Badge Description</Label>
          <div className="badgename">
            <input
              type="text"
              className="badgenameinput"
              onChange={(e) => setbadgedesc(e.target.value)}
              value={badgedesc}
            />
          </div>
        </div>
        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">Badge Icon</Label>
          <div className="uploadbtn">
            <label className="custom-file-upload">
              <div className="thumbnailbtn">Update</div>
              <input
                type="file"
                onChange={handleImage}
                className="inputdisplay"
              />
            </label>
          </div>
        </div>
        {/* {uploadcategoryimg.length > 0 ? ( */}
        <div className="profileimage1">
          <img src={uploadcategoryimg}
          alt="noss" />
        </div>
        {/* ) : (
        ""
      )} */}

        <div className="right_input new_category">
          <Label className="col-xl-3 col-md-4">Badge Dropdown</Label>
          <div className="uploadbtn">
            <select
              name=""
              id=""
              className="badgedropdown"
              onChange={(e) => {
                changeids(e);
              }}
            >
              <option value="">{conditionsss}</option>
              {conditions.map((condition,index) => (
                <option
                value={condition._id}
                key={index}
                >{condition.conditionname}</option>
              ))}
            </select>
          </div>
        </div>

        <Button
          variant="success"
            onClick={updatebadge}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
Editbadge.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
