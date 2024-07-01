import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { APIuser } from "@/apis/APIuser";
import { ColumnUser } from "../constant/column-user";
import { ModalDeleteUser } from "@/components/shared-components/ModalDeleteUser";

export default function UserTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleOpenModalDelete = (user) => {
    setUserToDelete(user);
    setIsShowDelete((prev) => !prev);
  };

  const DataSource = showAll ? data : data.slice(0, 2);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const result = await APIuser.getAllUsers();

        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsError(error);
      }
    };
    setIsLoading(true);
    fetchDataUser();
  }, []);

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
              {showAll ? "Tampilkan 5 Teratas" : "Lihat semua"}
            </button>
          </div>
        </div>
        <Table
          id="table-appointment"
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
                  <p className="text-center text-negative">{isError.message}</p>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            ) : (
              <></>
            )
          }
        />
        <h6 id="more-appointment-footer" className="mt-5 text-grey-200">
          Menampilkan 5 data teratas
        </h6>
        {isShowDelete && (
          <ModalDeleteUser
            closeModal={handleOpenModalDelete}
            stateModal={userToDelete}
            // deleteUser={deleteUser} // Fungsi untuk menghapus pengguna
          />
        )}
      </Card>
    </>
  );
}
