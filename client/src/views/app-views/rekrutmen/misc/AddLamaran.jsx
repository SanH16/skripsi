import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { Flex, Col, Button, Space, Select, Input, Upload, Form } from "antd";

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

  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handleOpenModalCancel = () => {
    setIsShowCancel((prev) => !prev);
  };
  const handleOpenModalConfirm = () => {
    setIsShowConfirm((prev) => !prev);
  };

  const onSubmitArticle = (values) => {
    const newData = {
      ...values,
      dokumen_cv: fileList,
      keterampilan: values.keterampilan.join(", "),
    };
    console.log("lamaran data", newData);
    setInputData(newData);
    handleOpenModalConfirm();
  };

  const createLamaran = async (data) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("dokumen_cv", file);
    });
    formData.append("nama", data.nama);
    formData.append("nomor_telepon", data.nomor_telepon);
    formData.append("pendidikan_terakhir", data.pendidikan_terakhir);
    formData.append("keterampilan", data.keterampilan);
    formData.append("dokumen_lain", data.dokumen_lain);
    try {
      await APIlamaran.createLamaran(formData);
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

  const props = {
    name: "dokumen_cv", // set nama upload file
    accept: ".pdf",
    beforeUpload: (file) => {
      setFileList([...fileList, file]); // Add the selected file to fileList
      return false; // Prevent default upload behavior
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    fileList,
  };

  return (
    <section id="unggah-lamaran" className="mb-5 py-5">
      <Form
        form={form}
        onFinish={onSubmitArticle}
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
              <Button id="submit-button" type="primary" htmlType="submit">
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
              <Form.Item
                name="nama"
                label="Nama Lengkap"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Nama Lengkap harus diisi" },
                ]}
              >
                <Input
                  placeholder="Masukkan Nama lengkap disini"
                  className="mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none"
                />
              </Form.Item>

              {/* no hp */}
              <Form.Item
                name="nomor_telepon"
                label="Nomor Hp"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Nomor Hp harus diisi" }]}
              >
                <Input
                  placeholder="Masukkan Nomor HP disini"
                  type="number"
                  className="mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none"
                />
              </Form.Item>

              {/* pendidikan */}
              <Form.Item
                name="pendidikan_terakhir"
                label="Pendidikan Terakhir"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Pendidikan terakhir harus diisi",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: "SMP", label: "SMP" },
                    { value: "SMA", label: "SMA" },
                    { value: "Diploma 3", label: "Diploma 3" },
                    { value: "Sarjana S1", label: "Sarjana S1" },
                  ]}
                  variant="borderless"
                  placeholder="Pilih Pendidikan terakhir.."
                  className="mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none"
                />
              </Form.Item>

              {/* Role */}
              <Form.Item
                name="keterampilan"
                label="Keterampilan"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "Keahlian harus diisi" }]}
              >
                <Select
                  mode="tags"
                  variant="borderless"
                  options={[
                    { value: "nodejs", label: "NodeJS" },
                    { value: "javascript", label: "JavaScript" },
                    { value: "laravel.php", label: "Laravel/PHP" },
                  ]}
                  tokenSeparators={[",", " ", "."]}
                  placeholder="Masukkan keterampilan anda.."
                  className="mt-2 block w-full rounded-lg border px-2 py-1 text-base focus:border-green-500 focus:outline-none"
                />
              </Form.Item>
            </Flex>

            <Flex
              vertical
              className="gap-6 rounded-lg border border-grey-50 p-6"
            >
              {/* Dokumen CV */}
              <Form.Item
                name="dokumen_cv"
                label="Dokumen CV"
                // rules={[{ required: true, message: "Dokumen CV harus diisi" }]}
                getValueFromEvent={({ file }) => file.originFileObj}
              >
                <Upload {...props}>
                  <Button>Select File</Button>
                </Upload>
              </Form.Item>

              {/* Dokumen Pendukung */}
              <Form.Item
                name="dokumen_lain"
                label="Dokumen Pendukung"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Dokumen Lain harus diisi" },
                ]}
              >
                <Input
                  placeholder="Dokumen pendukung (surat lamaran .etc)"
                  className="mt-2 block w-full rounded-lg border p-4 text-base focus:border-green-500 focus:outline-none"
                />
              </Form.Item>
            </Flex>
          </div>
        </Col>
      </Form>
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
