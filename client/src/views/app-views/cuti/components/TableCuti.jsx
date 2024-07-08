import { useState } from "react";
import { Card, Table, ConfigProvider, Button, Flex, Space, Drawer } from "antd";

import { ColumnCuti } from "../constant/column-cuti";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { APIcuti } from "@/apis/APIcuti";
import { Link } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";

import { ModalDeleteCuti } from "@/components/shared-components/ModalDeleteCuti";
import { CardCuti } from "../misc/CardCuti";
import { useQuery } from "@tanstack/react-query";
import PDFcuti from "../misc/PDFcuti";

export function TableCuti() {
  useDocumentTitle("Cuti Pegawai");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedCuti, setSelectedCuti] = useState(null);

  const handleRowClick = (record) => {
    setSelectedCuti(record); // Set data cuti terpilih
    setIsDrawerVisible(true); // Buka Drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedCuti(null);
  };

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cutiData"],
    queryFn: async () => {
      const result = await APIcuti.getAllCuti();
      return result;
    },
  });
  const dataCuti = data || [];
  console.log("cuti query", dataCuti);

  return (
    <>
      <Flex justify="space-between" className="mb-6">
        <Space size="middle">
          <h3 className="mb-3 font-bold">Data Cuti</h3>
        </Space>

        <Space size="middle">
          <Link to={`/pengajuan-cuti`}>
            <Button
              id="buat-cuti"
              className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <span className="me-2 text-lg">
                <MdOutlineFileUpload />
              </span>
              Buat Cuti
            </Button>
          </Link>
        </Space>
      </Flex>
      <CardCuti data={dataCuti} />
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
            id="cuti-table-list"
            rowClassName={"hover:bg-green-50 hover:cursor-pointer"}
            loading={isLoading}
            onRow={(record) => ({
              onClick: () => {
                if (record.status === "processed" || record.status === "done") {
                  handleRowClick(record);
                }
              },
            })}
            columns={ColumnCuti(handleOpenModalDelete)}
            dataSource={dataCuti}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 10,
              total: dataCuti.length,
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
        title="Dokumen Pengajuan Cuti"
        placement="right"
        size="large"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
      >
        {selectedCuti && <PDFcuti cutiData={selectedCuti} />}
      </Drawer>
    </>
  );
}
