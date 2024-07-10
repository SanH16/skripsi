import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useState } from "react";
import { Flex, Col, Row, Button, Space, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancel } from "@/components/shared-components/ModalCancel";
import { globalRoute } from "@/utils/GlobalRoute";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIuser } from "@/apis/APIuser";

import imagePrev from "@/assets/content-pages.png";

export default function AddUser() {
  useDocumentTitle("Add User");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, "Nama minimal 3 karakter")
      .required("Nama harus diisi"),
    email: yup.string().trim().required("Email harus diisi"),
    password: yup
      .string()
      .trim()
      .min(6, "Password minimal 6 karakter")
      .required("Password harus diisi"),
    confPassword: yup
      .string()
      .trim()
      .min(6, "Password minimal 6 karakter")
      .required("Password harus diisi")
      .oneOf(
        [yup.ref("password"), null],
        "Password dan konfirmasi password harus sama",
      ),
    role: yup.string().required("Role harus diisi"),
  });
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createUser = async (data) => {
    try {
      const result = await APIuser.createUser(data);
      showSuccessToast("Akun User berhasil dibuat", "top-center", "large");
      globalRoute.navigate(`/profil`);
      console.log("post user", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Akun User gagal dibuat", "top-center", "large");
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
          <h3 className="font-bold">Buat Akun User</h3>
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
                  htmlFor="name"
                >
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.name
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan nama disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.name?.message}
                </span>
              </Row>

              {/* Email */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="name"
                >
                  Email
                </label>
                <input
                  id="email"
                  {...register("email")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.email
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan email disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.email?.message}
                </span>
              </Row>

              {/* Pw */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  {...register("password")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.password
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan password disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.password?.message}
                </span>
              </Row>

              {/* Conf Pw */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="confPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confPassword"
                  {...register("confPassword")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.password
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Konfirmasi Password anda"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.confPassword?.message}
                </span>
              </Row>

              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="role"
                >
                  Role
                </label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={[
                        { value: "user", label: "User" },
                        { value: "admin", label: "Admin" },
                      ]}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.role
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih role"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.role?.message}
                </span>

                <span className="pt-1 text-xs text-negative">
                  {errors.role?.message}
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
          modalTitle="Buat User"
          inputData={inputData}
          action={createUser}
        >
          <>
            <p>Apakah anda yakin ingin membuat akun ini?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
