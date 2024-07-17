import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Button, Card, ConfigProvider, Flex, Modal, Space, Table } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { ModalDeletePenugasan } from "@/components/shared-components/ModalDeletePenugasan";

import { useQuery } from "@tanstack/react-query";
import { APIpenugasan } from "@/apis/APIpenugasan";
import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";

import { ColumnPenugasan } from "../constant/column-penugasan";
import { useState } from "react";
import { CardPenugasan } from "../misc/CardPenugasan";
import UpdateTugas from "../misc/UpdateTugas";

import { useDebounce } from "@/hooks/useDebounce";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { useSelector } from "react-redux";

export function TablePenugasan() {
  useDocumentTitle("Halaman Penugasan");
  useScrollToTop();
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedPenugasan, setSelectedPenugasan] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const handleRowClick = (record) => {
    setSelectedPenugasan(record); // Set selected item untuk update modal
    setIsUpdateModalVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setSelectedPenugasan(null); // Reset
  };

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["penugasanData", searchQuery],
    queryFn: async () => {
      const result = await APIpenugasan.getAllPenugasan();
      // Logika filter
      let filteredData = result;
      if (searchQuery) {
        filteredData = result.filter((data) => {
          const filterBy =
            data.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.divisi.toLowerCase().includes(searchQuery.toLowerCase());
          return filterBy;
        });
      }

      return filteredData;
    },
  });
  const dataPenugasan = data || [];
  console.log("table tugas", dataPenugasan);
  return (
    <>
      <Flex justify="space-between" className="mb-6">
        <Space size="middle">
          <h3 className="mb-3 font-bold">Penugasan Pegawai</h3>
        </Space>

        {verifRole && (
          <Space size="middle">
            <Button
              id="tambah-absensi"
              className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              //   onClick={handleOpenModal}
            >
              <span className="me-2 text-lg">
                <MdOutlineFileUpload />
              </span>
              Tambah Tugas
            </Button>
          </Space>
        )}
      </Flex>
      <CardPenugasan data={dataPenugasan} />
      <Card>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Penugasan"
          placeholder="data penugasan (judul/divisi)"
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
            id="absensi-table-list"
            rowKey="uuid"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            columns={ColumnPenugasan(handleOpenModalDelete)}
            dataSource={dataPenugasan}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 3,
              total: dataPenugasan.length,
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
        <ModalDeletePenugasan
          closeModal={handleOpenModalDelete}
          stateModal={userToDelete}
          refetchDelete={refetch}
        />
      )}

      <Modal
        title="Daily Task"
        open={isUpdateModalVisible}
        onCancel={handleCloseUpdateModal}
        footer={null}
        width={900}
      >
        <UpdateTugas
          onClose={handleCloseUpdateModal}
          refetchPenugasan={refetch}
          updateData={selectedPenugasan}
        />
      </Modal>
    </>
  );
}
