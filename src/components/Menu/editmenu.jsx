import { ArrowLeft, ImagePlus, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header';

const EditMenuPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Dummy data passed via navigation
    // const item = location.state?.item || {};
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [imagePreview, setImagePreview] = useState(formData.image || null);



     useEffect(() => {
            if (location.state?.foodData) {
                console.log(location.state.foodData);
                
                setFormData(location.state.foodData);
            }
        }, [location.state]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();

        // Yahan future mein edit/update API call aayegi

        navigate('/food-list', { state: { success: true, type: 'update' } });
    };

    return (
        <div className="w-full min-h-screen bg-white">
            <div className="w-full mx-auto p-4">
                {/* <Header title="Edit Menu" /> */}

                <div className="flex justify-center items-center min-h-screen px-4 py-6 bg-white relative">
                    <button onClick={() => navigate(-1)} className="absolute left-4 top-4 text-pink-600">
                        <ArrowLeft />
                    </button>

                    <div className="w-full max-w-md border-x border-[#EE6295] px-6 py-4">
                        {/* Image Upload */}
                        <div className="w-full flex justify-center mb-6">
                            <label className="relative cursor-pointer">
                                <div className="w-[310px] h-[222px] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImagePlus className="text-[#ED004F] w-6 h-6" />
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

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSave}>
                            <div>
                                <label className="block text-sm text-[#ED004F] font-semibold mb-1">Item Name</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#ED004F] font-semibold mb-1">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#ED004F] font-semibold mb-1">Category</label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="appearance-none w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED004F]"
                                    >
                                        <option value="" disabled>Choose your food category</option>
                                        <option value="starter">Starter</option>
                                        <option value="main">Main Course</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="beverage">Beverage</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-[#ED004F]" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-[#ED004F] font-semibold mb-1">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#ED004F] font-semibold mb-1">Quantity</label>
                                <div className="relative">
                                    <select
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="appearance-none w-full border border-[#9E033B] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED004F]"
                                    >
                                        <option value="" disabled>Add quantity per box</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-[#ED004F]" />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="w-1/2 bg-[#E5024E] text-white font-semibold py-2 rounded-xl mt-4 hover:bg-pink-700 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMenuPage;
