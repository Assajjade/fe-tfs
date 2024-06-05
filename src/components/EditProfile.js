import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import AxiosInstance from './Axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Modal from 'react-modal';
import { FaArrowLeft } from 'react-icons/fa'; // Import back icon
import '../css/styles.css'; // Make sure to import your global CSS
import BgSea from '../image/bg-sea3.jpg';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Modal styling
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        borderRadius: '10px',
        padding: '20px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

const EditProfile = () => {
    const { currentUser } = useAuth();
    const [initialFormData, setInitialFormData] = useState({});
    const [formData, setFormData] = useState({
        email: currentUser?.email || '',
        name: '',
        username: '',
        phone_numbers: '',
        nationality: '',
        domicile: '',
        profile_pic: null,
    });
    const [preview, setPreview] = useState(null);
    const [cropper, setCropper] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const response = await AxiosInstance.get(`user/detail/${currentUser?.uid}`);
                setFormData(response.data);
                setInitialFormData(response.data); // Save initial data for comparison
                setPreview(response.data.profile_pic ? `${BASE_URL}${response.data.profile_pic}` : '/profile_pics/default.webp');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (currentUser?.uid) {
            fetchUserData();
        }
    }, [currentUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prev) => ({ ...prev, profile_pic: file }));
        setPreview(URL.createObjectURL(file));
        setModalIsOpen(true);
    };

    const handleCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                const file = new File([blob], 'profile_pic.jpg', { type: 'image/jpeg' });
                setFormData((prev) => ({ ...prev, profile_pic: file }));
                setPreview(cropper.getCroppedCanvas().toDataURL());
                setModalIsOpen(false);
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any form data has changed
        const isDataChanged = Object.keys(formData).some(
            (key) => formData[key] !== initialFormData[key]
        );

        if (!isDataChanged) {
            alert("There's nothing to change or update.");
            return;
        }

        try {
            const formDataObj = new FormData();
            for (const key in formData) {
                if (key === 'profile_pic' && formData[key] instanceof File) {
                    formDataObj.append(key, formData[key], formData[key].name);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
            await AxiosInstance.put(`/user/update/${currentUser?.uid}`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <img src={BgSea} className="absolute inset-0 w-screen object-cover z-[-2] top-0 left-0" alt="Background"></img>
            <div className="mt-10 p-10 bg-white rounded shadow-xl w-full max-w-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center">
                        <label htmlFor="profile_pic" className="mb-2 font-medium">Profile Picture</label>
                        <div className="relative w-32 h-32">
                            <img
                                src={preview}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                            <input
                                type="file"
                                id="profile_pic"
                                name="profile_pic"
                                onChange={handleFileChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                    </div>
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
                        <input type="text" id="domicile" name="domicile" value={formData.domicile} onChange={handleChange} placeholder="Domicile" className="px-4 py-2 mb-2 border rounded-lg" />
                    </div>
                    <button type="submit" className="button w-full py-3 mt-6">
                        Update Profile
                    </button>
                </form>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Crop Image"
            >
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setModalIsOpen(false)} className="text-gray-600 hover:text-gray-800">
                        <FaArrowLeft className="text-2xl" />
                    </button>
                    <h2 className="text-2xl font-semibold">Crop Your Profile Picture</h2>
                    <div></div> {/* Placeholder for alignment */}
                </div>
                <Cropper
                    style={{ height: 400, width: '100%' }}
                    initialAspectRatio={1}
                    aspectRatio={1}
                    preview=".img-preview"
                    src={preview}
                    viewMode={1}
                    guides={true}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
                <button onClick={handleCrop} className="button mt-4">
                    Crop and Save
                </button>
            </Modal>
        </div>
    );
};

export default EditProfile;
