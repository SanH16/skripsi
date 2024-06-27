import { useState } from "react";
import { Modal, Button, Spin } from "antd";
import { PiSealCheck } from "react-icons/pi";
import { LoadingOutlined } from "@ant-design/icons";

export function ModalConfirm({
  closeModal,
  modalTitle,
  inputData,
  action,
  children,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    closeModal();
  };

  const handleOk = async () => {
    setIsSubmitting(true);
    await action(inputData).then(() => {
      closeModal();
    });
  };

  return (
    <Modal
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div id="modal-logout-footer" className="flex justify-center">
          <Button
            id="button-logout-confirm"
            key="ok"
            className="mb-2 mt-4 h-10 rounded-lg bg-green-500 text-sm text-white disabled:bg-green-600 sm:px-7 sm:text-base sm:font-medium"
            style={{
              border: "transparent",
            }}
            onClick={handleOk}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spin
                  indicator={
                    <LoadingOutlined size={24} className="text-green-200" />
                  }
                />
                <span className="ml-2 text-green-200">Mengunggah</span>
              </>
            ) : (
              "Ya, lanjutkan"
            )}
          </Button>
          <Button
            id="button-logout-cancel"
            key="cancel"
            className="ml-4 mt-4 h-10 rounded-lg border-green-500 text-sm text-green-500 sm:px-7 sm:text-base sm:font-medium"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Tidak, batalkan
          </Button>
        </div>
      }
    >
      <div
        id="logout-modal-text"
        className="flex flex-col items-center pt-5 text-center"
      >
        <PiSealCheck className="h-16 w-16 text-green-500 sm:h-20 sm:w-20" />
        <p id="doctor-name" className="my-2 text-xl font-semibold">
          {modalTitle}
        </p>
        <div>{children}</div>
      </div>
    </Modal>
  );
}
