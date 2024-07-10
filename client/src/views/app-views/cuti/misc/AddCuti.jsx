import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useState } from "react";
import { Flex, Col, Row, Button, Space, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancel } from "@/components/shared-components/ModalCancel";
import { globalRoute } from "@/utils/GlobalRoute";

import imagePrev from "@/assets/content-pages.png";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIcuti } from "@/apis/APIcuti";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { useSelector } from "react-redux";

export default function AddCuti() {
  useDocumentTitle("Pengajuan Cuti");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  const schema = yup.object().shape({
    alasan_cuti: yup
      .string()
      .trim()
      .min(10, "Alasan minimal 10 karakter")
      .required("Alasam harus diisi"),
    start_cuti: yup.date().required("Mulai cuti harus diisi").nullable(),
    end_cuti: yup.date().required("Berakhir cuti harus diisi").nullable(),
    keterangan: yup
      .string()
      .trim()
      .min(10, "Keterangan minimal 10 karakter")
      .required("Keterangan harus diisi"),
    status: yup.string().required("Role harus diisi"),
  });
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createCuti = async (data) => {
    try {
      const result = await APIcuti.createCuti(data);
      showSuccessToast("Pengajuan Cuti berhasil dibuat", "top-center", "large");
      globalRoute.navigate(`/cuti`);
      console.log("post cuti", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Pengajuan Cuti gagal dibuat", "top-center", "large");
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
    <section id="unggah-cuti" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Buat Cuti</h3>
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Flex
              vertical
              className="gap-6 rounded-lg border border-grey-50 p-6"
            >
              {/* Nama */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="alasan_cuti"
                >
                  Alasan Mengajukan Cuti
                </label>
                <input
                  id="alasan_cuti"
                  {...register("alasan_cuti")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.alasan_cuti
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan alasan cuti disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.alasan_cuti?.message}
                </span>
              </Row>

              {/* Date start */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="start_cuti"
                >
                  Tanggal Mulai
                </label>
                <Controller
                  name="start_cuti"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.start_cuti
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih tanggal mulai"
                    />
                  )}
                />

                <span className="pt-1 text-xs text-negative">
                  {errors.start_cuti?.message}
                </span>
              </Row>

              {/* Date End */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="end_cuti"
                >
                  Tanggal Berakhir
                </label>
                <Controller
                  name="end_cuti"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.end_cuti
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih tanggal berakhir"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.end_cuti?.message}
                </span>
              </Row>

              {/* Conf Pw */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="keterangan"
                >
                  Keterangan
                </label>
                <input
                  id="keterangan"
                  {...register("keterangan")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.keterangan
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Konfirmasi keterangan anda"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.keterangan?.message}
                </span>
              </Row>

              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="status"
                >
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={[
                        { value: "waiting", label: "Menunggu" },
                        {
                          value: "processed",
                          label: "Diproses",
                          disabled: !verifRole,
                        },
                        {
                          value: "done",
                          label: "Selesai",
                          disabled: !verifRole,
                        },
                        {
                          value: "cancelled",
                          label: "Dibatalkan",
                          disabled: !verifRole,
                        },
                      ]}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.status
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih status"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.status?.message}
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
          modalTitle="Buat Pengajuan Cuti"
          inputData={inputData}
          action={createCuti}
        >
          <>
            <p>Apakah anda yakin ingin mengajukan cuti?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
