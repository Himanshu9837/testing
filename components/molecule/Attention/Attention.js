import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Attention = () => {
  return (
    <>
    <div className="attention">
        <div className="innerattention">
            <h3 className="attentiontitle">
                Attention
            </h3>
            <div className="attentionicon">
                <ErrorOutlineIcon/>
            </div>
            <div className="attentiontext">
                Lorem ipsum dolor sit amet connot culpa minima.
            </div>
        </div>
    </div>
    </>
  )
}

export default Attention