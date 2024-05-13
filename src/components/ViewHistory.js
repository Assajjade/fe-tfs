import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';

const ViewHistory = () => {
    const { currentUser } = useAuth();
    const [history, setHistory] = useState([]);

    console.log(currentUser);
    useEffect(() => {
        const fetchHistory = async () => {
            // Correctly pass volunteer_id and ensure URL is correct
            const response = await AxiosInstance.get(`api/volunteer-history/${currentUser?.uid}`);
            setHistory(response.data);
        };
        if (currentUser?.uid) {
            fetchHistory();
        }
    }, [currentUser?.uid]);
    

    const navigate = useNavigate();

    const handleRowClick = (tripId) => {
        navigate(`/detail/${tripId}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">View History</h1>
                    <div className="shadow overflow-hidden rounded border-b border-gray-200">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Date</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Event</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {history.map((item, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="text-left py-3 px-4">{item.date}</td>
                                        <td className="text-left py-3 px-4">{item.event}</td>
                                        <td className="text-left py-3 px-4">{item.status}</td>
                                        <td className="text-left py-3 px-4">
                                            <button
                                                onClick={() => handleRowClick(item.tripId)}
                                                className="text-blue-500 hover:text-blue-800">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewHistory;