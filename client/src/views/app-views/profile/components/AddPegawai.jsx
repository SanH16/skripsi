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

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIpegawai } from "@/apis/APIpegawai";

import imagePrev from "@/assets/content-pages.png";

export default function AddPegawai() {
  useDocumentTitle("Add Data Pegawai");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const schema = yup.object().shape({
    nik: yup
      .string()
      .trim()
      .min(16, "NIK minimal 16 karakter")
      .required("Data NIK harus diisi"),
    jabatan: yup.string().trim().required("Jabatan harus diisi"),
    pendidikan: yup.string().trim().required("Pendidikan Terakhir harus diisi"),
    phone: yup
      .string()
      .trim()
      .min(10, "Nomor HP minimal 10 karakter")
      .required("Nomor HP harus diisi"),
    tanggal_lahir: yup.date().required("Tanggal lahir harus diisi"),
    status_menikah: yup.string().required("Status Pernikahan harus diisi"),
    status_bekerja: yup.string().required("Status Bekerja harus diisi"),
    gender: yup.string().required("Jenis Kelamin harus diisi"),
    address: yup
      .string()
      .trim()
      .min(5, "Alamat minimal 5 karakter")
      .required("Data NIK harus diisi"),
  });
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createPegawai = async (data) => {
    try {
      const result = await APIpegawai.createPegawai(data);
      showSuccessToast(
        "Data Pegawai berhasil ditambahkan",
        "top-center",
        "large",
      );
      globalRoute.navigate && globalRoute.navigate(`/profil`);
      console.log("post pegawai", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Data Pegawai gagal dibuat", "top-center", "large");
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
    <section id="unggah-user" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Tambah Data Pegawai</h3>
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
                Simpan
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
                  htmlFor="nik"
                >
                  Nomor Induk Kependudukan
                </label>
                <input
                  id="nik"
                  {...register("nik")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.nik
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan NIK anda disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.nik?.message}
                </span>
              </Row>

              {/* Email */}
              <Row className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="jabatan"
                  >
                    Jabatan Pegawai
                  </label>
                  <Controller
                    name="jabatan"
                    control={control}
                    render={({ field }) => (
                      <Select
                        variant="borderless"
                        {...field}
                        options={[
                          {
                            value: "Kepala Produksi",
                            label: "Kepala Produksi",
                          },
                          {
                            value: "Quality Control",
                            label: "Quality Control",
                          },
                          {
                            value: "Bagian Keuangan",
                            label: "Bagian Keuangan",
                          },
                          { value: "Bagian SDM", label: "Bagian SDM" },
                          { value: "Admin", label: "Admin" },
                          { value: "Penjahit", label: "Penjahit" },
                        ]}
                        className={`mt-2 block h-[40px] w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                          errors.jabatan
                            ? "border-negative text-negative"
                            : "border-grey-100 text-grey-900"
                        }`}
                        placeholder="Pilih Jabatan Pegawai"
                      />
                    )}
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.jabatan?.message}
                  </span>
                </div>
                <div>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="pendidikan"
                  >
                    Pendidikan Terakhir
                  </label>
                  <Controller
                    name="pendidikan"
                    control={control}
                    render={({ field }) => (
                      <Select
                        variant="borderless"
                        {...field}
                        options={[
                          { value: "Sarjana S1", label: "Sarjana S1" },
                          { value: "Diploma 3", label: "Diploma 3" },
                          { value: "SMA", label: "SMA" },
                          { value: "SMP", label: "SMP" },
                        ]}
                        className={`mt-2 block h-[40px] w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                          errors.pendidikan
                            ? "border-negative text-negative"
                            : "border-grey-100 text-grey-900"
                        }`}
                        placeholder="Pilih Status anda"
                      />
                    )}
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.pendidikan?.message}
                  </span>
                </div>
              </Row>

              {/* Pw */}
              <Row className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="phone"
                  >
                    Nomor HP Pengguna
                  </label>
                  <input
                    id="phone"
                    {...register("phone")}
                    className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                      errors.phone
                        ? "border-negative text-negative"
                        : "border-grey-100 text-grey-900"
                    }`}
                    type="number"
                    placeholder="Masukkan nomor hp disini"
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.phone?.message}
                  </span>
                </div>

                <div>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="status_bekerja"
                  >
                    Status Bekerja
                  </label>
                  <Controller
                    name="status_bekerja"
                    control={control}
                    render={({ field }) => (
                      <Select
                        variant="borderless"
                        {...field}
                        options={[
                          { value: "active", label: "Aktif" },
                          { value: "cuti", label: "Cuti" },
                          { value: "stop", label: "Berhenti" },
                          { value: "move", label: "Pindah" },
                        ]}
                        className={`mt-2 block h-[40px] w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                          errors.status_bekerja
                            ? "border-negative text-negative"
                            : "border-grey-100 text-grey-900"
                        }`}
                        placeholder="Pilih Status saat ini..."
                      />
                    )}
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.status_bekerja?.message}
                  </span>
                </div>
              </Row>

              {/* Date start */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="tanggal_lahir"
                >
                  Tanggal Lahir
                </label>
                <Controller
                  name="tanggal_lahir"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.tanggal_lahir
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih tanggal lahir"
                    />
                  )}
                />

                <span className="pt-1 text-xs text-negative">
                  {errors.tanggal_lahir?.message}
                </span>
              </Row>

              {/* Role */}
              <Row className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="gender"
                  >
                    Jenis Kelamin
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        variant="borderless"
                        {...field}
                        options={[
                          { value: "Laki - Laki", label: "Laki - Laki" },
                          { value: "Perempuan", label: "Perempuan" },
                        ]}
                        className={`mt-2 block h-[40px] w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                          errors.gender
                            ? "border-negative text-negative"
                            : "border-grey-100 text-grey-900"
                        }`}
                        placeholder="Pilih Jenis Kelamin anda"
                      />
                    )}
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.gender?.message}
                  </span>
                </div>
                <div>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="status_menikah"
                  >
                    Status Pernikahan
                  </label>
                  <Controller
                    name="status_menikah"
                    control={control}
                    render={({ field }) => (
                      <Select
                        variant="borderless"
                        {...field}
                        options={[
                          { value: "Menikah", label: "Menikah" },
                          { value: "Belum Menikah", label: "Belum Menikah" },
                        ]}
                        className={`mt-2 block h-[40px] w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                          errors.status_menikah
                            ? "border-negative text-negative"
                            : "border-grey-100 text-grey-900"
                        }`}
                        placeholder="Pilih Status anda"
                      />
                    )}
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.status_menikah?.message}
                  </span>
                </div>
              </Row>

              {/* Email */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="address"
                >
                  Alamat
                </label>
                <input
                  id="address"
                  {...register("address")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.address
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan alamat disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.address?.message}
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
          modalTitle="Tambah Data Pegawai"
          inputData={inputData}
          action={createPegawai}
        >
          <>
            <p>Apakah anda yakin ingin menambah Data Pegawai?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
