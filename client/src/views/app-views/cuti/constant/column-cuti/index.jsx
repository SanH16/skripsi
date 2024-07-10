/* eslint-disable react-refresh/only-export-components */
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";

export const ColumnCuti = (handleOpenModalDelete) => {
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
      width: 200,
      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
    },
    {
      title: "Alasan Cuti",
      dataIndex: "alasan_cuti",
      key: "alasan_cuti",
      width: 250,
      render: (val) => <span className="line-clamp-1">{val}</span>,
    },
    {
      title: "Tanggal Mulai",
      dataIndex: "start_cuti",
      key: "start_cuti",
      width: 150,
      sorter: (a, b) => a.start_cuti.localeCompare(b.start_cuti),
      render: (val) => {
        return dayjs(val).format("DD MMMM YYYY");
      },
    },
    {
      title: "Berakhir Cuti",
      dataIndex: "end_cuti",
      key: "end_cuti",
      width: 150,
      sorter: (a, b) => a.end_cuti.localeCompare(b.end_cuti),
      render: (val) => {
        return dayjs(val).format("DD MMMM YYYY");
      },
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      width: 200,
      render: (val) => <span className="line-clamp-1">{val}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      filters: [
        {
          text: "Berjalan",
          value: "processed",
        },
        {
          text: "Menunggu",
          value: "waiting",
        },
        {
          text: "Selesai",
          value: "done",
        },
        {
          text: "Dibatalkan",
          value: "cancelled",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (_, { status }) => {
        let text;
        let color;
        if (status === "processed") {
          (color = "text-link bg-link-25 w-28"), (text = "Berjalan");
        }
        if (status === "waiting") {
          (color = "text-warning bg-warning-25 w-28"), (text = "Menunggu");
        }
        if (status === "done") {
          (color = "text-positive bg-positive-25 w-28"), (text = "Selesai");
        }
        if (status === "cancelled") {
          (color = "text-negative bg-negative-25 w-28"), (text = "Dibatalkan");
        }

        return (
          <Button className={color} key={status} type="primary">
            <span className="font-medium">{text}</span>
          </Button>
        );
      },
    },
    {
      title: "Action",
      width: 200,
      className: "text-center",
      render: (record) => {
        const isCutiDisabled =
          record.status === "processed" || record.status === "done";
        return (
          <>
            <Link to={`/update-cuti/${record.uuid}`}>
              <Button
                type="primary"
                className="me-2 h-[30px] w-[32px] p-0"
                disabled={!verifRole && isCutiDisabled}
              >
                <FaRegEdit className="p-[2px] text-[20px]" />
              </Button>
            </Link>

            {verifRole && (
              <Button
                onClick={() => handleOpenModalDelete(record)}
                className="h-[30px] w-[32px] border-red-500 p-0 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <MdOutlineDeleteSweep className="text-[20px]" />
              </Button>
            )}
          </>
        );
      },
    },
  ];
};
