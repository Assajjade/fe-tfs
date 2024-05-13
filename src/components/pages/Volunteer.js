import { Link, useParams } from "react-router-dom";
import logo from "../../image/background-homepage.png";
import { useState, useEffect } from 'react';

const Volunteer = () => {
    const api_base = "http://127.0.0.1:8000" //add be url
    const { language } = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        console.log("fetching" );
        fetch(`${api_base}/trips/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setData(data);
        });
    }, [])
    
    return(
        <div className="trip-list grid grid-cols-4 gap-10">
            {data.map((item, idx) => (
                <div key={idx} className="card rounded-xl border border-[#e4e4e4] overflow-hidden">
                    <div className="card-image z-0 relative">
                        <img className="bg bg-black" src={logo}></img>
                        <div className="absolute inset-x-0 bottom-0 bg-white w-full h-5 rounded-t-xl"> </div>
                    </div>
                    <div className="card-content p-5 pt-0 z-40">
                        <div className="card-title flex text-[#7eb3bd] font-bold text-base pb-[6px]">{item.island_name}</div>
                        <p className="card-caption font-normal text-base text-left mb-[35px]">Short description about the Island & {language === "en" ? "maximum volunteer: " : "jumlah sukarelawan maksimum: "}{item.capacity}</p>
                        <div className="card-action flex w-full justify-end">
                            <Link to={`/volunteer/detail/${item.id}`} className="detail-button bg-[#41839d] px-6 py-[5px] font-normal text-base rounded-md text-white">
                                Join Us
                            </Link>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Volunteer