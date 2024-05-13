import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './Axios';

const CrowdFundingPage = () => {
    const [landingPageData, setLandingPageData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        AxiosInstance.get(`fund/`)
            .then((res) => {
                setLandingPageData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching landing page data:', error);
            });
    }, []);

    return (
        <div>
            {landingPageData && (
                <section
                    className={`h-screen flex items-center justify-center ${
                        landingPageData.bg_landing ? 'bg-cover bg-center  text-dark' : 'sbg-cover bg-center text-dark'
                    }`}
                    style={landingPageData.bg_landing ? { 
                        backgroundImage: `url(http://127.0.0.1:8000${landingPageData.bg_landing})`,
                        backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                    } : { 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)' 
                        
                    }}>

                    <div className="text-center">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-dark">
                            {landingPageData.title}
                        </h1>
                        <h2 className="text-4xl font-extrabold text-gray-300">
                            {landingPageData.content}
                        </h2>
                        <a href="https://kitabisa.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-8 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 transition duration-300 ease-in-out">
                            Donate Now!
                        </a>

                    </div>
                </section>
            )}
        </div>
    );
};

export default CrowdFundingPage;
