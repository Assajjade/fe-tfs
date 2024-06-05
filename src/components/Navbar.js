import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuItems } from "./MenuItem";
import logo from "../image/Logo.png";
import "../css/NavbarStyles.css";
import { useAuth } from "../context/authContext";
import AxiosInstance from "./Axios";
import { FaUserCog, FaSignOutAlt, FaHistory, FaEdit, FaBars } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [data, setData] = useState();

  const checkLanguage = () => {
    return location.pathname.endsWith("en") ? "en" : "id";
  };

  const fetchData = async () => {
    try {
      let responseData = null;
      if (currentUser?.uid) {
        const response = await AxiosInstance.get(`user/detail/${currentUser?.uid}`);
        responseData = response.data;
      }
      setData(responseData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser?.uid]);

  const [language, setLanguage] = useState(checkLanguage());

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "id" : "en";
    setLanguage(newLanguage);
    const newPath = location.pathname.replace(language, newLanguage);
    navigate(newPath);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setDrawerOpen(false); // Close drawer if it's open
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setDropdownVisible(false); // Close dropdown if it's open
  };

  return (
    <nav className="navbar NavbarItems">
      <div className="flex items-center justify-between w-full">
        <h1 className="navbar-logo">
          <img
            style={{ width: "auto", height: "80px" }}
            src={logo}
            alt="Logo"
            href="/"
          />
        </h1>
        {isMobile ? (
          <FaBars className="text-2xl cursor-pointer" onClick={toggleDrawer} />
        ) : (
          <ul className="nav-menu">
            {(location.pathname.includes("/volunteer") || location.pathname.includes("/blog")) && (
              <div className="switch">
                <input
                  id="language-toggle"
                  className="check-toggle check-toggle-round-flat"
                  type="checkbox"
                  checked={language === "en"}
                  onChange={toggleLanguage}
                />
                <label htmlFor="language-toggle"></label>
                <span className="on">ID</span>
                <span className="off">EN</span>
              </div>
            )}
            {MenuItems.map((item, index) => {
              const modifiedUrl =
                (item.url === "/volunteer" || item.url === "/blog")
                  ? `${item.url}/${language}`
                  : item.url;
              return (
                <li key={index}>
                  <Link to={modifiedUrl} className="nav-links">
                    <i className={item.icon} aria-hidden="true"></i>
                    {item.title}
                  </Link>
                </li>
              );
            })}
            {/* {data && data.role !== "User" && data.role !== null && (
              <li>
                <Link to={"http://organizer.localhost:3000"} className="nav-links flex gap-2">
                  <FaUserCog className="nav-icon" /> Organizer
                </Link>
              </li>
            )} */}
          </ul>
        )}
        {currentUser ? (
          <div className="relative">
            <button className="nav-links" onClick={toggleDropdown}>
              Hi, {data?.name}
              <img
                src={data?.profile_pic ? `${BASE_URL}${data.profile_pic}` : '/profile_pics/default.webp'}
                alt="Profile"
                className="w-8 h-8 rounded-full inline-block ml-2"
              />
            </button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-[1000]">
                <Link to="/edit-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <FaEdit className="inline-block mr-2" /> Edit Profile
                </Link>
                <Link to="/view-history" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <FaHistory className="inline-block mr-2" /> History
                </Link>
                <button onClick={handleLogout} className="warningButton block w-full text-left px-4 py-2">
                  <FaSignOutAlt className="inline-block mr-2" /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition">
              Login
            </button>
          </Link>
        )}
      </div>
      {isMobile && drawerOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-10 p-4">
          <button className="absolute top-4 left-4 text-2xl" onClick={toggleDrawer}>×</button>
          <div className="mt-8">
            <ul className="mobile-menu">
              {(location.pathname.includes("/volunteer") || location.pathname.includes("/blog")) && (
                <div className="switch">
                  <input
                    id="language-toggle"
                    className="check-toggle check-toggle-round-flat"
                    type="checkbox"
                    checked={language === "en"}
                    onChange={toggleLanguage}
                  />
                  <label htmlFor="language-toggle"></label>
                  <span className="on">ID</span>
                  <span className="off">EN</span>
                </div>
              )}
              {MenuItems.map((item, index) => {
                const modifiedUrl =
                  (item.url === "/volunteer" || item.url === "/blog")
                    ? `${item.url}/${language}`
                    : item.url;
                return (
                  <li key={index} className="mobile-menu-item">
                    <Link to={modifiedUrl} className="mobile-nav-links">
                      <i className={item.icon} aria-hidden="true"></i>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
              {data && data.role !== "User" && data.role !== null && (
                <li className="mobile-menu-item">
                  <Link to={"http://organizer.localhost:3000"} className="mobile-nav-links flex gap-2">
                    <FaUserCog className="nav-icon" /> Organizer
                  </Link>
                </li>
              )}
              {currentUser ? (
                <>
                  <li className="mobile-menu-item">
                    <Link to="/edit-profile" className="mobile-nav-links">
                      <FaEdit className="inline-block mr-2" /> Edit Profile
                    </Link>
                  </li>
                  <li className="mobile-menu-item">
                    <Link to="/view-history" className="mobile-nav-links">
                      <FaHistory className="inline-block mr-2" /> History
                    </Link>
                  </li>
                  <li className="mobile-menu-item">
                    <button onClick={handleLogout} className="warningButton mobile-nav-links w-full text-left">
                      <FaSignOutAlt className="inline-block mr-2" /> Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="mobile-menu-item">
                  <Link to="/signin">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition">
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
