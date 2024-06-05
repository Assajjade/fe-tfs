import "../css/FooterStyles.css";
import logo from "../image/LogoHitam.png";

const Footer = () => {
    return (
        <div className="bg-gray-100 p-4 px-12 shadow-inner">
            <div className="flex justify-between items-center mb-4 px-12">
                <a href="#">
                    <img src={logo} alt="Logo" className="" />
                </a>
                <div className="text-center text-base text-gray-600">
                &copy; 2024 The Floating School Website. All rights reserved.
                </div>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/thefloatingschool" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-facebook-square text-4xl"></i>
                    </a>
                    <a href="https://www.instagram.com/thefloatingschool/" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-instagram-square text-4xl"></i>
                    </a>
                    <a href="#https://x.com/schoolfloating?s=11" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-twitter-square text-4xl"></i>
                    </a>
                    <a href="https://www.youtube.com/@thefloatingschool9809" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-youtube-square text-4xl"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
