import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as yup from "yup";
import { useState } from "react";
import { Flex, Col, Row, Button, Space, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancel } from "@/components/shared-components/ModalCancel";

import imagePrev from "@/assets/content-pages.png";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIuser } from "@/apis/APIuser";
import { useQuery } from "@tanstack/react-query";
import { APIpunishment } from "@/apis/APIpunishment";

export default function AddPunishment({ onClose, refetchPunishment }) {
  useDocumentTitle("Punishment Pegawai");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const schema = yup.object().shape({
    nama_pegawai: yup.string().required("Nama Pegawai harus diisi"),
    keterangan_sanksi: yup.string().required("Keterangan Sanksi harus diisi"),
  });
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const result = await APIuser.getAllUsers();
      return result;
    },
  });
  const dataUser = data || [];

  const createPunishment = async (data) => {
    try {
      const user = dataUser.find((user) => user.name === data.nama_pegawai);
      await APIpunishment.createPunishment({ ...data, userId: user.id });
      showSuccessToast("Punishment berhasil dibuat", "top-center", "large");
      refetchPunishment();
      onClose();
      reset(); // Clear input fields
    } catch (err) {
      console.error(err);
      showErrorToast("Punishment gagal dibuat", "top-center", "large");
    }
  };

  const onSubmitArticle = (data) => {
    const newData = {
      ...data,
    };
    setInputData(newData);
    handleOpenModalConfirm();
  };

  const handleOpenModalCancel = () => {
    setIsShowCancel((prev) => !prev);
  };
  const handleOpenModalConfirm = () => {
    setIsShowConfirm((prev) => !prev);
  };

  return (
    <section id="unggah-punishment" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Form Input Punishment</h3>
          <div>
            <Space size="middle">
              <Button
                onClick={handleOpenModalCancel}
                id="cancel-submit"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Batal
              </Button>
              <Button
                id="submit-button"
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
              >
                Buat
              </Button>
            </Space>
          </div>
        </Flex>

        <Col>
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-1">
            <Flex
              vertical
              className="gap-6 rounded-lg border border-grey-50 p-6"
            >
              {/* Nama */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="nama_pegawai"
                >
                  Nama Pegawai
                </label>
                <Controller
                  name="nama_pegawai"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={dataUser.map((user) => ({
                        value: user.name,
                        label: user.name,
                      }))}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.nama_pegawai
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Nama Pegawai"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.nama_pegawai?.message}
                </span>
              </Row>

              {/* Bonus Tip */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="keterangan_sanksi"
                >
                  Keterangan Sanksi
                </label>
                <input
                  id="keterangan_sanksi"
                  {...register("keterangan_sanksi")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.keterangan_sanksi
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan keterangan disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.keterangan_sanksi?.message}
                </span>
              </Row>
            </Flex>

            <Flex vertical className="gap-6 rounded-lg p-6">
              <img
                src={imagePrev}
                alt="Preview"
                className="ms-5 rounded-lg lg:h-[460px] lg:w-[500px]"
              />
            </Flex>
          </div>
        </Col>
      </form>
      {isShowCancel && <ModalCancel closeModal={handleOpenModalCancel} />}
      {isShowConfirm && (
        <ModalConfirm
          closeModal={handleOpenModalConfirm}
          modalTitle="Buat Punishment Pegawai"
          inputData={inputData}
          action={createPunishment}
        >
          <>
            <p>Apakah anda yakin ingin membuat punishment?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
