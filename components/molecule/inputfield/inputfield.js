import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const inputfield = () => {
    const [toggle, settoggle] = useState(false)
    // // toggle filter
    const toggledropdown = () => {
        settoggle(!toggle)
    }
    return (
        <>
            {/* <div className="input-title">
                <div className="searchess">


                    <select name="searchitem" id="select" className='searchoption'>
                        <option value="1">Search All</option>
                        <option value="1">second</option>
                        <option value="1">third</option>
                    </select>

                    <input type="text" name="search" className='inputype' placeholder='Search games' />
                    <div className="search">
                        <SearchIcon />
                    </div>
                </div>
                <div className="filter">
                    <button className='btns filterbtn'>
                        Apply
                    </button>
                </div>
                <div className="actions" onClick={toggledropdown}>
                    <button className='btns filterbtn'>
                        Actions
                    </button>
                    <div id="myDropdown" className={`dropdown-content ${toggle ? "active" : ""}`}>
                        <a href="#">Add</a>
                        <a href="#">Delete</a>
                    </div>
                </div>

            </div> */}
            <div className="input-title">
                <div className="boxsearches">

                    <div className="selectboxes">
                        <select name="searchitem" id="select" className='searchoption'>
                            <option value="1">Search All</option>
                            <option value="1">second</option>
                            <option value="1">third</option>
                        </select>
                    </div>
                    <div className="serachboxs">
                        <input type="text" name="search" className='inputype' placeholder='Search games' />
                        <div className="search">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

                <div className="filters">
                    <button className='btns filterbtn'>
                        Apply
                    </button>
                </div>
                
                <div className="actions" onClick={toggledropdown}>
                    <button className='btns filterbtn'>
                        Actions
                    </button>
                    <div id="myDropdown" className={`dropdown-content ${toggle ? "active" : ""}`}>
                        <a href="#">Add</a>
                        <a href="#">Delete</a>
                    </div>
                </div>

            </div>
        </>
    )
}

export default inputfield