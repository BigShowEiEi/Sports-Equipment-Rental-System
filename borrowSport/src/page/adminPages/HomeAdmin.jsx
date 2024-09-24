import HomeContentAdmin from "../../components/contents/adminContents/HomeContentAdmin";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";

export default function HomeAdmin() {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <HomeContentAdmin />
      </>
    );
  }
  