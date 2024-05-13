import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import AxiosInstance from './Axios'; // Assuming AxiosInstance is set up for API calls

const EditProfile = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        email: currentUser?.email || '',
        name: '',
        username: '',
        phone_numbers: '',
        nationality: '',
        domicile: ''
    });

        useEffect(() => {
            // Fetch user data
            const fetchUserData = async () => {
                const response = await AxiosInstance.get(`user/detail/${currentUser?.uid}`);
                setFormData(response.data);
            };
            fetchUserData();
        }, [currentUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AxiosInstance.put(`/user/update/${currentUser?.uid}`, formData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="p-10 bg-white rounded-lg shadow-xl w-full max-w-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-medium">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-2 font-medium">Username</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 font-medium">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" disabled className="px-4 py-2 border rounded-lg bg-gray-100" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone_numbers" className="mb-2 font-medium">Phone Numbers</label>
                        <input type="text" id="phone_numbers" name="phone_numbers" value={formData.phone_numbers} onChange={handleChange} placeholder="Phone Numbers" className="px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nationality" className="mb-2 font-medium">Nationality</label>
                        <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" className="px-4 py-2 border rounded-lg" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="domicile" className="mb-2 font-medium">Domicile</label>
                        <input type="text" id="domicile" name="domicile" value={formData.domicile} onChange={handleChange} placeholder="Domicile" className="px-4 py-2 border rounded-lg" />
                    </div>
                    <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-500 shadow-lg focus:outline-none hover:bg-blue-600 hover:shadow-none">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};


export default EditProfile;
