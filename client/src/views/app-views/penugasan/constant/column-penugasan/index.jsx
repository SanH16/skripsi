/* eslint-disable react-refresh/only-export-components */
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Button, Image, Tooltip } from "antd";
import anonymousPict from "@/assets/anonymous profile.jpg";

import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";

export const ColumnPenugasan = (handleOpenModalDelete) => {
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
      title: "Judul",
      dataIndex: "judul",
      key: "judul",
      width: 150,
    },
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
      width: 150,
      render: (val) =>
        val ? (
          <span>{val}</span>
        ) : (
          <span className="text-gray-400">no data</span>
        ),
    },
    {
      title: "Penempatan",
      dataIndex: "penempatan",
      key: "penempatan",
      width: 150,
      render: (val) =>
        val ? (
          <span>{val}</span>
        ) : (
          <span className="text-gray-400">no data</span>
        ),
    },
    {
      title: "Durasi Waktu",
      dataIndex: "durasi_waktu",
      key: "durasi_waktu",
      width: 200,
      render: (val) => dayjs(val).format("DD MMMM YYYY"),
    },
    {
      title: "Team",
      dataIndex: ["user", "name", "pegawai", "photo"],
      key: "photo",
      width: 150,
      render: (val, record) => (
        <>
          <Tooltip title={record.user.name}>
            <Image
              src={`http://localhost:5000/images/${val}`}
              preview={false}
              fallback={anonymousPict}
              className="m-2 flex h-8 w-8 rounded-full"
            />
          </Tooltip>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status_tugas",
      key: "status_tugas",
      width: 100,
      filters: [
        {
          text: "Idle",
          value: "idle",
        },
        {
          text: "On Going",
          value: "ongoing",
        },
        {
          text: "Completed",
          value: "completed",
        },
      ],
      onFilter: (value, record) => record.status_tugas.indexOf(value) === 0,
      render: (_, { status_tugas }) => {
        let text;
        let color;
        if (status_tugas === "idle") {
          (color = "text-warning bg-warning-25 w-20 w-28"), (text = "Idle");
        }
        if (status_tugas === "ongoing") {
          (color = "text-link bg-link-25 w-28"), (text = "On Going");
        }
        if (status_tugas === "completed") {
          (color = "text-positive bg-positive-25 w-28"), (text = "Completed");
        }

        return (
          <Button className={color} key={status_tugas} type="primary">
            <span className="font-medium">{text}</span>
          </Button>
        );
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
