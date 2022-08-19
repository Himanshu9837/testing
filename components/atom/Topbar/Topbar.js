import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Topbar = () => {

  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true)
    }
    else if (scrolled <= 200) {
      setVisible(false)
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'

    });
  };

  useEffect(() => {
    // setTimeout(() => {
      window.addEventListener('scroll', toggleVisible);
    // }, 4000);
  }, [])


  return (
    <>
      <div className={`topbar ${visible ? 'active' : ''}`}>
        <div className="topbaricon" onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </div>
      </div>
    </>
  )
}

export default Topbar