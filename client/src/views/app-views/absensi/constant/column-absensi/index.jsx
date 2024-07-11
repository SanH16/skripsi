/* eslint-disable react-refresh/only-export-components */
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Button, Image, Tooltip } from "antd";
import anonymousPict from "@/assets/anonymous profile.jpg";
import { MdOutlineDeleteSweep } from "react-icons/md";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";

export const ColumnAbsensi = (handleOpenModalDelete) => {
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  return [
    {
      title: "ID",
      dataIndex: "uuid",
      key: "uuid",
      render: (val) => <span>{val.slice(0, 5)}</span>,
    },
    {
      title: "Nama Pegawai",
      dataIndex: ["user", "name"],
      key: "user",
      width: 200,
      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
    },
    {
      title: "Jabatan",
      dataIndex: ["user", "pegawai", "jabatan"],
      key: "user",
      width: 100,
    },
    {
      title: "Hari",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: (val) => {
        return dayjs(val).format(`dddd, DD MMMM YYYY`);
      },
    },
    {
      title: "Jam Masuk",
      dataIndex: "jam_masuk",
      key: "jam_masuk",
      width: 200,
      sorter: (a, b) => a.jam_masuk.localeCompare(b.jam_masuk),
      render: (val, record) => {
        return record.status === "hadir" ? (
          dayjs(val).format(`[Pukul] HH:mm:ss [WIB]`)
        ) : (
          <span className="font-medium text-negative">tidak masuk</span>
        );
      },
    },
    {
      title: "Jam Keluar",
      dataIndex: "jam_keluar",
      key: "jam_keluar",
      width: 200,
      render: (val, record) => {
        if (record.status === "hadir") {
          return val ? (
            dayjs(val).format(`[Pukul] HH:mm:ss [WIB]`)
          ) : (
            <span className="flex items-center font-medium text-warning">
              belum kelar <IoIosTimer className="ms-1 text-lg text-blue-400" />
            </span>
          );
        } else {
          return (
            <span className="font-medium text-negative">tidak keluar</span>
          );
        }
      },
    },
    {
      title: "Bukti Absen",
      dataIndex: "bukti_photo",
      key: "bukti_photo",
      width: 150,
      render: (val) =>
        val ? (
          <div className="flex justify-center">
            <Image
              src={`http://localhost:5000/images/${val}`}
              preview={true}
              fallback={anonymousPict}
              className="h-10 w-10 rounded-lg"
            />
          </div>
        ) : (
          <span> - </span>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      filters: [
        {
          text: "Hadir",
          value: "hadir",
        },
        {
          text: "Izin",
          value: "izin",
        },
        {
          text: "Sakit",
          value: "sakit",
        },
        {
          text: "Tidak Hadir",
          value: "alfa",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (_, { status }) => {
        let text;
        let color;
        if (status === "hadir") {
          (color = "text-positive bg-positive-25 w-28"), (text = "Hadir");
        }
        if (status === "izin") {
          (color = "text-warning bg-warning-25 w-28"), (text = "Izin");
        }
        if (status === "sakit") {
          (color = "text-link bg-link-25 w-28"), (text = "Sakit");
        }
        if (status === "alfa") {
          (color = "text-negative bg-negative-25 w-28"), (text = "Tidak Hadir");
        }

        return (
          <Button className={color} key={status} type="primary">
            <span className="font-medium">{text}</span>
          </Button>
        );
      },
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      width: 100,
      render: (val) =>
        val ? (
          <span className="line-clamp-1">{val}</span>
        ) : (
          <span className="flex justify-center"> - </span>
        ),
    },
    {
      title: "Action",
      width: 50,
      className: "text-center",
      render: (record) => {
        return (
          <>
            {verifRole ? (
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => handleOpenModalDelete(record)}
                  className="h-[30px] w-[32px] rounded-lg border-red-500 p-0 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <MdOutlineDeleteSweep className="text-[20px]" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
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
