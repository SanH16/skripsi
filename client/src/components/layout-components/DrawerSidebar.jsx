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

import logoTopbar from "@/assets/logo-radenmat-poppins.png";
import { IoIosLogOut } from "react-icons/io";
import { LogoutModal } from "@/components/layout-components/LogoutModal";
import { FaUserTimes } from "react-icons/fa";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";

export default function DrawerSidebar() {
  const userState = useSelector(selectGetUserLogin);
  const isDirektur = userState?.data?.role === "direktur";

  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const location = useLocation();
  const regex = /([a-zA-Z]+)/;
  const selectedKeys = location.pathname.match(regex)[0];

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsShow((prev) => !prev);
  };

  const LogoutItem = () => {
    return (
      <div className="flex justify-center px-4">
        <button
          id="logout-button-drawer"
          className="flex w-full flex-row rounded-lg py-[0.6rem] text-sm text-negative hover:bg-negative hover:text-white"
          onClick={handleOpenModal}
        >
          <span className="ms-4">
            <IoIosLogOut
              className="me-2 text-xl font-semibold"
              id="logout-icon"
            />
          </span>
          Keluar
        </button>
      </div>
    );
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
    !isDirektur &&
      getItem(
        "Rekrutmen",
        "rekrutmen",
        <Link to="/rekrutmen" className="p-2">
          <BsPersonVcard className={iconStyle} id="rekrutmen-icon-sidebar" />
        </Link>,
      ),
    !isDirektur &&
      getItem(
        "Absensi",
        "absensi",
        <Link to="/absensi" className="p-2">
          <MdOutlinePeopleAlt className={iconStyle} id="absensi-icon-sidebar" />
        </Link>,
      ),
    !isDirektur &&
      getItem(
        "Cuti",
        "cuti",
        <Link to="/cuti" className="p-2">
          <AiOutlineSchedule className={iconStyle} id="cuti-icon-sidebar" />
        </Link>,
      ),
    !isDirektur &&
      getItem(
        "Mutasi",
        "mutasi",
        <Link to="/mutasi" className="p-2">
          <HiOutlineNewspaper className={iconStyle} id="mutasi-icon-sidebar" />
        </Link>,
      ),
    !isDirektur &&
      getItem(
        "Penugasan",
        "penugasan",
        <Link to="/penugasan" className="p-2">
          <MdOutlineAssignment
            className={iconStyle}
            id="penugasan-icon-sidebar"
          />
        </Link>,
      ),
    !isDirektur &&
      getItem(
        "Reward & Punishment",
        "reward",
        <Link to="/reward-and-punishment" className="p-2">
          <PiTipJar className={iconStyle} id="reward-icon-sidebar" />
        </Link>,
      ),
    isDirektur &&
      getItem(
        "PHK",
        "phk",
        <Link to="/pemutusan-hubungan-kerja" className="p-2">
          <FaUserTimes className={iconStyle} id="phk-icon-sidebar" />
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
          footer={<LogoutItem />}
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
      {/* Logout Modal */}
      {isShow && <LogoutModal closeModal={handleOpenModal} />}
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
          className="h-auto w-28 cursor-pointer sm:block md:w-40"
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
