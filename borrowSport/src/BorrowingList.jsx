import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BorrowingList = () => {
const [bookings, setBookings] = useState([]);
const [userToken, setUserToken] = useState(null);
const [userId, setUserId] = useState(null);
const [placeDetails, setPlaceDetails] = useState({});
const navigate = useNavigate();

useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");

    if (storedUserId) {
        setUserId(storedUserId);
    } else {
        console.error("User ID not found in localStorage.");
    }

    if (token) {
        setUserToken(token);
    } else {
        console.error("User token not found in localStorage.");
    }
}, []);

const handleShowWelcome = () => {
    navigate('/Welcome');
};

const handleShowBorrow = () => {
    navigate('/Borrow');
};

const handleLogin = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate('/');
};

const fetchPlaceDetails = async (place_equipment_id) => {
    try {
        const placeResponse = await fetch(`http://127.0.0.1:8000/place_equipment/${place_equipment_id}`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
            }
        });
        if (!placeResponse.ok) {
            throw new Error(`HTTP error! status: ${placeResponse.status}`);
        }

        const placeData = await placeResponse.json();
        console.log(`Fetched place data for id ${place_equipment_id}:`, placeData);
        return placeData;
    } catch (error) {
        console.error("Error fetching place equipment details:", error);
    }
};

useEffect(() => {
    const fetchBookings = async () => {
        if (!userId || !userToken) {
        console.error("User or token is missing. Cannot fetch data.");
        return;
        }

        try {
            const bookingsResponse = await fetch(`http://127.0.0.1:8000/bookings/?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
        }
    });

            if (!bookingsResponse.ok) {
                throw new Error(`HTTP error! status: ${bookingsResponse.status}`);
            }

            const bookingsData = await bookingsResponse.json();
            setBookings(bookingsData);

            bookingsData.forEach((booking) => {
                booking.booking_detail.forEach(async (detail) => {
                    const placeData = await fetchPlaceDetails(detail.place_equipment_id);
                    if (placeData) {
                    setPlaceDetails((prevDetails) => ({
                        ...prevDetails,
                        [detail.place_equipment_id]: placeData
                    }));
                    }
                });
                });

        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    if (userId && userToken) {
        fetchBookings();
    }
}, [userId, userToken]);

return (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">รายการการยืมอุปกรณ์กีฬา</h1>
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-200">
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">สถานที่</th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">อุปกรณ์</th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">จำนวนที่จอง</th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">จำนวนที่คืน</th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">วันที่</th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">เวลา</th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">สถานะ</th>
                </tr>
            </thead>
            <tbody>
    {bookings.length === 0 ? (
        <tr>
        <td colSpan="7" className="text-center p-6 text-gray-500">ไม่มีอุปกรณ์ที่กำลังยืม</td>
        </tr>
    ) : (
        bookings.map((booking) => (
        booking.booking_detail.map((detail, index) => (
            <tr key={`${booking.booking_id}-${index}`} className="even:bg-gray-100">
            <td className="px-6 py-4 border-b">
                {placeDetails[detail.place_equipment_id] && placeDetails[detail.place_equipment_id].place
                ? placeDetails[detail.place_equipment_id].place.place_name
                : "Loading..."}
            </td>
            <td className="px-6 py-4 border-b">{detail.equipment_name}</td>
            <td className="px-6 py-4 border-b">x{detail.booking_quantity}</td>
            <td className="px-6 py-4 border-b">x{detail.returning_quantity}</td>
            <td className="px-6 py-4 border-b">{new Date(booking.booking_time).toLocaleDateString()}</td>
            <td className="px-6 py-4 border-b">{new Date(booking.booking_time).toLocaleTimeString()}</td>
            <td className={`px-6 py-4 border-b ${booking.booking_status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {booking.booking_status}
            </td>
            </tr>
        ))
        ))
    )}
    </tbody>
            </table>
        </div>
        <div className='flex m-3 justify-center'>
            <button
            className="w-48 p-3 m-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            onClick={handleShowBorrow}
            >
            ยืมอุปกรณ์
            </button>
            <button
            className="w-48 p-3 m-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            onClick={handleShowWelcome}
            >
            หน้าแรก
            </button>
            <button
            className="w-48 p-3 m-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            onClick={handleLogin}
            >
            ออกจากระบบ
            </button>
        </div>
        </div>
    );
};

export default BorrowingList;





