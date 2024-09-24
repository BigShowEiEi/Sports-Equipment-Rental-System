import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  imageBall, 
  imageBas, 
  imageTennis, 
  imageBat, 
  imageGolf, 
  imagePingpong, 
  imageVolle 
} from './Image';

const BorrowEquipment = () => {
  const [places, setPlaces] = useState([]);
  const [placeEquipment, setPlaceEquipment] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const placeResponse = await fetch('http://127.0.0.1:8000/place/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
      const placesData = await placeResponse.json();
      setPlaces(placesData);

    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlaceEquipment = async () => {
      if (selectedPlace) {
        const placeEquipmentResponse = await fetch(`http://127.0.0.1:8000/place_equipment/place/${selectedPlace}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
        const placeEquipmentData = await placeEquipmentResponse.json();
        console.log(placeEquipmentData);
        setPlaceEquipment(placeEquipmentData);
      }
    };

    fetchPlaceEquipment();
  }, [selectedPlace]);

  const handleQuantityChange = (equipmentId, value) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [equipmentId]: value
    }));
  };

  const handleBorrow = async () => {
    if (!selectedPlace) {
      alert('กรุณาเลือกสถานที่');
      return;
    }
  
    const equipmentToBorrow = placeEquipment.filter(
      (pe) => pe.place_id === parseInt(selectedPlace) && selectedQuantities[pe.equipment_id] > 0
    );
  
    console.log(equipmentToBorrow);
  
    if (equipmentToBorrow.length === 0) {
      alert('กรุณาเลือกอุปกรณ์และจำนวนที่ต้องการยืม');
      return;
    }
  
    const hasExceededStock = equipmentToBorrow.some(
      (eq) => selectedQuantities[eq.equipment_id] > eq.available_stock
    );
  
    if (hasExceededStock) {
      alert('จำนวนอุปกรณ์ที่เลือกเกินจำนวนคงเหลือ');
      return;
    }
  
    const booking = {
      user_id: localStorage.getItem("userId"), 
      detail: equipmentToBorrow.map((eq) => ({
        place_equipment_id: eq.place_equipment_id, 
        booking_quantity: selectedQuantities[eq.equipment_id]
      })),
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/user/booking/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });
  
      if (response.ok) {
        navigate('/borrow-list');
      } else {
        alert('เกิดข้อผิดพลาดในการยืมอุปกรณ์');
      }
    } catch (error) {
      console.error('Error while borrowing equipment:', error);
      alert('เกิดข้อผิดพลาดในการยืมอุปกรณ์');
    }
  };
  
  const handleShowWelcome = () => {
    navigate('/borrow-list');
  };

  const renderEquipmentImage = (equipmentName) => {
    switch (equipmentName) {
      case 'บอล': return imageBall();
      case 'บาส': return imageBas();
      case 'เทนนิส': return imageTennis();
      case 'แบต': return imageBat();
      case 'กอล์ฟ': return imageGolf();
      case 'ปิงปอง': return imagePingpong();
      case 'วอลเลย์': return imageVolle();
      default: return null;
    }
  };

  return (
<div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">ยืมอุปกรณ์กีฬา</h1>

  <div className="mb-6">
    <label className="block text-lg font-medium text-gray-700 mb-2">เลือกสถานที่:</label>
    <select
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      onChange={(e) => setSelectedPlace(e.target.value)}
    >
      <option value="">-- เลือกสถานที่ --</option>
      {places.map((place) => (
        <option key={place.place_id} value={place.place_id}>
          {place.place_name}
        </option>
      ))}
    </select>
  </div>

  {selectedPlace && (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">อุปกรณ์ที่มีในสถานที่</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeEquipment
    .filter((pe) => pe.place_id === Number(selectedPlace))
    .map((pe) => {
      return (
        <div
          key={pe.equipment_id}
          className="flex flex-col items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
        >
          {renderEquipmentImage(pe.equipment_name)}
          <p className="text-lg font-medium text-gray-800 mt-4 mb-2">
            {pe.equipment_name} : {pe.available_stock}
          </p>
          <input
            type="number"
            min="0"
            value={selectedQuantities[pe.equipment_id] || 0}
            onChange={(e) => handleQuantityChange(pe.equipment_id, parseInt(e.target.value))}
            className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>
      );
    })}
      </div>
    </div>
  )}

  <div className="flex m-3 justify-center">
    <button
      onClick={handleBorrow}
      className="w-48 p-3 m-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
    >
      ยืมอุปกรณ์
    </button>
    <button
      className="w-48 p-3 m-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      onClick={handleShowWelcome}
    >
      ดูรายการการยืม
    </button>
  </div>
</div>

  );
};

export default BorrowEquipment;
