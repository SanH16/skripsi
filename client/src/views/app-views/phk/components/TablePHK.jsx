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

import { MdOutlineFileUpload } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
import { APIphk } from "@/apis/APIphk";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";

import { useDebounce } from "@/hooks/useDebounce";
import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { CardTable } from "@/components/shared-components/CardTable";
import { ModalDeletePHK } from "@/components/shared-components/ModalDeletePHK";
import { ColumnPHK } from "../constant/column-phk";
import AddPhk from "../misc/AddPhk";
import PDFphk from "../misc/PDFphk";

// import PDFmutasi from "../misc/PDFmutasi";

export function TablePHK() {
  useDocumentTitle("Halaman PHK");
  useScrollToTop();

  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "direktur";

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedPhk, setSelectedPhk] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

  const handleRowClick = (record) => {
    setSelectedPhk(record); // Set data  terpilih
    setIsDrawerVisible(true); // Buka Drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedPhk(null);
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
    queryKey: ["phkData", searchQuery],
    queryFn: async () => {
      const result = await APIphk.getDataPHK();

      let filteredData = result;
      if (searchQuery) {
        filteredData = result.filter((data) => {
          const filterBy = data.nama_pegawai
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return filterBy;
        });
      }

      return filteredData;
    },
  });
  const dataPHK = data || [];
  console.log("phk query", dataPHK);

  return (
    <>
      <Flex justify="space-between" className="mb-6">
        <Space size="middle">
          <h3 className="mb-3 font-bold">Pemutusan Hubungan Kerja</h3>
        </Space>

        {verifRole ? (
          <Space size="middle">
            <Button
              id="buat-phk"
              className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={handleOpenModal}
            >
              <span className="me-2 text-lg">
                <MdOutlineFileUpload />
              </span>
              Buat PHK
            </Button>
          </Space>
        ) : null}
      </Flex>
      <CardTable data={dataPHK} titleCard={"Data PHK hari ini"} />
      <Card hoverable>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar PHK"
          placeholder="data phk (nama)..."
          // handleDownloadPdf={handleDownloadPdf}
        />
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
            id="phk-table-list"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            onRow={(record) => ({
              onClick: () => {
                handleRowClick(record);
              },
            })}
            columns={ColumnPHK(handleOpenModalDelete)}
            dataSource={dataPHK}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 3,
              total: dataPHK.length,
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
        <ModalDeletePHK
          closeModal={handleOpenModalDelete}
          stateModal={userToDelete}
          refetchDelete={refetch}
        />
      )}

      <Drawer
        title="Dokumen PHK"
        placement="right"
        size="large"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
      >
        {selectedPhk && <PDFphk phkData={selectedPhk} />}
      </Drawer>

      <Modal
        title="Buat PHK"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={900}
      >
        <AddPhk onClose={handleCloseModal} refetchPhk={refetch} />
      </Modal>
    </>
  );
}
