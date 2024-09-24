import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
Modal.setAppElement("#root");

const BASE_URL = "http://127.0.0.1:8000";

export default function PlaceContentAdmin() {
  const [placeData, setPlaceData] = useState([]);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [modalIsOpenUpdate, setModalIsOpenUpdate] = useState(false);

  const [placeName, setPlaceName] = useState("");
  const [nameUpdate, setNameUpdate] = useState();
  const [idUpdate, setIdUpdate] = useState();

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        console.log(token);
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
        if (responsePlace.ok) {
          const resultPlace = await responsePlace.json();
          setPlaceData(resultPlace);
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchPlaceData();
  }, []);

  const CreatePlace = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log(token);
      const responseCreate = await fetch(`${BASE_URL}/place/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ place_name: placeName }),
      });

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

  const deletePlace = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      // console.log(id);
      await Swal.fire({
        title: "Are you sure?",
        text: "You will delete the place.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const responseDelete = await fetch(`${BASE_URL}/place/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (responseDelete.ok) {
            window.location.reload();
          } else {
            Swal.fire({
              title: "Error  ?",
              text: "Error Delete The place!",
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

  const updateSoftener = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      // console.log(nameUpdate + "." + priceUpdate);
      const responseUpdate = await fetch(`${BASE_URL}/place/${idUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          place_name: nameUpdate,
        }),
      });

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

  const closeCreateModal = () => {
    setModalCreateIsOpen(false);
  };
  const closeModalUpdate = () => {
    setModalIsOpenUpdate(false);
  };

  const handlePlaceNameChange = (event) => {
    setPlaceName(event.target.value);
  };

  const handleSoftenerPriceChange = (event) => {
    setSoftenerPrice(event.target.value);
  };

  const handleNameUpdateChange = (event) => {
    setNameUpdate(event.target.value);
  };

  // console.log(idUpdate);

  return (
    <div className="px-6 py-8 mt-14 lg:ml-64 h-auto">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center">
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200 w-2/3">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">
                Place
              </span>
            </div>
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => setModalCreateIsOpen(true)}
              >
                เพิ่ม
              </button>
            </div>

            <div className="relative overflow-x-auto md:rounded-lg w-full">
              <table className="min-w-full divide-y divide-gray-300 mt-2 ">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      #
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      สถานที่
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
                  {placeData.map((row, index) => (
                    <tr key={row.place_id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.place_name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setModalIsOpenUpdate(true);
                            setNameUpdate(row.place_name);
                            setIdUpdate(row.place_id);
                          }}
                        >
                          แก้ไข
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deletePlace(row.place_id)}
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
        isOpen={modalCreateIsOpen}
        onRequestClose={closeCreateModal}
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
          <h2 className="text-lg font-semibold mb-4 text-center">Softener</h2>
          <form className="" onSubmit={CreatePlace}>
            <div className="flex items-center">
              ชื่อสถานที่
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Softener Name.."
                onChange={handlePlaceNameChange}
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
                onClick={closeCreateModal}
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
          <form className="" onSubmit={updateSoftener}>
            <div className="flex items-center">
              ชื่อน้ำยา
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Softener Name.."
                value={nameUpdate}
                onChange={handleNameUpdateChange}
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
