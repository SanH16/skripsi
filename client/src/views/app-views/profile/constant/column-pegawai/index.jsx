import dayjs from "dayjs";
import "dayjs/locale/id";

import { Button, Image } from "antd";
import { Link } from "react-router-dom";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { thousandSeparator } from "@/utils/ThousandSeparator";
import anonymousPict from "@/assets/anonymous profile.jpg";

export const ColumnPegawai = (handleOpenModalDelete) => [
  {
    title: "ID",
    dataIndex: "uuid",
    key: "uuid",
    width: 100,
    render: (val) => <span>{val.slice(0, 5)}</span>,
  },
  {
    title: "Photo",
    dataIndex: ["photo"],
    key: "photo",
    width: 100,
    fixed: "left",
    render: (val) => (
      <Image
        src={`http://localhost:5000/images/${val}`}
        preview={true}
        fallback={anonymousPict}
        className="h-10 w-10 rounded-full"
      />
    ),
  },
  {
    title: "Nama Pegawai",
    dataIndex: ["user", "name"],
    key: "user",
    width: 200,
    fixed: "left",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "NIK",
    dataIndex: "nik",
    key: "nik",
    width: 200,
  },
  {
    title: "Jabatan",
    dataIndex: "jabatan",
    key: "jabatan",
    width: 150,
  },
  {
    title: "Gaji Pegawai",
    dataIndex: "gaji_pegawai",
    key: "gaji_pegawai",
    width: 150,
    render: (values) => (
      <span>
        {thousandSeparator(values)} {values < 1000000 ? "rb" : "jt"}
      </span>
    ),
  },
  {
    title: "Status Bekerja",
    dataIndex: "status_bekerja",
    key: "status_bekerja",
    width: 200,
    filters: [
      {
        text: "Aktif",
        value: "active",
      },
      {
        text: "Sedang Cuti",
        value: "cuti",
      },
      {
        text: "Berhenti",
        value: "stop",
      },
      {
        text: "Pindah",
        value: "move",
      },
    ],
    onFilter: (value, record) => record.status_bekerja.indexOf(value) === 0,
    render: (_, { status_bekerja }) => {
      let text;
      let color;
      if (status_bekerja === "active") {
        (color = "text-positive bg-positive-25 w-28"), (text = "Aktif");
      }
      if (status_bekerja === "cuti") {
        (color = "text-warning bg-warning-25 w-28"), (text = "Sedang Cuti");
      }
      if (status_bekerja === "stop") {
        (color = "text-negative bg-negative-25 w-28"), (text = "Berhenti");
      }
      if (status_bekerja === "move") {
        (color = "text-link bg-link-25 w-28"), (text = "Pindah");
      }

      return (
        <Button className={color} key={status_bekerja} type="primary">
          <span className="font-medium">{text}</span>
        </Button>
      );
    },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Tanggal Lahir",
    dataIndex: "tanggal_lahir",
    key: "tanggal_lahir",
    width: 150,
    render: (val) => {
      return dayjs(val).format("DD MMMM YYYY");
    },
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 150,
    filters: [
      {
        text: "Laki - Laki",
        value: "Laki - Laki",
      },
      {
        text: "Perempuan",
        value: "Perempuan",
      },
    ],
    onFilter: (value, record) => record.gender.indexOf(value) === 0,
  },
  {
    title: "Pendidikan Terakhir",
    dataIndex: "pendidikan",
    key: "pendidikan",
    width: 200,
  },
  {
    title: "Status Menikah",
    dataIndex: "status_menikah",
    key: "status_menikah",
    width: 200,
    filters: [
      {
        text: "Menikah",
        value: "Menikah",
      },
      {
        text: "Belum Menikah",
        value: "Belum Menikah",
      },
    ],
    onFilter: (value, record) => record.status_menikah.indexOf(value) === 0,
  },
  {
    title: "Alamat",
    dataIndex: "address",
    key: "address",
    width: 250,
    render: (val) => <span className="line-clamp-1">{val}</span>,
  },
  {
    title: "Action",
    width: 200,
    className: "text-center",
    fixed: "right",
    render: (record) => {
      return (
        <>
          <Link to={`/update-pegawai/${record.uuid}`}>
            <Button type="primary" className="me-2 h-[30px] w-[32px] p-0">
              <FaRegEdit className="p-[2px] text-[20px]" />
            </Button>
          </Link>

          <Button
            onClick={() => handleOpenModalDelete(record)}
            className="h-[30px] w-[32px] border-red-500 p-0 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <MdOutlineDeleteSweep className="text-[20px]" />
          </Button>
        </>
      );
    },
  },
];
