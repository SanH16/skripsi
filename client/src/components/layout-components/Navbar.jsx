import { useState } from "react";

import logoNavbar from "@/assets/logo-radenmat-poppins.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      id="navbar"
      className="sticky left-0 top-0 z-50 w-full bg-green-50 md:static"
    >
      <div className="base-container z-10 justify-between py-5 md:flex md:py-3">
        <div className="flex items-center">
          <Link to="/">
            <img
              id="logo-reprohealth-navbar"
              src={logoNavbar}
              alt="logo"
              className="h-auto w-32 cursor-pointer sm:w-44 md:w-52"
            />
          </Link>
        </div>

        <div>
          {isOpen ? (
            <IoCloseSharp
              id="close-dropdown"
              className="absolute right-8 top-6 cursor-pointer text-lg text-grey-900 md:hidden"
              onClick={handleOpen}
            />
          ) : (
            <GiHamburgerMenu
              id="open-dropdown"
              className="absolute right-8 top-6 cursor-pointer text-lg text-grey-900 md:hidden"
              onClick={handleOpen}
            />
          )}
        </div>
        <ul
          id="list-menu-navbar"
          className={`absolute left-0 -z-10 w-full bg-green-50 pb-5 font-semibold text-grey-900 md:static md:z-auto md:flex md:w-auto md:items-center md:gap-6 md:pb-0 md:pl-0 lg:gap-11 ${
            isOpen ? "top-16" : "top-[-300px] hidden"
          }`}
        >
          <li className="md:text-md mt-6 text-sm hover:bg-green-50 md:my-0 md:hover:bg-transparent">
            <a
              id="link-home-navbar"
              href="/"
              className="ms-16 duration-200 hover:text-green-500 md:ms-0"
            >
              Beranda
            </a>
          </li>
          <li className="md:text-md mt-6 text-sm hover:bg-green-50 md:my-0 md:hover:bg-transparent">
            <a
              id="link-about-navbar"
              href="/#tentang-kami"
              className="ms-16 duration-200 hover:text-green-500 md:ms-0"
            >
              Tentang Kami
            </a>
          </li>
          <li className="md:text-md mt-6 text-sm hover:bg-green-50 md:my-0 md:hover:bg-transparent">
            <a
              id="link-service-navbar"
              href="/#lowongan-lists-page"
              className="ms-16 duration-200 hover:text-green-500 md:ms-0"
            >
              Lowongan
            </a>
          </li>
          <li className="md:text-md mt-6 text-sm hover:bg-green-50 md:my-0 md:hover:bg-transparent">
            <a
              id="link-benefit-navbar"
              href="/#manfaat"
              className="ms-16 duration-200 hover:text-green-500 md:ms-0"
            >
              Manfaat
            </a>
          </li>
          <li className="md:text-md ms-16 mt-6 text-sm text-grey-10 hover:bg-green-50 md:my-0 md:ms-0 md:hover:bg-transparent">
            <Link
              to="https://drive.google.com/drive/folders/1zPcloKV1jKKxmaKEVK9TiTCCvtEhG7QZ"
              target="_blank"
            >
              <Button
                id="download-app"
                type="primary"
                className="flex items-center px-6 py-4 font-semibold"
              >
                Gabung Sekarang
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
