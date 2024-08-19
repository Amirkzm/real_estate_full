import { Navbar } from "../../components/navbar";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import ChatBox from "../../components/chat/chatBox/ChatBox";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
