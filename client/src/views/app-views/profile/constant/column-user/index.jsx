import { Button } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";

export const ColumnUser = [
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
    render: (val) => {
      return dayjs(val).format("DD/MM/YYYY");
    },
  },
  {
    title: "Action",
    width: 100,
    render: () => {
      return (
        <>
          <Button type="primary" className="me-2">
            <span className="font-medium">Update</span>
          </Button>
          <Button className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            <span className="font-medium">Delete</span>
          </Button>
        </>
      );
    },
  },
];
