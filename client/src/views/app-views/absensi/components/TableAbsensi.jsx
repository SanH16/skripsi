import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import { Card, Table, ConfigProvider, Button, Flex, Space, Modal } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
import { APIabsensi } from "@/apis/APIabsensi";

import { ColumnAbsensi } from "../constant/column-absensi";

import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { useDebounce } from "@/hooks/useDebounce";
import { ModalDeleteAbsensi } from "@/components/shared-components/ModalDeleteAbsensi";
import { CardTable } from "@/components/shared-components/CardTable";

import AddAbsensi from "../misc/AddAbsensi";
import UpdateAbsensi from "../misc/UpdateAbsensi";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import "dayjs/locale/id";

export function TableAbsensi() {
  useDocumentTitle("Halaman Presensi");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);
  const [selectedAbsensi, setSelectedAbsensi] = useState(null);

  const handleRowClick = (record) => {
    setSelectedAbsensi(record); // Set selected item untuk update modal
    setIsUpdateModalVisible(true);
  };
  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalVisible(false);
    setSelectedAbsensi(null); // Reset selectedAbsensi
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const todayDate = dayjs().format("dddd,DD-MM-YYYY");

  const handleDownloadExcel = () => {
    const newData = dataAbsensi.map((row) => {
      // delete row.tableData;
      // return row;
      // const { uuid, ...rest } = row; // Destructure and remove uuid
      return {
        ...row,
        name: row.user.name,
        jabatan: row.user.pegawai.jabatan,
      };
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "absensi");
    //Download
    XLSX.writeFile(workBook, `Absensi_Radenmat-${todayDate}.xlsx`);
  };

  const handleDownloadPdf = () => {
    const columns = [
      { header: "ID", dataKey: "uuid" },
      { header: "Nama Pegawai", dataKey: "name" },
      { header: "Jabatan", dataKey: "jabatan" },
      { header: "Hari", dataKey: "createdAt" },
      { header: "Jam Masuk", dataKey: "jam_masuk" },
      { header: "Jam Keluar", dataKey: "jam_keluar" },
      { header: "Status", dataKey: "status" },
      { header: "Keterangan", dataKey: "keterangan" },
    ];
    const formattedData = dataAbsensi.map((row) => ({
      uuid: row.uuid.slice(0, 5),
      name: row.user.name,
      jabatan: row.user.pegawai.jabatan,
      createdAt: dayjs(row.createdAt).format("dddd, DD MMMM YYYY"),
      jam_masuk: row.jam_masuk
        ? dayjs(row.jam_masuk).format("HH:mm:ss")
        : "Tidak masuk",
      jam_keluar: row.jam_keluar
        ? dayjs(row.jam_keluar).format("HH:mm:ss")
        : "Belum keluar",
      status: row.status,
      keterangan: row.keterangan || "-",
    }));

    const doc = new jsPDF();
    doc.text("Data Rekap Absensi", 10, 10);
    doc.autoTable({
      theme: "grid",
      head: [columns.map((col) => col.header)],
      body: formattedData.map((row) => columns.map((col) => row[col.dataKey])),
      columnStyles: {
        0: { cellWidth: 15 }, // ID
        1: { cellWidth: 30 }, // Nama Pegawai
        2: { cellWidth: 20 }, // Jabatan
        3: { cellWidth: 30 }, // Hari
        4: { cellWidth: 25 }, // Jam Masuk
        5: { cellWidth: 25 }, // Jam Keluar
        6: { cellWidth: 20 }, // Status
        7: { cellWidth: 35 }, // Keterangan
      },
      margin: { right: 10, left: 5 },
      styles: { overflow: "linebreak" },
    });
    doc.save(`Absensi_Radenmat-${todayDate}.pdf`);
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
      <CardTable data={dataAbsensi} titleCard={"Data Absensi hari ini"} />
      <Card>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Absensi"
          placeholder="data absensi (nama/jabatan)"
          handleDownloadExcel={handleDownloadExcel}
          handleDownloadPdf={handleDownloadPdf}
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
            onRow={(record) => ({
              onClick: () => handleRowClick(record),

              // Handle row click event
            })}
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

      {/* Modal update */}
      <Modal
        title="Update Absensi"
        open={isUpdateModalVisible}
        onCancel={handleCloseUpdateModal}
        footer={null}
        width={900}
      >
        <UpdateAbsensi
          onClose={handleCloseUpdateModal}
          refetchAbsensi={refetch}
          updateData={selectedAbsensi}
        />
      </Modal>
    </>
  );
}
