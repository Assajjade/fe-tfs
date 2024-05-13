import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Ensure the path is correct
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doPasswordReset } from '../firebase/auth'; // Ensure these functions are correctly imported
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from "../image/Login.png"; // Ensure the path is correct
const ForgotPasswordModal = ({ isOpen, onClose, email, setEmail }) => {
    // Update the modal to accept email and setEmail props for controlled input
    const handlePasswordReset = async () => {
        if (!email) {
            toast.error('Please enter your email to reset password.');
            return;
        }
        try {
            await doPasswordReset(email);
            toast.success('Reset link sent! Check your email.');
            onClose(); // Close the modal after sending the email
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">Reset Your Password</h3>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border p-2 rounded w-full mt-2"
                />
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2">
                        Cancel
                    </button>
                    <button onClick={handlePasswordReset} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Send Reset Email
                    </button>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    console.log(userLoggedIn);
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSigningIn(true);
        try {
            await doSignInWithEmailAndPassword(email, password);
            toast.success('Successfully logged in!');
        } catch (error) {
            setErrorMessage(error.message);
            toast.error(error.message);
        }
        setIsSigningIn(false);
    };

    const onGoogleSignIn = async () => {
        setIsSigningIn(true);
        try {
            await doSignInWithGoogle();
            toast.success('Successfully logged in with Google!');
        } catch (error) {
            setErrorMessage(error.message);
            toast.error(error.message);
        }
        setIsSigningIn(false);
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="flex flex-col items-center justify-center bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <ForgotPasswordModal isOpen={showForgotPasswordModal} onClose={() => setShowForgotPasswordModal(false)} />
            <div className="bg-white w-full max-w-md space-y-5 p-4 shadow-xl border rounded-xl">
                <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl text-center">Welcome Back</h3>
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                        <button onClick={() => setShowForgotPasswordModal(true)} className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </button>
                    </div>
                    {errorMessage && (
                        <span className='text-red-600 font-bold'>{errorMessage}</span>
                    )}
                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl transition duration-300'}`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="text-sm text-center">Don't have an account? <Link to="/signup" className="hover:underline font-bold">Sign up</Link></p>
                <div className='flex flex-row items-center justify-center w-full'>
                    <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>OR</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                </div>
                <button
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                    className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}
                >
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </div>
        </div>
    );
};

export default Login;