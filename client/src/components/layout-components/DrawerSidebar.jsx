import { useState } from "react";
import { ConfigProvider, Drawer, Menu, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { BsList, BsPersonVcard } from "react-icons/bs";
import { TfiDashboard } from "react-icons/tfi";
import { AiOutlineSchedule } from "react-icons/ai";
import { HiOutlineNewspaper } from "react-icons/hi";
import { PiTipJar } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAssignment, MdOutlinePeopleAlt } from "react-icons/md";

import logoTopbar from "@/assets/react.svg";

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
      "Rekrutmen",
      "rekrut",
      <Link to="/rekrutmen" className="p-2">
        <BsPersonVcard className={iconStyle} id="rekrutmen-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Absensi",
      "janji",
      <Link to="/janji-temu" className="p-2">
        <MdOutlinePeopleAlt className={iconStyle} id="absensi-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Cuti",
      "jadwal",
      <Link to="/jadwal-saya" className="p-2">
        <AiOutlineSchedule className={iconStyle} id="cuti-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Mutasi",
      "artikel",
      <Link to="/artikel-saya" className="p-2">
        <HiOutlineNewspaper className={iconStyle} id="mutasi-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Penugasan",
      "forum",
      <Link to="/forum" className="p-2">
        <MdOutlineAssignment
          className={iconStyle}
          id="penugasan-icon-sidebar"
        />
      </Link>,
    ),
    getItem(
      "Reward & Punishment",
      "profil",
      <Link to="/reward" className="p-2">
        <PiTipJar className={iconStyle} id="reward-icon-sidebar" />
      </Link>,
    ),
    getItem(
      "Profile",
      "profil",
      <Link to="/profil" className="p-2">
        <CgProfile className={iconStyle} id="reward-icon-sidebar" />
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
