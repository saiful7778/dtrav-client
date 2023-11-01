import { NavLink, Link } from "react-router-dom";
import SiteLogo from "../SiteLogo";
import { AiOutlineMenuFold } from "react-icons/ai";
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
      },
      {
        _id: "dp4",
        navName: "7 packages",
        path: "/tour_packages/7_day_packages",
      },
    ],
  },
  { _id: "nv4", navName: "hotel", path: "/hotel" },
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

  console.log(isSticky);

  const renderNavlinks = navLinks?.map((ele) => (
    <li key={ele._id} className={ele?.hasDropdown ? "dropdown" : "nav-item"}>
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
  return (
    <>
      <nav
        className={`flex items-center justify-between duration-300 ${
          isSticky ? "fixed top-0 left-0 w-full bg-white p-4 shadow" : ""
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
        className={`absolute min-h-screen lg:hidden top-0 py-4 px-8 duration-300 z-50 border-l border-gray-300 bg-gray-50 ${
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
        <ul className="space-y-4 mt-4">{renderNavlinks}</ul>
      </div>
    </>
  );
};

const DropdownMenu = ({ dropdownMenu }) => {
  const renderDropdownMenu = dropdownMenu?.map((ele) => (
    <li key={ele._id}>
      <Link to={ele.path}>{ele.navName}</Link>
    </li>
  ));
  return <ul className="dropdown-menu">{renderDropdownMenu}</ul>;
};

DropdownMenu.propTypes = {
  dropdownMenu: PropTypes.array,
};

export default Navbar;
