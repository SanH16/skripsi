import { ConfigProvider, Menu } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { AiOutlineSchedule } from "react-icons/ai";
import { TfiDashboard } from "react-icons/tfi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { PiWechatLogoBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlinePeopleAlt } from "react-icons/md";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const regex = /([a-zA-Z]+)/;
  const selectedKeys = location.pathname.match(regex)[0];

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };
  const iconStyle = `w-5 h-5 text-slate-5 ${collapsed ? "mt-0.5 -ml-[0.6em]" : "mr-1 -ml-2"}`;

  const items = [
    {
      label: "",
      icon: (
        <div
          id="toggle-collapse"
          className={`cursor-pointer ${collapsed ? "-ml-8 px-8" : "-ml-6 py-3 pl-6 pr-12"}`}
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <RightOutlined id="show-toggle" className="text-black" />
          ) : (
            <span id="hide-toggle" className="text-black">
              <LeftOutlined className="pr-5" />
              Sembunyikan
            </span>
          )}
        </div>
      ),
      disabled: true,
      className: "cursor-default hover:bg-gray-200 transition-all duration-700",
    },
    {
      type: "divider",
      style: {
        margin: "20px 0",
        border: "none",
        borderTop: "2px solid #e8e8e8",
      },
    },
    getItem(
      "Dashboard",
      "dashboard",
      <Link to="/dashboard" className="p-2">
        <TfiDashboard className={iconStyle} id="dashboard-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Absensi",
      "janji",
      <Link to="/janji-temu" className="p-2">
        <MdOutlinePeopleAlt className={iconStyle} id="dashboard-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Cuti",
      "jadwal",
      <Link to="/jadwal-saya" className="p-2">
        <AiOutlineSchedule className={iconStyle} id="janji-temu-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Mutasi",
      "artikel",
      <Link to="/artikel-saya" className="p-2">
        <HiOutlineNewspaper className={iconStyle} id="artikel-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Penugasan",
      "forum",
      <Link to="/forum" className="p-2">
        <PiWechatLogoBold className={iconStyle} id="forum-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Reward & Punishment",
      "profil",
      <Link to="/profil" className="p-2">
        <CgProfile className={iconStyle} id="profile-icon-sidebar" />
      </Link>,
    ),
    {
      type: "divider",
      className: `absolute bottom-20 w-16 border-t-2 border-gray-200 transition-all duration-500 ease-out ${
        collapsed ? "w-16" : "w-48"
      }`,
    },
    {
      label: "",
      key: "8",
      icon: (
        <div
          id="logout-button"
          className={`${collapsed ? "-ml-8 px-8" : "-ml-6 py-3 pl-6 pr-16"}`}
          //   onClick={openLogoutModal}
        >
          {collapsed ? (
            <IoIosLogOut className="-ml-1 mt-2.5 h-5 w-5" id="logout-icon" />
          ) : (
            <span className="">
              <IoIosLogOut className="mr-5 h-5 w-5" id="logout-icon" />
              Keluar
            </span>
          )}
        </div>
      ),
      danger: true,
      className: `bottom-5 absolute ml-2 transition-all duration-500 ${collapsed ? "w-16" : "w-44 content-['Logout']"}`,
    },
  ];

  return (
    <div className="sticky top-[75.91px] hidden max-h-[500px] bg-white sm:top-[82.6px] sm:block md:top-[74.63px]">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "#17c6a3",
              itemSelectedColor: "#fff",
              dangerItemSelectedBg: "#ff5757",
              dangerItemSelectedColor: "#fff",
            },
          },
        }}
      >
        <Menu
          className={`relative flex h-[calc(100vh-75.91px)] min-h-[500px] max-w-[256px] flex-col space-y-5 pt-5 font-medium text-grey-200 transition-all duration-700 ease-out sm:max-md:h-[calc(100vh-82.6px)] ${
            collapsed ? "px-2" : "px-8"
          }`}
          defaultSelectedKeys={[selectedKeys]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        ></Menu>
      </ConfigProvider>
    </div>
  );
}

function getItem(label, key, icon, children, type, disabled) {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  };
}
