import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Flex, Col, Row, Button, Space, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancelLowongan } from "@/components/shared-components/ModalCancelLowongan";
import { globalRoute } from "@/utils/GlobalRoute";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIuser } from "@/apis/APIuser";
import { useParams } from "react-router-dom";

export default function UpdateUser() {
  useDocumentTitle("Update User");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);
  const { userId } = useParams();

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, "Nama minimal 3 karakter")
      .required("Nama harus diisi"),
    email: yup.string().trim().email("Email tidak valid"),
    password: yup.string().trim().nullable(),
    confPassword: yup
      .string()
      .trim()
      .nullable()
      .oneOf(
        [yup.ref("password"), null],
        "Password dan Confirm Password harus sama",
      ),
    role: yup.string().nullable(),
  });
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const result = await APIuser.getUserById(userId);
        console.log("update rekrutmen fetch", result);
        setInputData(result);

        setValue("name", result.name);
        setValue("email", result.email);
        setValue("role", result.role);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserById();
  }, [userId, setValue]);

  const updateUser = async () => {
    try {
      const result = await APIuser.updateUser(userId, inputData);
      showSuccessToast("Akun User berhasil diubah", "top-center", "large");
      globalRoute.navigate && globalRoute.navigate(`/profil`);
      console.log("post user", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Akun User gagal diupdate", "top-center", "large");
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
          <h3 className="font-bold">Update User</h3>
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
                  Nama
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
          </div>
        </Col>
      </form>
      {isShowCancel && (
        <ModalCancelLowongan closeModal={handleOpenModalCancel} />
      )}
      {isShowConfirm && (
        <ModalConfirm
          closeModal={handleOpenModalConfirm}
          modalTitle="Buat User"
          inputData={inputData}
          action={updateUser}
        >
          <>
            <p>Apakah anda yakin ingin mengubah akun ini?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
