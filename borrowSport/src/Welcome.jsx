import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bg from './Images/bgSport.jpg';

const Welcome = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        const storedUser = localStorage.getItem("userName");
    
        if (storedUser) {
            setUser(storedUser);
        } else if (userToken) {
            setTimeout(() => {
                navigate('/');
            }, 100);
        }
    }, [navigate]);
    

    const handleShowEquipment = () => {
        navigate('/borrow');
    };

    const handleShowList = () => {
        navigate('/borrow-list');
    };

    const handleLogin = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName"); 
        localStorage.removeItem("userId");
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-lg">
                {user ? ( 
                    <>
                        <h1 className="text-2xl font-bold text-center mb-4">
                            ยินดีต้อนรับคุณ {user}
                        </h1>
                        <div className="flex justify-center">
                            <img className='w-100 h-100' src={Bg} alt="bg" />
                        </div>
                        <div className="flex justify-center">
                            <button 
                                className="w-48 p-3 m-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                                onClick={handleShowEquipment}
                            >
                                ยืมอุปกรณ์
                            </button>
                            <button 
                                className="w-48 p-3 m-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                                onClick={handleShowList}
                            >
                                ดูรายการการยืม
                            </button>
                            <button 
                                className="w-48 p-3 m-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                                onClick={handleLogin}
                            >
                                ออกจากระบบ
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Welcome;




