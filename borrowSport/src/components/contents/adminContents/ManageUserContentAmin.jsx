import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
Modal.setAppElement("#root");

const BASE_URL = "http://127.0.0.1:8000";

export default function ManageUserContentAdmin() {
  const [userData, setUserData] = useState([]);

  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [modalIsOpenUpdate, setModalIsOpenUpdate] = useState(false);

  const [usernameUpdate, setUsernameUpdate] = useState();
  const [sernameUpdate, setSernameUpdate] = useState();
  const [lastnameUpdate, setLastnameUpdate] = useState();
  const [tellUpdate, setTellUpdate] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [passwordUpdate, setPasswordUpdate] = useState();

  const [username, setUsername] = useState();
  const [sername, setSername] = useState();
  const [lastname, setLastname] = useState();
  const [tell, setTell] = useState();
  const [password, setPassword] = useState();

//   console.log(idUpdate);
//   console.log(usernameUpdate);
//   console.log(sernameUpdate);
//   console.log(lastnameUpdate);
//   console.log(tellUpdate);
//   console.log(idUpdate);
//   console.log(passwordUpdate);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        console.log(token);
        const responseUser = await fetch(`${BASE_URL}/user/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseUser.ok) {
          throw new Error(`HTTP error! status: ${responseUser.status}`);
        }
        if (responseUser.ok) {
          const resultUser = await responseUser.json();
          setUserData(resultUser);
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const CreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log(token);
      const responseUser = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_name: username,
          sername: sername,
          lastname: lastname,
          tell: tell,
          password: password,
        }),
      });

      if (responseUser.ok) {
        Swal.fire({
          title: "Create Success!",
          text: "Create User Success!",
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

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      // console.log(id);
      await Swal.fire({
        title: "Are you sure?",
        text: "You will delete the User.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const responseDelete = await fetch(`${BASE_URL}/user/${id}`, {
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

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      // console.log(nameUpdate + "." + priceUpdate);
      const responseUpdate = await fetch(`${BASE_URL}/user/${idUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          user_name: usernameUpdate,
          sername: sernameUpdate,
          lastname: lastnameUpdate,
          tell: tellUpdate,
          password: passwordUpdate,
        }),
      });

      if (responseUpdate.ok) {
        Swal.fire({
          title: "Update Success!",
          text: "Update User Success!",
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
          <div className="p-6 grid h-auto bg-white shadow-lg rounded-lg border border-gray-200 w-auto">
            <div className="text-center py-4">
              <span className="text-2xl font-semibold text-gray-800">User</span>
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
                      Username
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      ชื่อ
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      นามสกุล
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      เบอร์
                    </th>
                    <th className="px-6 py-4 text-center  text-sm font-medium uppercase">
                      Role
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
                  {userData.map((row, index) => (
                    <tr key={row.user_id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.user_name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.sername}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.lastname}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.tell}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {row.role}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setModalIsOpenUpdate(true);
                            setIdUpdate(row.user_id);
                            setUsernameUpdate(row.user_name);
                            setSernameUpdate(row.sername);
                            setLastnameUpdate(row.lastname);
                            setTellUpdate(row.tell);
                          }}
                        >
                          แก้ไข
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deleteUser(row.user_id)}
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
          <h2 className="text-lg font-semibold mb-4 text-center">สร้าง User</h2>
          <form className="" onSubmit={CreateUser}>
            <div className="flex items-center p-1">
              Username
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username.."
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              Password
              <input
                type="password"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              ชื่อ
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="SerName.."
                onChange={(e) => setSername(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              นามสกุล
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="LastName.."
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              เบอร์
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell.."
                onChange={(e) => setTell(e.target.value)}
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
          <form className="" onSubmit={updateUser}>
            <div className="flex items-center p-1">
              Username
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username.."
                value={usernameUpdate}
                onChange={(e) => setUsernameUpdate(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              Password
              <input
                type="password"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                onChange={(e) => setPasswordUpdate(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              ชื่อ
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="SerName.."
                value={sernameUpdate}
                onChange={(e) => setSernameUpdate(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              นามสกุล
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="LastName.."
                value={lastnameUpdate}
                onChange={(e) => setLastnameUpdate(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center p-1">
              เบอร์
              <input
                type="text"
                className="ml-2 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell.."
                value={tellUpdate}
                onChange={(e) => setTellUpdate(e.target.value)}
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
