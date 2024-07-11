import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import { Card, Table, ConfigProvider, Button, Flex, Space, Modal } from "antd";

import { MdOutlineFileUpload } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
import { APIabsensi } from "@/apis/APIabsensi";
import { CardAbsensi } from "../misc/CardAbsensi";

import { ColumnAbsensi } from "../constant/column-absensi";
import AddAbsensi from "../misc/AddAbsensi";

import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { useDebounce } from "@/hooks/useDebounce";
import { ModalDeleteAbsensi } from "@/components/shared-components/ModalDeleteAbsensi";

export function TableAbsensi() {
  useDocumentTitle("Halaman Presensi");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

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
    queryKey: ["absensiData", searchQuery],
    queryFn: async () => {
      console.log("Fetching data with searchQuery:", searchQuery);
      const result = await APIabsensi.getDataAbsensi();
      // return result;

      // Logika filter
      let filteredData = result;
      if (searchQuery) {
        filteredData = result.filter((data) => {
          const filterBy =
            data.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.user.pegawai.jabatan
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          return filterBy;
        });
      }

      return filteredData;
    },
  });
  const dataAbsensi = data || [];
  // console.log("absensi query", dataAbsensi);

  // Cek apakah ada absensi untuk hari ini
  const absensiToday = dataAbsensi?.some(
    (item) =>
      new Date(item.createdAt).toDateString() === new Date().toDateString(),
  );

  return (
    <>
      <Flex justify="space-between" className="mb-6">
        <Space size="middle">
          <h3 className="mb-3 font-bold">Absensi Pegawai</h3>
        </Space>

        {!absensiToday ? (
          <Space size="middle">
            <Button
              id="tambah-absensi"
              className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={handleOpenModal}
            >
              <span className="me-2 text-lg">
                <MdOutlineFileUpload />
              </span>
              Tambah Absensi
            </Button>
          </Space>
        ) : null}
      </Flex>
      <CardAbsensi data={dataAbsensi} />
      <Card>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Absensi"
          placeholder="data absensi (nama/jabatan)"
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
            columns={ColumnAbsensi(handleOpenModalDelete)}
            dataSource={dataAbsensi}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            // pagination={false}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 3,
              total: dataAbsensi.length,
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
        <ModalDeleteAbsensi
          closeModal={handleOpenModalDelete}
          stateModal={userToDelete}
          refetchDelete={refetch}
        />
      )}

      <Modal
        title="Tambah Absensi"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={900}
      >
        <AddAbsensi onClose={handleCloseModal} refetchAbsensi={refetch} />
      </Modal>
    </>
  );
}
