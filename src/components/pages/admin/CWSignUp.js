import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../../../firebase/firebaseConfig'; // Adjust this import path to where your Firebase config and initialization are
import backgroundImage from "../../../image/Login.png";
import AxiosInstance from "../../Axios";

const CWSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    phone_numbers: '',
    nationality: '',
    domicile: '',
    confirmPassword: '',
    role: 'CW'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  
    if (name === 'password' || name === 'confirmPassword') {
      setFormErrors(prev => ({
        ...prev,
        confirmPassword: formData.password !== value ? 'Passwords do not match.' : ''
      }));
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      errors.email = "Please use a valid email.";
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(formData.password)) {
      isValid = false;
      errors.password = "Password must be at least 8 characters long, include a capital letter, and a special character like !?#.";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Passwords do not match.";
    }

    // Phone number validation
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone_numbers)) {
      isValid = false;
      errors.phone_numbers = "Phone number must be between 10 to 15 digits.";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);

      const { user } = userCredential;
      const userData = {
        uid: user.uid,
        email: formData.email,
        name: formData.name,
        username: formData.username,
        phone_numbers: formData.phone_numbers,
        nationality: formData.nationality,
        domicile: formData.domicile,
        role: formData.role,
        verified: false
      };

      await AxiosInstance.post('/signup/', userData);
      toast.success("Successfully registered! Please check your email to verify your account.");
      navigate('/admin/content-writer');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="bg-white w-full max-w-lg p-8 space-y-5 shadow-xl border rounded-xl">
            <h3 className="text-gray-800 text-2xl font-semibold text-center">Sign Up</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Name" name="name" value={formData.name} handleChange={handleChange} error={formErrors.name} />
                <InputField label="Username" name="username" value={formData.username} handleChange={handleChange} error={formErrors.username} />
                <InputField label="Email" type="email" name="email" value={formData.email} handleChange={handleChange} error={formErrors.email} />
                <InputField label="Phone Numbers" name="phone_numbers" value={formData.phone_numbers} handleChange={handleChange} error={formErrors.phone_numbers} />
                <InputField label="Nationality" name="nationality" value={formData.nationality} handleChange={handleChange} />
                <InputField label="Domicile" name="domicile" value={formData.domicile} handleChange={handleChange} />
                <InputField label="Password" type="password" name="password" value={formData.password} handleChange={handleChange} error={formErrors.password} />
                <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} handleChange={handleChange} error={formErrors.confirmPassword} />
                <button type="submit" disabled={isSubmitting} className={`w-full text-white font-medium py-2 rounded-lg transition-colors ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    </div>
);
};

const InputField = ({ label, type = 'text', name, value, handleChange, error }) => (
<div className="flex flex-col">
    <label className="text-sm text-gray-600 font-bold">{label}</label>
    <input type={type} name={name} value={value} onChange={handleChange}
        className={`mt-1 p-2 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300 focus:border-indigo-600'} shadow-sm transition duration-300`}
        required />
    {error && <span className="text-red-500 text-sm">{error}</span>}
</div>
);


export default CWSignUp;
