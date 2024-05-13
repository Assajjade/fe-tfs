import { Link, useParams } from "react-router-dom";
import logo from "../../image/background-homepage.png";
import { useEffect, useState } from "react";

const VolunteerDetail = () => {
    const {trip_id} = useParams();
    const api_base = "http://127.0.0.1:8000" //add be url
    const [data, setData] = useState([])
    useEffect(() => {
        console.log("fetching" );
        fetch(`${api_base}/trips/detail/${trip_id}/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setData(data);
        });
    }, [])
    return(
        <>
            <div className="detail-action flex w-full mb-5">
                <Link to={`/volunteer`} className="detail-button border-[#41839d] px-6 py-[5px] border font-normal text-base rounded-md text-[#41839d]">
                    Back
                </Link>
            </div>
            <div className="detail grid grid-cols-12 w-full gap-16">
                <div className="trip-detail col-span-7 flex flex-col">
                    <h2 className="trip-island-name font-bold text-4xl text-left mb-9">{data.island_name}</h2>
                    <div className="trip-detail-container grid grid-cols-1 gap-[6px]">
                        <div className="detail grid grid-cols-1 text-left gap-[6px]">
                            <h3 className="detail-params font-bold text-lg">Overview</h3>
                            <span className="detail-value font-normal text-base">Detail value</span>
                        </div>
                        <div className="detail grid grid-cols-1 text-left gap-[6px]">
                            <h3 className="detail-params font-bold text-lg">Province</h3>
                            <span className="detail-value font-normal text-base">{data.area}</span>
                        </div>
                        <div className="detail grid grid-cols-1 text-left gap-[6px]">
                            <h3 className="detail-params font-bold text-lg">Objective</h3>
                            <span className="detail-value font-normal text-base">{data.objective}</span>
                        </div>
                        <div className="detail grid grid-cols-1 text-left gap-[6px]">
                            <h3 className="detail-params font-bold text-lg">Capacity</h3>
                            <span className="detail-value font-normal text-base">{data.capacity}</span>
                        </div>
                        <div className="detail grid grid-cols-1 text-left gap-[6px]">
                            <h3 className="detail-params font-bold text-lg">Skill</h3>
                            <span className="detail-value font-normal text-base">{data.skills}</span>
                        </div>
                        <div className="detail grid grid-cols-1 text-left gap-[6px]">
                            <h3 className="detail-params font-bold text-lg">Captain</h3>
                            <span className="detail-value font-normal text-base">{data.captain}</span>
                        </div>
                    </div>
                </div>
                <div className="trip-summary col-span-5">
                    <div className="card rounded-xl overflow-hidden">
                        <div className="card-image z-0 relative">
                            <img className="bg bg-black" src={logo}></img>
                        </div>
                        <div className="card-content p-6 pt-4 z-40">
                            <div className="trip-detail-container grid grid-cols-1 gap-[6px]">
                                <div className="detail grid grid-cols-1 text-left gap-[6px]">
                                    <h3 className="detail-params font-bold text-lg">Trip Date</h3>
                                    <span className="detail-value font-normal text-base">{data.trip_date}</span>
                                </div>
                                <div className="detail grid grid-cols-1 text-left gap-[6px]">
                                    <h3 className="detail-params font-bold text-lg">Registration</h3>
                                    <span className="detail-value font-normal text-base">{data.open_registration}</span>
                                </div>
                                <div className="detail grid grid-cols-1 text-left gap-[6px]">
                                    <h3 className="detail-params font-bold text-lg">Trip Duration</h3>
                                    <span className="detail-value font-normal text-base">{data.duration}</span>
                                </div>
                                <div className="detail grid grid-cols-1 text-left gap-[6px]">
                                    <h3 className="detail-params font-bold text-lg">Captain</h3>
                                    <span className="detail-value font-normal text-base">{data.captain}</span>
                                </div>
                            </div>
                            <div className="card-action flex w-full justify-center pt-4">
                                <Link to={`/volunteer/${trip_id}/register`}  className="detail-button bg-[#41839d] w-full px-6 py-[5px] font-normal text-base rounded-md text-white">
                                    Daftar Menjadi Volunteer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VolunteerDetail