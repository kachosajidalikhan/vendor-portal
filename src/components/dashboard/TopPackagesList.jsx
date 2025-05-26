import icons from "../../constants/index"

function StarRating({ value = 0 }) {
  return (
    <div className="flex items-center gap-0.5 mt-1 mb-1">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} className="w-4 h-4" fill={i <= value ? '#FFC107' : '#E0E0E0'} viewBox="0 0 20 20"><polygon points="10,1.5 12.6,7.5 19,8 14,12.5 15.5,19 10,15.5 4.5,19 6,12.5 1,8 7.4,7.5" /></svg>
      ))}
    </div>
  );
}

export default function TopPackagesList({ topPackages }) {
  return (
    <div className="p-6 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#f50057] poppins">Top Selling Packages</h3>
        <button className="text-gray-400 text-xl">⋯</button>
      </div>
      <div className="divide-y divide-[#fcdde4]">
        {topPackages.map((pkg, idx) => (
          <div key={pkg.name} className={`flex items-center gap-4 py-2 ${idx === 0 ? '' : ''}`}>
            <div className="w-[96px] h-[96px] overflow-hidden rounded-xl">
              <img src={icons.LazeezImage} alt=""  />
            </div>
            <div className="flex-1">
              <h4 className="text-black mb-1 poppins">{pkg.name}</h4>
              <StarRating value={pkg.stars || 4} />
              <div className="font-bold text-black text-base mt-1 poppins">Rs. {pkg.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 