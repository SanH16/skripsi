import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
// import { PiRobot } from "react-icons/pi";

import anonymousPict from "@/assets/anonymous profile.jpg";
import logoTopbar from "@/assets/react.svg";
import DrawerSidebar from "./DrawerSidebar";

export default function Topbar() {
  return (
    <nav
      id="topbar"
      className="sticky left-0 top-0 z-50 w-full border-b bg-grey-10"
    >
      <div className="app-container z-10 flex justify-between py-5 md:py-3">
        <div className="flex items-center">
          <DrawerSidebar />
          <a href="/dashboard">
            <img
              id="logo-reprohealth-topbar"
              src={logoTopbar}
              alt="logo"
              className="hidden h-[50px] w-28 cursor-pointer sm:block md:w-40"
            />
          </a>
        </div>

        <div id="profile-doctor-topbar" className="flex items-center gap-3">
          {/* <div
            id="bot-icon-topbar"
            className="flex items-center justify-center text-xl md:text-2xl"
          >
            <Link to="/asisten-dokter" className="hover:text-green-500">
              <PiRobot />
            </Link>
          </div> */}
          <div id="notification-icon-topbar" className="text-xl md:text-2xl">
            <Link to="/notifikasi" className="hover:text-green-500">
              <IoNotificationsOutline />
            </Link>
          </div>
          <div id="profile-doctor-topbar" className="flex items-center">
            <div>
              <a href="/profil">
                <img
                  id="profile-doctor-topbar"
                  src={anonymousPict}
                  alt="profile-doctor"
                  className="h-8 w-8 rounded-full md:h-11 md:w-11"
                />
              </a>
            </div>
            <a href="/profil" className="hover:text-green-500">
              <div className="ml-2">
                <>
                  <h6
                    id="doctor-name-topbar"
                    className="text-xs leading-none sm:text-sm md:text-base"
                  >
                    User name
                  </h6>
                  <span
                    id="doctor-specialist-topbar"
                    className="text-xs font-medium leading-none md:text-sm"
                  >
                    Jabatan (divisi)
                  </span>
                </>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
