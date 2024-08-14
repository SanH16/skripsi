import { Button, Col, Row, Tooltip } from "antd";
import { useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { FaPeopleArrows } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { TableMutasi } from "./components/TableMutasi";
import { TablePromosi } from "../promosi/components/TablePromosi";

export default function Mutasi() {
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";
  const [showTable, setShowTable] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonClick = () => {
    setShowTable((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <section className="py-5">
      <Row justify="space-between" className="mb-5" align="middle">
        <Col span={19}>
          <h3 className="font-bold">
            {showTable ? "Promosi Pegawai" : "Mutasi Pegawai"}
          </h3>
        </Col>

        <Tooltip title={showTable ? "Mutasi" : "Promosi"} placement="left">
          <Button
            id="icon-mutasi-promosi"
            type="primary"
            onClick={handleButtonClick}
            className="border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white"
          >
            {showTable ? (
              <FaPeopleArrows className="justify-center text-xl" />
            ) : (
              <AiOutlineSafety className="justify-center text-xl" />
            )}
          </Button>
        </Tooltip>
        {verifRole && (
          <>
            <Col className="flex items-center justify-center">
              {showTable ? (
                <Button
                  id="buat-promosi"
                  className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  onClick={handleOpenModal}
                >
                  <span className="me-2 text-lg">
                    <MdOutlineFileUpload />
                  </span>
                  Tambah Promosi
                </Button>
              ) : (
                <Button
                  id="buat-mutasi"
                  className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  onClick={handleOpenModal}
                >
                  <span className="me-2 text-lg">
                    <MdOutlineFileUpload />
                  </span>
                  Tambah Mutasi
                </Button>
              )}
            </Col>
          </>
        )}
      </Row>
      {showTable ? (
        <TablePromosi
          handleCloseModal={handleCloseModal}
          isModalVisible={isModalVisible}
        />
      ) : (
        <TableMutasi
          handleCloseModal={handleCloseModal}
          isModalVisible={isModalVisible}
        />
      )}
      {/* halo */}
    </section>
  );
}
