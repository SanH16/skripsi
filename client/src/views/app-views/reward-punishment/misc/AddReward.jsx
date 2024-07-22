import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as yup from "yup";
import { useState } from "react";
import { Flex, Col, Row, Button, Space, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalConfirm } from "@/components/shared-components/ModalConfirm";
import { ModalCancel } from "@/components/shared-components/ModalCancel";

import imagePrev from "@/assets/content-pages.png";

import {
  showErrorToast,
  showSuccessToast,
} from "@/components/shared-components/Toast";
import { APIreward } from "@/apis/APIreward";
import { APIuser } from "@/apis/APIuser";
import { useQuery } from "@tanstack/react-query";

export default function AddReward({ onClose, refetchReward }) {
  useDocumentTitle("Reward Imbalan");
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [inputData, setInputData] = useState(null);

  const schema = yup.object().shape({
    nama_pegawai: yup.string().required("Nama Pegawai harus diisi"),
    bonus_reward: yup.number().required("Bonus Reward harus diisi"),
  });
  const {
    // register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const result = await APIuser.getAllUsers();
      return result;
    },
  });
  const dataUser = data || [];

  const createReward = async (data) => {
    try {
      const user = dataUser.find((user) => user.name === data.nama_pegawai);
      await APIreward.createReward({ ...data, userId: user.id });
      showSuccessToast("Reward berhasil dibuat", "top-center", "large");
      refetchReward();
      onClose();
      reset(); // Clear input fields
    } catch (err) {
      console.error(err);
      showErrorToast("Reward gagal dibuat", "top-center", "large");
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

  const formatCurrency = (value) => {
    if (!value) value = 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace("IDR", "Rp.");
  };

  const handleBonusRewardChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValue("bonus_reward", value);
  };

  return (
    <section id="unggah-reward" className="mb-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmitArticle)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <Flex justify="space-between" align="center">
          <h3 className="font-bold">Form Input Reward</h3>
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
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-1">
            <Flex
              vertical
              className="gap-6 rounded-lg border border-grey-50 p-6"
            >
              {/* Nama */}
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

              {/* Bonus Tip */}
              <Row>
                <label
                  className="block text-xl font-semibold text-grey-400"
                  htmlFor="bonus_reward"
                >
                  Bonus Reward (Rupiah)
                </label>
                <Controller
                  name="bonus_reward"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="bonus_reward"
                      {...field}
                      className={`mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none ${
                        errors.bonus_reward
                          ? "border-negative text-negative"
                          : "border-grey-100 text-grey-900"
                      }`}
                      type="text"
                      placeholder="Masukkan bonus disini"
                      onChange={(e) => {
                        field.onChange(e);
                        handleBonusRewardChange(e);
                      }}
                      value={formatCurrency(field.value)}
                    />
                  )}
                />
                <span className="pt-1 text-xs text-negative">
                  {errors.bonus_reward?.message}
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
          modalTitle="Buat Reward Imbalan"
          inputData={inputData}
          action={createReward}
        >
          <>
            <p>Apakah anda yakin ingin membuat reward?</p>
          </>
        </ModalConfirm>
      )}
    </section>
  );
}
