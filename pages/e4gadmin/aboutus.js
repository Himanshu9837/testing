import React from "react";
import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

const Aboutus = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const [menus, setmenus] = useState(false);
  const [count, setcount] = useState(0);
  const [count2, setcount2] = useState(0);
  const [showsections, setshowsections] = useState(false);

  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [lastimage1, setlastimage1] = useState("");
  const [lastimage2, setlastimage2] = useState("");

  const [middleheadarr, setmiddleheadarr] = useState([]);
  const [middleparaarr, setmiddleparaarr] = useState([]);
  const [lasttitlearr, setlasttitlearr] = useState([]);

  const [imagefields, setimageFields] = useState([]);
  const [imagelastfields, setlastimageFields] = useState([]);
  const [data, setdata] = useState({
    topheading: "",
    toppara: "",
    record1: "",
    record2: "",
    record3: "",
    record4: "",
    bottoumheading: "",
    middleheading: "",
    middlepara: "",
    lastheading: "",
  });

  const showmenu = () => {
    setmenus(!menus);
  };

  toast.configure();

  useEffect(() => {
    fetch(`${apiKey}api/pages/editaboutus/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setaboutus(data)
        setdata(data);
        setmiddleheadarr(data.middleheading);
        setmiddleparaarr(data.middlepara);
        setlasttitlearr(data.lastheading);
        setImage(data.topimage);
        setImage2(data.middleicon[0]);
        setImage3(data.middleicon[1]);
        setImage4(data.middleicon[2]);
        setlastimage1(data.lasticon[0]);
        setlastimage2(data.lasticon[1]);
      });
  }, []);

  const showsection1 = (index) => {
    if (index == 1) {
      if (showsections == 1) {
        setshowsections();
      } else {
        setshowsections(index);
      }
    } else if (index == 2) {
      if (showsections == 2) {
        setshowsections();
      } else {
        setshowsections(index);
      }
    } else if (index == 3) {
      if (showsections == 3) {
        setshowsections();
      } else {
        setshowsections(index);
      }
    } else if (index == 4) {
      if (showsections == 4) {
        setshowsections();
      } else {
        setshowsections(index);
      }
    } else if (index == 5) {
      if (showsections == 5) {
        setshowsections();
      } else {
        setshowsections(index);
      }
    }
  };

  const [{ alt1, src1 }, setImg2] = useState({
    src1: "",
    alt1: "Upload an Image",
  });
  const [{ alt2, src2 }, setImg3] = useState({
    src2: "",
    alt2: "Upload an Image",
  });
  const [{ alt3, src3 }, setImg4] = useState({
    src3: "",
    alt3: "Upload an Image",
  });
  const [{ alt4, src4 }, setImg5] = useState({
    src4: "",
    alt4: "Upload an Image",
  });
  const [{ alt5, src5 }, setImg6] = useState({
    src5: "",
    alt5: "Upload an Image",
  });
  const [{ alt6, src6 }, setImg7] = useState({
    src6: "",
    alt6: "Upload an Image",
  });

  const uploadfiles = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    console.log(file);
    // setupload2(file);
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      setImg2({
        alt1: e.target.files[0].name,
        src1: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const chnagephoto1 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    console.log(file);
    setImage2(e.target.files[0]);
    if (e.target.files[0]) {
      setImg3({
        alt2: e.target.files[0].name,
        src2: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const chnagephoto2 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImage3(e.target.files[0]);
    if (e.target.files[0]) {
      setImg4({
        alt3: e.target.files[0].name,
        src3: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const chnagephoto3 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImage4(e.target.files[0]);
    if (e.target.files[0]) {
      setImg5({
        alt4: e.target.files[0].name,
        src4: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const chnagephoto4 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setlastimage1(e.target.files[0]);
    if (e.target.files[0]) {
      setImg6({
        alt5: e.target.files[0].name,
        src5: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const chnagephoto5 = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setlastimage2(e.target.files[0]);
    if (e.target.files[0]) {
      setImg7({
        alt6: e.target.files[0].name,
        src6: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const uploadfiles2 = (e, index) => {
    console.log(index);
    // console.log(file);
    let newArr = [...imagefields];
    newArr[index] = index;
    setimageFields(newArr);
  };
  const uploadfiles3 = (e, index) => {
    console.log(index);
    // console.log(file);
    let newArr = [...imagelastfields];
    newArr[index] = index;
    setlastimageFields(newArr);
  };

  const handlechange = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setdata(newdata);
    console.log(newdata);
  };

  const handlechange2 = (e, ind) => {
    console.log(ind);

    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    if (middleheadarr.length > 0) {
      for (let index = 0; index < middleheadarr.length; index++) {
        if (index === ind) {
          middleheadarr[index] = e.target.value;
        } else {
          const d = ind;
          const clone = [...middleheadarr];
          let obj = clone[d];
          obj = e.target.value;
          clone[d] = obj;
          setmiddleheadarr(clone);
        }
      }
    } else {
      const data2 = e.target.value;
      const res = middleheadarr.concat(data2);
      console.log(res);
      setmiddleheadarr(res);
    }

    console.log(middleheadarr);
  };

  const handlechange3 = (e, ind) => {
    console.log(ind);
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    if (middleparaarr.length > 0) {
      for (let index = 0; index < middleparaarr.length; index++) {
        if (index === ind) {
          middleparaarr[index] = e.target.value;
        } else {
          const d = ind;
          const clone = [...middleparaarr];
          let obj = clone[d];
          obj = e.target.value;
          clone[d] = obj;
          setmiddleparaarr(clone);
        }
      }
    } else {
      const data2 = e.target.value;
      const res = middleparaarr.concat(data2);
      setmiddleparaarr(res);
    }
    console.log(middleparaarr);
  };

  const handlechange4 = (e, ind) => {
    console.log(e.target.value);
    console.log(ind);
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    if (lasttitlearr.length > 0) {
      for (let index = 0; index < lasttitlearr.length; index++) {
        if (index === ind) {
          lasttitlearr[index] = e.target.value;
        } else {
          const d = ind;
          const clone = [...lasttitlearr];
          let obj = clone[d];
          obj = e.target.value;
          clone[d] = obj;
          setlasttitlearr(clone);
        }
      }
    } else {
      const data2 = e.target.value;
      const res = lasttitlearr.concat(data2);
      console.log(res);
      setlasttitlearr(res);
    }

    console.log(lasttitlearr);
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    let img = [image2, image3, image4];
    let img1 = [lastimage1, lastimage2];

    formData.append("topheading", data.topheading);
    formData.append("toppara", data.toppara);
    formData.append("record1", data.record1);
    formData.append("record2", data.record2);
    formData.append("record3", data.record3);
    formData.append("record4", data.record4);
    formData.append("bottoumheading", data.bottoumheading);
    formData.append("topimage", image);
    // formData.append('middleicon', image2);
    // formData.append('middlepara', data.middlepara);
    // formData.append('middleheading', data.middleheading);
    formData.append("middleheading", JSON.stringify(middleheadarr));
    formData.append("middlepara", JSON.stringify(middleparaarr));
    formData.append("lastheading", JSON.stringify(lasttitlearr));
    for (let v = 0; v < imagefields.length; v++) {
      if (imagefields[v] != "empty") {
        formData.append("imageindex", imagefields[v]);
      }
    }
    for (let v = 0; v < imagelastfields.length; v++) {
      if (imagelastfields[v] != "empty") {
        formData.append("lastimageindex", imagelastfields[v]);
      }
    }

    for (let j = 0; j < img.length; j++) {
      formData.append("middleicon", img[j]);
    }
    for (let j = 0; j < img1.length; j++) {
      formData.append("lasticon", img1[j]);
    }

    fetch(
      "http://206.189.136.28:5000/api/pages/updateaboutus/62bd8b4fd739705f80fc5afa",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        toast.success(result);
      })
      .catch((error) => {
        toast.error("Something Went Wrong ");
        console.error("Error:", error);
      });
  };
  // const showtags3 = (heading) => {

  //     const res = [];
  //     res.push(heading)
  //     let result = arr2.concat(res)
  //     setarr2(result)
  // }

  return (
    <div className="main_about_us_style">
      <h1 className="backend_aboutus">About-Us</h1>

      <div className="outer_aboutus">
        <div className="toogles" onClick={() => showsection1("1")}>
          <h2 className="showinputss">First Section</h2>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        {showsections == 1 && (
          <>
            <div className="number_section">
              <div className="single_aboutus_numbersection">
                <div className="innernumber_text">Top Image:</div>
                <input
                  type="file"
                  onChange={uploadfiles}
                  className="img_bottom_file"
                />
                <div className="topimage">
                  {src1 ? (
                    <img src={src1} alt={alt1} width={100} height={100} />
                  ) : (
                    <img
                      src={image ? image : null}
                      alt="ss"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <div className="innernumber_text">Top Heading:</div>
                <input
                  type="text"
                  className="inner_number_section"
                  id="topheading"
                  value={data.topheading}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="single_aboutus_numbersection">
                <div className="innernumber_text">Top Paragraph:</div>
                <input
                  type="text"
                  className="inner_number_section"
                  id="toppara"
                  value={data.toppara}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="about_us_tophedding_btn">
                <button type="button" class="btn btn-primary" onClick={submit}>
                  Save
                </button>
              </div>
            </div>
          </>
        )}
        <div className="toogles" onClick={() => showsection1("2")}>
          <h2 className="showinputss">Second Section</h2>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>

        {showsections == 2 && (
          <>
            <div className="number_section">
              <div className="single_aboutus_numbersection">
                <div className="innernumber_text">Number1:</div>
                <input
                  type="number"
                  className="inner_number_section"
                  id="record1"
                  value={data.record1}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="single_aboutus_numbersection">
                <div className="innernumber_text">Number2:</div>
                <input
                  type="number"
                  className="inner_number_section"
                  id="record2"
                  value={data.record2}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="single_aboutus_numbersection">
                <div className="innernumber_text">Number3:</div>
                <input
                  type="number"
                  className="inner_number_section"
                  id="record3"
                  value={data.record3}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className="single_aboutus_numbersection">
                <div className="innernumber_text">Number4:</div>
                <input
                  type="number"
                  className="inner_number_section"
                  id="record4"
                  value={data.record4}
                  onChange={(e) => handlechange(e)}
                />
              </div>
              <div className=" about_us_tophedding_btn">
                <button type="button" class="btn btn-primary" onClick={submit}>
                  Save
                </button>
              </div>
            </div>
          </>
        )}
        <div className="toogles" onClick={() => showsection1("3")}>
          <h2 className="showinputss">Third Section</h2>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        {showsections == 3 && (
          <>
            <div className="outeraddicon_aboutus">
              {middleheadarr.map((headarr, index1) => (
                <>
                  {middleparaarr.map((paraarr, index2) => (
                    <>
                      {index1 === index2 ? (
                        <div className="showtextarea_aboutus">
                          <div className="aboutus_single_textarea">
                            <div className="tags_aboutus">Heading:</div>
                            <div className="textarea_aboutus">
                              <textarea
                                name="message"
                                id="middleheading"
                                cols="50"
                                rows="3"
                                className="inner_textarea_aboutus"
                                defaultValue={headarr}
                                onChange={(e) => handlechange2(e, index1)}
                              ></textarea>
                            </div>
                          </div>
                          <div className="aboutus_single_textarea">
                            <div className="tags_aboutus">Paragraph:</div>
                            <div className="textarea_aboutus">
                              <textarea
                                name="message"
                                id="middlepara"
                                cols="50"
                                rows="3"
                                className="inner_textarea_aboutus"
                                defaultValue={paraarr}
                                onChange={(e) => handlechange3(e, index1)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              ))}

              <div className="aboutus_single_textarea2">
                <div className="tags_aboutus">Icons:</div>
                <div className="textarea_aboutus">
                  <input
                    type="file"
                    className="img_bottom_file"
                    onChange={(e) => {
                      chnagephoto1(e), uploadfiles2(e, "1");
                    }}
                  />
                  <div className="middleicon">
                    {src2 ? (
                      <img src={src2} alt={alt2} width={100} height={100} />
                    ) : (
                      <img
                        src={image2 ? image2 : null}
                        alt="ss"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                </div>
                <div className="save_aboutus_button">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={submit}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="aboutus_single_textarea2">
                <div className="tags_aboutus">Icons:</div>
                <div className="textarea_aboutus">
                  <input
                    type="file"
                    className="img_bottom_file"
                    onChange={(e) => {
                      chnagephoto2(e), uploadfiles2(e, "2");
                    }}
                  />
                  <div className="middleicon">
                    {src3 ? (
                      <img src={src3} alt={alt3} width={100} height={100} />
                    ) : (
                      <img
                        src={image3 ? image3 : null}
                        alt="ss"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                </div>
                <div className="save_aboutus_button">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={submit}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="aboutus_single_textarea2">
                <div className="tags_aboutus">Icons:</div>
                <div className="textarea_aboutus">
                  <input
                    type="file"
                    className="img_bottom_file"
                    onChange={(e) => {
                      chnagephoto3(e), uploadfiles2(e, "3");
                    }}
                  />
                  <div className="middleicon">
                    {src4 ? (
                      <img src={src4} alt={alt4} width={100} height={100} />
                    ) : (
                      <img
                        src={image4 ? image4 : null}
                        alt="ss"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                </div>
                <div className="save_aboutus_button">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={submit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="toogles" onClick={() => showsection1("4")}>
          <h2 className="showinputss">Four Section</h2>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>
        {showsections == 4 && (
          <>
            <div className="abouts_titlebottom">
              <div className="titlebottom_text">
                <h1 className="innertitlebottom_text">Bottom Title</h1>
              </div>
              <input
                type="text"
                className="innertitlebottom_input"
                id="bottoumheading"
                value={data.bottoumheading}
                onChange={(e) => handlechange(e)}
              />
              <div className="about_us_tophedding_btn">
                <button type="button" class="btn btn-primary" onClick={submit}>
                  Save
                </button>
              </div>
            </div>
          </>
        )}

        <div className="toogles" onClick={() => showsection1("5")}>
          <h2 className="showinputss">Five Section</h2>
          <div>
            <KeyboardArrowDownIcon />
          </div>
        </div>

        {showsections == 5 && (
          <>
            <div className="abouts_titlebottom">
              <div className="titlebottom_text">
                <h1 className="innertitlebottom_text">Title Bottom</h1>
              </div>
              <div className="bottom_img_style">
                <input
                  type="text"
                  name="message"
                  id="lastheading"
                  className="innertitlebottom_input"
                  defaultValue={data.lastheading[0]}
                  onChange={(e) => handlechange4(e, 0)}
                />

                <input
                  type="file"
                  className="img_bottom_file"
                  onChange={(e) => {
                    chnagephoto4(e), uploadfiles3(e, "0");
                  }}
                />
                <div className="img_preview_style">
                  {src5 ? (
                    <img src={src5} alt={alt5} width={100} height={100} />
                  ) : (
                    <img
                      src={lastimage1 ? lastimage1 : null}
                      alt="ss"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
              <div className="bottom_img_style">
                <input
                  type="text"
                  name="message"
                  id="lastheading"
                  className="innertitlebottom_input"
                  // value={data.lastheading[0]}
                  defaultValue={data.lastheading[1]}
                  onChange={(e) => handlechange4(e, 1)}
                />

                <input
                  type="file"
                  className="img_bottom_file"
                  onChange={(e) => {
                    chnagephoto5(e), uploadfiles3(e, "1");
                  }}
                />
                <div className="img_preview_style">
                  {src6 ? (
                    <img src={src6} alt={alt6} width={100} height={100} />
                  ) : (
                    <img
                      src={lastimage2 ? lastimage2 : null}
                      alt="ss"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
              <div className="save_aboutus_button">
                <button type="button" class="btn btn-primary" onClick={submit}>
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Aboutus.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Aboutus;
