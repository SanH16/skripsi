import { useEffect, useState } from "react";
import { Card, Table, ConfigProvider } from "antd";

// import { ListFilter } from "./ListFilter";
// import { CardAppointment } from "./CardAppointment";
import { ColumnCuti } from "../constant/column-cuti";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToTop } from "@/hooks/useScrollToTop";
// import { useDebounce } from "@/hooks/useDebounce";
import { APIcuti } from "@/apis/APIcuti";

export function TableCuti() {
  useDocumentTitle("Cuti Pegawai");
  useScrollToTop();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dataCuti, setDataCuti] = useState([]);
  //   const [searchValue, setSearchValue] = useState("");
  //   const [filterStatus, setFilterStatus] = useState("");

  //   const searchQuery = useDebounce(searchValue, 800);
  //   const filterQuery = useDebounce(filterStatus, 800);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await APIcuti.getAllCuti();
        setDataCuti(result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsError(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h3 className="mb-3 font-bold">Data Cuti</h3>
      {/* <CardAppointment data={dataCuti} /> */}
      <Card>
        {/* <ListFilter
          setSearchValue={setSearchValue}
          setFilterStatus={setFilterStatus}
        /> */}
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
            rowClassName={"hover:bg-green-50 hover:cursor-pointer"}
            loading={isLoading}
            id="appointment-table-list"
            columns={ColumnCuti}
            dataSource={dataCuti}
            scroll={{ x: true }}
            style={{ maxWidth: "100%" }}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 10,
              total: dataCuti.length,
              showTotal: (total, range) =>
                `Menampilkan ${range[0]}-${range[1]} dari ${total} data`,
            }}
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
      </Card>
      {/* drawer detail pasien */}
    </>
  );
}
