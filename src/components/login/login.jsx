import React, { useState } from 'react';
import { FaUser, FaKey, } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './login.css'
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        // validation, API call, etc.

        // On successful login
        onLoginSuccess(false);          // Hide login component
        // navigate("/finalizing");    // Redirect to dashboard
    };

    return (
        <div className="bg-[#ED004F] flex items-center flex-col py-10 justify-center relative overflow-hidden">
            {/* Background Circles */}
            <div className="absolute w-[558px] h-[558px] bg-[#DD4F82] rounded-full -top-50 -left-50"></div>
            <div className="absolute w-[400px] h-[400px] bg-[#dd4f83ad] rounded-full top-0 left-0 "></div>
            <div className="absolute w-[558px] h-[558px] bg-[#DD4F82] rounded-full -bottom-60 -right-60 "></div>
            <div className="absolute w-[400px] h-[400px] bg-[#dd4f83ad] rounded-full -bottom-30 -right-1"></div>

            <div className="text-center mt-10 text-white z-10">
                <h1 className="text-5xl mb-6 Poppins-bold">Login Now</h1>
                <p className="mt-2 Poppins text-xl">
                    Please login with your Lazeez special <br /> username and key.
                </p>
            </div>

            {/* Login Box */}
            {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E35688] to-[#EEAAC2] blur-lg opacity-70 z-0"> */}


            <div className="md:w-[600px] mt-10 mb-10 h-[300px] flex flex-col justify-center md:gap-5 items-center bg-white backdrop-blur-md shadow-[0_0_18px_22px_rgba(227,86,136,0.4)] shadow-[#F2C4C7] md:p-8 p-2 rounded-xl z-10 ">
                {/* Username */}
                <div className="absolute -top-8 -right-8 z-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E35688] to-[#EEAAC2] blur-xs"></div>
                </div>
                <div className="flex md:w-1/2 w-full items-center bg-[#F2C4C7] rounded-full px-4 py-3 mb-4 transition-transform duration-500 ease-in-out focus-within:scale-110">
                    <FaUser className="text-[#DB024D] mr-3" />
                    <input
                        type="text"
                        placeholder="Username"
                        className="bg-transparent focus:outline-none w-full text-[#DB024D] placeholder-[#DB024D]"
                    />
                </div>

                {/* Password */}
                <div className="flex md:w-1/2 w-full items-center bg-[#F2C4C7] rounded-full px-4 py-3 mb-6 transition-transform duration-500 ease-in-out focus-within:scale-110">
                    <FaKey className="text-[#DB024D] mr-3" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="bg-transparent focus:outline-none w-full text-[#DB024D] placeholder-[#DB024D]"
                    />
                    {
                        showPassword ? (
                            <FiEyeOff
                                className="ml-3 text-[#DB024D] cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FiEye
                                className="ml-3 text-[#DB024D] cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )
                    }
                </div>


                {/* Button */}
                <div onClick={handleLogin} className='flex justify-center'>

                    <button className="bg-[#9E033B] w-[176px]  hover:bg-[#6a0029] hover:scale-110 transition-transform duration-500 text-white px-6 py-2 rounded-lg">
                        Login now
                    </button>
                </div>
                <div className="absolute -bottom-8 -left-8 z-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E35688] to-[#EEAAC2] blur-xs"></div>
                </div>
            </div>
            <br />
            <br />
        </div>
        // </div>
    );
};

export default LoginPage;
