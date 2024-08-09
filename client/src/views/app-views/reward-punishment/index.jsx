import { Button, Col, Row, Tooltip } from "antd";
import { TableReward } from "./components/TableReward";
import { useState } from "react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaPersonCircleExclamation } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { TablePunishment } from "./components/TablePunishment";

export default function RewardAndPunishment() {
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
            {showTable ? "Data Punishment" : "Reward Pegawai"}
          </h3>
        </Col>

        <Tooltip
          title={showTable ? "Reward Pegawai" : "Data Punishment"}
          placement="left"
        >
          <Button
            id="icon-reward-punishment"
            type="primary"
            onClick={handleButtonClick}
            className="border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white"
          >
            {showTable ? (
              <FaHandHoldingDollar className="justify-center text-xl" />
            ) : (
              <FaPersonCircleExclamation className="justify-center text-xl" />
            )}
          </Button>
        </Tooltip>
        {verifRole && (
          <>
            <Col className="flex items-center justify-center">
              {showTable ? (
                <Button
                  id="buat-punishment"
                  className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  onClick={handleOpenModal}
                >
                  <span className="me-2 text-lg">
                    <MdOutlineFileUpload />
                  </span>
                  Tambah Punishment
                </Button>
              ) : (
                <Button
                  id="buat-reward"
                  className="flex border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  onClick={handleOpenModal}
                >
                  <span className="me-2 text-lg">
                    <MdOutlineFileUpload />
                  </span>
                  Tambah Reward
                </Button>
              )}
            </Col>
          </>
        )}
      </Row>
      {showTable ? (
        <TablePunishment
          handleCloseModal={handleCloseModal}
          isModalVisible={isModalVisible}
        />
      ) : (
        <TableReward
          handleCloseModal={handleCloseModal}
          isModalVisible={isModalVisible}
        />
      )}
    </section>
  );
}
