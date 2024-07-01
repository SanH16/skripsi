import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import ReactQuill from "react-quill";
import { useState } from "react";
import { Flex, Col, Row, Button, Space, Select } from "antd";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancelLowongan } from "@/components/shared-components/ModalCancelLowongan";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { globalRoute } from "@/utils/GlobalRoute";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIrekrutmen } from "@/apis/APIrekrutmen";

const optionTags = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "wanita",
    label: "Wanita",
  },
  {
    value: "pria",
    label: "Pria",
  },
  {
    value: "sales",
    label: "Sales",
  },
  {
    value: "operasional",
    label: "Operasional",
  },
];
const UploadLowongan = () => {
  useDocumentTitle("Unggah Lowongan");

  const [imagePreview, setImagePreview] = useState(null);
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);
  // const MAX_IMAGE_SIZE = 25000000;
  // const ALLOWED_IMAGE_TYPE = ["image/jpeg", "image/png"];

  const module = {
    toolbar: [
      ["bold", "underline", "italic"],
      [{ list: "bullet" }],
      ["link"],

      ["clean"],
    ],
  };

  const schema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .min(8, "Judul minimal 8 karakter")
      .required("Judul harus diisi"),
    tags: yup
      .array()
      .min(1, "Minimal 1 tag yang diisi")
      .required("Setiap tag harus diisi"),
    // tags: yup.string().required("Tag harus diisi"),
    reference: yup
      .string()
      .trim()
      .min(3, "Referensi minimal 3 karakter")
      .required("Referensi harus diisi"),
    image: yup.mixed(),
    // .required("Gambar harus diisi Bro!")
    // .test("required", "Gambar harus diisi", (value) => {
    //   if (value.length === 0) return false;
    //   return true;
    // })
    // .test(
    //   "fileSize",
    //   "Ukuran file terlalu besar, maksimal 20 MB",
    //   (value) => {
    //     return value.size <= MAX_IMAGE_SIZE;
    //   },
    // )
    // .test(
    //   "fileType",
    //   "Format file tidak valid, hanya file gambar yang diperbolehkan",
    //   (value) => {
    //     return ALLOWED_IMAGE_TYPE.includes(value.type);
    //   },
    // ),
    image_desc: yup
      .string()
      .trim()
      .min(3, "Deskripsi gambar minimal 3 karakter")
      .required("Deskripsi gambar harus diisi"),
    text_desc: yup
      .string()
      .trim()
      .min(5, "Isi lowongan minimal 5 karakter")
      .required("Isi lowongan harus diisi"),
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

  const createRekrutmen = async (data) => {
    try {
      const result = await APIrekrutmen.createRekrutmen(data);
      showSuccessToast("Lowongan berhasil dibuat", "top-center", "large");
      globalRoute.navigate && globalRoute.navigate(`/rekrutmen`);
      console.log("post rekrutmen", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Lowongan gagal diunggah", "top-center", "large");
    }
  };

  const onSubmitArticle = (data) => {
    const newData = {
      ...data,
      tags: data.tags.join(", "),
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
    <>
      <section id="unggah-lowongan" className="mb-5 py-5">
        <form
          onSubmit={handleSubmit(onSubmitArticle)}
          className="flex flex-col gap-6"
        >
          {/* Title */}
          <Flex justify="space-between" align="center">
            <h3 className="font-bold">Unggah Lowongan</h3>
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
                  Unggah
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
                {/* Judul */}
                <Row>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="title"
                  >
                    Judul
                  </label>
                  <input
                    id="title"
                    {...register("title")}
                    className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                      errors.title
                        ? "border-negative text-negative"
                        : "border-grey-100 text-grey-900"
                    }`}
                    type="text"
                    placeholder="Masukkan judul dari lowongan disini"
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.title?.message}
                  </span>
                </Row>

                {/* Tags */}
                <Row>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="tags"
                  >
                    Tags
                  </label>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="tags"
                        mode="tags"
                        bordered={false}
                        {...field}
                        options={optionTags}
                        tokenSeparators={[",", " ", "."]}
                        className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                          errors.tags
                            ? "border-negative text-negative"
                            : "border-grey-100 text-grey-900"
                        }`}
                        placeholder={
                          <span className="font-normal text-grey-200">
                            Masukkan tags yang berkaitan dengan lowongan
                          </span>
                        }
                      />
                    )}
                  />

                  <span className="pt-1 text-xs text-negative">
                    {errors.tags?.message}
                  </span>
                </Row>

                {/* Referensi */}
                <Row>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="reference"
                  >
                    Referensi
                  </label>
                  <textarea
                    id="reference"
                    {...register("reference")}
                    className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                      errors.reference
                        ? "border-negative text-negative"
                        : "border-grey-100 text-grey-900"
                    }`}
                    rows={3}
                    placeholder="Masukkan referensi penulisan lowongan"
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.reference?.message}
                  </span>
                </Row>
              </Flex>
              <Flex
                vertical
                className="gap-6 rounded-lg border border-grey-50 p-6"
              >
                {/* Gambar */}
                <div>
                  <label
                    htmlFor="image"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg lg:h-[260px] lg:w-[390px] ${
                      imagePreview
                        ? ""
                        : errors.image
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
                      id="image"
                      {...register("image")}
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImagePreview(URL.createObjectURL(file));
                        setValue("image", file);
                        clearErrors("image");
                      }}
                    />
                  </label>
                  <div className="flex flex-col pt-2">
                    <p className="text-sm text-grey-200">
                      Maksimum ukuran file: 20MB
                    </p>
                    <span className="pt-1 text-xs text-negative">
                      {errors.image?.message}
                    </span>
                  </div>
                </div>

                {/* Deskripsi Gambar */}
                <Row>
                  <label
                    className="block text-xl font-semibold text-grey-400"
                    htmlFor="image_desc"
                  >
                    Deskripsi Gambar
                  </label>
                  <input
                    id="image_desc"
                    {...register("image_desc")}
                    className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                      errors.image_desc
                        ? "border-negative text-negative"
                        : "border-grey-100 text-grey-900"
                    }`}
                    type="text"
                    placeholder="Masukkan deskripsi gambar disini"
                  />
                  <span className="pt-1 text-xs text-negative">
                    {errors.image_desc?.message}
                  </span>
                </Row>
              </Flex>
            </div>
          </Col>

          <Col>
            <Flex
              vertical
              className="gap-6 rounded-lg border border-grey-50 p-6"
            >
              {/* Isi Artikel */}
              <div>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="text-desc"
                >
                  Isi Lowongan
                </label>
                <Controller
                  name="text_desc"
                  control={control}
                  defaultValue="Apa aja yang penting ada"
                  render={({ field }) => (
                    <ReactQuill
                      id="text_desc"
                      modules={module}
                      className="mt-2"
                      {...field}
                      theme="snow"
                      placeholder="Tuliskan isi terkait lowongan"
                    />
                  )}
                />
              </div>
              <span className="pt-1 text-xs text-negative">
                {errors.text_desc?.message}
              </span>
            </Flex>
          </Col>
        </form>
        {isShowCancel && (
          <ModalCancelLowongan closeModal={handleOpenModalCancel} />
        )}
        {isShowConfirm && (
          <ModalConfirm
            closeModal={handleOpenModalConfirm}
            modalTitle="Unggah Lowongan"
            inputData={inputData}
            action={createRekrutmen}
          >
            <>
              <p>
                Lowongan yang telah dibuat
                <span className="font-semibold"> tidak dapat diubah </span>
                kembali. Apakah anda yakin ingin mengunggah lowongan ini?
              </p>
            </>
          </ModalConfirm>
        )}
      </section>
    </>
  );
};

export default UploadLowongan;
