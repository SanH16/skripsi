import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import dayjs from "dayjs";
import "dayjs/locale/id";

import { useEffect, useState } from "react";
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

import { useParams } from "react-router-dom";
import { APImutasi } from "@/apis/APImutasi";
import { APIuser } from "@/apis/APIuser";
import { useQuery } from "@tanstack/react-query";

export default function UpdateMutasi() {
  useDocumentTitle("Ubah Data Mutasi");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);
  const { mutasiId } = useParams();

  const schema = yup.object().shape({
    nama_pegawai: yup.string().required("Nama Pegawai harus diisi"),
    cabang_sebelum: yup.string().required("Cabang harus diisi"),
    cabang_tujuan: yup.string().required("Cabang tujuan harus diisi"),
    tanggal_mulai: yup.date().required("Tanggal mulai harus diisi").nullable(),
    keterangan_mutasi: yup
      .string()
      .trim()
      .min(10, "Keterangan minimal 10 karakter")
      .required("Keterangan harus diisi"),
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
    const fetchMutasiById = async () => {
      try {
        const result = await APImutasi.getMutasiById(mutasiId);
        console.log("mutasi fetch", result);
        setInputData(result);

        setValue("nama_pegawai", result.nama_pegawai);
        setValue("cabang_sebelum", result.cabang_sebelum);
        setValue("cabang_tujuan", result.cabang_tujuan);
        setValue("tanggal_mulai", dayjs(result.tanggal_mulai));
        setValue("keterangan_mutasi", result.keterangan_mutasi);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMutasiById();
  }, [mutasiId, setValue]);

  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const result = await APIuser.getAllUsers();
      return result;
    },
  });
  const dataUser = data || [];
  //   console.log("user mutasi query", dataUser);

  const updateMutasi = async () => {
    try {
      // const user = dataUser.find((user) => user.name === data.nama_pegawai);
      await APImutasi.updateMutasi(mutasiId, inputData);
      showSuccessToast("Mutasi pegawai berhasil diubah", "top-center", "large");
      globalRoute.navigate(`/mutasi`);
      //   console.log("update mutasi", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Mutasi pegawai gagal diubah", "top-center", "large");
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
    <section id="unggah-mutasi" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Update Mutasi Pegawai</h3>
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

              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="cabang_sebelum"
                >
                  Asal Cabang
                </label>
                <Controller
                  name="cabang_sebelum"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={[
                        {
                          value: "Radenmat Lemabang",
                          label: "Radenmat Lemabang",
                        },
                        {
                          value: "Radenmat Patal",
                          label: "Radenmat Patal",
                        },
                        {
                          value: "Radenmat Plaju",
                          label: "Radenmat Plaju",
                        },
                      ]}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.cabang_sebelum
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Cabang Sebelum"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.cabang_sebelum?.message}
                </span>
              </Row>

              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="cabang_tujuan"
                >
                  Cabang Tujuan
                </label>
                <Controller
                  name="cabang_tujuan"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={[
                        {
                          value: "Radenmat Lemabang",
                          label: "Radenmat Lemabang",
                        },
                        {
                          value: "Radenmat Patal",
                          label: "Radenmat Patal",
                        },
                        {
                          value: "Radenmat Plaju",
                          label: "Radenmat Plaju",
                        },
                      ]}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.cabang_tujuan
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Cabang Tujuan"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.cabang_tujuan?.message}
                </span>
              </Row>

              {/* Date start */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="tanggal_mulai"
                >
                  Tanggal Mulai
                </label>
                <Controller
                  name="tanggal_mulai"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="YYYY-MM-DD"
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.tanggal_mulai
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih tanggal mulai"
                    />
                  )}
                />

                <span className="pt-1 text-xs text-negative">
                  {errors.tanggal_mulai?.message}
                </span>
              </Row>

              {/* Conf Pw */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="keterangan_mutasi"
                >
                  Keterangan
                </label>
                <input
                  id="keterangan_mutasi"
                  {...register("keterangan_mutasi")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.keterangan_mutasi
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan keterangan disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.keterangan_mutasi?.message}
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
          modalTitle="Buat Mutasi Pegawai"
          inputData={inputData}
          action={updateMutasi}
        >
          <>
            <p>Apakah anda yakin ingin membuat mutasi?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
