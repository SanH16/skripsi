import { Card, ConfigProvider, Table } from "antd";
import { useState } from "react";
import { APIuser } from "@/apis/APIuser";
import { APIpegawai } from "@/apis/APIpegawai";
import { ColumnUser } from "../constant/column-user";
import { ModalDeleteUser } from "@/components/shared-components/ModalDeleteUser";
import { ModalDeletePegawai } from "@/components/shared-components/ModalDeletePegawai";
import { useQuery } from "@tanstack/react-query";
import { ColumnPegawai } from "../constant/column-pegawai";

export default function UserTable({ isUserTable }) {
  const [showAll, setShowAll] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const result = await APIuser.getAllUsers();
      return result;
    },
  });

  const {
    data: dataPegawai,
    isLoading: isLoadingPegawai,
    isError: isErrorPegawai,
  } = useQuery({
    queryKey: ["pegawaiData"],
    queryFn: async () => {
      const result = await APIpegawai.getDataPegawai();
      return result;
    },
  });

  const DataSource = isUserTable
    ? dataUser
      ? showAll
        ? dataUser
        : dataUser.slice(0, 3)
      : []
    : dataPegawai
      ? showAll
        ? dataPegawai
        : dataPegawai.slice(0, 3)
      : [];
  const Columns = isUserTable
    ? ColumnUser(handleOpenModalDelete)
    : ColumnPegawai(handleOpenModalDelete);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <Card id="user-table-section">
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
            loading={isLoadingUser || isLoadingPegawai}
            columns={Columns}
            dataSource={DataSource}
            pagination={false}
            scroll={{ x: 1300 }}
            // scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            summary={() =>
              ((isUserTable && isErrorUser) ||
                (!isUserTable && isErrorPegawai)) &&
              !isLoadingUser &&
              !isLoadingPegawai ? (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={10}>
                    <p className="text-center">
                      Terjadi kesalahan! silahkan kembali beberapa saat lagi.
                    </p>
                    <p className="text-center text-negative">
                      {(isUserTable && isErrorUser.message) ||
                        (!isUserTable && isErrorPegawai.message)}
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
          />
        )}
        {isShowDelete && !isUserTable && (
          <ModalDeletePegawai
            closeModal={handleOpenModalDelete}
            stateModal={userToDelete}
          />
        )}
      </Card>
    </>
  );
}
