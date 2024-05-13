import React, { useState, useEffect } from 'react';
import AxiosInstance from './Axios';

const CrowdFundingWriting = () => {
    const [fundingWritingData, setFundingWritingData] = useState([]);

    const fetchFundingWritingData = () => {
        AxiosInstance.get('crowdfunding/writing')
            .then((res) => {
                const filteredData = res.data.filter(item => item.isShow).sort((a, b) => a.id - b.id);
                const slicedData = filteredData.slice(0, 3);
                setFundingWritingData(slicedData);
            })
            .catch((error) => {
                console.error('Error fetching Funding Writing data:', error);
            });
    };

    useEffect(() => {
        fetchFundingWritingData();
    }, []);

    const calculateCardWidth = () => {
        const numCards = fundingWritingData.length;
        return numCards > 0 ? `${100 / numCards}%` : 'auto';
    };

    if (fundingWritingData.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto flex justify-center items-center" style={{ paddingTop: '80px', paddingBottom: '120px', paddingLeft: '10px' }}>
            <div className="w-full max-w-screen-lg">
                <h1 className="text-3xl font-bold mb-5">How do we do the crowdfunding?</h1>
                <div className="flex justify-center" style={{ paddingTop: '20px', paddingBottom: '5px' }}>
                    {fundingWritingData.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg" style={{ width: calculateCardWidth(), marginRight: '10px',backgroundColor: 'rgba(79, 167, 171, 0.4)', padding: "20px" }}>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CrowdFundingWriting;
