import "../css/FooterStyles.css";
import logo from "../image/Logo.png";

const Footer = () => {
    return(
        <div className="footer absolute inset-x-0 bottom-0" >
            <div className='top'>
                <div>
                    <img src={logo}></img>
                </div>
                <div>
                    <a>
                        <i class="fa-brands fa-facebook-square"></i>
                    </a>
                    <a>
                        <i class="fa-brands fa-instagram-square"></i>
                    </a>
                    <a>
                        <i class="fa-brands fa-twitter-square"></i>
                    </a>
                    <a>
                        <i class="fa-brands fa-youtube-square"></i>
                    </a>
                </div>
            </div>
            <div classname='bottom'></div>
        </div>
    )
}

export default Footer;