import { RiChatHistoryLine } from "react-icons/ri";

import { Card, Col, Flex, Row } from "antd";
import { useLocation } from "react-router-dom";
import { GoUnverified } from "react-icons/go";

export function CardTable({ data, titleCard }) {
  const itemToday = data?.filter(
    (item) =>
      new Date(item.createdAt).toDateString() === new Date().toDateString(),
  );

  const waitingVerification = data?.filter((item) => item.status === "waiting");

  const location = useLocation();
  const verifLocation = location.pathname.includes("cuti");

  return (
    <>
      <Row gutter={[16, 16]} className="mb-4" id="card-table">
        <Col id="total-cards" span={6} xs={24} md={8} lg={7}>
          <Card hoverable className="hover:shadow-md">
            <div className="grid h-20 content-between">
              <Flex justify="space-between" align="flex-start">
                <div>
                  <p id="total-card-title" className="me-0 font-medium lg:me-3">
                    {titleCard}
                  </p>
                  <h4 id="total-item" className="font-bold">
                    {itemToday?.length}
                  </h4>
                </div>
                <div className="grid h-16 w-16 place-content-center rounded-lg bg-green-50">
                  <RiChatHistoryLine className="text-[50px] text-green-300 duration-100 hover:text-[60px]" />
                </div>
              </Flex>
            </div>
          </Card>
        </Col>
        {verifLocation && (
          <Col id="total-cards" span={6} xs={24} md={8} lg={7}>
            <Card hoverable className="hover:shadow-md">
              <div className="grid h-20 content-between">
                <Flex justify="space-between" align="flex-start">
                  <div>
                    <p
                      id="total-card-title"
                      className="me-0 font-medium lg:me-3"
                    >
                      Menunggu Verifikasi
                    </p>
                    <h4 id="total-item" className="font-bold">
                      {waitingVerification?.length}
                    </h4>
                  </div>
                  <div className="grid h-16 w-16 place-content-center rounded-lg bg-green-50">
                    <GoUnverified className="text-[50px] text-green-300 duration-100 hover:text-[60px]" />
                  </div>
                </Flex>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}
