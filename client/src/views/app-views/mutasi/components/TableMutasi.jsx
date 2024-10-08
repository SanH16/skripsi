import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import { Card, Table, ConfigProvider, Drawer, Modal } from "antd";

import { useQuery } from "@tanstack/react-query";
import { APImutasi } from "@/apis/APImutasi";
import { ColumnMutasi } from "../constant/column-mutasi";
import { ModalDeleteMutasi } from "@/components/shared-components/ModalDeleteMutasi";

import { useDebounce } from "@/hooks/useDebounce";
import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { CardTable } from "@/components/shared-components/CardTable";

import PDFmutasi from "../misc/PDFmutasi";
import AddMutasi from "../misc/AddMutasi";

import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import "dayjs/locale/id";

export function TableMutasi({ handleCloseModal, isModalVisible }) {
  useDocumentTitle("Halaman Mutasi");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedMutasi, setSelectedMutasi] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

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
  const todayDate = dayjs().format("dddd,DD-MM-YYYY");

  const handleDownloadPdf = () => {
    const columns = [
      { header: "ID", dataKey: "uuid" },
      { header: "Nama Pegawai", dataKey: "name" },
      { header: "Keterangan Mutasi", dataKey: "keterangan_mutasi" },
      { header: "Cabang Sebelum", dataKey: "cabang_sebelum" },
      { header: "Cabang Tujuan", dataKey: "cabang_tujuan" },
      { header: "Tanggal Mulai", dataKey: "tanggal_mulai" },
      { header: "Tanggal Dibuat", dataKey: "createdAt" },
    ];

    const formattedData = dataMutasi.map((row) => ({
      uuid: row.uuid.slice(0, 5),
      name: row.user.name,
      keterangan_mutasi: row.keterangan_mutasi,
      createdAt: dayjs(row.createdAt).format("dddd, DD MMMM YYYY"),
      cabang_tujuan: row.cabang_tujuan,
      cabang_sebelum: row.cabang_sebelum,
      tanggal_mulai: dayjs(row.tanggal_mulai).format("dddd, DD MMMM YYYY"),
    }));

    const doc = new jsPDF();
    doc.text("Data Rekap Mutasi", 10, 10);
    doc.autoTable({
      theme: "grid",
      head: [columns.map((col) => col.header)],
      body: formattedData.map((row) => columns.map((col) => row[col.dataKey])),
      columnStyles: {
        0: { cellWidth: 10 }, // ID
        1: { cellWidth: 30 }, // Nama Pegawai
        2: { cellWidth: 40 }, // Keterangan Mutasi
        3: { cellWidth: 30 }, // Cabang Sebelum
        4: { cellWidth: 30 }, // Cabang Tujuan
        5: { cellWidth: 30 }, // Tanggal Mulai
        6: { cellWidth: 30 }, // Tanggal Dibuat
      },
      margin: { right: 5, left: 5 },
      styles: { overflow: "linebreak" },
    });
    doc.save(`Mutasi_Radenmat-${todayDate}.pdf`);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mutasiData", searchQuery],
    queryFn: async () => {
      const result = await APImutasi.getAllMutasi();
      // return result;

      // Logika filter
      let filteredData = result;
      if (searchQuery) {
        filteredData = result.filter((data) => {
          const filterBy =
            data.nama_pegawai
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            data.cabang_tujuan
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          return filterBy;
        });
      }

      return filteredData;
    },
  });
  const dataMutasi = data || [];
  console.log("mutasi query", dataMutasi);

  return (
    <>
      <CardTable data={dataMutasi} titleCard={"Data Mutasi hari ini"} />
      <Card hoverable>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Mutasi"
          placeholder="data mutasi (nama/cabang)"
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
              defaultPageSize: 3,
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
          refetchDelete={refetch}
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
