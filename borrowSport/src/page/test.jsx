import React, { useState } from 'react';

const EquipmentTable = ({ currentReturnDetail }) => {
  const [returnQuantities, setReturnQuantities] = useState(
    currentReturnDetail.map(() => 0) // เริ่มต้นค่าของ returning_quantity เป็น 0
  );

  const handleInputChange = (index, value) => {
    const updatedQuantities = [...returnQuantities];
    updatedQuantities[index] = value; // อัปเดตค่าในตำแหน่งที่ระบุ
    setReturnQuantities(updatedQuantities);
  };

  const handleSubmit = () => {
    const bookingDetails = currentReturnDetail.map((detail, index) => ({
      booking_detail_id: detail.booking_detail_id, // ต้องมี booking_detail_id ใน detail
      returning_quantity: returnQuantities[index],
    }));

    console.log(bookingDetails); // ทำการเก็บข้อมูลหรือส่งไปยัง API
    // คุณสามารถทำการส่งข้อมูลไปยัง API ที่ต้องการได้ที่นี่
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium uppercase">#</th>
            <th className="px-6 py-4 text-left text-sm font-medium uppercase">อุปกรณ์</th>
            <th className="px-6 py-4 text-left text-sm font-medium uppercase">จำนวนยืม</th>
            <th className="px-6 py-4 text-left text-sm font-medium uppercase">คืนแล้ว</th>
            <th className="px-6 py-4 text-left text-sm font-medium uppercase">คืน</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {currentReturnDetail.map((detail, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{detail.equipment_name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{detail.booking_quantity}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{detail.returning_quantity}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <input
                  type="number"
                  className="w-16 p-1 border rounded"
                  min={0}
                  max={detail.booking_quantity - detail.returning_quantity}
                  onChange={(e) => handleInputChange(index, parseInt(e.target.value) || 0)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
};

export default EquipmentTable;
