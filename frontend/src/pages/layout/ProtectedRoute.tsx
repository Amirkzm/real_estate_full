import { Navbar } from "../../components/navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";
import { useUser } from "../../context/userProvider";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <div className="layout">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
