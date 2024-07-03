import { Card, ConfigProvider, Table } from "antd";
import { useState } from "react";
import { APIuser } from "@/apis/APIuser";
import { ColumnUser } from "../constant/column-user";
import { ModalDeleteUser } from "@/components/shared-components/ModalDeleteUser";
import { useQuery } from "@tanstack/react-query";

export default function UserTable() {
  const [showAll, setShowAll] = useState(false);

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const result = await APIuser.getAllUsers();
      return result;
    },
  });

  const DataSource = data ? (showAll ? data : data.slice(0, 3)) : [];

  const handleClick = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <Card id="user-table-section">
        <div className="flex justify-between">
          <p id="user-table-title" className="mb-4 text-2xl font-semibold">
            Data User
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
          }}
        >
          <Table
            id="table-user"
            loading={isLoading}
            columns={ColumnUser(handleOpenModalDelete)}
            dataSource={DataSource}
            pagination={false}
            scroll={{ x: true }}
            style={{ maxWidth: "100vw" }}
            summary={() =>
              isError.message !== null && !isLoading && isError ? (
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
        {isShowDelete && (
          <ModalDeleteUser
            closeModal={handleOpenModalDelete}
            stateModal={userToDelete}
          />
        )}
      </Card>
    </>
  );
}
