import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useState } from "react";
import { Flex, Col, Row, Button, Space, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancel } from "@/components/shared-components/ModalCancel";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIlamaran } from "@/apis/APIlamaran";

export default function AddLamaran({ onClose }) {
  useDocumentTitle("Upload Lamaran");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);
  const [dokumenCV, setDokumenCV] = useState("");

  // const max_file_size = 2000000; // 2 mb
  // const allowed_file_type = ["application/pdf"];

  const schema = yup.object().shape({
    nama: yup.string().required("Nama Lengkap harus diisi"),
    nomor_telepon: yup.string().required("Nomor Hp harus diisi"),
    pendidikan_terakhir: yup
      .string()
      .required("Pendidikan terakhir harus diisi"),
    keterampilan: yup.array().required("Keahlian harus diisi"),
    dokumen_cv: yup.mixed(),
    // .required("File harus diisi Bro!")
    // .test("required", "File Dokumen harus diisi", (value) => {
    //   return value && value.size > 0;
    // })
    // .test("fileSize", "Ukuran file terlalu besar, maksimal 2 MB", (value) => {
    //   return value.size <= max_file_size;
    // })
    // .test(
    //   "fileType",
    //   "Format file tidak valid, hanya file pdf yang diperbolehkan",
    //   (value) => {
    //     return allowed_file_type.includes(value.type);
    //   },
    // ),
    dokumen_lain: yup.string().required("Dokumen Lain harus diisi"),
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

  const handleOpenModalCancel = () => {
    setIsShowCancel((prev) => !prev);
  };
  const handleOpenModalConfirm = () => {
    setIsShowConfirm((prev) => !prev);
  };

  const onSubmitArticle = (data) => {
    const newData = {
      ...data,
      keterampilan: data.keterampilan.join(", "),
    };
    console.log("larma data", newData);
    setInputData(newData);
    handleOpenModalConfirm();
  };

  const createLamaran = async (data) => {
    try {
      await APIlamaran.createLamaran(data);
      showSuccessToast(
        "Data Lamaran kamu berhasil diupload",
        "top-center",
        "large",
      );
      // reset();
      onClose();
    } catch (err) {
      console.error(err);
      showErrorToast("Data Lamaran kamu gagal dibuat", "top-center", "large");
    }
  };

  return (
    <section id="unggah-lamaran" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
        encType="multipart/form-data"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Form Lamaran</h3>
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
                  htmlFor="nama"
                >
                  Nama Lengkap
                </label>
                <input
                  id="nama"
                  {...register("nama")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.nama
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan Nama lengkap disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.nama?.message}
                </span>
              </Row>

              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="nomor_telepon"
                >
                  Nomor Hp
                </label>
                <input
                  id="nomor_telepon"
                  {...register("nomor_telepon")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.nomor_telepon
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="number"
                  placeholder="Masukkan Nomor HP disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.nomor_telepon?.message}
                </span>
              </Row>

              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="pendidikan_terakhir"
                >
                  Pendidikan Terakhir
                </label>
                <Controller
                  name="pendidikan_terakhir"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={[
                        {
                          value: "SMP",
                          label: "SMP",
                        },
                        {
                          value: "SMA",
                          label: "SMA",
                        },
                        {
                          value: "Diploma 3",
                          label: "Diploma 3",
                        },
                        {
                          value: "Sarjana S1",
                          label: "Sarjana S1",
                        },
                      ]}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.pendidikan_terakhir
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Pendidikan terakhir.."
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.pendidikan_terakhir?.message}
                </span>
              </Row>

              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="keterampilan"
                >
                  Keterampilan
                </label>
                <Controller
                  name="keterampilan"
                  control={control}
                  render={({ field }) => (
                    <Select
                      mode="tags"
                      variant="borderless"
                      {...field}
                      options={[
                        {
                          value: "nodejs",
                          label: "NodeJS",
                        },
                        {
                          value: "javascript",
                          label: "JavaScript",
                        },
                        {
                          value: "laravel.php",
                          label: "Laravel/PHP",
                        },
                      ]}
                      tokenSeparators={[",", " ", "."]}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.keterampilan
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Keterampilan anda.."
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.keterampilan?.message}
                </span>
              </Row>
            </Flex>

            <Flex
              vertical
              className="gap-6 rounded-lg border border-grey-50 p-6"
            >
              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="dokumen_cv"
                >
                  Dokumen CV
                </label>
                <input
                  id="dokumen_cv"
                  {...register("dokumen_cv")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.dokumen_cv
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log("Selected file:", file);

                    setValue("dokumen_cv", file);
                    console.log("Setvalue:", e.target.files);
                    setDokumenCV(file.name);
                    clearErrors("dokumen_cv");
                  }}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.dokumen_cv?.message}
                </span>
                {dokumenCV ? <span>{dokumenCV}</span> : null}
              </Row>

              {/* Conf Pw */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="dokumen_lain"
                >
                  Dokumen Pendukung
                </label>
                <input
                  id="dokumen_lain"
                  {...register("dokumen_lain")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.dokumen_lain
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Dokumen pendukung (surat lamaran .etc)"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.dokumen_lain?.message}
                </span>
              </Row>
            </Flex>
          </div>
        </Col>
      </form>
      {isShowCancel && <ModalCancel closeModal={handleOpenModalCancel} />}
      {isShowConfirm && (
        <ModalConfirm
          closeModal={handleOpenModalConfirm}
          modalTitle="Upload Lamaran kamu"
          inputData={inputData}
          action={createLamaran}
        >
          <>
            <p>Apakah anda yakin ingin mengupload data lamaran?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
