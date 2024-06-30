import { useState } from "react";
import { Button, Modal, Skeleton } from "antd";

import { APIauth } from "@/apis/APIauth";
import logoutModalIcon from "@/assets/logout-modal-icon.svg";
import { authService } from "@/configs/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";

export function LogoutModal({ closeModal }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const userState = useSelector(selectGetUserLogin);
  const userName = userState?.data?.name;

  const handleOk = () => {
    setIsModalOpen(false);
    APIauth.logout();
    authService.clearSessionIdFromCookie();
    navigate("/");
    closeModal();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    closeModal();
  };
  return (
    <Modal
      id="modal-logout"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={450}
      centered
      footer={
        <div id="modal-logout-footer" className="flex justify-center">
          <Button
            id="button-logout-confirm"
            key="ok"
            className="mb-2 mt-4 h-10 rounded-lg bg-negative px-7 font-semibold text-white"
            style={{
              border: "transparent",
            }}
            onClick={handleOk}
          >
            Ya, keluar
          </Button>
          <Button
            id="button-logout-cancel"
            key="cancel"
            className="ml-4 mt-4 h-10 rounded-lg border-negative px-7 font-semibold text-negative"
            onClick={handleCancel}
          >
            Tidak, batalkan
          </Button>
        </div>
      }
    >
      <div
        id="logout-modal-text"
        className="flex flex-col items-center text-center"
      >
        <img
          id="logout-modal-icon"
          src={logoutModalIcon}
          alt="logout-modal-icon"
          className="my-4 h-10 w-10"
        />
        {/* <p id="doctor-name" className="mt-2 text-xl font-semibold">
          Halo, User name!
        </p> */}
        {userState.status === "loading" && (
          <Skeleton.Input active size="small" />
        )}
        {userState.status === "success" && (
          <p id="doctor-name" className="mt-2 text-xl font-semibold">
            Halo, {userName?.split(",")[0]}!
          </p>
        )}
        {userState.status === "failed" && (
          <Skeleton.Input active size="small" />
        )}

        <p
          id="logout-modal-text"
          className="mt-2 text-base font-medium leading-relaxed text-grey-400 md:px-3"
        >
          Apakah anda yakin ingin keluar dari website?
        </p>
      </div>
    </Modal>
  );
}
