import { Row, Col, Card, Skeleton, Flex } from "antd";
import { useEffect, useState } from "react";

import { APIrekrutmen } from "@/apis/APIrekrutmen";
import { FaTasks, FaUserSecret } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";

export function TotalCards() {
  const [data, setData] = useState({
    totalRekrutmen: 0,
    totalUser: 0,
    totalPenugasan: 0,
    totalCuti: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const rekrutmenTotal = await APIrekrutmen.getAllRekrutmens();

      setData((prevData) => ({
        ...prevData,
        totalRekrutmen: rekrutmenTotal.length,
        // totalUser: userTotal.length,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const formatPrice = (num) => {
    if (num >= 1000000) {
      return num / 1000000 + " M";
    } else if (num >= 1000) {
      return num / 1000 + " K";
    } else {
      return num;
    }
  };

  const formatPercentage = (percentage) => {
    return percentage !== undefined
      ? percentage < 0
        ? percentage.toFixed(2) + "%"
        : percentage % 1 === 0
          ? "+" + percentage.toFixed(0) + "%"
          : "+" + percentage.toFixed(2) + "%"
      : "0%";
  };

  const cardData = [
    {
      title: "Total Lowongan Kerja",
      total: data.totalRekrutmen,
      icon: <FaPeopleLine />,
      percent: formatPercentage(data.rekrutmenPercentage),
    },
    {
      title: "Total Akun User",
      total: data.totalUser,
      icon: <MdPeople />,
      percent: formatPercentage(data.userPercentage),
    },
    {
      title: "Total Penugasan",
      total: formatPrice(data.totalPenugasan),
      icon: <FaTasks />,
      percent: formatPercentage(data.penugasanPercentage),
    },
    {
      title: "Total Cuti",
      total: data.totalCuti,
      icon: <FaUserSecret />,
      percent: formatPercentage(data.cutiPercentage),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        {cardData.map((item, i) => (
          <Col key={i} span={6} xs={24} md={12} lg={12} xl={6}>
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
                      className="text-[45px] text-green-400 hover:text-[50px]"
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
                    <span
                      className={`me-2 place-content-center rounded px-2 font-semibold ${
                        item.percent[0] === "+"
                          ? "bg-green-50 text-positive"
                          : item.percent[0] === "-"
                            ? "bg-red-50 text-negative"
                            : "bg-grey-50 text-grey-500"
                      }`}
                    >
                      {item.percent}
                    </span>
                    Sejak periode terakhir
                  </h6>
                </Skeleton>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
