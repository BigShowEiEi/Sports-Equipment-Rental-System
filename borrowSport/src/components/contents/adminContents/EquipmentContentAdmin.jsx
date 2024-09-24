import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
Modal.setAppElement("#root");

const BASE_URL = "http://127.0.0.1:8000";

export default function EquipmentContentAdmin() {
  const [placeData, setPlaceData] = useState([]);
  const [placeId, setPlaceId] = useState();
  const [equipmentData, setEquipmentData] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [equipmentId, setEquipmentId] = useState();
  const [stock, setStock] = useState();

  const [idUpdate, setIdUpdate] = useState();

  const [equipmentIdUpdate, setEquipmentIdUpdate] = useState();
  const [stockUpdate, setStockUpdate] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenUpdate, setModalIsOpenUpdate] = useState(false);

  useEffect(() => {
    if (placeId) {
      fetchEquipmentData();
    }

    const fetchPlaceData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const responsePlace = await fetch(`${BASE_URL}/place/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responsePlace.ok) {
          throw new Error(`HTTP error! status: ${responsePlace.status}`);
        }

        const resultPlace = await responsePlace.json();
        setPlaceData(resultPlace);
        // console.log(placeData)
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    const fetchEquipment = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const responseEq = await fetch(`${BASE_URL}/equipment/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseEq.ok) {
          throw new Error(`HTTP error! status: ${responseEq.status}`);
        }

        const resultEq = await responseEq.json();
        setEquipment(resultEq);
        // console.log(placeData)
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchPlaceData();
    fetchEquipment();
  }, [placeId]);

  const fetchEquipmentData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log(placeId);
      const responseEquipment = await fetch(
        `${BASE_URL}/place_equipment/place/${placeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!responseEquipment.ok) {
        throw new Error(`HTTP error! status: ${responsePlace.status}`);
      }
      const resultEquipment = await responseEquipment.json();
      setEquipmentData(resultEquipment);
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

  const CreateEquipment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log(token);
      const responseCreate = await fetch(`${BASE_URL}/place_equipment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          place_id: placeId,
          equipment_id: equipmentId,
          stock: stock,
        }),
      });

      if (responseCreate.ok) {
        Swal.fire({
          title: "Create Success!",
          text: "Create Equipment Success!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchEquipmentData();
            setModalIsOpen(false);
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

  const deleteEquipment = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      // console.log(id);
      await Swal.fire({
        title: "Are you sure?",
        text: "You will delete the Equipment.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const responseDelete = await fetch(
            `${BASE_URL}/place_equipment/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (responseDelete.ok) {
            fetchEquipmentData();
          } else {
            Swal.fire({
              title: "Error  ?",
              text: "Error Delete The Equipment!",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to Delete.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const updateEquipment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const responseUpdate = await fetch(
        `${BASE_URL}/place_equipment/${idUpdate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            place_id: placeId,
            equipment_id: equipmentIdUpdate,
            stock: stockUpdate,
          }),
        }
      );

      if (responseUpdate.ok) {
        Swal.fire({
          title: "Update Success!",
          text: "Update Place Success!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(async (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to Update.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to Update.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeModalUpdate = () => {
    setModalIsOpenUpdate(false);
  };

  // console.log(idUpdate);

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200 w-2/3">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">
                Equipment
              </span>
            </div>
            <div className="flex flex-wrap p-2 items-center">
              <label className="p-1">สถานที่ :</label>
              <select
                className="ml-1 w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-2 p-2.5  "
                placeholder="Choose Softener"
                onChange={(e) => {
                  setPlaceId(e.target.value);
                }}
                required
              >
                <option value="">---เลือกสถานที่---</option>
                {placeData.map((item) => (
                  <option key={item.place_id} value={item.place_id}>
                    {item.place_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative overflow-x-auto md:rounded-lg w-full">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => setModalIsOpen(true)}
              >
                เพิ่ม
              </button>
              <table className="min-w-full divide-y divide-gray-300 mt-2 ">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      #
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      อุปกรณ์
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      จำนวน
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      แก้ไข
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      ลบ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {equipmentData.map((row, index) => (
                    <tr
                      key={row.place_equipment_id}
                      className="hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.equipment_name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        {row.stock}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setModalIsOpenUpdate(true);
                            setEquipmentIdUpdate(row.equipment_id);
                            setIdUpdate(row.place_equipment_id);
                            setStockUpdate(row.stock)
                          }}
                        >
                          แก้ไข
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            deleteEquipment(row.place_equipment_id)
                          }
                        >
                          ลบ
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
      {/* Modal Create */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Slip Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            width: "600px", // ปรับขนาดกว้าง
            height: "300px", // ปรับขนาดสูง
            margin: "auto", // จัด modal ให้อยู่ตรงกลาง
            borderRadius: "10px", // ขอบโค้งมน
          },
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            เพิ่มอุปกรณ์
          </h2>
          <form className="" onSubmit={CreateEquipment}>
            <div className="flex items-center">
              <label className="p-1">อุปกรณ์ :</label>
              <select
                className="ml-1 w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-2 p-2.5  "
                placeholder="Choose Softener"
                onChange={(e) => {
                  setEquipmentId(e.target.value);
                }}
                required
              >
                <option value="">---เลือกอุปกรณ์---</option>
                {equipment.map((item) => (
                  <option key={item.equipment_id} value={item.equipment_id}>
                    {item.equipment_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-2">
              จำนวน
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Stock.."
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="flex  ">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
              >
                ยืนยัน
              </button>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                ปิด
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal edit */}
      <Modal
        isOpen={modalIsOpenUpdate}
        onRequestClose={closeModalUpdate}
        contentLabel="Slip Image Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            margin: "auto", // จัด modal ให้อยู่ตรงกลาง
            borderRadius: "10px", // ขอบโค้งมน
          },
        }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">แก้ไข</h2>
          <form className="" 
          onSubmit={updateEquipment}
          >
            <div className="flex items-center mt-2">
              จำนวน
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Stock.."
                value={stockUpdate}
                onChange={(e) => setStockUpdate(e.target.value)}
                required
              />
            </div>

          

            <div className="flex  ">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
              >
                ยืนยัน
              </button>
              <button
                onClick={closeModalUpdate}
                className="mt-4 px-4 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                ปิด
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
