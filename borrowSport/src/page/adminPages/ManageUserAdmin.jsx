
import ManageUserContentAdmin from "../../components/contents/adminContents/ManageUserContentAmin";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";


export default function ManageUserAdmin() {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <ManageUserContentAdmin />
      </>
    );
  }
  