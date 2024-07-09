/* eslint-disable react-refresh/only-export-components */
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";

export const ColumnMutasi = (handleOpenModalDelete) => {
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
      dataIndex: ["user", "name"],
      // render: (user) => user.map((item) => item.name).join(),
      key: "user",
      width: 150,
      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
    },
    {
      title: "Keterangan Mutasi",
      dataIndex: "keterangan_mutasi",
      key: "keterangan_mutasi",
      width: 250,
      render: (val) => <span className="line-clamp-1">{val}</span>,
    },
    {
      title: "Cabang Asal",
      dataIndex: "cabang_sebelum",
      key: "cabang_sebelum",
      width: 150,
      render: (val) => <span className="line-clamp-1">{val}</span>,
    },
    {
      title: "Cabang Tujuan",
      dataIndex: "cabang_tujuan",
      key: "cabang_tujuan",
      width: 150,
      render: (val) => <span className="line-clamp-1">{val}</span>,
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
      title: "Tanggal Mulai",
      dataIndex: "tanggal_mulai",
      key: "tanggal_mulai",
      width: 150,
      sorter: (a, b) => a.tanggal_mulai.localeCompare(b.tanggal_mulai),
      render: (val) => {
        return dayjs(val).format("DD MMMM YYYY");
      },
    },
    {
      title: "Action",
      width: 200,
      className: "text-center",
      render: (record) => {
        return (
          <>
            <Link to={`/update-mutasi/${record.uuid}`}>
              <Button
                type="primary"
                className="me-1 h-[30px] w-auto"
                disabled={!verifRole}
              >
                <FaRegEdit className="p-[2px] text-[25px]" />
              </Button>
            </Link>

            {verifRole && (
              <Button
                onClick={() => handleOpenModalDelete(record)}
                className="h-[30px] w-auto border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <MdOutlineDeleteSweep className="text-[25px]" />
              </Button>
            )}
          </>
        );
      },
    },
  ];
};
