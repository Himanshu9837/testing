import React from 'react'

const Messages = (props) => {
    
  return (
   <>

    <div className='meassagebox'>
        <div className="msginner">
            <div className="msgnamesicon">
                <span className="iconname">
                    PN
                </span>
            </div>
            <div className="msgdetails">
                <div className="msgnames">
                    <h3 className="namesinner">
                        PubNub Bot
                    </h3>
                </div>
                <div className="msgbox tri-right left-in">
                    <div className="msgboxinner">
                        <p className='msgtext'>
                            {props.names}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </>
  )
}

export default Messages