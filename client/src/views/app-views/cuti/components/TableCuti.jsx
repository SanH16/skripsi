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

import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { useDebounce } from "@/hooks/useDebounce";

import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import "dayjs/locale/id";

export function TableCuti() {
  useDocumentTitle("Cuti Pegawai");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedCuti, setSelectedCuti] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

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

  const todayDate = dayjs().format("dddd,DD-MM-YYYY");

  const handleDownloadPdf = () => {
    const columns = [
      { header: "ID", dataKey: "uuid" },
      { header: "Nama Pegawai", dataKey: "name" },
      { header: "Alasan Cuti", dataKey: "alasan_cuti" },
      { header: "Tanggal Mulai", dataKey: "start_cuti" },
      { header: "Tanggal Selesai", dataKey: "end_cuti" },
      { header: "Keterangan", dataKey: "keterangan" },
      { header: "Status", dataKey: "status" },
    ];

    const formattedData = dataCuti.map((row) => ({
      uuid: row.uuid.slice(0, 5),
      name: row.user.name,
      alasan_cuti: row.alasan_cuti,
      start_cuti: dayjs(row.start_cuti).format("dddd, DD MMMM YYYY"),
      end_cuti: dayjs(row.end_cuti).format("dddd, DD MMMM YYYY"),
      keterangan: row.keterangan,
      status: row.status,
    }));

    const doc = new jsPDF();
    doc.text("Data Rekap Cuti", 10, 10);
    doc.autoTable({
      theme: "grid",
      head: [columns.map((col) => col.header)],
      body: formattedData.map((row) => columns.map((col) => row[col.dataKey])),
      columnStyles: {
        0: { cellWidth: 15 }, // ID
        1: { cellWidth: 30 }, // Nama Pegawai
        2: { cellWidth: 40 }, // Alasan Cuti
        3: { cellWidth: 30 }, // Tanggal Mulai
        4: { cellWidth: 30 }, // Tanggal Selesai
        5: { cellWidth: 30 }, // Keterangan
        6: { cellWidth: 25 }, // Status
      },
      margin: { right: 5, left: 5 },
      styles: { overflow: "linebreak" },
    });
    doc.save(`Cuti_Radenmat-${todayDate}.pdf`);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cutiData", searchQuery],
    queryFn: async () => {
      const result = await APIcuti.getAllCuti();
      // return result;

      // Logika filter
      let filteredData = result;
      if (searchQuery) {
        filteredData = result.filter((data) => {
          const filterBy =
            data.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
          return filterBy;
        });
      }

      return filteredData;
    },
  });
  const dataCuti = data || [];

  return (
    <>
      <Flex justify="space-between" className="mb-6">
        <Space size="middle">
          <h3 className="mb-3 font-bold">Pengajuan Cuti</h3>
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
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Pengajuan Cuti"
          placeholder="data cuti (nama/keterangan)"
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
            id="cuti-table-list"
            rowClassName={"hover:cursor-pointer"}
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
              defaultPageSize: 3,
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
          refetchDelete={refetch}
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
