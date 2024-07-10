import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import {
  Card,
  Table,
  ConfigProvider,
  Button,
  Flex,
  Space,
  Drawer,
  Modal,
} from "antd";

// import { Link } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
// import PDFcuti from "../misc/PDFcuti";
import { APImutasi } from "@/apis/APImutasi";
import { CardMutasi } from "../misc/CardMutasi";
import { ColumnMutasi } from "../constant/column-mutasi";
import PDFmutasi from "../misc/PDFmutasi";
import { ModalDeleteMutasi } from "../../../../components/shared-components/ModalDeleteMutasi";
import AddMutasi from "../misc/AddMutasi";

export function TableMutasi() {
  useDocumentTitle("Halaman Mutasi");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedMutasi, setSelectedMutasi] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRowClick = (record) => {
    setSelectedMutasi(record); // Set data cuti terpilih
    setIsDrawerVisible(true); // Buka Drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedMutasi(null);
  };

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mutasiData"],
    queryFn: async () => {
      const result = await APImutasi.getAllMutasi();
      return result;
    },
  });
  const dataMutasi = data || [];
  console.log("mutasi query", dataMutasi);

  return (
    <>
      <Flex justify="space-between" className="mb-6">
        <Space size="middle">
          <h3 className="mb-3 font-bold">Mutasi Pegawai</h3>
        </Space>

        <Space size="middle">
          <Button
            id="buat-mutasi"
            className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            onClick={handleOpenModal}
          >
            <span className="me-2 text-lg">
              <MdOutlineFileUpload />
            </span>
            Tambah Mutasi
          </Button>
        </Space>
      </Flex>
      <CardMutasi data={dataMutasi} />
      <Card>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                colorPrimary: "#17c6a3",
                rowHoverBg: "#e8f9f6",
              },
              Dropdown: {
                colorPrimary: "#17c6a3",
              },
              Checkbox: {
                colorPrimary: "#17c6a3",
                colorPrimaryHover: "#15b494",
              },
              Button: {
                colorLink: "#15b494",
                colorLinkHover: "#108d74",
                colorLinkActive: "#15b494",
              },
              Pagination: {
                colorPrimary: "#17c6a3",
                colorPrimaryHover: "#15b494",
              },
            },
          }}
        >
          <Table
            id="mutasi-table-list"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            onRow={(record) => ({
              onClick: () => {
                handleRowClick(record);
              },
            })}
            columns={ColumnMutasi(handleOpenModalDelete)}
            dataSource={dataMutasi}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 10,
              total: dataMutasi.length,
              showTotal: (total, range) =>
                `Menampilkan ${range[0]}-${range[1]} dari ${total} data`,
            }}
            summary={() =>
              isError !== null && !isLoading && isError ? (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={10}>
                    <p className="text-center">
                      Terjadi kesalahan! silahkan kembali beberapa saat lagi.
                    </p>
                    <p className="text-center text-negative">{isError}</p>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              ) : (
                <></>
              )
            }
          />
        </ConfigProvider>
      </Card>
      {/* drawer & modal */}
      {isShowDelete && (
        <ModalDeleteMutasi
          closeModal={handleOpenModalDelete}
          stateModal={userToDelete}
        />
      )}

      <Drawer
        title="Dokumen Mutasi Pegawai"
        placement="right"
        size="large"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
      >
        {selectedMutasi && <PDFmutasi mutasiData={selectedMutasi} />}
      </Drawer>

      <Modal
        title="Tambah Mutasi"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={900}
      >
        <AddMutasi onClose={handleCloseModal} refetchMutasi={refetch} />
      </Modal>
    </>
  );
}
