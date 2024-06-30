import { useState } from "react";
import { Button, Modal } from "antd";

import { APIauth } from "@/apis/APIauth";
import logoutModalIcon from "@/assets/logout-modal-icon.svg";
import { authService } from "@/configs/auth";
import { useNavigate } from "react-router-dom";

export function LogoutModal({ closeModal }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

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
        <p id="doctor-name" className="mt-2 text-xl font-semibold">
          Halo, User name!
        </p>

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
