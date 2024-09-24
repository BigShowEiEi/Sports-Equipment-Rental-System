import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

const BASE_URL = "http://127.0.0.1:8000";
Modal.setAppElement("#root");

export default function HomeContentAdmin() {
  const [orderData, setOrderData] = useState([]);
  const [equipmentData, seteEquipmentData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [modalEquipmentIsOpen, setModalEquipmentIsOpen] = useState(false);
  const [currentBookingDetail, setCurrentBookingDetail] = useState([]);
  const [modalReturnIsOpen, setModalReturnIsOpen] = useState(false);
  const [currentReturnDetail, setCurrentReturnDetail] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // const token = localStorage.getItem("employeeToken");
        const userId = 1;
        // if (!token) {
        //   console.error("No token found");
        //   return;
        // }
        const responseOrder = await fetch(`${BASE_URL}/admin/bookings`, {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if (!responseOrder.ok) {
          throw new Error(`HTTP error! status: ${responseOrder.status}`);
        }
        const resultOrder = await responseOrder.json();
        console.log(resultOrder);
        console.log("Data received:", resultOrder); // ตรวจสอบโครงสร้างข้อมูลที่ได้รับ

        // ตรวจสอบว่าข้อมูลที่ได้รับเป็น array หรือไม่
        if (Array.isArray(resultOrder)) {
          const filteredOrders = resultOrder.filter(
            (order) => order.booking_status === "คืนครบ"
          );
          setOrderData(filteredOrders);
          // console.log(filteredOrders);
        } else {
          console.error("Data received is not an array");
        }

        // setOrderData(resultOrder);
        console.log(resultOrder);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchOrderData();
  }, []);

  const fetchEquipmentData = async (id) => {
    try {
      // const token = localStorage.getItem("employeeToken");
      const userId = 1;
      // if (!token) {
      //   console.error("No token found");
      //   return;
      // }
      const responseEquipment = await fetch(`${BASE_URL}/returning/${id}`, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
      });

      if (!responseEquipment.ok) {
        throw new Error(`HTTP error! status: ${responseEquipment.status}`);
      }
      const resultEquipment = await responseEquipment.json();
      console.log(resultEquipment);

      if (resultEquipment) {

        seteEquipmentData(resultEquipment);

      } else {
        console.error("Data received is not an array");
      }

      // setOrderData(resultOrder);
      console.log(resultOrder);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const openModalEquipment = (bookingDetail) => {
    setCurrentBookingDetail(bookingDetail);
    setModalEquipmentIsOpen(true);
  };

  const closeModalEquipment = () => {
    setModalEquipmentIsOpen(false);
  };

  const openModalReturn = (booking_id, user_id, bookingDetail) => {
    fetchEquipmentData(booking_id)

    // const updatedBookingDetail = bookingDetail.map((e) => {
    //   // ทำการเปลี่ยนแปลงข้อมูลของ e ที่นี่
    //   return {
    //     booking_id,
    //     user_id,
    //     returning_quantity_react: 0,
    //     ...e, // ทำการคัดลอกคุณสมบัติทั้งหมดของ e
    //     // เพิ่มหรือเปลี่ยนแปลงข้อมูลที่คุณต้องการ
    //     // เช่น: newProperty: 'newValue',
    //   };
    // });
    // console.log(updatedBookingDetail);
    // // setCurrentReturnDetail(bookingDetail.push(booking_id,user_id));
    // setCurrentReturnDetail(updatedBookingDetail);
    setModalReturnIsOpen(true);
  };

  const closeModalReturn = () => {
    setModalReturnIsOpen(false);
  };

  const handleChange = (index, e) => {
    const newDetails = [...currentReturnDetail]; // สร้างสำเนาใหม่ของ currentReturnDetail
    console.log(e.target.value);
    newDetails[index].returning_quantity_react = e.target.value; // เปลี่ยนค่าในสำเนา
    setCurrentReturnDetail(newDetails); // อัปเดต state ด้วยสำเนาใหม่
  };

  useEffect(() => {
    console.log(currentReturnDetail);
  }, [currentReturnDetail]);

  const CreateReturn = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("No token found");
        return;
      }
      const new_equipments = currentReturnDetail.map((item) => ({
        ...item,
        returning_quantity: parseInt(item.returning_quantity_react), // แปลงค่าจาก returning_quantity_react เป็นจำนวนเต็ม
      }));
      console.log("new_equipments new_equipments ");
      console.log(new_equipments);
      const responseCreate = await fetch(`${BASE_URL}/returning/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          booking_id: currentReturnDetail[0].booking_id,
          user_id: currentReturnDetail[0].user_id,
          equipments: new_equipments,
        }),
      });
      console.log(responseCreate);
      if (responseCreate.ok) {
        Swal.fire({
          title: "Create Success!",
          text: "Create Place Success!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to Create.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to Create.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">
                Borrowing order
              </span>
            </div>
            <div className="relative overflow-x-auto md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      รหัสผู้ยืม
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      ชื่อผู้ยืม
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      วันเวลายืม
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                      สถานะ
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-medium uppercase"
                      // onClick={() => setModalReturnIsOpen(true)}
                    >
                      การคืน
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {orderData.map((row, index) => (
                    <tr key={row.booking_id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {row.user_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.sername}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.booking_time.replace("T", " ")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {row.booking_status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() =>
                            openModalReturn(
                              row.booking_id,
                              row.user_id,
                              row.booking_detail
                            )
                            
                          }
                        >
                          อุปกรณ์
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal สำหรับดูการคืน */}
      <Modal
        isOpen={modalReturnIsOpen}
        onRequestClose={closeModalReturn}
        contentLabel="Equipment modal"
        className="fixed inset-0 flex items-center justify-center z-50 w-auto h-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            margin: "auto", // จัด modal ให้อยู่ตรงกลาง
            borderRadius: "10px", // ขอบโค้งมน
          },
        }}
      >
        <div className="bg-white  p-4 rounded-lg shadow-lg">
          <h2 className="text-center text-lg font-semibold mb-4">
            อุปกรณ์ที่คืน
          </h2>
          <div className="relative overflow-x-auto md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                    เวลา
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                    อุปกรณ์
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                    จำนวนคืน
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase">
                    คืน
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {equipmentData.map((detail, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {detail.returning_time.replace("T", " ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {detail.equipment_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {detail.returning_quantity}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex  ">
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
              onClick={CreateReturn}
            >
              ยืนยัน
            </button>
            <button
              onClick={closeModalReturn}
              className="mt-4 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              ปิด
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
