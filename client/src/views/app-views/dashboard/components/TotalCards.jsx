import { Row, Col, Card, Skeleton, Flex } from "antd";
import { useEffect, useState } from "react";

import { APIrekrutmen } from "@/apis/APIrekrutmen";
import { FaTasks, FaUserSecret } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import { APIcuti } from "@/apis/APIcuti";
import { APIpegawai } from "@/apis/APIpegawai";
import { APImutasi } from "../../../../apis/APImutasi";

export function TotalCards() {
  const [data, setData] = useState({
    totalRekrutmen: 0,
    totalMutasi: 0,
    totalPegawai: 0,
    totalCuti: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const rekrutmenTotal = await APIrekrutmen.getAllRekrutmens();
      const cutiTotal = await APIcuti.getAllCuti();
      const pegawaiTotal = await APIpegawai.getDataPegawai();
      const mutasiTotal = await APImutasi.getAllMutasi();

      setData((prevData) => ({
        ...prevData,
        totalRekrutmen: rekrutmenTotal.length,
        totalCuti: cutiTotal.length,
        totalPegawai: pegawaiTotal.length,
        totalMutasi: mutasiTotal.length,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const cardData = [
    {
      title: "Total Lowongan Kerja",
      total: data.totalRekrutmen,
      icon: <FaPeopleLine />,
      available: data.totalRekrutmen > 0,
      link: "/rekrutmen",
    },
    {
      title: "Total Mutasi",
      total: data.totalMutasi,
      icon: <MdPeople />,
      available: data.totalMutasi > 0,
      link: "/mutasi",
    },
    {
      title: "Data Pegawai",
      total: data.totalPegawai,
      icon: <FaTasks />,
      available: data.totalPegawai > 0,
      link: "/profil",
    },
    {
      title: "Total Pengajuan Cuti",
      total: data.totalCuti,
      icon: <FaUserSecret />,
      available: data.totalCuti > 0,
      link: "/cuti",
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        {cardData.map((item, i) => (
          <Col key={i} span={6} xs={24} md={12} lg={12} xl={6}>
            <a href={item.link}>
              <Card hoverable className="hover:shadow-lg">
                <div className="grid h-32 content-between">
                  <Flex justify="space-between" align="flex-start">
                    <div>
                      <p
                        id="total-card-title"
                        className="me-0 font-medium lg:me-3"
                      >
                        {item.title}
                      </p>
                      <Skeleton
                        loading={isLoading}
                        active
                        title={false}
                        paragraph={{ rows: 1 }}
                      >
                        <h4 id="total-item" className="font-bold">
                          {item.total}
                        </h4>
                      </Skeleton>
                    </div>
                    <div className="grid h-16 w-16 place-content-center rounded-lg bg-green-50">
                      <i
                        id="item-icon"
                        className="text-[45px] text-green-400 duration-100 hover:text-[50px]"
                        alt="item-icon"
                      >
                        {item.icon}
                      </i>
                    </div>
                  </Flex>
                  <Skeleton
                    loading={isLoading}
                    active
                    title={false}
                    paragraph={{ rows: 1 }}
                  >
                    <h6 id="total-card-percent" className="text-grey-200">
                      Data
                      <span
                        className={`ms-2 place-content-center rounded px-2 font-semibold ${
                          item.available
                            ? "bg-green-50 text-positive"
                            : "bg-grey-50 text-negative"
                        }`}
                      >
                        {item.available ? "Tersedia" : "Belum Tersedia"}
                      </span>
                    </h6>
                  </Skeleton>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
}
