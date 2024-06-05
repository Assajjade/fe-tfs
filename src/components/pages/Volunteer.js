import { Link, useParams } from "react-router-dom";
import logo from "../../image/background-homepage.png";
import { useState, useEffect } from 'react';

const Volunteer = () => {
    const api_base = "http://127.0.0.1:8000"; // Add BE URL
    const { language } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("fetching");
        fetch(`${api_base}/trips/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data && Array.isArray(data.results)) {
                    setData(data.results);
                } else {
                    setError('Data is not in the expected format');
                    console.error('Data fetched is not in the expected format:', data);
                }
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error fetching data:', error);
            });
    }, [api_base]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="volunteer-page flex flex-col items-center py-10">
            <h1 className="text-2xl font-bold mb-6">
                {language === "en" ? `Total Trips: ${data.length}` : `Jumlah Perjalanan: ${data.length}`}
            </h1>
            <div className="trip-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {data.map((item, idx) => (
                    <div key={idx} className="card rounded-xl border border-[#e4e4e4] overflow-hidden">
                        <div className="card-image z-0 relative">
                            <img className="w-full h-40 object-cover" src={logo} alt="Island" />
                            <div className="absolute inset-x-0 bottom-0 bg-white w-full h-5 rounded-t-xl"> </div>
                        </div>
                        <div className="card-content p-5 pt-0 z-40">
                            <div className="card-title flex text-[#7eb3bd] font-bold text-base pb-[6px]">{item.island_name}</div>
                            <p className="card-caption font-normal text-base text-left mb-[35px]">
                                {language === "en" ? "Maximum volunteers: " : "Jumlah sukarelawan maksimum: "}{item.capacity}
                            </p>
                            <div className="card-action flex w-full justify-end">
                                <Link to={`/volunteer/${item.id}/${language}`} className="detail-button bg-[#41839d] px-6 py-[5px] font-normal text-base rounded-md text-white">
                                    {language === "en" ? "Join Us" : "Bergabung"}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Volunteer;
