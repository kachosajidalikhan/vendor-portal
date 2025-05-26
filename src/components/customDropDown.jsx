import { useState, useRef, useEffect } from 'react';

const statusOptions = ['Complete', 'Pending', 'Upcoming', 'Cancelled'];

const getStatusStyle = (status) => {
    switch (status) {
        case "Complete":
            return "bg-green-100 text-[#3A974C]"
        case "Pending":
            return "bg-orange-100 text-[#F29339]"
        case "Upcoming":
            return "bg-blue-100 text-[#3A4297]"
        case "Cancelled":
            return "bg-red-100 text-[#E71D36]"
        default:
            return "bg-gray-100 text-gray-800"
    }
};

const StatusDropdown = ({ order, onChange }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (status) => {
        onChange(order.id, status);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <td className="p-4 relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                className={`px-4 cursor-pointer py-1.5 w-30 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}
            >
                {order.status || 'Add status'}
            </button>

            {open && (
                <div className="absolute -left-10 z-10 bg-white rounded-xl w-30 p-2 space-y-2 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)]">
                    {statusOptions.map((status) => (
                        <button
                            key={status}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(status);
                            }}
                            className={`w-full cursor-pointer text-center px-4 py-2 rounded-lg text-xs font-medium hover:opacity-80 transition ${getStatusStyle(status)}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            )}
        </td>
    );
};

export default StatusDropdown;
