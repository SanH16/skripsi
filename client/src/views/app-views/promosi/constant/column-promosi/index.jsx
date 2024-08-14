/* eslint-disable react-refresh/only-export-components */
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Button, Tag, Tooltip } from "antd";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";

export const ColumnPromosi = (handleOpenModalDelete) => {
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  return [
    {
      title: "ID",
      dataIndex: "uuid",
      key: "uuid",
      width: 50,
      render: (val) => <span>{val.slice(0, 5)}</span>,
    },
    {
      title: "Nama Pegawai",
      dataIndex: "nama_pegawai",
      key: "nama_pegawai",
      width: 150,
      sorter: (a, b) => a.nama_pegawai.localeCompare(b.nama_pegawai),
    },
    {
      title: "Jabatan Lama",
      dataIndex: "jabatan_lama",
      key: "jabatan_lama",
      width: 200,
      render: (values) => (
        <Tag className="bg-red-100 font-bold text-red-600">{values}</Tag>
      ),
    },
    {
      title: "Jabatan Baru",
      dataIndex: "jabatan_baru",
      key: "jabatan_baru",
      width: 200,
      render: (values) => (
        <Tag className="bg-green-100 font-bold text-green-600">{values}</Tag>
      ),
    },
    {
      title: "Tanggal dibuat",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: (val) => {
        return dayjs(val).format("DD MMMM YYYY");
      },
    },
    {
      title: "Tanggal Promosi",
      dataIndex: "tanggal_promosi",
      key: "tanggal_promosi",
      width: 150,
      render: (val) => {
        return dayjs(val).format("DD MMMM YYYY");
      },
    },
    {
      title: "Action",
      width: 100,
      className: "text-center",
      render: (record) => {
        return (
          <>
            {verifRole ? (
              <>
                {/* <Button
                  type="primary"
                  className="me-2 h-[30px] w-[32px] p-0"
                  disabled={!verifRole}
                >
                  <FaRegEdit className="p-[2px] text-[20px]" />
                </Button> */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModalDelete(record);
                  }}
                  className="h-[30px] w-[32px] border-red-500 p-0 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <MdOutlineDeleteSweep className="text-[20px]" />
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center text-2xl font-semibold text-green-500 duration-100 hover:text-link">
                {/* <IoEye /> */}
                <Tooltip title="Click row">
                  <IoInformationCircleOutline className="text-2xl font-semibold text-green-500 duration-100 hover:text-link" />
                </Tooltip>
              </div>
            )}
          </>
        );
      },
    },
  ];
};
