import { Link } from "react-router-dom";
import { Row, Col, Button, Tooltip } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { ListLowongan } from "./components/ListLowongan";

import { useSelector } from "react-redux";

import { selectGetUserLogin } from "@/store/auth-get-user-slice";
import { FaUserClock } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";

import { useState } from "react";
import { TablePelamar } from "./components/TablePelamar";

export default function Rekrutmen() {
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";

  const [showTablePelamar, setShowTablePelamar] = useState(false);

  const handleButtonClick = () => {
    setShowTablePelamar((prev) => !prev);
  };
  return (
    <>
      <div className="mb-5 py-5">
        <Row justify="space-between" className="mb-5" align="middle">
          <Col span={12}>
            <h3 className="font-bold">
              {showTablePelamar ? "Data Pelamar" : "Lowongan Kerja"}
            </h3>
          </Col>
          {verifRole && (
            <>
              <Col className="flex items-center justify-center">
                <Tooltip
                  title={showTablePelamar ? "Data Lowongan" : "Data Pelamar"}
                  placement="left"
                >
                  <Button
                    id="data_pelamar"
                    type="primary"
                    onClick={handleButtonClick}
                    className="border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    {showTablePelamar ? (
                      <BsPersonVcard className="justify-center text-xl" />
                    ) : (
                      <FaUserClock className="justify-center text-xl" />
                    )}
                  </Button>
                </Tooltip>
                <Link to="/unggah-lowongan">
                  <Button
                    id="write-rekrutmen"
                    type="primary"
                    className="ms-2 bg-green-500"
                  >
                    Buat Lowongan
                    <span className="ms-1 text-lg">
                      <MdOutlineFileUpload />
                    </span>
                  </Button>
                </Link>
              </Col>
            </>
          )}
        </Row>
        {showTablePelamar ? <TablePelamar /> : <ListLowongan />}
      </div>
    </>
  );
}
