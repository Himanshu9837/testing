import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const Header = (props) => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const handleMobileMenu = e => {
        e.preventDefault();
        return setIsMobileMenu(!isMobileMenu);
    };

    const handleSearch = e => {
        e.preventDefault();
        return setIsSearch(!isSearch);
    };

    return (
        <>
            <header id="top-page" className="header">
                <div id="mainNav" className={isMobileMenu ? 'main-menu-area animated mobile-menu-open' : 'main-menu-area animated'}>
                    <Container>
                        <Row className="align-items-center">
                            
                            <Col className="col-12 col-lg-2 d-flex justify-content-between align-items-center">

                                {/* <!-- Logo --> */}
                                <div className="logo">
                                    
                                    <Link href="/">
                                        <a className="navbar-brand navbar-brand1">
                                            <img src="/images/logo-white.png" srcSet={`/images/logo-white@2x.png 2x`} alt="Naxos" />
                                        </a>
                                    </Link>

                                    <Link href="/">
                                        <a className="navbar-brand navbar-brand2">
                                            <img src="/images/logo.png" srcSet={`/images/logo@2x.png 2x`} alt="Naxos" />
                                        </a>
                                    </Link>
                                
                                </div>

                                {/* <!-- Burger menu --> */}
                                <div className="menu-bar d-lg-none" role="button" tabIndex={0} onKeyPress={() => {}} onClick={handleMobileMenu}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                            </Col>

                            <div className="op-mobile-menu col-lg-10 p-0 d-lg-flex align-items-center justify-content-end" role="button" tabIndex={0} onKeyPress={() => {}} onClick={handleMobileMenu}>
                            
                                {/* <!-- Mobile menu --> */}
                                <div className="m-menu-header d-flex justify-content-between align-items-center d-lg-none">
                                    
                                    {/* <!-- Logo --> */}
                                    <a href="#" className="logo">
                                        <img src="images/logo.png" srcSet={`/images/logo@2x.png 2x`} alt="Naxos" />
                                    </a>
                                    
                                    {/* <!-- Close button --> */}
                                    <span className="close-button" role="button" tabIndex={0} onKeyPress={() => {}} onClick={handleMobileMenu}></span>
                                    
                                </div>
                                
                                {/* <!-- Items --> */}
                                <ul className="nav-menu d-lg-flex flex-wrap list-unstyled justify-content-center">
                                    
                                    <li className="nav-item">
                                        <Link href="/#top-page">
                                            <a className={props.nav !== undefined && props.nav==="home" ? 'nav-link js-scroll-trigger active' : 'nav-link js-scroll-trigger'}>
                                                <span>Home</span>
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/#features">
                                            <a className="nav-link js-scroll-trigger">
                                                <span>Features</span>
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/#screenshots">
                                            <a className="nav-link js-scroll-trigger">
                                                <span>Screenshots</span>
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/#support">
                                            <a className="nav-link js-scroll-trigger">
                                                <span>Support</span>
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/#pricing">
                                            <a className="nav-link js-scroll-trigger">
                                                <span>Pricing</span>
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/blog">
                                            <a className="nav-link js-scroll-trigger">
                                                <span>Blog</span>
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/contact">
                                            <a className={props.nav !== undefined && props.nav==="contact" ? 'nav-link js-scroll-trigger active' : 'nav-link js-scroll-trigger'}>
                                                <span>Contact</span>
                                            </a>
                                        </Link>
                                    </li>

                                    <li className="nav-item search-option">
                                        <a className="nav-link" href="#" onClick={handleSearch}>
                                            <i className="fas fa-search"></i>
                                        </a>
                                    </li>

                                </ul>
                                
                            </div>

                        </Row>
                    </Container>
                </div>
            </header>

            {/* <!-- Search wrapper --> */}
            <div className={!isSearch ? 'search-wrapper' : 'search-wrapper wrapper-active'}>

                {/* <!-- Search form --> */}
                <form role="search" method="get" className="search-form" action="#">				
                    <input type="search" name="s" id="s"
                        placeholder="Search Keyword"
                        className="searchbox-input" autoComplete="off" required />
                    
                    <span>Input your search keywords and press Enter.</span>			
                </form>

                {/* <!-- Close button --> */}
                <div className="search-wrapper-close">
                    <span className="search-close-btn" role="button" tabIndex={0} onKeyPress={() => {}} onClick={handleSearch}></span>
                </div>

            </div>
        </>
    );
}

export default Header;