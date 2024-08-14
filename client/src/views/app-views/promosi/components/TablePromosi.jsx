import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import { Card, Table, ConfigProvider, Modal, Drawer } from "antd";

import { useQuery } from "@tanstack/react-query";
import { ModalDeletePunishment } from "@/components/shared-components/ModalDeletePunishment";

import { useDebounce } from "@/hooks/useDebounce";
import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { CardTable } from "@/components/shared-components/CardTable";
import { APIpromosi } from "@/apis/APIpromosi";
import { ColumnPromosi } from "../constant/column-promosi";
import PDFpromosi from "../misc/PDFpromosi";

export function TablePromosi({ handleCloseModal, isModalVisible }) {
  useDocumentTitle("Halaman Promosi");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedPromosi, setSelectedPromosi] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const handleRowClick = (record) => {
    setSelectedPromosi(record); // Set data reward terpilih
    setIsDrawerVisible(true); // Buka Drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedPromosi(null);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["promosiData", searchQuery],
    queryFn: async () => {
      const result = await APIpromosi.getDataPromosi();
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
  const dataPromosi = data || [];

  return (
    <>
      <CardTable data={dataPromosi} titleCard={"Kenaikan Jabatan hari ini"} />
      <Card hoverable>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Promosi"
          placeholder="data promosi (nama)"
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
            id="promosi-table-list"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            columns={ColumnPromosi(handleOpenModalDelete)}
            dataSource={dataPromosi}
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
              total: dataPromosi.length,
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
        title="Promosi Pegawai"
        placement="right"
        size="large"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
      >
        {selectedPromosi && <PDFpromosi punishmentData={selectedPromosi} />}
      </Drawer>

      <Modal
        title="Tambah Promosi"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={900}
      >
        {/* <AddPunishment onClose={handleCloseModal} refetchPunishment={refetch} /> */}
      </Modal>
    </>
  );
}
