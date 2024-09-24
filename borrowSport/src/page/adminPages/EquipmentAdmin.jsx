
import EquipmentContentAdmin from "../../components/contents/adminContents/EquipmentContentAdmin";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";


export default function EquipmentAdmin() {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <EquipmentContentAdmin />
      </>
    );
  }
  