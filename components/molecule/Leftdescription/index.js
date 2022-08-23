import React, { useState } from "react";
import dynamic from "next/dynamic";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined"
import Button from "@mui/material/Button";

import Zoom from "react-img-zoom";

import ReactImageMagnify from "react-image-magnify";

const { useEffect, useRef } = React;

const useMagnify = (magnifyTimes) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const state = {
      src: undefined,
      ratio: undefined,
      imgWidth: undefined,
    };

    let el = ref.current;

    Object.assign(el.style, {
      backgroundPosition: "center",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      transition: "background-size 90ms ease-in",
    });

    const handleMouseLeave = (e) => {
     
      Object.assign(el.style, {
        backgroundPosition: "center",
        backgroundSize: "100%",
      });
    };

    const handleMouseMove = (e) => {
     
      const boxWidth = el.clientWidth,
        xPos = e.pageX - el.offsetLeft,
        yPos = e.pageY - el.offsetTop,
        xPercent = `${xPos / (boxWidth / 100)}%`,
        yPercent = `${yPos / ((boxWidth * state.ratio) / 100)}%`;

      Object.assign(el.style, {
        backgroundPosition: `${xPercent} ${yPercent}`,
        backgroundSize: `${state.imgWidth * magnifyTimes}px`,
      });
    };

    const getImageRatio = (e) => {
      if (!el) {
        return;
      }
      if (!state.src) {
        let imageSrc = el.currentStyle || window.getComputedStyle(el, false);
        state.src = imageSrc.backgroundImage.slice(4, -1).replace(/"/g, "");
      }
      const img = new Image();
      img.src = state.src;

      img.onload = () => {
        const imgWidth = img.naturalWidth,
          imgHeight = img.naturalHeight;
        state.ratio = imgHeight / imgWidth;
        state.imgWidth = imgWidth;

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
      };
    };

    getImageRatio();

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magnifyTimes]);

  return ref;
};
export default function Leftdescription({ data }) {
  
  const [activeStep, setActiveStep] = useState(0);
  const [images, setimages] = useState("");
  const [zoom, setZoom] = useState();

  const theme = useTheme();
  const ref = useMagnify(1.1);

  const maxSteps = data.map((i) => i.images.length);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    var x = data.map((im) => {
      setimages(im.images[0]);
    });


   
  }, [images]);



  return (
    <>
      {/* <div className="containersss">
        <div
          className="zoom"
          ref={ref}
          style={{
            background: `url(${images})`,
            backgroundRepeat: "no-repeat",
          }}
        />
      </div> */}
      {data.map((alldata, i) => (
        <>
          {/* <div className="containersss"> */}
          <div className="zoomeffect_style">
            <div className="zoom active">
              <div className="innerzomm">
                <Zoom
                  img={`${alldata.images[0]}`}
                  zoomScale={3}
                  width={600}
                  height={300}
                  backgroundSize={600}
                />
              </div>
            </div>
            <div className="zoom1 active">
              <div className="innerzomm">
                <Zoom
                  img={`${alldata.images[0]}`}
                  zoomScale={3}
                  width={340}
                  height={300}
                  backgroundSize={340}
                />
              </div>
            </div>
            {/* <div className="zoom2 active">
              <div className="innerzomm">
                <Zoom
                  img={`${alldata.images[0]}`}
                  zoomScale={3}
                  width={350}
                  height={300}
                  backgroundSize={350}
                />
              </div>
            </div> */}

            {/* </div> */}

            <div
            className="slider_image_zoom"
            >
              <Button
                size="small"
                onClick={handleBack}
                steps={maxSteps}
                disabled={activeStep === 0}
              >
                {activeStep === 0 ? (
                  <ArrowCircleLeftOutlinedIcon
                    className="svg3i"
                    fontSize="large"
                  />
                ) : (
                  <ArrowCircleLeftOutlinedIcon
                    className="svg"
                    fontSize="large"
                  />
                )}
              </Button>

              <Box sx={{}}>
                <div
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                  style={{ display: "flex" }}
                >
                  <>
                    {alldata.images.map((step, index) => (
                      <div
                        key={step.label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {Math.abs(activeStep - index) <= 1 ? (
                          <>
                            <div className="image_div_box2">
                              <img src={step} className="slide_image_style" />
                            </div>
                          </>
                        ) : null}
                      </div>
                    ))}
                  </>
                </div>
              </Box>
              <Button
                size="small"
                onClick={handleNext}
                steps={maxSteps}
                disabled={activeStep === maxSteps - 1}
              >
                {activeStep === maxSteps - 1 ? (
                  <ArrowCircleRightOutlinedIcon
                    className="svg3i"
                    fontSize="large"
                  />
                ) : (
                  <ArrowCircleRightOutlinedIcon
                    className="svg"
                    fontSize="large"
                  />
                )}
              </Button>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
