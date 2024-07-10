import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import moment from "moment";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

export default function UpdatePegawai() {
  useDocumentTitle("Ubah Data Pegawai");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const MAX_IMAGE_SIZE = 1000000;
  const ALLOWED_IMAGE_TYPE = ["image/jpeg", "image/png"];
  const { pegawaiId } = useParams();

  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  const schema = yup.object().shape({
    photo: yup
      .mixed()
      .required("Isi Profile kece kamu..")
      .test(
        "fileSize",
        "Ukuran file terlalu besar, maksimal 1 MB",
        (value) => value && value.size <= MAX_IMAGE_SIZE,
      )
      .test(
        "fileType",
        "Format file tidak valid, hanya file gambar yang diperbolehkan",
        (value) => value && ALLOWED_IMAGE_TYPE.includes(value.type),
      ),
    nik: yup
      .string()
      .trim()
      .min(16, "NIK minimal 16 karakter")
      .required("Data NIK harus diisi"),
    jabatan: !verifRole
      ? yup.string().trim().notRequired()
      : yup.string().trim().required("Jabatan harus diisi"),
    gaji_pegawai: !verifRole
      ? yup.number().integer("Gaji harus berupa angka bulat").nullable() // Allow null values
      : yup
          .number()
          .integer("Gaji harus berupa angka bulat")
          .required("Gaji harus diisi"),
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
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchPegawaiById = async () => {
      try {
        const result = await APIpegawai.getPegawaiById(pegawaiId);
        console.log("update pegawai fetch", result);
        setInputData(result);

        setValue("photo", result.photo);
        setValue("nik", result.nik);
        setValue("jabatan", result.jabatan);
        setValue("phone", result.phone);
        setValue("tanggal_lahir", moment(result.tanggal_lahir));
        setValue("gender", result.gender);
        setValue("address", result.address);
        setValue("pendidikan", result.pendidikan);
        setValue("status_menikah", result.status_menikah);
        setValue("status_bekerja", result.status_bekerja);
        setValue("gaji_pegawai", result.gaji_pegawai);
        setImagePreview(`http://localhost:5000/images/${result.photo}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPegawaiById();
  }, [pegawaiId, setValue]);

  const updatePegawai = async () => {
    try {
      const result = await APIpegawai.updatePegawai(pegawaiId, inputData);
      showSuccessToast("Data Pegawai berhasil diubah", "top-center", "large");
      globalRoute.navigate(`/profil`);
      console.log("update pegawai", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Data Pegawai gagal diubah", "top-center", "large");
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
          <h3 className="font-bold">Ubah Data Pegawai</h3>
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
                Ubah
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
              {/*Photo */}
              <Row>
                <div>
                  <label
                    htmlFor="photo"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg lg:h-[260px] lg:w-[390px] ${
                      imagePreview
                        ? ""
                        : errors.photo
                          ? "border-2 border-dashed border-negative"
                          : "border-2 border-dashed border-green-500"
                    }`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="rounded-lg lg:h-[260px] lg:w-[390px]"
                      />
                    ) : (
                      <div className="mx-auto flex flex-col items-center justify-center gap-4 pb-6 pt-5">
                        <IoImageOutline size={100} color="#989898" />
                        <div className="flex flex-col gap-1">
                          <div className="mx-auto flex gap-2 text-green-500">
                            <MdOutlineFileUpload size={20} />
                            <p className="text-sm font-bold">Pilih Gambar</p>
                          </div>
                          <p className="text-xs text-grey-200">
                            Format File: JPG dan PNG
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      id="photo"
                      {...register("photo")}
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImagePreview(URL.createObjectURL(file));
                        setValue("photo", file);
                        clearErrors("photo");
                      }}
                    />
                  </label>
                  <div className="flex flex-col pt-2">
                    <p className="text-sm text-grey-200">
                      Maksimum ukuran file: 1MB
                    </p>
                    <span className="pt-1 text-xs text-negative">
                      {errors.photo?.message}
                    </span>
                  </div>
                </div>
              </Row>
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
                            disabled: !verifRole,
                          },
                          {
                            value: "Quality Control",
                            label: "Quality Control",
                            disabled: !verifRole,
                          },
                          {
                            value: "Bagian Keuangan",
                            label: "Bagian Keuangan",
                            disabled: !verifRole,
                          },
                          {
                            value: "Bagian SDM",
                            label: "Bagian SDM",
                            disabled: !verifRole,
                          },
                          {
                            value: "Admin",
                            label: "Admin",
                            disabled: !verifRole,
                          },
                          {
                            value: "Penjahit",
                            label: "Penjahit",
                            disabled: !verifRole,
                          },
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

              {/* Email */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="gaji_pegawai"
                >
                  Gaji Pegawai
                </label>
                <Controller
                  name="gaji_pegawai"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={[
                        {
                          value: 3000000,
                          label: "Rp. 4.500.000",
                          disabled: !verifRole,
                        },
                        {
                          value: 4000000,
                          label: "Rp. 4.000.000",
                          disabled: !verifRole,
                        },
                        {
                          value: 3500000,
                          label: "Rp. 3.500.000",
                          disabled: !verifRole,
                        },
                        {
                          value: 3000000,
                          label: "Rp. 3.000.000",
                          disabled: !verifRole,
                        },
                        {
                          value: 3200000,
                          label: "Rp. 3.200.000",
                          disabled: !verifRole,
                        },
                        {
                          value: 2800000,
                          label: "Rp. 2.800.000",
                          disabled: !verifRole,
                        },
                      ]}
                      className={`mt-2 block h-[40px] w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.gaji_pegawai
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Gaji pegawai.."
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.gaji_pegawai?.message}
                </span>
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
                    placeholder="Masukkan password disini"
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
                          {
                            value: "cuti",
                            label: "Cuti",
                            disabled: !verifRole,
                          },
                          {
                            value: "stop",
                            label: "Berhenti",
                            disabled: !verifRole,
                          },
                          {
                            value: "move",
                            label: "Pindah",
                            disabled: !verifRole,
                          },
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
          modalTitle="Ubah Data Pegawai"
          inputData={inputData}
          action={updatePegawai}
        >
          <>
            <p>Apakah anda yakin ingin menambah Data Pegawai?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
