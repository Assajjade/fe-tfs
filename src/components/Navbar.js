import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuItems } from "./MenuItem";
import logo from "../image/Logo.png";
import "../css/NavbarStyles.css"; // Assuming you still need this for other styles
import { useAuth } from "../context/authContext";
import AxiosInstance from "./Axios";
import { FaUserCog } from 'react-icons/fa'; 

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [data, setData] = useState();

  // console.log(currentUser);
  // Check the language from the current URL
  const checkLanguage = () => {
    return location.pathname.endsWith("en") ? "en" : "id";
  };

  const fetchData = async () => {
    // console.error('Error fetching user data:', currentUser);
    try {
      let responseData = null;
      if (currentUser?.uid) {
        const response = await AxiosInstance.get(`user/detail/${currentUser.uid}`);
        responseData = response.data;
      }
      console.log(responseData)
      setData(responseData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };  

  useEffect(() => {
    fetchData()
}, [currentUser?.uid]);

  const [language, setLanguage] = useState(checkLanguage()); // Default language is determined from the URL

  const toggleLanguage = () => {
    // Toggle the language between "en" and "id"
    const newLanguage = language === "en" ? "id" : "en";
    // Update the language state
    setLanguage(newLanguage);
    // Construct the new URL with the updated language
    const newPath = location.pathname.replace(language, newLanguage);
    // Navigate to the new URL
    navigate(newPath);

    setTimeout(() => {
      window.location.reload();
    }, 100); // Delay of 1000 milliseconds (1 second)
  };

  // const handleLogout = async () => {
  //   try {
  //     await logout();  // Assuming logout is an async function from your auth context
  //     navigate('/login');  // Redirect to login page after logout
  //   } catch (error) {
  //     console.error('Failed to log out', error);
  //   }
  // };
  
  return (
    <nav className="NavbarItems">
      <div className="flex items-center space-x-2">
        <h1 className="navbar-logo">
          <img
            style={{ width: "auto", height: "100px" }}
            src={logo}
            alt="Logo"
          />
        </h1>
      </div>
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
        {/* Conditionally render the button based on user's role */}
        {data && data.role !== "User" && data.role !== null && (
          <li >
          <Link to={"http://localhost:3000/organizer"} className="nav-links flex gap-2">
            {/* <i className={item.icon} aria-hidden="true"></i> */}
            <FaUserCog className="nav-icon" /> Organizer
          </Link>
        </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
