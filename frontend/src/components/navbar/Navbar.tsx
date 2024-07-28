import { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../dropDownMenu/Dropdown";
import { DropdownItem } from "../../types/propsTypes";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import apiRequest from "../../lib/apiRequest";
import { useUser } from "../../context/userProvider";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const logoutHandler = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      if (res.status === 200) {
        setUser(null);
        navigate("/");
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Dropdown_Items: DropdownItem[] = [
    {
      title: "Profile",
      icon: <CgProfile />,
      onClick: () => console.log(" go to profile"),
    },
    {
      title: "Logout",
      icon: <IoLogOutOutline />,
      onClick: logoutHandler,
    },
  ];

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>RealEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
            <div className="profile">
              <div className="notification">3</div>
              <Dropdown items={Dropdown_Items} title={user.username} />
            </div>
          </div>
        ) : (
          <>
            <a href="/authentication">Sign in</a>
            <a href="/authentication" className="register">
              Sign up
            </a>
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
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
