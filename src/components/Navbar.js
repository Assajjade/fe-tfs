import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuItems } from "./MenuItem";
import logo from "../image/Logo.png";
import "../css/NavbarStyles.css"; // Assuming you still need this for other styles
import { useAuth } from "../context/authContext";
import AxiosInstance from "./Axios";
import { FaUserCog } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [data, setData] = useState();

  const checkLanguage = () => {
    return location.pathname.endsWith("en") ? "en" : "id";
  };

  const fetchData = async () => {
    try {
      let responseData = null;
      if (currentUser?.uid) {
        const response = await AxiosInstance.get(
          `user/detail/${currentUser.uid}`
        );
        responseData = response.data;
      }
      setData(responseData);
    } catch (error) {
      console.error("Error fetching user data:", error);
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

  return (
    <nav className="NavbarItems flex items-center justify-between w-full py-2 bg-white shadow">
      <div className="flex items-center space-x-2">
        <h1 className="navbar-logo">
          <img
            style={{ width: "auto", height: "100px" }}
            src={logo}
            alt="Logo"
          />
        </h1>
      </div>
      <div className="switch flex items-center space-x-2">
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
      <ul className="nav-menu flex items-center space-x-4">
        

         <li className="flex items-center">
          <Link
            to="http://thefloatingschool.vercel.app/organizer"
            className="nav-links flex items-center space-x-2"
          >
            <FaUserCog className="nav-icon" /> Organizer
          </Link>
        </li>
        {MenuItems.map((item, index) => {
          const modifiedUrl =
            item.url === "/volunteer" || item.url === "/blog"
              ? `${item.url}/${language}`
              : item.url;
          return (
            <li key={index} className="flex items-center">
              <Link to={modifiedUrl} className="nav-links flex items-center">
                <i className={item.icon} aria-hidden="true"></i>
                {item.title}
              </Link>
            </li>
          );
        })}

       
      </ul>
    </nav>
  );
};

export default Navbar;
