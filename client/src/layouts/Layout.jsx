import { Outlet } from "react-router-dom";
import Sidebar from "../components/widgets/Sidebar";

const Layout = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
