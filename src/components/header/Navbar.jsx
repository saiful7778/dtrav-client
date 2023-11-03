import { NavLink, Link } from "react-router-dom";
import SiteLogo from "../SiteLogo";
import { AiOutlineMenuFold, AiOutlineRight } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const navLinks = [
  { _id: "nv1", navName: "home", path: "/" },
  { _id: "nv2", navName: "about us", path: "/about" },
  {
    _id: "nv3",
    navName: "Tour packages",
    path: "/tour_packages",
    hasDropdown: true,
    dropmenu: [
      {
        _id: "dp1",
        navName: "1 packages",
        path: "/tour_packages/1_day_packages",
      },
      {
        _id: "dp2",
        navName: "3 packages",
        path: "/tour_packages/3_day_packages",
      },
      {
        _id: "dp3",
        navName: "5 packages",
        path: "/tour_packages/5_day_packages",
        hasSubDropdown: true,
        subDropmenu: [
          {
            _id: "sdp1",
            navName: "bronze",
            path: "/tour_packages/5_day_packages/bronze",
          },
          {
            _id: "sdp2",
            navName: "silver",
            path: "/tour_packages/5_day_packages/sliver",
          },
          {
            _id: "sdp3",
            navName: "diamond",
            path: "/tour_packages/5_day_packages/diamond",
          },
        ],
      },
      {
        _id: "dp4",
        navName: "7 packages",
        path: "/tour_packages/7_day_packages",
      },
    ],
  },
  {
    _id: "nv4",
    navName: "hotel",
    path: "/hotel",
    hasDropdown: true,
    dropmenu: [
      { _id: "dp5", navName: "3 star", path: "/hotel/3_star" },
      { _id: "dp6", navName: "5 star", path: "/hotel/5_star" },
      { _id: "dp7", navName: "6 star", path: "/hotel/6_star" },
      { _id: "dp8", navName: "7 star", path: "/hotel/7_star" },
    ],
  },
  { _id: "nv5", navName: "blog", path: "/blog" },
  { _id: "nv6", navName: "contact us", path: "/contact", buttonMode: true },
];

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos >= 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderNavlinks = navLinks?.map((ele) => (
    <li key={ele._id} className={ele?.hasDropdown && "dropdown"}>
      <NavLink
        className={ele?.buttonMode ? "btn-pri" : "nav-link"}
        to={ele.path}
      >
        {ele.navName}
      </NavLink>
      {ele.hasDropdown && (
        <>
          <div className="dropdown-arrow">
            <BiSolidDownArrow />
          </div>
          <DropdownMenu dropdownMenu={ele.dropmenu} />
        </>
      )}
    </li>
  ));
  const renderMobileNavLinks = navLinks?.map((ele) => (
    <li key={ele._id}>
      <NavLink className="py-2 capitalize inline-block" to={ele.path}>
        {ele.navName}
      </NavLink>
      {ele.hasDropdown && <MobileDropdown dropdownMenu={ele.dropmenu} />}
    </li>
  ));
  return (
    <>
      <nav
        className={`flex items-center justify-between duration-300 border-b border-gray-300 py-3 px-2 ${
          isSticky ? "fixed top-0 left-0 w-full bg-white p-4 shadow z-50" : ""
        }`}
      >
        <SiteLogo />
        <div>
          <ul className="hidden lg:flex items-center gap-4">
            {renderNavlinks}
          </ul>
          <button
            onClick={() => setShowMobileMenu((prop) => !prop)}
            className="block lg:hidden btn-icon-pri"
            type="button"
          >
            <AiOutlineMenuFold size={25} />
          </button>
        </div>
      </nav>
      <div
        className={`fixed min-h-screen lg:hidden overflow-y-scroll top-0 py-4 px-8 duration-300 z-50 border-l border-gray-300 bg-gray-50 ${
          showMobileMenu ? "right-0" : "-right-full"
        }`}
      >
        <button
          onClick={() => setShowMobileMenu((prop) => !prop)}
          className="btn-icon-pri"
          type="button"
        >
          <RxCrossCircled size={25} />
        </button>
        <ul className="divide-y divide-gray-300">{renderMobileNavLinks}</ul>
      </div>
    </>
  );
};

const DropdownMenu = ({ dropdownMenu }) => {
  const renderDropdownMenu = dropdownMenu?.map((ele) => (
    <li key={ele._id} className={ele.hasSubDropdown && "sub-dropdown"}>
      <Link to={ele.path}>{ele.navName}</Link>
      {ele.hasSubDropdown && (
        <>
          <div>
            <AiOutlineRight />
          </div>
          <SubDropmenu subDropmenu={ele.subDropmenu} />
        </>
      )}
    </li>
  ));
  return <ul className="dropdown-menu">{renderDropdownMenu}</ul>;
};

DropdownMenu.propTypes = {
  dropdownMenu: PropTypes.array,
};

const SubDropmenu = ({ subDropmenu }) => {
  const renderSubDropdown = subDropmenu?.map((ele) => (
    <li key={ele._id}>
      <Link className="capitalize" to={ele.path}>
        {ele.navName}
      </Link>
    </li>
  ));
  return <ul className="sub-dropdown-menu">{renderSubDropdown}</ul>;
};

SubDropmenu.propTypes = {
  subDropmenu: PropTypes.array,
};

const MobileDropdown = ({ dropdownMenu }) => {
  const renderMobileDropdown = dropdownMenu.map((ele) => (
    <li key={ele._id}>
      <Link className="inline-block py-1 px-2" to={ele.path}>
        {ele.navName}
      </Link>
      {ele.hasSubDropdown && (
        <MobileSubDropdown subDropdown={ele.subDropmenu} />
      )}
    </li>
  ));
  return (
    <ul className="ml-2 divide-y divide-gray-300">{renderMobileDropdown}</ul>
  );
};
MobileDropdown.propTypes = {
  dropdownMenu: PropTypes.array,
};

const MobileSubDropdown = ({ subDropdown }) => {
  const renderMobileSubDropdown = subDropdown.map((ele) => (
    <li key={ele._id}>
      <Link className="py-1 px-2 capitalize inline-block" to={ele.path}>
        {ele.navName}
      </Link>
    </li>
  ));
  return (
    <ul className="ml-4 divide-y divide-gray-300">{renderMobileSubDropdown}</ul>
  );
};
MobileSubDropdown.propTypes = {
  subDropdown: PropTypes.array,
};

export default Navbar;
