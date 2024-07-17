import { Card, ConfigProvider, Table } from "antd";
import { useState } from "react";
import { APIuser } from "@/apis/APIuser";
import { APIpegawai } from "@/apis/APIpegawai";
import { ColumnUser } from "../constant/column-user";
import { ModalDeleteUser } from "@/components/shared-components/ModalDeleteUser";
import { ModalDeletePegawai } from "@/components/shared-components/ModalDeletePegawai";
import { useQuery } from "@tanstack/react-query";
import { ColumnPegawai } from "../constant/column-pegawai";
import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";

import { useDebounce } from "@/hooks/useDebounce";

import * as XLSX from "xlsx";
import dayjs from "dayjs";
import "dayjs/locale/id";

export default function UserTable({ isUserTable }) {
  const [showAll, setShowAll] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const todayDate = dayjs().format("dddd,DD-MM-YYYY");

  const handleDownloadExcel = () => {
    if (!isUserTable) {
      const newData = DataSource.map((row) => {
        delete row.uuid;
        delete row.photo;
        return {
          name: row.user.name,
          ...row,
        };
      });
      const workSheet = XLSX.utils.json_to_sheet(newData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "data pegawai");
      //Download
      XLSX.writeFile(workBook, `DataPegawai_Radenmat-${todayDate}.xlsx`);
    }
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [isUserTable ? "userData" : "pegawaiData", searchQuery],
    queryFn: async () => {
      const result = isUserTable
        ? await APIuser.getAllUsers()
        : await APIpegawai.getDataPegawai();
      let filteredData = result;
      if (searchQuery) {
        filteredData = result.filter((data) => {
          const filterBy = isUserTable
            ? data.name.toLowerCase().includes(searchQuery.toLowerCase())
            : data.user.name.toLowerCase().includes(searchQuery.toLowerCase());
          return filterBy;
        });
      }
      return filteredData;
    },
  });

  const DataSource = data ? (showAll ? data : data.slice(0, 3)) : [];
  const Columns = isUserTable
    ? ColumnUser(handleOpenModalDelete)
    : ColumnPegawai(handleOpenModalDelete);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <Card id="user-table-section">
        <FilterSearchTable
          setSearchValue={setSearchValue}
          placeholder={`${isUserTable ? "data user" : "data pegawai"} (nama)`}
          // handleDownloadPdf={handleDownloadPdf}
          handleDownloadExcel={handleDownloadExcel}
          isUserTable={isUserTable}
        />
        <div className="flex justify-between">
          <p id="user-table-title" className="mb-4 text-2xl font-semibold">
            {isUserTable ? "Data Akun User" : "Data Pegawai"}
          </p>

          <div>
            <button
              onClick={handleClick}
              className="text-green-500 hover:text-green-700"
            >
              {showAll ? "Tampilkan 3 Teratas" : "Lihat semua"}
            </button>
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#17c6a3",
            },
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
            },
          }}
        >
          <Table
            id="table-user"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            columns={Columns}
            dataSource={DataSource}
            pagination={false}
            scroll={{ x: 1300 }}
            // scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            summary={() =>
              isError && !isLoading ? (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={10}>
                    <p className="text-center">
                      Terjadi kesalahan! silahkan kembali beberapa saat lagi.
                    </p>
                    <p className="text-center text-negative">
                      {isError.message}
                    </p>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              ) : (
                <></>
              )
            }
          />
        </ConfigProvider>

        <h6 id="more-appointment-footer" className="mt-5 text-grey-200">
          {showAll ? "" : "Menampilkan 3 data Teratas"}
        </h6>
        {isShowDelete && isUserTable && (
          <ModalDeleteUser
            closeModal={handleOpenModalDelete}
            stateModal={userToDelete}
            refetchDelete={refetch}
          />
        )}
        {isShowDelete && !isUserTable && (
          <ModalDeletePegawai
            closeModal={handleOpenModalDelete}
            stateModal={userToDelete}
            refetchDelete={refetch}
          />
        )}
      </Card>
    </>
  );
}
