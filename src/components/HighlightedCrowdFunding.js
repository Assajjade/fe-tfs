import React, { useState, useEffect } from 'react';
import AxiosInstance from './Axios';

const HighlightedCrowdFunding = () => {
    const [highlightedFundingData, setHighlightedFundingData] = useState([]);

    const fetchHighlightedFundingData = () => {
        AxiosInstance.get('crowdfunding/')
            .then((res) => {
                const sortedData = res.data.filter(item => item.highlighted).sort((a, b) => a.id - b.id).slice(0, 3);
                setHighlightedFundingData(sortedData);
            })
            .catch((error) => {
                console.error('Error fetching Highlighted Funding data:', error);
            });
    };

    useEffect(() => {
        fetchHighlightedFundingData();
    }, []);

    
    const calculateCardWidth = () => {
        const numCards = highlightedFundingData.length; // Number of cards
        return numCards > 0 ? `${(100 / numCards)}%` : 'auto';
    };
    if (highlightedFundingData.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto flex justify-center items-center" style={{paddingTop: '80px', paddingBottom: '120px'}}>
            <div className="w-full max-w-screen-lg">
                <h1 className="text-3xl font-bold mb-5">DONATE WITH US</h1>
                <div className="flex justify-center" style={{ paddingTop: '20px', paddingBottom: '5px' }}>
                    {highlightedFundingData.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105" style={{ width: calculateCardWidth(), marginRight: '10px', backgroundColor: 'rgba(79, 167, 171, 0.4)',  padding: "20px" }}>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p>{item.purpose}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block mt-4 py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 ease-in-out">Go to Campaign</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HighlightedCrowdFunding;
