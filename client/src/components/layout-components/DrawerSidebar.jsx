import { useState } from "react";
import { ConfigProvider, Drawer, Menu, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { TfiDashboard } from "react-icons/tfi";
import { AiOutlineSchedule } from "react-icons/ai";
import { HiOutlineNewspaper } from "react-icons/hi";
import { PiWechatLogoBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePeopleAlt } from "react-icons/md";

import logoTopbar from "@/assets/company-logo.jpg";

export default function DrawerSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const regex = /([a-zA-Z]+)/;
  const selectedKeys = location.pathname.match(regex)[0];

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const iconStyle = "text-xl";
  const items = [
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
  ];
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "#17c6a3",
              itemSelectedColor: "#fff",
            },
          },
        }}
      >
        <Space>
          <BsList
            className="m-1 cursor-pointer text-xl sm:hidden"
            onClick={handleOpen}
          />
        </Space>
        <Drawer
          width={300}
          title={<DrawerTitle />}
          placement="left"
          closable={true}
          onClose={handleOpen}
          open={isOpen}
          // footer={<LogoutItem />}
        >
          <Menu
            className="flex flex-col gap-1 border-0"
            defaultSelectedKeys={[selectedKeys]}
            mode="inline"
            theme="light"
            items={items}
          ></Menu>
        </Drawer>
      </ConfigProvider>
    </>
  );
}

function DrawerTitle() {
  return (
    <div className="flex justify-end">
      <Link to="/">
        <img
          id="logo-reprohealth-drawer"
          src={logoTopbar}
          alt="logo"
          className="h-[25px] w-28 cursor-pointer sm:block md:w-40"
        />
      </Link>
    </div>
  );
}

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
