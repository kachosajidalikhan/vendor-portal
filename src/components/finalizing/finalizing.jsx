import { FaUser, FaMapMarkerAlt, FaBriefcase, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState, useRef } from "react";
import file from '../../constants/index'


function Finalizing({ onFinalizeComplete }) {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")
     const handleLetsGo = () => {
    onFinalizeComplete(); // Show Sidebar + Dashboard
  };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };



    const handleToggle = () => setIsOpen(!isOpen)

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
        setIsOpen(false)
    }
    return (
        
        <div className="flex py-12 items-center justify-center bg-[#DB024D] relative overflow-hidden">
            {/* Background Circles */}
            <div className="absolute w-[558px] h-[558px] bg-[#DD4F82] rounded-full -top-40 -left-50 z-10"></div>
            <div className="absolute w-[400px] h-[400px] bg-[#dd4f8369] rounded-full top-20 -left-40"></div>

            <div className="absolute w-[500px] h-[500px] bg-[#DD4F82] rounded-full -bottom-40 -right-40"></div>
            <div className="absolute w-[300px] h-[300px] bg-[#dd4f8369] rounded-full bottom-40 -right-32"></div>

            <div className="z-10 mt-10 text-center text-white space-y-6">
                <h1 className="text-5xl Poppins-bold ">Finalizing</h1>
                <p className="text-xl Poppins">Just some lazeez steps.......!</p>

                <div className="flex gap-6 justify-center items-center">
                    <div
                        className={`w-28 h-28 ${image ? 'border-4 border-white' : ''} rounded-full flex items-center justify-center text-6xl overflow-hidden cursor-pointer`}
                        onClick={handleClick}
                    >
                        {image ? (
                            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            // <FaUser className="text-gray-400" />
                            <img src={file.group} alt="" width={100} height={80} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                <form className="space-y-6 w-80 mx-auto">
                    {/* Name */}
                    <div className="flex items-center space-x-3 bg-[#F2C4C7] text-[#ED004F] rounded-full py-3 px-5 transition-transform duration-500 ease-in-out focus-within:scale-110">
                        <FaUser />
                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-transparent placeholder:text-[#ED004F] focus:outline-none w-full"
                        />
                    </div>

                    {/* Address */}
                    <div className="flex items-center space-x-3 bg-[#F2C4C7] text-[#ED004F] rounded-full py-3 px-5 transition-transform duration-500 ease-in-out focus-within:scale-110">
                        <FaMapMarkerAlt />
                        <input
                            type="text"
                            placeholder="Address"
                            className="bg-transparent placeholder:text-[#ED004F] focus:outline-none w-full"
                        />
                    </div>

                    {/* Business Type */}
                    <div className="relative ">
                        <div
                            className="flex transition-transform duration-500 ease-in-out hover:scale-110 items-center justify-between bg-[#F2C4C7] text-[#ED004F] rounded-full py-3 px-5 cursor-pointer"
                            onClick={handleToggle}
                        >
                            <div className="flex  items-center space-x-3 w-full">
                                <FaBriefcase />
                                <span className={`${selectedValue ? "text-[#ED004F]" : "text-[#ED004F]/70"}`}>
                                    {selectedValue || "Business type"}
                                </span>
                            </div>
                            {isOpen ? (
                                <FaChevronUp className="text-xl" />
                            ) : (
                                <FaChevronDown className="text-xl" />
                            )}
                        </div>

                        {/* Dropdown Options */}
                        {isOpen && (
                            <div className="relative w-full mt-2 bg-white rounded-lg shadow-lg z-10 text-[#ED004F]">
                                {["Restaurant",'Catering', "Cafe", "Home Chef","Others"].map((type) => (
                                    <div
                                        key={type}
                                        className="px-4 py-2 hover:bg-[#F2C4C7] cursor-pointer rounded"
                                        onClick={() => {
                                            setSelectedValue(type)
                                            setIsOpen(false)
                                        }}
                                    >
                                        {type}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        onClick={handleLetsGo}
                        className="bg-[#9E033B] transition-transform duration-500 ease-in-out hover:scale-110 hover:bg-[#870030] text-white font-bold py-2 px-6 rounded-xl"
                    >
                        Lets go!
                    </button>
                    
                   
                 
                   
                </form>           
            </div>
            <br />
            <br />
        </div>
    );
}

export default Finalizing;
