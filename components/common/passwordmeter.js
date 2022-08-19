import React from 'react'
import zxcvbn from 'zxcvbn';

const passwordStrengthMeter = ({password, error, errorN, errorU, errorS, errorL}) => {
  const testResult= zxcvbn(password)
  const num= testResult.score * 100/4;
  error="0";
  errorU="25"
  errorL="50"
  errorS="75"
  errorN="100"


  // console.log(error, errorN, errorS, errorU, errorL);

  const createPassLabel= ()=>{
    switch(testResult.score){
      case 0:
        return 'Very weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fear';
      case 3:
        return 'Good';
      case 4:
        return 'Strong'
      default:
        return ''
    }
  }

  const funcProgressColor=()=>{
    switch(testResult.score){
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9B1158';
      case 4:
        return '#00B500'
      default:
        return 'none'
    }
  }

  const changePasswordColor=()=>({
    width:`${num}%`,
    background: funcProgressColor(),
    height:'7px'
  })


  return (
    <>
      <div className="progress"
      style={{height:'7px', width:'100%'}}>
        {/*<div className="progress-bar" style={changePasswordColor()}>*/}
        {/*</div>*/}
      </div>
      {/*<p className='progress_indicator' style={{color: funcProgressColor()}}>{createPassLabel()}</p>*/}
    </>
  )
}

export default passwordStrengthMeter
