import { useEffect, useState } from "react";


const BannerCard = () => {
    const [number, setNumber] = useState(0);
    const delay = 50;
    
    useEffect(() => {
        if (number >= 10) return; // Dừng useEffect khi number đạt 10
    
        const interval = setInterval(() => {
          setNumber((prevNumber) => prevNumber + 1);
        }, delay);
    
        return () => clearInterval(interval); 
      }, [number]); 
  return (
    
        <div className="flex justify-center items-center w-64 h-48 bg-gray-100 rounded-lg shadow-md m-auto">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-blue-600">{number}M+</h1>
            <div className="flex justify-center items-baseline mt-2">
              <h2 className="text-3xl font-semibold text-gray-800">Users</h2>
              <p className="text-lg text-gray-500 ml-2">/month</p>
            </div>
          </div>
        </div>
  )
}

export default BannerCard
