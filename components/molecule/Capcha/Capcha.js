// import 'bootstrap/dist/css/bootstrap.min.css';
// // import captchaImg from './captcha.jpg';
// // import studentIMG from './2.png';
// import React, { useState, useEffect, useContext } from 'react';
// import CachedIcon from '@mui/icons-material/Cached';
// import Contextapi from "../../../Context/Contextapi.js"
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// function Captcha({size}) {
//     const Size=['smalls','bigs'];

//     const checksize=Size.includes(size) ? size : Size[0];
//     const { capchaverify, setcapchaverify } = useContext(Contextapi)

//     const [complete, setcomplete] = useState(false)

//     const [user, setUser] = useState({
//         username: ""
//     });
//     const [reloaded, setReloade] = useState('');
//     const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
//     function Reload() {
//         generateString(8)
//         // setReloade(true);

//     }
//     function generateString(length) {
//         let result = '';
//         const charactersLength = characters.length;
//         for (let i = 0; i < length; i++) {
//             result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         }
//         setReloade(result)
//     }
//     useEffect(() => {
//         generateString(8);
//     }, [])
//     // Function called here and save in captcha variable

//     let handleChange = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         user[name] = value;
//         setUser(user);
//     }

//     const onSubmit = e => {

//         var element = document.getElementById("succesBTN");
//         var inputData = document.getElementById("inputType");
//         var reload = document.getElementById("reload");
//         var randoms = document.getElementById("randoms");
//         element.style.cursor = "wait";
//         element.innerHTML = "Checking...";
//         inputData.disabled = true;
//         element.disabled = true;

//         var myFunctions = function () {
//             if (reloaded == user.username) {
//                 setcomplete(true)

//                 element.innerHTML = "Captcha Verified";
//                 element.disabled = true;
//                 element.style.cursor = "not-allowed";
//                 inputData.style.display = "none";
//                 reload.style.display = "none";
//                 randoms.style.display = "none";
//                 setcapchaverify(true)
//             }
//             else {

//                 element.style.cursor = "not-allowed";
//                 element.innerHTML = "Not Matched";
//                 element.disabled = true;

//                 //  element.disabled = true;

//                 var myFunction = function () {


//                     element.style.cursor = "pointer";
//                     element.innerHTML = "Verify Captcha";
//                     element.disabled = false;
//                     inputData.disabled = false;
//                     inputData.value = '';
//                 };
//                 setTimeout(myFunction, 2000);
//             }
//         }
//         setTimeout(myFunctions, 2000);
//     };

//     return (
//         <div class="containercapcha">
//             <div class="capchainner">
//                 <div className={`randomnumber`} id='randoms'>
//                     <h4 id="captcha" className='captcha'>{reloaded}</h4>
//                 </div>



//                 <div class="entercapcha">
//                     <input type="text" id="inputType" className={`form-control ${checksize}`} placeholder="Enter Captcha"
//                         name="username" onChange={handleChange} autocomplete="off"
//                     />
//                     <div className="reload" onClick={Reload} id='reload'>
//                         <CachedIcon />
//                     </div>
//                 </div>

//                 {
//                     complete ? (
//                         <div className="completed">
//                         <CheckCircleIcon/>
//                         </div>
//                     ) : (
//                         <div className="verifycapchabtn">
//                             <p id="succesBTN" onClick={onSubmit} className="verifycapchabtns">Verify Captcha</p>
//                         </div>
//                     )
//                 }


//             </div>
//         </div>
//     );
// }
// export default Captcha;


import ReCAPTCHA from "react-google-recaptcha";
const Googlerecapcha = () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }
  return (
    
    <div className="App">
      < ReCAPTCHA
        sitekey="6LdJKhQhAAAAAOofKeXJs7HYqsUzEgBjsCvqpBkL"
        onChange={onChange}
        size="normal"

      />
    </div>
  );
};
export default Googlerecapcha;