import { ChevronRight, ArrowLeft, ImagePlus, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const CreateMenuPage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Yahan API call ya backend save logic aayega
        // For now, hum dummy success maan lete hain

        // Redirect with state
        navigate("/food-list", { state: { success: true, type: "create" } });
    };
    return (<div className='w-full min-h-screen bg-white'>
        <div className="w-full mx-auto md:p-4">
            {/* <Header title={"Creating Menu"} /> */}
            <div className="flex justify-center items-center min-h-screen px-4 py-6 bg-white relative">
                {/* Back Arrow */}
                <button onClick={() => navigate(-1)} className="absolute left-4 top-0 text-pink-600">
                    <ArrowLeft />
                </button>

                <div className="w-full max-w-md md:border-x border-[#EE6295] px-6 py-4">
                    {/* Image Upload */}
                    <div className="w-full flex justify-center mb-6">
                        <label className="relative cursor-pointer">
                            <div className="md:w-[310px] w-[220px] h-[170px] md:h-[222px] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <ImagePlus className="text-[#ED004F] w-6 h-6 " />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    {/* Form Fields */}
                    <form className="space-y-4" onSubmit={handleSave}>
                        <div>
                            <label className="block text-sm text-[#ED004F] font-semibold mb-1">Item Name</label>
                            <input
                                type="text"
                                placeholder="Enter your heading here"
                                className="w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-[#ED004F] font-semibold mb-1">Description</label>
                            <input
                                type="text"
                                placeholder="Enter your subheading here"
                                className="w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-[#ED004F] font-semibold mb-1">Category</label>
                            <div className="relative">
                                <select
                                    className="appearance-none w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ED004F]"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Choose your food category</option>
                                    <option value="starter">Starter</option>
                                    <option value="main">Main Course</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="beverage">Beverage</option>
                                </select>

                                {/* Custom arrow icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-[#ED004F]" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-[#ED004F] font-semibold mb-1">Price</label>
                            <input
                                type="text"
                                placeholder="200 Rs. per box"
                                className="w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-[#ED004F] font-semibold mb-1">Quantity</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Add quantity per box"
                                    className="w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ED004F]"
                                />
                            </div>
                        </div>

                        {/* Create Button */}
                        <div className="flex justify-center mt-6">

                            <button
                                type='submit'
                                className="w-1/2 bg-[#E5024E] text-white Poppins-bold py-2 rounded-xl mt-4 hover:bg-pink-700 transition"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div></div>
    );
};

export default CreateMenuPage;
