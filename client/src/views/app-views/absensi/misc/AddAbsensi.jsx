import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useEffect, useState } from "react";
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
import { APIabsensi } from "@/apis/APIabsensi";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

import dayjs from "dayjs";
import "dayjs/locale/id";

export default function AddAbsensi({ onClose, refetchAbsensi }) {
  useDocumentTitle("Absensi Pegawai");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const [jamMasukDisabled, setJamMasukDisabled] = useState(true);
  const [jamKeluarDisabled, setJamKeluarDisabled] = useState(true);

  const [imagePreview, setImagePreview] = useState(null);
  const MAX_IMAGE_SIZE = 1000000;
  const ALLOWED_IMAGE_TYPE = ["image/jpeg", "image/png"];

  const schema = yup.object().shape({
    jam_masuk: yup.date().nullable(),
    jam_keluar: yup.date().nullable(),
    bukti_photo: yup
      .mixed()
      .required("Isi Bukti absen kamu..")
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
    status: yup.string().required("Status Kehadiran harus diisi"),
    keterangan: yup.string().required("Keterangan harus diisi"),
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

  const createAbsensi = async (data) => {
    try {
      await APIabsensi.createAbsensi(data);
      showSuccessToast(
        "Absensi Kehadiran berhasil ditambah",
        "top-center",
        "large",
      );
      refetchAbsensi();
      onClose();
    } catch (err) {
      console.error(err);
      showErrorToast("Absensi Kehadiran gagal ditambah", "top-center", "large");
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

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day").subtract(1, "day");
  };

  const handleTimeDisable = () => {
    const currentTime = dayjs();
    const currentHour = currentTime.hour();
    // const currentMinute = currentTime.minute();

    const timeStart = currentHour >= 6;
    const timeEnd = currentHour <= 8;

    // Jam Masuk
    if (timeStart && timeEnd) {
      // 6.05 sampai 8.10 bisa absen masuk
      setJamMasukDisabled(false);
    } else {
      setJamMasukDisabled(true);
    }

    // Jam Keluar
    if (currentHour >= 17 && currentHour <= 19) {
      setJamKeluarDisabled(false);
    } else {
      setJamKeluarDisabled(true);
    }
  };

  useEffect(() => {
    handleTimeDisable();
    const interval = setInterval(handleTimeDisable, 60000); // Cek setiap menit
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (value) => {
    if (value !== "hadir") {
      setJamMasukDisabled(true);
      setJamKeluarDisabled(true);
    } else {
      handleTimeDisable();
    }
    setValue("status", value);
  };

  return (
    <section id="unggah-absensi" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
        encType="multipart/form-data"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Form Absensi</h3>
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
              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="status"
                >
                  Status Kehadiran
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                        handleStatusChange(value);
                      }}
                      options={[
                        {
                          value: "hadir",
                          label: "Hadir",
                        },
                        {
                          value: "izin",
                          label: "Izin",
                        },
                        {
                          value: "sakit",
                          label: "Sakit",
                        },
                        {
                          value: "alfa",
                          label: "Tidak Hadir",
                        },
                      ]}
                      className={`mt-2 block h-[50px] w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.status
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih status kehadiran"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.status?.message}
                </span>
              </Row>

              {/* Date start */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="jam_masuk"
                >
                  Jam Masuk
                </label>
                <Controller
                  name="jam_masuk"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      showTime
                      disabled={jamMasukDisabled}
                      disabledDate={disabledDate}
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.jam_masuk
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih waktu masuk"
                    />
                  )}
                />

                <span className="pt-1 text-xs text-negative">
                  {errors.jam_masuk?.message}
                </span>
              </Row>

              {/* Date start */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="jam_keluar"
                >
                  Jam Keluar
                </label>
                <Controller
                  name="jam_keluar"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      showTime
                      disabled={jamKeluarDisabled}
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.jam_keluar
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih waktu keluar"
                    />
                  )}
                />

                <span className="pt-1 text-xs text-negative">
                  {errors.jam_keluar?.message}
                </span>
              </Row>

              {/*Photo */}
              <Row>
                <div>
                  <label
                    htmlFor="bukti_photo"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg lg:h-[260px] lg:w-[360px] ${
                      imagePreview
                        ? ""
                        : errors.bukti_photo
                          ? "border-2 border-dashed border-negative"
                          : "border-2 border-dashed border-green-500"
                    }`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="rounded-lg lg:h-[260px] lg:w-[360px]"
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
                      id="bukti_photo"
                      {...register("bukti_photo")}
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImagePreview(URL.createObjectURL(file));
                        setValue("bukti_photo", file);
                        clearErrors("bukti_photo");
                      }}
                    />
                  </label>
                  <div className="flex flex-col pt-2">
                    <p className="text-sm text-grey-200">
                      Maksimum ukuran file: 1MB
                    </p>
                    <span className="pt-1 text-xs text-negative">
                      {errors.bukti_photo?.message}
                    </span>
                  </div>
                </div>
              </Row>

              {/* Conf Pw */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="keterangan"
                >
                  Keterangan Absensi
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
                  placeholder="Masukkan keterangan disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.keterangan?.message}
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
          modalTitle="Tambah Absensi Kehadiran"
          inputData={inputData}
          action={createAbsensi}
        >
          <>
            <p>Apakah anda yakin ingin menambah data absensi?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
