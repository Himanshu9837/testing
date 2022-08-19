import React, {useEffect} from "react";
var crypto    = require('crypto');
 const testpay = () => {
 
const Pay = ()=>{

  useEffect(()=>{
  
       
    const config = {};
    config.layout = {};
    config.checkout = "transparent";
    config.mode = "TEST";
    
  
  },[])
  var pc = (data)=>{
    data.paymentOption = "card";
    data.card = {};
    data.card.number = "4444333322221111";
    data.card.expiryMonth = "07";
    data.card.expiryYear = "23";
    data.card.cvv = "123";
    CashFree.paySeamless(data, postPaymentCallback());
    return false;
  };
  const postPaymentCallback = (event) => {
   
    if (event.name == "PAYMENT_RESPONSE" && event.status == "SUCCESS") {
    } else if ( event.name == "PAYMENT_RESPONSE" && event.status == "CANCELLED") {
    } else if (event.name == "PAYMENT_RESPONSE" && event.status == "FAILED") {
    } else if (event.name == "VALIDATION_ERROR") {
    }
  };
  
  const payCard = ()=>{
    CashFree.initPopup(); // This is required for the popup to work even in case of callback.
      axios.get("https://reqres.in/api/users?page=2") // This is an open endpoint.
      .then((response)=>{
         
          pc();
  
      })
  };
  const payBank = (data)=> {
    CashFree.initPopup();
    data.paymentOption = "nb";
    data.nb = {};
    data.nb.code = "3002";
  
    CashFree.paySeamless(data , postPaymentCallback);
    return false;
  };
  const payWallet = (data) =>{
    data.paymentOption = "wallet";
    data.wallet = {};
    data.wallet.code = 4001;
  
    CashFree.paySeamless(data, postPaymentCallback);
    return false;
  };
  const payUpi = (data) => {
    data.paymentOption = "upi";
    data.upi = {};
    data.upi.vpa = 3244;
  
    CashFree.paySeamless(data, postPaymentCallback);
    return false;
  };
}

return(
<button onClick={Pay()}>PAY</button>
)
}
module.exports = testpay;