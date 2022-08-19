import React from 'react';

const Heading = ({ prop, Headsize, Headcolor, Headalign }) => {
    const HeadSize = ["Head-small", "Head-medium", "Head-large"];
    const HeadColor = ["White", "Black"];
    const HeadAlign = ["Center", "Left", "Right"];
    const checkHeadSize = HeadSize.includes(Headsize) ? Headsize : HeadSize[0];
    const checkHeadColor = HeadColor.includes(Headcolor) ? Headcolor : HeadColor[0];
    const checkHeadAlign = HeadAlign.includes(Headalign) ? Headalign : HeadAlign[0];
    return (<>
        <div className={`head ${checkHeadSize} ${checkHeadColor} ${checkHeadAlign}`}>
            <h3>{prop}</h3>
            {/* <h2>hiii</h2> */}
        </div>

    </>)
};

export default Heading;
