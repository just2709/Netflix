import React from "react";

import { Link, useLocation } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

//icon
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

function Header() {
  const navBar = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "Movies",
      path: "/movies",
    },
    {
      display: "TV Series",
      path: "/series",
    },
  ];

  const { pathname } = useLocation();
  const active = navBar.findIndex((item) => item.path === pathname);
  const [bgNavBar, setBgNavBar] = useState(false);
  const [openNavBar, setOpenNavBar] = useState(false);

  function openNav() {
    setOpenNavBar(!openNavBar);
  }



  const changeBgNavBar = () => {
    if (window.scrollY >= 64) {
      setBgNavBar(true);
    } else {
      setBgNavBar(false);
    }
  };
  window.addEventListener("scroll", changeBgNavBar);

  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (openNavBar && ref.current && !ref.current.contains(e.target)) {
        setOpenNavBar(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [openNavBar]);

  return (
    <div
      ref={ref}
      className={`fixed w-full h-16 flex items-center text-white z-10 bg-black lg:bg-transparent ${
        bgNavBar ? "lg:bg-black duration-500" : ""
      } `}>
      <div className='sm:absolute sm:left-10 w-36 mx-auto'>
        <Link to='/' className=''>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt='logo'
            className='w-full h-auto inline-block'
          />
        </Link>
      </div>

      {/* thanh tim kiem */}
      {/* <FaSearch className='absolute right-5 text-2xl sm:hidden' onClick={openSearch}/>
      <div
        id='searchBar'
        className={`absolute top-16  w-full bg-black pb-3 sm:bg-none sm:block lg:top-auto lg:w-2/5 lg:left-1/4 lg:pb-0 lg:bg-transparent ${openSearchBar ? '' : 'hidden'}`}>
        <div className='relative flex items-center mx-10 text-black'>
          <input
            className='text-xl w-full p-2 rounded-3xl outline-none'
            placeholder='Search here...'
          />
          <FaSearch className='absolute right-5' />
        </div>
      </div> */}

      {/* navbar */}
      <div className='absolute left-5 text-2xl sm:hidden' onClick={openNav}>
        <FaBars className={`${openNavBar ? "hidden" : ""}`} />
        <CgClose className={`${openNavBar ? "" : "hidden"} `} id='' />
      </div>
      <ul
        id='navBar'
        className={`bg-black absolute top-16 w-full sm:right-10 sm:block sm:top-auto sm:bg-transparent sm:opacity-100 sm:w-auto  ${
          openNavBar ? "" : "hidden"
        }`}>
        {navBar.map((item, index) => (
          <li
            key={index}
            className={`sm:inline-block p-4 font-bold text-xl ${
              index === active ? "text-red-600" : ""
            }`}>
            <Link onClick={openNavBar} to={item.path}>{item.display}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
