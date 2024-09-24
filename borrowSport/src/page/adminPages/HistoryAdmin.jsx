
import HistoryContentAdmin from "../../components/contents/adminContents/HistoryContentAdmin";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";

export default function HistoryAdmin() {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <HistoryContentAdmin />
      </>
    );
  }
  