import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import { Card, Table, ConfigProvider, Button, Flex, Space, Drawer } from "antd";

import { Link } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";

import { ModalDeleteCuti } from "@/components/shared-components/ModalDeleteCuti";
import { useQuery } from "@tanstack/react-query";
// import PDFcuti from "../misc/PDFcuti";
import { APImutasi } from "@/apis/APImutasi";
import { CardMutasi } from "../misc/CardMutasi";
import { ColumnMutasi } from "../constant/column-mutasi";
import PDFmutasi from "../misc/PDFmutasi";

export function TableMutasi() {
  useDocumentTitle("Halaman Mutasi");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedMutasi, setSelectedMutasi] = useState(null);

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

  const { data, isLoading, isError } = useQuery({
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
          <Link to={`/mutasi-pegawai`}>
            <Button
              id="buat-mutasi"
              className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <span className="me-2 text-lg">
                <MdOutlineFileUpload />
              </span>
              Tambah Mutasi
            </Button>
          </Link>
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
        <ModalDeleteCuti
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
    </>
  );
}
