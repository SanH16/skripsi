import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import { Card, Table, ConfigProvider, Modal, Drawer } from "antd";

import { useQuery } from "@tanstack/react-query";
import { ModalDeletePunishment } from "@/components/shared-components/ModalDeletePunishment";

import { useDebounce } from "@/hooks/useDebounce";
import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { CardTable } from "@/components/shared-components/CardTable";
import { APIpunishment } from "@/apis/APIpunishment";
import { ColumnPunishment } from "../constant/column-punishment";
import AddPunishment from "../misc/AddPunishment";
import PDFpunishment from "../misc/PDFpunishment";

export function TablePunishment({ handleCloseModal, isModalVisible }) {
  useDocumentTitle("Halaman Punishment");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedPunishment, setSelectedPunishment] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const handleRowClick = (record) => {
    setSelectedPunishment(record); // Set data reward terpilih
    setIsDrawerVisible(true); // Buka Drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedPunishment(null);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["punishmentData", searchQuery],
    queryFn: async () => {
      const result = await APIpunishment.getDataPunishment();
      // return result;

      // Logika filter
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
  const dataPunishment = data || [];

  return (
    <>
      <CardTable data={dataPunishment} titleCard={"Punishment hari ini"} />
      <Card hoverable>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Punishment"
          placeholder="data punishment (nama)"
          //   handleDownloadPdf={handleDownloadPdf}
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
            id="punishment-table-list"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            columns={ColumnPunishment(handleOpenModalDelete)}
            dataSource={dataPunishment}
            onRow={(record) => ({
              onClick: () => {
                handleRowClick(record);
              },
            })}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 3,
              total: dataPunishment.length,
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
        <ModalDeletePunishment
          closeModal={handleOpenModalDelete}
          stateModal={userToDelete}
          refetchDelete={refetch}
        />
      )}

      <Drawer
        title="Peringatan Pegawai"
        placement="right"
        size="large"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
      >
        {selectedPunishment && (
          <PDFpunishment punishmentData={selectedPunishment} />
        )}
      </Drawer>

      <Modal
        title="Tambah Punishment"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={900}
      >
        <AddPunishment onClose={handleCloseModal} refetchPunishment={refetch} />
      </Modal>
    </>
  );
}
