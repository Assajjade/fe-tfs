import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from "../Axios";
import { useAuth } from "../../context/authContext"; // Import useAuth to get current user
import BgSea from "../../image/bg-sea2.jpg";
import logo from "../../image/background-homepage.png";
import "../../css/styles.css";

const VolunteerDetail = () => {
    const { trip_id, language } = useParams();
    const api_base = "http://127.0.0.1:8000"; // Add BE URL
    const [data, setData] = useState([]);
    const { currentUser } = useAuth(); // Get current user

    useEffect(() => {
        console.log("fetching");
        fetch(`${api_base}/trips/detail/${trip_id}/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, [trip_id]);

    const translations = {
        en: {
            back: "Back",
            overview: "Overview",
            province: "Province",
            objective: "Objective",
            capacity: "Capacity",
            skill: "Skill",
            captain: "Captain",
            tripDate: "Trip Date",
            registration: "Registration",
            tripDuration: "Trip Duration",
            register: "Register as Volunteer",
        },
        id: {
            back: "Kembali",
            overview: "Ringkasan",
            province: "Provinsi",
            objective: "Tujuan",
            capacity: "Kapasitas",
            skill: "Keahlian",
            captain: "Kapten",
            tripDate: "Tanggal Perjalanan",
            registration: "Pendaftaran",
            tripDuration: "Durasi Perjalanan",
            register: "Daftar Menjadi Relawan",
        },
    };

    const t = translations[language] || translations.en;

    const handleRegister = async () => {
        try {
            const response = await AxiosInstance.post(`/trip/register/${trip_id}/`, {
                user: currentUser.id,
                name: currentUser.name,
                phoneNum: currentUser.phone_numbers,
                email: currentUser.email,
                experience: currentUser.experience,
            });
            if (response.status === 201) {
                alert('Registration successful!');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Error registering for trip:', error);
            alert('An error occurred during registration.');
        }
    };

    return (
        <div className="volunteer-detail-page min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${BgSea})` }}>
            <div className="volunteer-detail-container bg-white p-10 rounded-xl shadow-xl w-full max-w-5xl">
                <div className="detail-action flex mb-5">
                    <Link to={`/volunteer/${language}`} className="detail-button border-[#41839d] px-6 py-[5px] border font-normal text-base rounded-md text-[#41839d] mt-5 ml-10">
                        {t.back}
                    </Link>
                </div>
                <div className="detail grid grid-cols-1 md:grid-cols-12 gap-16 m-10">
                    <div className="trip-detail col-span-12 md:col-span-7 flex flex-col">
                        <h1 className="trip-island-name font-bold text-4xl mb-9">{data.island_name}</h1>
                        <div className="trip-detail-container grid grid-cols-1 gap-6">
                            <div className="detail text-left">
                                <h3 className="detail-params font-bold text-lg">{t.overview}</h3>
                                <span className="detail-value font-normal text-base">{data.overview}</span>
                            </div>
                            <div className="detail text-left">
                                <h3 className="detail-params font-bold text-lg">{t.province}</h3>
                                <span className="detail-value font-normal text-base">{data.area}</span>
                            </div>
                            <div className="detail text-left">
                                <h3 className="detail-params font-bold text-lg">{t.objective}</h3>
                                <span className="detail-value font-normal text-base">{data.objective}</span>
                            </div>
                            <div className="detail text-left">
                                <h3 className="detail-params font-bold text-lg">{t.capacity}</h3>
                                <span className="detail-value font-normal text-base">{data.capacity}</span>
                            </div>
                            <div className="detail text-left">
                                <h3 className="detail-params font-bold text-lg">{t.skill}</h3>
                                <span className="detail-value font-normal text-base">{data.skills}</span>
                            </div>
                            <div className="detail text-left">
                                <h3 className="detail-params font-bold text-lg">{t.captain}</h3>
                                <span className="detail-value font-normal text-base">{data.captain}</span>
                            </div>
                        </div>
                    </div>
                    <div className="trip-summary col-span-12 md:col-span-5">
                        <div className="card rounded-xl overflow-hidden shadow-xl">
                            <div className="card-image relative">
                                <img className="w-full h-48 object-cover" src={logo} alt="Trip" />
                            </div>
                            <div className="card-content p-6 pt-4">
                                <div className="trip-detail-container grid grid-cols-1 gap-6">
                                    <div className="detail text-left">
                                        <h3 className="detail-params font-bold text-lg">{t.tripDate}</h3>
                                        <span className="detail-value font-normal text-base">{data.trip_date}</span>
                                    </div>
                                    <div className="detail text-left">
                                        <h3 className="detail-params font-bold text-lg">{t.registration}</h3>
                                        <span className="detail-value font-normal text-base">{data.open_registration}</span>
                                    </div>
                                    <div className="detail text-left">
                                        <h3 className="detail-params font-bold text-lg">{t.tripDuration}</h3>
                                        <span className="detail-value font-normal text-base">{data.duration}</span>
                                    </div>
                                    <div className="detail text-left">
                                        <h3 className="detail-params font-bold text-lg">{t.captain}</h3>
                                        <span className="detail-value font-normal text-base">{data.captain}</span>
                                    </div>
                                </div>
                                <div className="card-action flex justify-center pt-4">
                                    <button onClick={handleRegister} className="detail-button bg-[#41839d] w-full px-6 py-3 font-normal text-base rounded-md text-white">
                                        {t.register}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDetail;
