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
  Modal,
  Drawer,
} from "antd";

import { MdOutlineFileUpload } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
import { ModalDeleteReward } from "@/components/shared-components/ModalDeleteReward";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";

import { useDebounce } from "@/hooks/useDebounce";
import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { ColumnReward } from "../constant/column-reward";
import { APIreward } from "@/apis/APIreward";
import { CardTable } from "@/components/shared-components/CardTable";
import AddReward from "../misc/AddReward";
import PDFreward from "../misc/PDFreward";

export function TableReward() {
  useDocumentTitle("Halaman Reward");
  useScrollToTop();

  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const handleRowClick = (record) => {
    setSelectedReward(record); // Set data cuti terpilih
    setIsDrawerVisible(true); // Buka Drawer
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedReward(null);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["rewardData", searchQuery],
    queryFn: async () => {
      const result = await APIreward.getAllReward();
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
  const dataReward = data || [];

  return (
    <>
      <Flex justify="space-between" className="mb-6">
        <Space size="middle">
          <h3 className="mb-3 font-bold">Reward Pegawai</h3>
        </Space>

        {verifRole ? (
          <Space size="middle">
            <Button
              id="buat-reward"
              className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              onClick={handleOpenModal}
            >
              <span className="me-2 text-lg">
                <MdOutlineFileUpload />
              </span>
              Tambah Reward
            </Button>
          </Space>
        ) : null}
      </Flex>
      <CardTable data={dataReward} titleCard={"Reward hari ini"} />
      <Card hoverable>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Reward"
          placeholder="data reward (nama)"
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
            id="reward-table-list"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            columns={ColumnReward(handleOpenModalDelete)}
            dataSource={dataReward}
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
              total: dataReward.length,
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
        <ModalDeleteReward
          closeModal={handleOpenModalDelete}
          stateModal={userToDelete}
          refetchDelete={refetch}
        />
      )}

      <Drawer
        title="Bonus Reward Pegawai"
        placement="right"
        size="large"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
      >
        {selectedReward && <PDFreward rewardData={selectedReward} />}
      </Drawer>

      <Modal
        title="Tambah Reward"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={900}
      >
        <AddReward onClose={handleCloseModal} refetchReward={refetch} />
      </Modal>
    </>
  );
}
