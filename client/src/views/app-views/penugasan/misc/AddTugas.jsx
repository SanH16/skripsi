import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as yup from "yup";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { globalRoute } from "@/utils/GlobalRoute";
import { APIpenugasan } from "@/apis/APIpenugasan";
import { APIpegawai } from "@/apis/APIpegawai";
import imagePrev from "@/assets/content-pages.png";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancel } from "@/components/shared-components/ModalCancel";
import { useState } from "react";
import { Button, Col, DatePicker, Flex, Row, Select, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import "dayjs/locale/id";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";

export default function AddTugas() {
  useDocumentTitle("Tambah Penugasan");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const schema = yup.object().shape({
    judul: yup
      .string()
      .trim()
      .min(5, "Judul Penugasan minimal 5 karakter")
      .required("Judul Penugasan harus diisi"),
    keterangan_tugas: yup.string().required("Keterangan harus diisi"),
    durasi_waktu: yup
      .array()
      .of(yup.date())
      .required("Durasi Waktu harus diisi"),
    divisi: yup.string().required("Divisi harus diisi"),
    penempatan: yup.string().required("Penempatan harus diisi"),
    tasks_list: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Task name is required"),
          checked: yup.boolean().required("Checked status is required"),
        }),
      )
      .required("Tugas harus diisi"),
  });
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks_list",
  });

  const { data } = useQuery({
    queryKey: ["pegawaiData"],
    queryFn: async () => {
      const result = await APIpegawai.getDataPegawai();
      return result;
    },
  });
  const dataPegawai = data || [];

  // Filter  duplicate jabatan values
  const uniqueJabatan = Array.from(
    new Set(dataPegawai.map((pegawai) => pegawai.jabatan)),
  ).map((jabatan) => {
    return dataPegawai.find((pegawai) => pegawai.jabatan === jabatan);
  });

  const createTugas = async (data) => {
    try {
      const result = await APIpenugasan.createPenugasan(data);
      showSuccessToast("Penugasan berhasil dibuat", "top-center", "large");
      globalRoute.navigate(`/penugasan`);
      console.log("post penugasan", result);
    } catch (err) {
      console.error(err);
      showErrorToast("Penugasan gagal dibuat", "top-center", "large");
    }
  };

  const onSubmitArticle = (data) => {
    const startDate = dayjs(data.durasi_waktu[0]);
    const endDate = dayjs(data.durasi_waktu[1]);
    const duration = endDate.diff(startDate, "day") + 1; // Calculate duration in days
    const newData = {
      ...data,
      durasi_waktu: duration, // Store the duration in days
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
    <section id="unggah-penugasan" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Buat Penugasan</h3>
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
                  htmlFor="judul"
                >
                  Judul Penugasan
                </label>
                <input
                  id="judul"
                  {...register("judul")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.judul
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan judul penugasan disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.judul?.message}
                </span>
              </Row>
              {/* Nama */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="keterangan_tugas"
                >
                  Keterangan
                </label>
                <input
                  id="keterangan_tugas"
                  {...register("keterangan_tugas")}
                  className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                    errors.keterangan_tugas
                      ? "border-negative text-negative"
                      : "border-grey-100 text-grey-900"
                  }`}
                  type="text"
                  placeholder="Masukkan keterangan penugasan disini"
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.keterangan_tugas?.message}
                </span>
              </Row>
              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="divisi"
                >
                  Divisi
                </label>
                <Controller
                  name="divisi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      variant="borderless"
                      {...field}
                      options={uniqueJabatan.map((pegawai) => ({
                        value: pegawai.jabatan,
                        label: pegawai.jabatan,
                      }))}
                      className={`mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none ${
                        errors.divisi
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Divisi"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.divisi?.message}
                </span>
              </Row>
              {/* Role */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="penempatan"
                >
                  Cabang Penempatan
                </label>
                <Controller
                  name="penempatan"
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
                        errors.penempatan
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih Cabang Penempatan"
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.penempatan?.message}
                </span>
              </Row>
              {/* Date start */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="durasi_waktu"
                >
                  Durasi Waktu
                </label>
                <Controller
                  name="durasi_waktu"
                  control={control}
                  render={({ field }) => (
                    <RangePicker
                      {...field}
                      format="YYYY-MM-DD"
                      className={`mt-2 w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.durasi_waktu
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      placeholder="Pilih durasi waktu penugasan"
                    />
                  )}
                />

                <span className="pt-1 text-xs text-negative">
                  {errors.durasi_waktu?.message}
                </span>
              </Row>

              {/* Tasks List */}
              <Row>
                <label className="block text-xl font-semibold text-grey-400">
                  Tasks List
                </label>
                {fields.map((item, index) => (
                  <div key={item.id} className="mt-2 flex items-center gap-4">
                    <input
                      {...register(`tasks_list.${index}.name`)}
                      className={`block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.tasks_list?.[index]?.name
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      type="text"
                      placeholder="Task name"
                    />
                    <input
                      type="checkbox"
                      {...register(`tasks_list.${index}.checked`)}
                    />
                    <Button type="danger" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={() => append({ name: "", checked: false })}
                  className="mt-2 block"
                >
                  Add Task
                </Button>
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
          modalTitle="Buat Penugasan"
          inputData={inputData}
          action={createTugas}
        >
          <>
            <p>Apakah anda yakin ingin membuat penugasan?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
