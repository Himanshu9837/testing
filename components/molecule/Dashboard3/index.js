import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Table from "../Table/Table";
import Inputfield from "../inputfield/inputfield";
import { useState } from "react";
import Userprofile from "../../../public/images/userprofile.jpg";
import Image from "next/image";

// import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard3 = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  // use state initalize
  // const [filter, setfilter] = useState(false)
  const [toggle, settoggle] = useState(false);
  const [order, setorder] = useState([]);
  const [timeout, setTimeout] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [gamedata, setGameData] = useState([]);

  const [selectoption, setselectoption] = useState("This is Order Id");
  const selectoptions = (e) => {
    const selectedOption = e.target.value;
    setselectoption(selectedOption);
  };
  // // toggle filter
  const toggledropdown = () => {
    settoggle(!toggle);
  };
  const head = {
    props1: "Order id",
    props2: "Product Name",
    props3: "Qty",
    props4: "Price",
    props5: "Amount",
    props6: "Seller",
    props7: "Date",
    props8: "Game",
    props9: "Status",
    props10: "View Order",
  };

  const buyerorder = (localid) => {
    fetch(`${apiKey}api/order/buyerorderlist/${localid}`)
      .then((res) => res.json())
      .then((data) => {
        setorder(data.orderlist);
        setTimeout(data.datearray);
        setFilteredData(data.orderlist);
        setGameData(data.gamedata);
      });
  };

  useEffect(() => {
    const arrayOfData = localStorage.getItem("user");
    const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
    const cart_data = d.tokenData.id;
    buyerorder(cart_data);
  }, []);

  const handleSearch = (event) => {
    if (selectoption == "orderid") {
      let value = event.target.value;
      let array = "";
      let result = [];
      result = order.filter(function (data, i) {
        return Object.values(data.id)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredData(result);
    } else if (selectoption == "productname") {
      let value = event.target.value;
      let result = [];
      result = order.filter(function (data, i) {
        return Object.values(data.productId.productname)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredData(result);
    } else if (selectoption == "sellername") {
    }
  };

  return (
    <>
          <h2 className="purchase">PURCHASE ORDER</h2>
          {/* <Inputfield/> */}

          <div className="dashboard_style_bg">
            <div className="input-title">
              <div className="boxsearches">
                <div className="selectboxes_dashboard">
                  <select
                    name="searchitem"
                    id="select"
                    className="searchoption"
                    onChange={(e) => {
                      selectoptions(e);
                    }}
                  >
                    <option value="selectall">Search All</option>
                    <option value="orderid">OrderId</option>
                    <option value="productname">Product Name</option>
                    <option value="sellername">Seller Name</option>
                  </select>
                </div>
                <div className="serachboxs">
                  <input
                    type="text"
                    name="search"
                    className="inputype"
                    placeholder="Search games"
                    onChange={(event) => handleSearch(event)}
                  />
                  <div className="search">
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="filter">
              {filteredData.length <= 0 ? (<div>
                No product found
              </div>) : 
              <Table
                {...head}
                prop={order}
                timeout={timeout}
                filteredData={filteredData}
                gamedata={gamedata}
              />
}
            </div>
          </div>
    </>
  );
};

export default Dashboard3;
