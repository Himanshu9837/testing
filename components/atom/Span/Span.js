import React from 'react';

const Span = ({prop,spansize,spancolor,spanalign}) => {
    // alert(spancolor)
    const SpanSize = ['small','medium','large'];
    const SpanColor=['firstcolor','secondcolor'];
    const SpanAlign=['Left','Center']

    const checksize=SpanSize.includes(spansize) ? spansize : SpanSize[0];
    const checkcolor=SpanSize.includes(spancolor) ? spancolor : SpanColor[0];
    const checkaLign=SpanAlign.includes(spanalign) ? spanalign : SpanAlign[0];
  return (
      <>
      <div className={`span ${checksize} ${checkcolor}  ${checkaLign}`}>
          <h5>{prop}</h5>
      </div>
      </>
  )
};

export default Span;
