import React, { useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        // validation, API call, etc.
        onLoginSuccess(false);
        // navigate("/finalizing");
    };

    return (
        <div className="bg-[#ED004F] min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-10">
            {/* Background Circles */}
            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#DD4F82] rounded-full -top-32 -left-32 z-0"></div>
            <div className="absolute w-[300px] h-[300px] bg-[#dd4f83ad] rounded-full top-0 left-0 z-0"></div>
            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#DD4F82] rounded-full -bottom-32 -right-32 z-0"></div>
            <div className="absolute w-[300px] h-[300px] bg-[#dd4f83ad] rounded-full bottom-10 right-0 z-0"></div>

            <div className="w-full max-w-xl z-10">
                <div className="text-center text-white mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Login Now</h1>
                    <p className="text-base md:text-xl">
                        Please login with your Lazeez special <br className="hidden md:block" />
                        username and key.
                    </p>
                </div>

                {/* Login Form */}
                <div className="w-full bg-white shadow-lg shadow-[#F2C4C7] rounded-xl p-6 md:p-10 relative z-10">
                    {/* Decorative circles */}
                    <div className="absolute -top-6 -right-6 z-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#E35688] to-[#EEAAC2] blur-sm"></div>
                    </div>

                    {/* Username */}
                    <div className="flex items-center bg-[#F2C4C7] rounded-full px-4 py-3 mb-4 transition-transform duration-500 ease-in-out focus-within:scale-105">
                        <FaUser className="text-[#DB024D] mr-3" />
                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-transparent focus:outline-none w-full text-[#DB024D] placeholder-[#DB024D]"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center bg-[#F2C4C7] rounded-full px-4 py-3 mb-6 transition-transform duration-500 ease-in-out focus-within:scale-105">
                        <FaKey className="text-[#DB024D] mr-3" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="bg-transparent focus:outline-none w-full text-[#DB024D] placeholder-[#DB024D]"
                        />
                        {showPassword ? (
                            <FiEyeOff
                                className="ml-3 text-[#DB024D] cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FiEye
                                className="ml-3 text-[#DB024D] cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>

                    {/* Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            className="bg-[#9E033B] w-full sm:w-1/2 hover:bg-[#6a0029] hover:scale-105 transition-transform duration-300 text-white px-6 py-2 rounded-lg"
                        >
                            Login now
                        </button>
                    </div>

                    <div className="absolute -bottom-6 -left-6 z-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#E35688] to-[#EEAAC2] blur-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
