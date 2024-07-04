import dayjs from "dayjs";
import "dayjs/locale/id";

import { Button } from "antd";
import { Link } from "react-router-dom";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export const ColumnUser = (handleOpenModalDelete) => [
  {
    title: "ID",
    dataIndex: "uuid",
    key: "uuid",
    width: 50,
    render: (val) => <span>{val.slice(0, 5)}</span>,
  },
  {
    title: "Nama",
    dataIndex: "name",
    key: "id",
    width: 150,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 100,
  },
  {
    title: "Tanggal Dibuat",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    render: (val) => {
      return dayjs(val).format("DD/MM/YYYY");
    },
  },
  {
    title: "Action",
    width: 100,
    className: "text-center",
    render: (record) => {
      return (
        <>
          <Link to={`/update-user/${record.uuid}`}>
            <Button type="primary" className="me-2 h-[25px] w-auto">
              <FaRegEdit className="p-[2px] text-[25px]" />
            </Button>
          </Link>

          <Button
            onClick={() => handleOpenModalDelete(record)}
            className="h-[25px] w-auto border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <MdOutlineDeleteSweep className="text-[25px]" />
          </Button>
        </>
      );
    },
  },
];
