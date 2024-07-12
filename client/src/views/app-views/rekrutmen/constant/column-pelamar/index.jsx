/* eslint-disable react-refresh/only-export-components */

import { Button, Tag } from "antd";
import { MdOutlineDeleteSweep } from "react-icons/md";

export const ColumnPelamar = (handleOpenModalDelete) => {
  return [
    {
      title: "ID",
      dataIndex: "uuid",
      key: "uuid",
      width: 50,
      render: (val) => <span>{val.slice(0, 5)}</span>,
    },
    {
      title: "Nama Lengkap",
      dataIndex: "nama",
      key: "nama",
      width: 200,
      sorter: (a, b) => a.user.nama.localeCompare(b.user.nama),
    },
    {
      title: "Nomor HP",
      dataIndex: "nomor_telepon",
      key: "nomor_telepon",
      width: 100,
    },
    {
      title: "Pendidikan Terakhir",
      dataIndex: "pendidikan_terakhir",
      key: "pendidikan_terakhir",
      width: 200,
      render: (val) => <span className="flex justify-center">{val}</span>,
      sorter: (a, b) =>
        a.pendidikan_terakhir.localeCompare(b.pendidikan_terakhir),
    },
    {
      title: "Dokumen CV",
      dataIndex: "dokumen_cv",
      key: "dokumen_cv",
      width: 150,
    },
    {
      title: "Dokumen Pendukung",
      dataIndex: "dokumen_lain",
      key: "dokumen_lain",
      width: 200,
    },
    {
      title: "Keterampilan",
      dataIndex: "keterampilan",
      key: "keterampilan",
      width: 250,
      render: (val) => <Tags tags={val} />,
    },
    {
      title: "Action",
      width: 50,
      className: "text-center",
      render: (record) => {
        return (
          <>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => handleOpenModalDelete(record)}
                className="h-[30px] w-[32px] rounded-lg border-red-500 p-0 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <MdOutlineDeleteSweep className="text-[20px]" />
              </Button>
            </div>
          </>
        );
      },
    },
  ];
};
import { splitString } from "@/utils/SplitString";

const Tags = ({ tags }) => {
  const tagsList = splitString(tags);
  return (
    <>
      {tagsList?.map((tag, index) => (
        <Tag
          key={index}
          className="mb-1 bg-green-100 font-medium capitalize text-green-600"
        >
          {tag}
        </Tag>
      ))}
    </>
  );
};
