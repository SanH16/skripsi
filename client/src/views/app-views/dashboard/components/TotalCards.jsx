import { Row, Col, Card, Skeleton, Flex } from "antd";
import { useEffect, useState } from "react";

import { APIrekrutmen } from "@/apis/APIrekrutmen";
import { FaTasks, FaUserSecret } from "react-icons/fa";
import { FaPeopleLine, FaPersonWalkingLuggage } from "react-icons/fa6";
import { MdPeople, MdOutlinePersonPin } from "react-icons/md";
import { TbFaceId } from "react-icons/tb";
import { PiTipJar } from "react-icons/pi";

import { useSelector } from "react-redux";
import { selectGetUserLogin } from "@/store/auth-get-user-slice";

import { APIcuti } from "@/apis/APIcuti";
import { APIpegawai } from "@/apis/APIpegawai";
import { APImutasi } from "@/apis/APImutasi";
import { APIabsensi } from "@/apis/APIabsensi";
import { APIlamaran } from "@/apis/APIlamaran";
import { APIpenugasan } from "@/apis/APIpenugasan";
import { APIreward } from "@/apis/APIreward";

export function TotalCards() {
  const userState = useSelector(selectGetUserLogin);
  const verifRole = userState?.data?.role === "admin";
  const [data, setData] = useState({
    totalRekrutmen: 0,
    totalMutasi: 0,
    totalPegawai: 0,
    totalCuti: 0,
    totalAbsensi: 0,
    totalPelamar: 0,
    totalPenugasan: 0,
    totalReward: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [
        rekrutmenTotal,
        cutiTotal,
        pegawaiTotal,
        mutasiTotal,
        absensiTotal,
        pelamarTotal,
        penugasanTotal,
        rewardTotal,
      ] = await Promise.allSettled([
        APIrekrutmen.getAllRekrutmens(),
        APIcuti.getAllCuti(),
        APIpegawai.getDataPegawai(),
        APImutasi.getAllMutasi(),
        APIabsensi.getDataAbsensi(),
        APIlamaran.getDataLamaran(),
        APIpenugasan.getAllPenugasan(),
        APIreward.getAllReward(),
      ]);

      setData((prevData) => ({
        ...prevData,
        totalRekrutmen:
          rekrutmenTotal.status === "fulfilled"
            ? rekrutmenTotal.value.length
            : 0,
        totalCuti:
          cutiTotal.status === "fulfilled" ? cutiTotal.value.length : 0,
        totalPegawai:
          pegawaiTotal.status === "fulfilled" ? pegawaiTotal.value.length : 0,
        totalMutasi:
          mutasiTotal.status === "fulfilled" ? mutasiTotal.value.length : 0,
        totalAbsensi:
          absensiTotal.status === "fulfilled" ? absensiTotal.value.length : 0,
        totalPelamar:
          pelamarTotal.status === "fulfilled" ? pelamarTotal.value.length : 0,
        totalPenugasan:
          penugasanTotal.status === "fulfilled"
            ? penugasanTotal.value.length
            : 0,
        totalReward:
          rewardTotal.status === "fulfilled" ? rewardTotal.value.length : 0,
      }));
    } catch (error) {
      console.error(error);
    } finally {
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
    {
      title: "Total Daftar Absensi",
      total: data.totalAbsensi,
      icon: <TbFaceId />,
      available: data.totalAbsensi > 0,
      link: "/absensi",
    },
    {
      title: "Total Pelamar Kerja",
      total: data.totalPelamar,
      icon: <MdOutlinePersonPin />,
      available: data.totalPelamar > 0,
      link: "/rekrutmen",
    },
    {
      title: "Total Daftar Penugasan",
      total: data.totalPenugasan,
      icon: <FaPersonWalkingLuggage />,
      available: data.totalPenugasan > 0,
      link: "/penugasan",
    },
    {
      title: "Data Reward",
      total: data.totalReward,
      icon: <PiTipJar />,
      available: data.totalReward > 0,
      link: "/reward-and-punishment",
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        {cardData.map(
          (item, i) =>
            (verifRole || item.title !== "Total Pelamar Kerja") && (
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
                            className="text-[40px] text-green-400 duration-100 hover:text-[50px]"
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
            ),
        )}
      </Row>
    </>
  );
}
