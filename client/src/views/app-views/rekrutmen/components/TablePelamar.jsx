import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import { useState } from "react";
import { Card, Table, ConfigProvider } from "antd";

import { useQuery } from "@tanstack/react-query";

import { ColumnPelamar } from "../constant/column-pelamar";

import { FilterSearchTable } from "@/components/shared-components/FilterSearchTable";
import { useDebounce } from "@/hooks/useDebounce";
import { ModalDeleteLamaran } from "@/components/shared-components/ModalDeleteLamaran";
import { APIlamaran } from "@/apis/APIlamaran";

export function TablePelamar() {
  useDocumentTitle("Data Table Pelamar");
  useScrollToTop();

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 800);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pelamarData", searchQuery],
    queryFn: async () => {
      const result = await APIlamaran.getDataLamaran();

      // Logika filter
      let filteredData = result;
      if (searchQuery) {
        filteredData = result.filter((data) => {
          const filterBy =
            data.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.keterampilan.toLowerCase().includes(searchQuery.toLowerCase());
          return filterBy;
        });
      }

      return filteredData;
    },
  });
  const dataPelamar = data || [];

  return (
    <>
      <Card>
        <FilterSearchTable
          setSearchValue={setSearchValue}
          title="Daftar Lamaran"
          placeholder="data pelamar (nama/keterampilan)"
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
            id="pelamar-table-list"
            rowKey="uuid"
            rowClassName={"hover:cursor-pointer"}
            loading={isLoading}
            columns={ColumnPelamar(handleOpenModalDelete)}
            dataSource={dataPelamar}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 10,
              total: dataPelamar.length,
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
        <ModalDeleteLamaran
          closeModal={handleOpenModalDelete}
          stateModal={userToDelete}
          refetchDelete={refetch}
        />
      )}
    </>
  );
}
