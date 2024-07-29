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
      onClick: () => navigate("/profile"),
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
        <Link to={"/"} className="logo">
          <img src="/logo.png" alt="" />
          <span>RealEstate</span>
        </Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>About</Link>
        <Link to={"/"}>Contact</Link>
        <Link to={"/"}>Agents</Link>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img src={user.avatar ?? "/no-profile.png"} alt="" />
            <div className="profile">
              <div className="notification">3</div>
              <Dropdown items={Dropdown_Items} title={user.username} />
            </div>
          </div>
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
