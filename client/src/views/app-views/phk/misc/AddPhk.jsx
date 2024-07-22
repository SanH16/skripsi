import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as yup from "yup";
import { useState } from "react";
import { Flex, Col, Row, Button, Space, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancel } from "@/components/shared-components/ModalCancel";

import imagePrev from "@/assets/content-pages.png";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { useQuery } from "@tanstack/react-query";
import { APIuser } from "@/apis/APIuser";
import { APIphk } from "@/apis/APIphk";

export default function AddPhk({ onClose, refetchPhk }) {
  useDocumentTitle("PHK");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const schema = yup.object().shape({
    nama_pegawai: yup.string().required("Nama Pegawai harus diisi"),
    alasan_phk: yup.string().required("Alasan PHK harus diisi"),
    tanggal_keluar: yup.date().required("Tanggal berhenti bekerja harus diisi"),
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

  const createPhk = async (data) => {
    try {
      const user = dataUser.find((user) => user.name === data.nama_pegawai);
      await APIphk.createPhk({ ...data, userId: user.id });
      showSuccessToast("PHK berhasil dibuat", "top-center", "large");
      refetchPhk();
      onClose();
      reset(); // Clear input fields
    } catch (err) {
      console.error(err);
      showErrorToast("PHK gagal dibuat", "top-center", "large");
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
    <section id="unggah-phk" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Formulir PHK</h3>
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

              {/* PHK */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="alasan_phk"
                >
                  Alasan Pemberhentian
                </label>
                <input
                  id="alasan_phk"
                  {...register("alasan_phk")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.alasan_phk
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan alasan disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.alasan_phk?.message}
                </span>
              </Row>

              {/* Date */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="tanggal_keluar"
                >
                  Tanggal Berhenti Bekerja
                </label>
                <Controller
                  name="tanggal_keluar"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.tanggal_keluar
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih tanggal berhenti"
                    />
                  )}
                />

                <span className="pt-1 text-xs text-negative">
                  {errors.tanggal_keluar?.message}
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
          modalTitle="Buat Data PHK"
          inputData={inputData}
          action={createPhk}
        >
          <>
            <p>Apakah anda yakin ingin membuat phk?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
