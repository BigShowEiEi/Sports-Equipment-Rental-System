
import PlaceContentAdmin from "../../components/contents/adminContents/PlaceContentAdmin";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";


export default function PlaceAdmin() {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <PlaceContentAdmin />
      </>
    );
  }
  