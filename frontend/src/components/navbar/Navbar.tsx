import React, { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useUser } from "../../context/userProvider";
import { useToastifyResponse } from "../../hooks";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const nagivate = useNavigate();
  const toastifyResponse = useToastifyResponse({
    reqMethod: "POST",
    endpoint: "/auth/logout",
  });

  const handleMenuClick = () => {
    setOpen((prev) => !prev);
  };

  const logoutHandler = async () => {
    handleMenuClick();
    toastifyResponse({
      onSuccess: () => {
        setUser(null);
        nagivate("/");
        return "Goodbye!";
      },
      onError: () => "Failed to logout",
    });
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>RealEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/list">Places</Link>
        <Link to="/about">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <div className="right">
        {user ? (
          <UserProfile />
        ) : (
          <>
            <Link to="/auth/login">Sign in</Link>
            <Link to="/auth/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/" onClick={handleMenuClick}>
            Home
          </Link>
          <Link to="/list" onClick={handleMenuClick}>
            Places
          </Link>
          <Link to="/about" onClick={handleMenuClick}>
            About
          </Link>

          {!user && (
            <>
              <Link to="/auth/login" onClick={handleMenuClick}>
                Sign in
              </Link>
              <Link to="/auth/register" onClick={handleMenuClick}>
                Sign up
              </Link>
            </>
          )}
          {user && (
            <div className="logout" onClick={logoutHandler}>
              Logout
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const MemoizedNavbar = React.memo(Navbar);
export default MemoizedNavbar;
