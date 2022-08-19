import React,{useState} from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const Demo = () => {
  const [image, setImage] = useState(null);
  const [imageResult, setImageResult] = useState(null);
  const [src, setSelectedImage] = useState([]);
  const [crop, setCrop] = useState({
    aspect: 16 / 9,
    width:200,
  });

  const HandlefileChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    console.log("hj",src);
  };

  const handlerFile=(e)=>{    
    console.log(e.target.files);
    
    let allfiles=[]
   for(let i=0;i<e.target.files.length;i++){
    allfiles.push(e.target.files[i]);
   }
    if(allfiles.length>0){
      setSelectedImage(allfiles);  
      console.log("gd", allfiles)
    }
  };

    

  const getCroppedImg = (e) => {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    console.log(scaleX);
    const scaleY = image.naturalHeight / image.height;
    console.log(scaleY);
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/svg/png");
    console.log("data", canvas);
    console.log(base64Image);
    setImageResult(base64Image);
  };
  return (
    <>
      <div className="col-6">
        <input
          type="file"
          id="images"
          onChange={handlerFile}
          name="images"
          accept="image/*"
        />
      </div>
      {/* <div>
        {src && (
          <div className="col-6">
            <ReactCrop
              onImageLoaded={setImage}
              src={src}
              crop={crop}
              onChange={setCrop}
            />
            <button
              className="btn btn-danger"
              onClick={(e) => getCroppedImg(e)}
            >
              Save
            </button>
          </div>
        )}
      </div> */}
      {/* {imageResult && 
          <div className="col-6">
        <img src={imageResult} alt="image"  />
          </div>
      } */}
    </>
  );
};
export default Demo;
