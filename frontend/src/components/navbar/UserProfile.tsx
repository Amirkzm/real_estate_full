import React, { useEffect, useRef, useCallback, useState } from "react";
import Dropdown from "../dropDownMenu/Dropdown";
import { DropdownItem } from "../../types/propsTypes";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userProvider";
import { useNotificationStore } from "../../stores";
import useToastifyResponse from "../../hooks/useToastifyResponse";
import "./userProfile.scss";

const UserProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const number = useNotificationStore((state) => state.number);
  const fetch = useNotificationStore((state) => state.fetch);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toastifyResponse = useToastifyResponse({
    reqMethod: "POST",
    endpoint: "/auth/logout",
  });

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.id) {
      fetch(user?.id as string);
    }
  }, [location.pathname, fetch, user]);

  const logoutHandler = async () => {
    console.log("logoutHandler");
    toastifyResponse({
      onSuccess: () => {
        setUser(null);
        navigate("/");
        return "Goodbye!";
      },
      onError: () => "Failed to logout",
    });
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
    <>
      {user && (
        <div className="user">
          <img src={user?.avatar} alt="" />
          <div className="profile" ref={profileRef}>
            {number > 0 && <span className="notification">{number}</span>}
            <Dropdown
              items={Dropdown_Items}
              title={user?.username}
              isOpen={isDropdownOpen}
              setIsOpen={setIsDropdownOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

const NamedUserProfile = React.memo(UserProfile);
export default NamedUserProfile;
